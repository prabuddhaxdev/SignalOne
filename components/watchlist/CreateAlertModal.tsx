"use client";

import React, { useState } from "react";
import { BellPlus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function CreateAlertModal() {
  const [open, setOpen] = useState(false);
  const [alertName, setAlertName] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [alertType, setAlertType] = useState("Price");
  const [condition, setCondition] = useState("Greater than");
  const [threshold, setThreshold] = useState("");

  const resetForm = () => {
    setAlertName("");
    setStockSymbol("");
    setAlertType("Price");
    setCondition("Greater than");
    setThreshold("");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating alert:", { alertName, stockSymbol, alertType, condition, threshold });
    setOpen(false);
    resetForm();
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty, or numbers with up to 2 decimal places
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setThreshold(val);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition-all border border-slate-700 h-auto shadow-[0_0_15px_rgba(0,0,0,0.2)]"
        >
          <BellPlus className="w-4 h-4" />
          Add Alert
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-slate-800 rounded-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-5 pb-4 border-b border-slate-800/60">
          <DialogTitle className="text-xl font-bold text-slate-100">
            Create Alert
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            Set up a new alert to get notified when conditions are met.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="flex flex-col">
          <div className="p-5 flex flex-col gap-4">
            {/* Alert Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Alert Name</label>
              <input
                type="text"
                required
                value={alertName}
                onChange={(e) => setAlertName(e.target.value)}
                placeholder="e.g. AAPL Target"
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
              />
            </div>

            {/* Stock Identifier */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Stock Identifier</label>
              <input
                type="text"
                required
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                placeholder="e.g. AAPL"
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
              />
            </div>

            {/* Alert Type & Condition - side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">Alert Type</label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="Price">Price</option>
                  <option value="Stock P/E">Stock P/E</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="Greater than">Greater than</option>
                  <option value="Less than">Less than</option>
                  <option value="Equal to">Equal to</option>
                </select>
              </div>
            </div>

            {/* Threshold Value */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Threshold Value</label>
              <input
                type="text"
                required
                value={threshold}
                onChange={handleThresholdChange}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
              />
            </div>
          </div>

          <DialogFooter className="p-5 pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
              Create Alert
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
