"use server";

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";
import { connectToDatabase } from "@/database/mongoose";
import type { Db } from "mongodb";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
      headers: await headers(),
    });

    if (response) {
      try {
        await inngest.send({
          name: "app/user.created",
          data: {
            email,
            name: fullName,
            country,
            investmentGoals,
            riskTolerance,
            preferredIndustry,
          },
        });
      } catch (inngestError) {
        console.error("Warning: Failed to send event to Inngest:", inngestError);
      }

      await auth.api.signInEmail({
        body: { email, password },
        headers: await headers(),
      });
    }
    return { success: true, data: JSON.parse(JSON.stringify(response)) };

  } catch (e: any) {
    console.log("Sign up failed", e);
    let errorMessage = e?.body?.message || e?.message || "Sign up failed";
    if (errorMessage.toLowerCase().includes("user already exists") || errorMessage.toLowerCase().includes("email already exists")) {
      errorMessage = "An account with this email already exists.";
    }
    return { success: false, error: errorMessage };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db as Db;

    // Check if user exists
    const user = await db.collection("user").findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
      return { success: false, error: "Please Sign up first" };
    }

    const response = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });

    return { success: true, data: JSON.parse(JSON.stringify(response)) };
  } catch (e: any) {
    console.log("Sign in failed", e);
    let errorMessage = e?.body?.message || e?.message || "Sign in failed";

    // If we reached here, the user exists but sign in failed (likely wrong password)
    if (errorMessage.toLowerCase().includes("invalid email or password") || errorMessage.toLowerCase().includes("invalid password")) {
      errorMessage = "Password is wrong";
    }

    return { success: false, error: errorMessage };
  }
};

export const requestPasswordResetEmail = async ({
  email,
}: {
  email: string;
}) => {
  if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
    return { success: false, error: "Password reset email is not configured." };
  }

  try {
    const configuredBaseUrl = process.env.BETTER_AUTH_URL;
    const baseUrl =
      configuredBaseUrl ||
      (process.env.NODE_ENV !== "production" ? "http://localhost:3000" : null);

    if (!baseUrl) {
      return {
        success: false,
        error:
          "BETTER_AUTH_URL must be configured before password reset emails can be sent.",
      };
    }

    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${baseUrl}/reset-password`,
      },
    });

    return { success: true };
  } catch (e) {
    console.log("Password reset request failed", e);
    return { success: false, error: "Unable to send password reset email." };
  }
};

export const resetPasswordWithToken = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });

    return { success: true };
  } catch (e) {
    console.log("Password reset failed", e);
    return { success: false, error: "Reset link is invalid or expired." };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};
