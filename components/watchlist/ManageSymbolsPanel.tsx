"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownUp } from "lucide-react";
import { PremiumWatchlistTable } from "./PremiumWatchlistTable";
import { getWatchlistWithData } from "@/lib/actions/getWatchlistWithData.actions";

const SORT_OPTIONS = [
  { label: "A → Z", value: "symbol-asc" },
  { label: "Z → A", value: "symbol-desc" },
  { label: "Highest Gainers", value: "changePercent-desc" },
  { label: "Highest Losers", value: "changePercent-asc" },
  { label: "Change % Asc", value: "changePercent-asc" },
  { label: "Change % Desc", value: "changePercent-desc" },
];

export function ManageSymbolsPanel({ initialData }: { initialData: any[] }) {
  const [stocks, setStocks] = useState(initialData || []);
  const [sortValue, setSortValue] = useState("symbol-asc");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    setStocks(initialData || []);
  }, [initialData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedData = await getWatchlistWithData();
        setStocks(updatedData);
      } catch (error) {
        console.error("Failed to sync watchlist:", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAlert = (symbol: string) => {
    // Add alert logic
    console.log(`Alert triggered for ${symbol}`);
  };

  const sortConfig = React.useMemo(() => {
    const [key, direction] = sortValue.split("-");
    return { key, direction: direction as "asc" | "desc" };
  }, [sortValue]);

  return (
    <div className="bg-[#0b0e14] border border-slate-800/60 rounded-xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-sm">
      {/* Header Row */}
      <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-slate-200 font-semibold text-sm tracking-wide">
            MANAGE SYMBOLS
          </h3>
          <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full font-medium">
            {stocks.length}
          </span>
        </div>

        {/* Sort Control */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors bg-transparent border border-transparent hover:border-slate-800 rounded-md px-3 py-1.5"
          >
            <ArrowDownUp className="w-4 h-4" />
            <span>Sort</span>
          </button>

          {isSortOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsSortOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-48 bg-[#131722] border border-slate-800 rounded-lg shadow-xl z-50 py-1 overflow-hidden">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value + option.label}
                    onClick={() => {
                      setSortValue(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-800 ${
                      sortValue === option.value
                        ? "text-emerald-400 bg-slate-800/50"
                        : "text-slate-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="p-0 sm:p-2 md:p-4">
        <PremiumWatchlistTable data={stocks} sortConfig={sortConfig} onAlert={handleAlert} />
      </div>
    </div>
  );
}
