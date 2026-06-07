"use client";

import { useState } from "react";
import { Trash2, Bell, Edit2, Check, X } from "lucide-react";
import { deleteAlert, updateAlert } from "@/lib/actions/alert.actions";
import { formatPrice } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AlertsPanelProps {
  alerts: any[];
  onRefresh?: () => void;
}

export default function AlertsPanel({ alerts, onRefresh }: AlertsPanelProps) {
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this alert?")) {
      await deleteAlert(id);
      if (onRefresh) onRefresh();
    }
  };

  const handleSave = async (id: string, targetPrice: number) => {
    try {
      await updateAlert(id, { targetPrice });
      setEditingAlertId(null);
      if (onRefresh) onRefresh();
    } catch (error) {
      alert("Failed to update alert");
    }
  };

  return (
    <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
          Alerts
        </h2>
      </div >

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No active alerts. Add one from the watchlist.
          </div >
        ) : (
          alerts.map((alert) => (
            <div
              key={alert._id}
              className="bg-gray-800/40 rounded-lg p-3 border border-gray-800 relative group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={alert.logo} />
                      <AvatarFallback className="bg-gray-700 text-white text-xs font-bold">
                        {alert.symbol[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm">
                        {alert.symbol}
                      </div >
                      <div className="text-xs text-gray-400">
                        Target: {formatPrice(alert.targetPrice, alert.currency)}
                      </div >
                    </div >
                  </div >
                  <div className="mt-2 text-xs text-yellow-500 font-medium">
                    Condition: Price {alert.condition.toLowerCase()}{" "}
                    {formatPrice(alert.targetPrice, alert.currency)}
                  </div >
                  <div className="text-[10px] text-gray-500 mt-1">
                    Active until{" "}
                    {new Date(
                      new Date(alert.createdAt).getTime() +
                        90 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString()}
                  </div >
                </div >
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setEditingAlertId(alert._id);
                      setEditValue(alert.targetPrice.toString());
                    }}
                    className="text-gray-500 hover:text-yellow-500 transition-colors p-1"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(alert._id)}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div >
              </div >

              {editingAlertId === alert._id && (
                <div className="mt-3 pt-3 border-t border-gray-700 flex items-center gap-2">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="bg-gray-900 text-white text-xs rounded px-2 py-1 border border-gray-700 w-full outline-none focus:border-yellow-500"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSave(alert._id, parseFloat(editValue))}
                    className="p-1 bg-yellow-500 text-slate-900 rounded hover:bg-yellow-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingAlertId(null)}
                    className="p-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div >
              )}
            </div >
          ))
        )}
      </div >
    </div >
  );
}
