"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Alert} from "@/database/models/alert.model";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

// Create a new alert
export async function createAlert(params: {
  symbol: string;
  targetPrice: number;
  condition: "ABOVE" | "BELOW";
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) throw new Error("Not authenticated");
    const userId = session.user.id;

    await connectToDatabase();
    const newAlert = await Alert.create({
      ...params,
      userId,
      active: true,
      // expiresAt handled by default value in schema
    });
    revalidatePath("/watchlist");
    return { success: true, data: JSON.parse(JSON.stringify(newAlert)) };
  } catch (error: any) {
    console.error("Error creating alert:", error);
    return { success: false, message: error.message || "Failed to create alert" };
  }
}

export async function getActiveAlerts() {
  try {
    await connectToDatabase();
    return await Alert.find({ active: true }).lean();
  } catch (error) {
    console.error("Error fetching active alerts:", error);
    return [];
  }
}

export async function markAlertAsTriggered(alertId: string) {
  try {
    await connectToDatabase();
    await Alert.findByIdAndUpdate(alertId, { active: false, triggered: true });
    return { success: true };
  } catch (error) {
    console.error("Error marking alert as triggered:", error);
    throw new Error("Failed to update alert status");
  }
}

// Get all alerts for a user
export async function getUserAlerts(userId: string) {
  try {
    await connectToDatabase();
    const alerts = await Alert.find({ userId }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
}

// Delete an alert by symbol for the current user
export async function deleteAlertBySymbol(symbol: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) throw new Error("Not authenticated");
    const userId = session.user.id;

    await connectToDatabase();
    const result = await Alert.findOneAndDelete({
      userId,
      symbol: symbol.toUpperCase()
    });
    if (!result) throw new Error("Alert not found");

    revalidatePath("/watchlist");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting alert by symbol:", error);
    return { success: false, message: error.message || "Failed to delete alert" };
  }
}

// Delete an alert
export async function deleteAlert(alertId: string) {

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) throw new Error("Not authenticated");
    const userId = session.user.id;

    await connectToDatabase();
    const result = await Alert.findOneAndDelete({ _id: alertId, userId });
    if (!result) throw new Error("Alert not found or unauthorized");

    revalidatePath("/watchlist");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting alert:", error);
    return { success: false, message: error.message || "Failed to delete alert" };
  }
}

// Update an alert
export async function updateAlert(alertId: string, updates: {
  targetPrice?: number;
  condition?: "ABOVE" | "BELOW";
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) throw new Error("Not authenticated");
    const userId = session.user.id;

    await connectToDatabase();
    const result = await Alert.findOneAndUpdate(
      { _id: alertId, userId },
      updates,
      { new: true }
    );
    if (!result) throw new Error("Alert not found or unauthorized");

    revalidatePath("/watchlist");
    return { success: true, data: JSON.parse(JSON.stringify(result)) };
  } catch (error: any) {
    console.error("Error updating alert:", error);
    return { success: false, message: error.message || "Failed to update alert" };
  }
}

// Toggle alert active status
export async function toggleAlert(alertId: string, active: boolean) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) throw new Error("Not authenticated");
    const userId = session.user.id;

    await connectToDatabase();
    const result = await Alert.findOneAndUpdate(
      { _id: alertId, userId },
      { active },
      { new: true }
    );
    if (!result) throw new Error("Alert not found or unauthorized");

    revalidatePath("/watchlist");
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling alert:", error);
    return { success: false, message: error.message || "Failed to update alert" };
  }
}
