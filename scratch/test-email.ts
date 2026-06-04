import dotenv from "dotenv";
import path from "path";

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { sendPasswordResetEmail } from "../lib/nodemailer/reset-password";

async function test() {
  console.log("Testing email sending...");
  console.log("NODEMAILER_EMAIL:", process.env.NODEMAILER_EMAIL);
  console.log("NODEMAILER_PASSWORD is set:", !!process.env.NODEMAILER_PASSWORD);

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const result = await sendPasswordResetEmail({
      email: "projects.login01@gmail.com",
      name: "Test User",
      resetUrl: `${baseUrl}/reset-password?token=test-token`,
    });
    console.log("Result:", result);
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

test();
