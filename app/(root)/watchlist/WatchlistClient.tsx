"use client";

import React, { useState, useEffect } from "react";
import SearchCommand from "@/components/SearchCommand";
import { ManageSymbolsPanel } from "@/components/watchlist/ManageSymbolsPanel";
import { Loader2, Plus } from "lucide-react";
import { CreateAlertModal } from "@/components/watchlist/CreateAlertModal";
import AlertsPanel from "@/components/watchlist/AlertsPanel";
import { Suspense } from "react";
import NewsGrid from "@/components/watchlist/NewsGrid";

export default function WatchlistClient({
  initialStocks,
  watchlist,
  relevantNews,
  alerts,
}: {
  initialStocks: any[];
  watchlist: any[];
  relevantNews: any[];
  alerts: any[];
}) {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalSymbol, setAlertModalSymbol] = useState("");
  const [alertedSymbols, setAlertedSymbols] = useState<Set<string>>(new Set());

  useEffect(() => {
    const symbols = new Set(alerts.map((a: any) => a.symbol));
    setAlertedSymbols(symbols);
  }, [alerts]);

  const handleOpenAlertModal = (symbol: string) => {
    setAlertModalSymbol(symbol);
    setAlertModalOpen(true);
  };

  const addAlertedSymbol = (symbol: string) => {
    setAlertedSymbols((prev) => new Set(prev).add(symbol));
  };

  const removeAlertedSymbol = (symbol: string) => {
    setAlertedSymbols((prev) => {
      const next = new Set(prev);
      next.delete(symbol);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#06080c] text-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 mb-10 md:mb-20">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Watchlist</h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              Track your favorite stocks and manage alerts.
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="inline-flex gap-3">
              <SearchCommand
                initialStocks={initialStocks}
                renderAs="button"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] h-auto border-none"
                label={
                  (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Stock
                    </>
                  ) as unknown as string
                }
              />
              <CreateAlertModal
                open={alertModalOpen}
                onOpenChange={setAlertModalOpen}
                symbol={alertModalSymbol}
                onAlertCreated={addAlertedSymbol}
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Symbols and News */}
          <div className="col-span-1 lg:col-span-3 space-y-8">
            <div className="w-full">
              <ManageSymbolsPanel
                initialData={watchlist}
                onOpenAlertModal={handleOpenAlertModal}
                alertedSymbols={alertedSymbols}
                addAlertedSymbol={addAlertedSymbol}
                removeAlertedSymbol={removeAlertedSymbol}
              />
            </div>

            <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin text-gray-500" /></div>}>
              <NewsGrid news={relevantNews} />
            </Suspense>
          </div>

          {/* Right Column: Alerts Panel */}
          <div className="col-span-1 lg:col-span-1">
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
      </div>
    </div>
  );
}