"use client";

import React from "react";
import TradingViewWidget from "@/components/TradingViewWidget";
import {

  CRYPTO_HEATMAP_WIDGET_CONFIG,
  FOREX_WIDGET_CONFIG,
} from "@/lib/constants";

const GlobalMarkets = () => {
  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className="space-y-12 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Global Markets
        </h1>
        <p className="text-gray-400">
          Real-time market data and heatmaps for crypto and forex.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 items-start">
        <div className="w-full">
          <TradingViewWidget
            title="Forex Cross Rates"
            scriptUrl={`${scriptUrl}forex-cross-rates.js`}
            height={600}
            config={FOREX_WIDGET_CONFIG}
          />
        </div>

        <div className="w-full">
          <TradingViewWidget
            title="Crypto Coins Heatmap"
            scriptUrl={`${scriptUrl}crypto-coins-heatmap.js`}
            height={1000}
            config={CRYPTO_HEATMAP_WIDGET_CONFIG}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalMarkets;