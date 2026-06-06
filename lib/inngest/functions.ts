import { inngest } from "./client";
import mongoose from "mongoose";

import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "./prompts";

import {
  sendNewsSummaryEmail,
  sendWelcomeEmail, sendStockAlertEmail,
} from "../nodemailer/index";

import { getFormattedTodayDate } from "../utils";

import { getNews, getStocksDetails } from "../actions/finnhub.actions";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { getAllUsersForNewsEmail } from "../actions/user.actions";
import { getActiveAlerts, markAlertAsTriggered } from "../actions/alert.actions";
import { connectToDatabase } from "@/database/mongoose";


export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email", event: "app/user.created" as any },
  async ({ event, step }) => {
    const userProfile = `
        - Country: ${event.data.country}
        - Investment goals: ${event.data.investmentGoals}
        - Risk tolerance: ${event.data.riskTolerance}
        - Preferred industry: ${event.data.preferredIndustry}
    `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-1.5-flash" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining SignalOne. You now have the tools to track markets and make smarter moves.";

      const {
        data: { email, name },
      } = event;

      return await sendWelcomeEmail({ email, name, intro: introText });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  }
);

export const sendDailyNewsSummary = inngest.createFunction(
  {
    id: "daily-news-summary",
    triggers: [{ event: "app/send.daily.news" }, { cron: "0 12 * * *" }] as any
  },
  async ({ step }) => {
    // Step #1: Get all users for news delivery
    const users = await step.run("get-all-users", getAllUsersForNewsEmail);
    if (!users || users.length === 0)
      return { success: false, message: "No users found for news email" };

    // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
    const results = await step.run("fetch-user-news", async () => {
      const perUser: Array<{
        user: any;
        articles: any[];
      }> = [];
      for (const user of users as any[]) {
        try {
          const symbols = await getWatchlistSymbolsByEmail(user.email);
          let articles = await getNews(symbols);
          // Enforce max 6 articles per user
          articles = (articles || []).slice(0, 6);
          // If still empty, fallback to general
          if (!articles || articles.length === 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }
          perUser.push({ user, articles });
        } catch (e) {
          console.error("daily-news: error preparing user news", user.email, e);
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });

    // Step #3: Summarize news via AI for each user
    const userNewsSummaries: {
      user: any;
      newsContent: string | null;
    }[] = [];

    for (const { user, articles } of results) {
      if (articles.length === 0) continue;

      const newsContent = await step.run(`summarize-news-${user.email}`, async () => {
          const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
            "{{newsData}}",
            JSON.stringify(articles, null, 2)
          );

          const response = await step.ai.infer(`ai-summary-${user.email}`, {
            model: step.ai.models.gemini({ model: "gemini-1.5-flash" }),
            body: {
              contents: [{ role: "user", parts: [{ text: prompt }] }],
            },
          });

          const part = response.candidates?.[0]?.content?.parts?.[0];
          return (part && "text" in part ? part.text : null) || "No market news.";
      });

      userNewsSummaries.push({ user, newsContent });
    }

    // Step #4: Send the emails
    await step.run("send-news-emails", async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;

          return await sendNewsSummaryEmail({
            email: user.email,
            date: getFormattedTodayDate(),
            newsContent,
          });
        })
      );
    });

    return {
      success: true,
      message: "Daily news summary emails sent successfully",
    };
  }
);

export const monitorStockAlerts = inngest.createFunction(
  {
    id: "monitor-stock-alerts",
    triggers: [{ cron: "*/15 * * * *" }] as any
  },
  async ({ step }) => {
    const alerts = await step.run("fetch-active-alerts", async () => {
      return await getActiveAlerts();
    });

    if (!alerts || alerts.length === 0) {
      return { success: true, message: "No active alerts to monitor" };
    }

    // Group alerts by symbol to minimize API calls
    const symbolGroups: Record<string, any[]> = {};
    for (const alert of alerts) {
      const sym = alert.symbol;
      if (!symbolGroups[sym]) symbolGroups[sym] = [];
      symbolGroups[sym].push(alert);
    }

    const uniqueSymbols = Object.keys(symbolGroups);
    const priceMap: Record<string, any> = {};

    // Fetch prices for all unique symbols
    await step.run("fetch-prices", async () => {
      for (const sym of uniqueSymbols) {
        try {
          const details = await getStocksDetails(sym);
          if (details) {
            priceMap[sym] = details;
          }
        } catch (e) {
          console.error(`Error fetching price for ${sym}:`, e);
        }
      }
    });

    const triggeredAlerts: any[] = [];

    // Evaluate alerts
    for (const sym of uniqueSymbols) {
      const details = priceMap[sym];
      if (!details) continue;

      const currentPrice = details.currentPrice;
      const symbolAlerts = symbolGroups[sym];

      for (const alert of symbolAlerts) {
        const isTriggered = alert.condition === "ABOVE"
          ? currentPrice >= alert.targetPrice
          : currentPrice <= alert.targetPrice;

        if (isTriggered) {
          triggeredAlerts.push({ alert, details });
        }
      }
    }

    // Handle triggers
    await step.run("process-triggers", async () => {
      for (const { alert, details } of triggeredAlerts) {
        try {
          const mdb = await connectToDatabase();
          const db = mdb.connection.db;

          const userId = alert.userId;
          const userQuery = mongoose.Types.ObjectId.isValid(userId)
            ? { _id: new mongoose.Types.ObjectId(userId) }
            : { _id: userId };

          const user = await db.collection("user").findOne(userQuery);

          if (!user || !user.email) {
            console.error(`No user email found for userId ${userId}`);
            continue;
          }

          // Send alert email
          await sendStockAlertEmail({
            email: user.email,
            symbol: alert.symbol,
            company: details.company,
            currentPrice: details.priceFormatted,
            targetPrice: String(alert.targetPrice),
            condition: alert.condition,
            timestamp: getFormattedTodayDate(),
          });

          // Mark as triggered
          await markAlertAsTriggered(alert._id);
        } catch (e) {
          console.error(`Error processing trigger for alert ${alert._id}:`, e);
        }
      }
    });

    return {
      success: true,
      processed: uniqueSymbols.length,
      triggered: triggeredAlerts.length,
    };
  }
);


