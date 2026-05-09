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

      await auth.api.signInEmail({
        body: { email, password },
        headers: await headers(),
      });
    }

    return { success: true, data: response };
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

    return { success: true, data: response };
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

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};
