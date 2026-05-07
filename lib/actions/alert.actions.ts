"use server";

import { inngest } from "@/lib/inngest/client";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function createAlertAction({
  symbol,
  company,
  threshold,
  alertType,
}: {
  symbol: string;
  company: string;
  threshold: number;
  alertType: "upper" | "lower";
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    await inngest.send({
      name: "app/alert.created",
      data: {
        symbol,
        company,
        threshold,
        alertType,
        userEmail: session.user.email,
        userName: session.user.name,
      },
    });

    return { success: true, message: "Alert created successfully" };
  } catch (error) {
    console.error("Error creating alert:", error);
    return { success: false, message: "Failed to create alert" };
  }
}

export async function removeAlertAction({
  symbol,
}: {
  symbol: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    await inngest.send({
      name: "app/alert.removed",
      data: {
        symbol,
        userEmail: session.user.email,
      },
    });

    return { success: true, message: "Alert removal event sent" };
  } catch (error) {
    console.error("Error removing alert:", error);
    return { success: false, message: "Failed to remove alert" };
  }
}
