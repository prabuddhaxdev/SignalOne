import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import { WatchlistItem } from "@/database/models/watchlist.model";
import { getStocksDetails } from "@/lib/actions/finnhub.actions";
import { getUserWatchlist } from "@/lib/actions/watchlist.actions";
import { toTradingViewSymbol } from "@/lib/utils";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  SYMBOL_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  const stockData = await getStocksDetails(symbol.toUpperCase());
  const watchlist = await getUserWatchlist();

  const isInWatchlist = watchlist.some(
    (item: WatchlistItem) => item.symbol === symbol.toUpperCase()
  );

  if (!stockData) notFound();

  const tvSymbol = toTradingViewSymbol(symbol, (stockData as any).exchange);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={450}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={450}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <WatchlistButton
              symbol={symbol}
              company={stockData.company}
              isInWatchlist={isInWatchlist}
              type="button"
            />
          </div>

          <TradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-profile.js`}
            config={SYMBOL_PROFILE_WIDGET_CONFIG(tvSymbol)}
            height={600}
          />
        </div>
      </section>

      <section className="mt-10 w-full">
        <TradingViewWidget
          title="Financial Statements (Income, Balance Sheet, Cash Flow)"
          scriptUrl={`${scriptUrl}financials.js`}
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(tvSymbol)}
          height={1000}
        />
      </section>
    </div>
  );
}
