import { inngest } from "./client";

import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "./prompts";

import { sendNewsSummaryEmail, sendWelcomeEmail } from "../nodemailer/index";

import { getFormattedTodayDate } from "../utils";

import { getNews } from "../actions/finnhub.actions";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { getAllUsersForNewsEmail } from "../actions/user.actions";

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
        user: User;
        articles: MarketNewsArticle[];
      }> = [];
      for (const user of users as User[]) {
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
      user: User;
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

export const handleStockAlert = inngest.createFunction(
  { id: "handle-stock-alert", event: "app/alert.created" as any },
  async ({ event, step }) => {
    const { symbol, company, threshold, alertType, userEmail } = event.data;

    // In a real app, we might wait for the price to hit the threshold.
    // For this demo, we'll just simulate an immediate alert confirmation or wait logic.
    
    await step.run("send-alert-confirmation", async () => {
      // Simulate sending an email or notification
      console.log(`Alert set for ${symbol} (${company}) at ${threshold} (${alertType})`);
      // Here you could call another nodemailer function if it existed
    });

    return { success: true, symbol };
  }
);

export const handleStockAlertRemoval = inngest.createFunction(
  { id: "handle-stock-alert-removal", event: "app/alert.removed" as any },
  async ({ event, step }) => {
    const { symbol, userEmail } = event.data;

    await step.run("log-alert-removal", async () => {
      console.log(`Alert removed for ${symbol} by ${userEmail}`);
    });

    return { success: true, symbol };
  }
);


