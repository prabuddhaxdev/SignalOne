"use client";

import React, { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PremiumWatchlistTableProps {
  data: any[];
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
}

export function PremiumWatchlistTable({ data, sortConfig }: PremiumWatchlistTableProps) {
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const { key, direction } = sortConfig;
      let aVal: any = a[key];
      let bVal: any = b[key];

      if (key === 'changePercent' || key === 'change' || key === 'currentPrice') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else if (key === 'symbol') {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-slate-400">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-medium text-slate-200 mb-1">Your watchlist is empty</h3>
        <p className="text-sm">Add stocks to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop & Tablet Table */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-medium text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 w-[20%]">Name</th>
              <th className="py-3 px-4 text-right">Value</th>
              <th className="py-3 px-4 text-right">Change</th>
              <th className="py-3 px-4 text-right">Chg%</th>
              <th className="py-3 px-4 text-right">OHLC</th>
              <th className="py-3 px-4 text-right">Prev</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((stock) => {
              const isPositive = stock.change >= 0;
              return (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={stock.symbol}
                  className="group border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">{stock.symbol}</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="font-medium text-slate-100">{stock.currentPrice?.toFixed(2) || "0.00"}</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className={cn("font-medium flex items-center justify-end gap-1", isPositive ? "text-emerald-400" : "text-red-400")}>
                      {stock.change > 0 ? "+" : ""}{stock.change?.toFixed(2) || "0.00"}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className={cn("font-medium", isPositive ? "text-emerald-400" : "text-red-400")}>
                      {stock.changePercent > 0 ? "+" : ""}{stock.changePercent?.toFixed(2) || "0.00"}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-[10px] sm:text-xs text-slate-500 font-mono flex flex-col items-end leading-tight">
                      <div><span className="text-slate-600">O</span> {stock.ohlc?.o?.toFixed(2) || "0.00"} <span className="text-slate-600 ml-1">H</span> {stock.ohlc?.h?.toFixed(2) || "0.00"}</div>
                      <div><span className="text-slate-600">L</span> {stock.ohlc?.l?.toFixed(2) || "0.00"} <span className="text-slate-600 ml-1">C</span> {stock.ohlc?.c?.toFixed(2) || "0.00"}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-sm text-slate-400">{stock.prev?.toFixed(2) || "0.00"}</div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden flex flex-col gap-3">
        {sortedData.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={stock.symbol}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div className="font-semibold text-lg text-slate-200">{stock.symbol}</div>
                <div className="text-right">
                  <div className="font-medium text-slate-100 text-lg">{stock.currentPrice?.toFixed(2) || "0.00"}</div>
                  <div className={cn("text-sm font-medium flex items-center justify-end gap-1", isPositive ? "text-emerald-400" : "text-red-400")}>
                    {stock.changePercent > 0 ? "+" : ""}{stock.changePercent?.toFixed(2) || "0.00"}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 border-t border-slate-800/50 pt-2">
                <div>
                  <span className="text-slate-500">Prev</span> <span className="text-slate-300 ml-1">{stock.prev?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="text-right font-mono flex gap-2 justify-end">
                  <span>O:{stock.ohlc?.o?.toFixed(1) || "0.0"}</span>
                  <span>H:{stock.ohlc?.h?.toFixed(1) || "0.0"}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
