import nodemailer from "nodemailer";
import {
  NEWS_SUMMARY_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  STOCK_ALERT_UPPER_EMAIL_TEMPLATE,
  STOCK_ALERT_LOWER_EMAIL_TEMPLATE
} from "@/lib/nodemailer/templates";


// Verify transporter configuration
if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
  console.warn(
    "⚠️ NODEMAILER_EMAIL or NODEMAILER_PASSWORD is not set. Email functionality will not work.",
  );
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
  // Add connection timeout and retry options
  pool: true,
  maxConnections: 1,
  maxMessages: 3,
});

// Verify connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Nodemailer transporter verification failed:', error);
    } else {
        console.log('✅ Nodemailer transporter is ready to send emails');
    }
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {

  try {
    if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
      throw new Error("Email credentials not configured");
    }

    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace(
      "{{name}}",
      name,
    ).replace("{{intro}}", intro);

    const mailOptions = {
      from: `"SignalOne" <signalone@prabuddhaxdev.in>`,
      to: email,
      subject: `Welcome to SignalOne - your advanced stock market research toolkit!`,
      text: "Thanks for joining SignalOne",
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
    throw error;
  }
};


export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}) => {

      try {
        if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
          throw new Error("Email credentials not configured");
        }

        const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace(
          "{{date}}",
          date,
        ).replace("{{newsContent}}", newsContent);

        const mailOptions = {
          from: `"SignalOne News" <signalone@prabuddhaxdev.in>`,
          to: email,
          subject: `📈 Market News Summary Today - ${date}`,
          text: `Today's market news summary from SignalOne`,
          html: htmlTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ News summary email sent successfully:", info.messageId);
        return info;
      } catch (error) {
        console.error("❌ Failed to send news summary email:", error);
        throw error;
      }
};

export const sendStockAlertEmail = async ({
  email,
  symbol,
  company,
  currentPrice,
  targetPrice,
  condition,
  timestamp,
}: {
  email: string;
  symbol: string;
  company: string;
  currentPrice: string;
  targetPrice: string;
  condition: "ABOVE" | "BELOW";
  timestamp: string;
}) => {
  try {
    if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
      throw new Error("Email credentials not configured");
    }

    const template = condition === "ABOVE"
      ? STOCK_ALERT_UPPER_EMAIL_TEMPLATE
      : STOCK_ALERT_LOWER_EMAIL_TEMPLATE;

    const htmlTemplate = template
      .replace("{{symbol}}", symbol)
      .replace("{{company}}", company)
      .replace("{{currentPrice}}", currentPrice)
      .replace("{{targetPrice}}", targetPrice)
      .replace("{{timestamp}}", timestamp);

    const mailOptions = {
      from: `"SignalOne Alerts" <signalone@prabuddhaxdev.in>`,
      to: email,
      subject: `📈 Price Alert: ${symbol} Hit ${condition === "ABOVE" ? "Upper" : "Lower"} Target`,
      text: `${symbol} has reached your target price of ${targetPrice}. Current price: ${currentPrice}`,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Stock alert email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send stock alert email:", error);
    throw error;
  }
};