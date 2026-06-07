"use client";

import React, { useState, useEffect } from "react";
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
import { formatPrice } from "@/lib/utils";
import { getStocksDetails } from "@/lib/actions/finnhub.actions";
import { createAlert } from "@/lib/actions/alert.actions";
import { toast } from "sonner";

export function CreateAlertModal({
  open,
  onOpenChange,
  symbol,
  onAlertCreated,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  symbol?: string;
  onAlertCreated?: (symbol: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [alertName, setAlertName] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [alertType, setAlertType] = useState("Price");
  const [condition, setCondition] = useState("Greater than");
  const [threshold, setThreshold] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [currentPE, setCurrentPE] = useState<string | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [exchange, setExchange] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const controlled = open !== undefined;
  const modalOpen = controlled ? open : isOpen;
  const setModalOpen = controlled
    ? (o: boolean) => {
        setIsOpen(o);
        onOpenChange?.(o);
      }
    : setIsOpen;

  useEffect(() => {
    if (symbol !== undefined) {
      setStockSymbol(symbol);
    }
  }, [symbol]);

  useEffect(() => {
    if (!modalOpen) {
      resetForm();
    }
  }, [modalOpen]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (stockSymbol) {
        try {
          const data = await getStocksDetails(stockSymbol);
          if (data) {
            setCurrentPrice(data.currentPrice);
            setCurrentPE(data.peRatio);
            setCurrency(data.currency);
            setExchange(data.exchange);
          } else {
            setCurrentPrice(null);
            setCurrentPE(null);
            setCurrency("USD");
            setExchange(null);
          }
        } catch (e) {
          setCurrentPrice(null);
          setCurrentPE(null);
          setCurrency("USD");
          setExchange(null);
        }
      } else {
        setCurrentPrice(null);
        setCurrentPE(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [stockSymbol]);

  const resetForm = () => {
    setAlertName("");
    setStockSymbol("");
    setAlertType("Price");
    setCondition("Greater than");
    setThreshold("");
    setCurrentPrice(null);
    setCurrentPE(null);
    setCurrency("USD");
    setExchange(null);
    setError(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let comparisonValue: number | null = null;
    if (alertType === "Price") {
      comparisonValue = currentPrice;
    } else if (alertType === "Stock P/E") {
      const peVal = parseFloat(currentPE || "");
      if (!isNaN(peVal)) {
        comparisonValue = peVal;
      }
    }

    if (comparisonValue === null) {
      setError(`Unable to verify current ${alertType === "Price" ? "price" : "P/E"}. Please check the symbol.`);
      return;
    }

    const threshVal = parseFloat(threshold);
    if (isNaN(threshVal)) {
      setError("Please enter a valid numeric threshold.");
      return;
    }

    const diff = Math.abs(threshVal - comparisonValue);
    const limit = comparisonValue * 0.05;

    if (diff < limit) {
      setError(`Threshold must be at least 5% away from the current ${alertType === "Price" ? "price" : "P/E"} (${comparisonValue.toFixed(2)}).`);
      return;
    }

    try {
      const conditionMap: Record<string, "ABOVE" | "BELOW"> = {
        "Greater than": "ABOVE",
        "Less than": "BELOW",
        "Equal to": "ABOVE",
      };

      const result = await createAlert({
        symbol: stockSymbol,
        targetPrice: threshVal,
        condition: conditionMap[condition] || "ABOVE",
      });

      if (result.success) {
        toast.success(`Alert created for ${stockSymbol}`);
        onAlertCreated?.(stockSymbol);
        setModalOpen(false);
        resetForm();
      } else {
        setError(result.message || "Failed to create alert");
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred");
    }
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty, or numbers with up to 2 decimal places
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setThreshold(val);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
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
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300">Threshold Value</label>
                {(alertType === "Price" ? currentPrice !== null : currentPE !== null) && (
                  <span className="text-xs text-slate-500">
                    {alertType === "Stock P/E" ? "Current stock PE:" : "Current:"} <span className="text-slate-300 font-mono">
                      {alertType === "Price"
                        ? formatPrice(currentPrice!, currency)
                        : currentPE}
                    </span>
                  </span>
                )}
              </div>
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

          {error && (
            <div className="px-5 pb-4 text-red-400 text-xs font-medium bg-red-500/10 border-t border-red-500/20 py-2">
              {error}
            </div>
          )}

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