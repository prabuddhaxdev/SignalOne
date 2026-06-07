"use client";

import React, { useState } from "react";
import { BellPlus, BellRing, BellOff, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeFromWatchlist } from "@/lib/actions/watchlist.actions";
import { deleteAlertBySymbol } from "@/lib/actions/alert.actions";
import { formatPrice } from "@/lib/utils";

interface PremiumWatchlistTableProps {
  data: any[];
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
  onAlert?: (symbol: string) => void;
  onRemoveFromWatchlist?: (symbol: string) => void;
  alertedSymbols: Set<string>;
  addAlertedSymbol: (symbol: string) => void;
  removeAlertedSymbol: (symbol: string) => void;
}

export function PremiumWatchlistTable({
  data,
  sortConfig,
  onAlert,
  onRemoveFromWatchlist,
  alertedSymbols,
  addAlertedSymbol,
  removeAlertedSymbol,
}: PremiumWatchlistTableProps) {
  const router = useRouter();
  const [removedSymbols, setRemovedSymbols] = useState<Set<string>>(new Set());

  const toggleAlert = async (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (alertedSymbols.has(symbol)) {
      toast.promise(
        deleteAlertBySymbol(symbol),
        {
          loading: "Removing alert...",
          success: (data) => {
            if (data.success) {
              removeAlertedSymbol(symbol);
              return `Alert removed for ${symbol}`;
            }
            throw new Error(data.message);
          },
          error: (err) => err.message || "Failed to remove alert",
        }
      );
    } else {
      if (onAlert) {
        onAlert(symbol);
      }
    }
  };

  const handleRemoveFromWatchlist = async (
    symbol: string,
    company: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setRemovedSymbols((prev) => new Set(prev).add(symbol));
    toast.promise(removeFromWatchlist(symbol), {
      loading: "Removing from watchlist...",
      success: (data) => {
        if (data.success) {
          onRemoveFromWatchlist?.(symbol);
          router.refresh();
          return `${company} removed from watchlist`;
        }
        throw new Error(data.message);
      },
      error: (err) => err.message || "Failed to remove from watchlist",
    });
  };

  const sortedData = React.useMemo(() => {
    const filteredData = data.filter(
      (item) => !removedSymbols.has(item.symbol),
    );
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const { key, direction } = sortConfig;
      let aVal: any = a[key];
      let bVal: any = b[key];

      if (
        key === "changePercent" ||
        key === "change" ||
        key === "currentPrice"
      ) {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else if (key === "symbol") {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, removedSymbols]);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-slate-400">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-medium text-slate-200 mb-1">
          Your watchlist is empty
        </h3>
        <p className="text-sm">Add stocks to start tracking.</p>
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-slate-400">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-medium text-slate-200 mb-1">
          All symbols removed
        </h3>
        <p className="text-sm">Refresh to see your watchlist again.</p>
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
              <th className="py-3 px-4 w-[5%]"></th>
              <th className="py-3 px-4 w-[15%]">Name</th>
              <th className="py-3 px-4 text-right">Value</th>
              <th className="py-3 px-4 text-right">Change</th>
              <th className="py-3 px-4 text-right">Chg%</th>
              <th className="py-3 px-4 text-right">P/E</th>
              <th className="py-3 px-4 text-right">Prev</th>
              <th className="py-3 px-4 text-right w-[100px]"></th>
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
                    <button
                      onClick={(e) =>
                        handleRemoveFromWatchlist(
                          stock.symbol,
                          stock.company || stock.symbol,
                          e,
                        )
                      }
                      className="text-yellow-400 hover:text-red-400 transition-colors"
                      title="Remove from watchlist"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">
                      {stock.symbol}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="font-medium text-slate-100">
                      {stock.currentPrice !== undefined ? formatPrice(stock.currentPrice, stock.currency) : "0.00"}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div
                      className={cn(
                        "font-medium flex items-center justify-end gap-1",
                        isPositive ? "text-emerald-400" : "text-red-400",
                      )}
                    >
                      {stock.change > 0 ? "+" : ""}
                      {stock.change !== undefined ? formatPrice(stock.change, stock.currency) : "0.00"}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div
                      className={cn(
                        "font-medium",
                        isPositive ? "text-emerald-400" : "text-red-400",
                      )}
                    >
                      {stock.changePercent > 0 ? "+" : ""}
                      {stock.changePercent?.toFixed(2) || "0.00"}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-sm text-slate-300">
                      {stock.peRatio || "—"}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-sm text-slate-400">
                      {stock.prev !== undefined ? formatPrice(stock.prev, stock.currency) : "0.00"}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => toggleAlert(stock.symbol, e)}
                      className={cn(
                        "group inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border w-[115px]",
                        alertedSymbols.has(stock.symbol)
                          ? "bg-yellow-500 border-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 hover:shadow-none"
                          : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300",
                      )}
                    >
                      {alertedSymbols.has(stock.symbol) ? (
                        <>
                          <BellRing className="w-3.5 h-3.5 group-hover:hidden" />
                          <BellOff className="w-3.5 h-3.5 hidden group-hover:block" />
                          <span className="group-hover:hidden">Active</span>
                          <span className="hidden group-hover:block">
                            Remove
                          </span>
                        </>
                      ) : (
                        <>
                          <BellPlus className="w-3.5 h-3.5" />
                          <span className="whitespace-nowrap">Add Alert</span>
                        </>
                      )}
                    </button>
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) =>
                      handleRemoveFromWatchlist(
                        stock.symbol,
                        stock.company || stock.symbol,
                        e,
                      )
                    }
                    className="text-yellow-400 hover:text-red-400 transition-colors"
                    title="Remove from watchlist"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                  <div className="font-semibold text-lg text-slate-200">
                    {stock.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-100 text-lg">
                    {stock.currentPrice !== undefined ? formatPrice(stock.currentPrice, stock.currency) : "0.00"}
                  </div>
                  <div
                    className={cn(
                      "text-sm font-medium flex items-center justify-end gap-1",
                      isPositive ? "text-emerald-400" : "text-red-400",
                    )}
                  >
                    {stock.changePercent > 0 ? "+" : ""}
                    {stock.changePercent?.toFixed(2) || "0.00"}%
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 border-t border-slate-800/50 pt-2">
                <div>
                  <span className="text-slate-500">P/E: </span>
                  <span className="text-slate-300 ml-1">
                    {stock.peRatio || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Prev: </span>
                  <span className="text-slate-300 ml-1">
                    {stock.prev !== undefined ? formatPrice(stock.prev, stock.currency) : "0.00"}
                  </span>
                </div>
              </div>
              <div className="border-t border-slate-800/50 pt-3 flex justify-end">
                <button
                  onClick={(e) => toggleAlert(stock.symbol, e)}
                  className={cn(
                    "group inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors border w-full sm:w-[125px]",
                    alertedSymbols.has(stock.symbol)
                      ? "bg-yellow-500 border-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 hover:shadow-none"
                      : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300",
                  )}
                >
                  {alertedSymbols.has(stock.symbol) ? (
                    <>
                      <BellRing className="w-4 h-4 group-hover:hidden" />
                      <BellOff className="w-4 h-4 hidden group-hover:block" />
                      <span className="group-hover:hidden">Active</span>
                      <span className="hidden group-hover:block">
                        Remove Alert
                      </span>
                    </>
                  ) : (
                    <>
                      <BellPlus className="w-4 h-4" />
                      <span className="whitespace-nowrap">Add Alert</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
