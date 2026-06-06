"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Alert} from "@/database/models/alert.model";
import { revalidatePath } from "next/cache";

// Create a new alert
export async function createAlert(params: {
  userId: string;
  symbol: string;
  targetPrice: number;
  condition: "ABOVE" | "BELOW";
}) {
  try {
    await connectToDatabase();
    const newAlert = await Alert.create({
      ...params,
      active: true,
      // expiresAt handled by default value in schema
    });
    revalidatePath("/watchlist");
    return JSON.parse(JSON.stringify(newAlert));
  } catch (error) {
    console.error("Error creating alert:", error);
    throw new Error("Failed to create alert");
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

// Delete an alert
export async function deleteAlert(alertId: string) {
  try {
    await connectToDatabase();
    await Alert.findByIdAndDelete(alertId);
    revalidatePath("/watchlist");
    return { success: true };
  } catch (error) {
    console.error("Error deleting alert:", error);
    throw new Error("Failed to delete alert");
  }
}

// Update an alert
export async function updateAlert(alertId: string, updates: {
  targetPrice?: number;
  condition?: "ABOVE" | "BELOW";
}) {
  try {
    await connectToDatabase();
    await Alert.findByIdAndUpdate(alertId, updates);
    revalidatePath("/watchlist");
    return { success: true };
  } catch (error) {
    console.error("Error updating alert:", error);
    throw new Error("Failed to update alert");
  }
}

// Toggle alert active status (optional utility)
export async function toggleAlert(alertId: string, active: boolean) {
  try {
    await connectToDatabase();
    await Alert.findByIdAndUpdate(alertId, { active });
    revalidatePath("/watchlist");
    return { success: true };
  } catch (error) {
    console.error("Error toggling alert:", error);
    throw new Error("Failed to update alert");
  }
}
