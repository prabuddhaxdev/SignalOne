import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import { WatchlistItem } from "@/database/models/watchlist.model";
import { searchStocks, getStocksDetails } from "@/lib/actions/finnhub.actions";
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
import SearchCommand from "@/components/SearchCommand";

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  const initialStocks = await searchStocks();

  const stockData = await getStocksDetails(symbol.toUpperCase());
  const watchlist = await getUserWatchlist();

  const isInWatchlist = watchlist.some(
    (item: WatchlistItem) => item.symbol === symbol.toUpperCase()
  );

  if (!stockData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
        <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">No data related to this stocks exists</h2>
        <p className="text-gray-500 text-center max-w-md">
          We couldn't find any information for "{symbol.toUpperCase()}". This symbol might be delisted, entered incorrectly or currently not available due to exchange restrictions.
        </p>
        <div className="mt-4">
           <SearchCommand label="Search another stock" initialStocks={initialStocks}/>
        </div>
      </div>
    );
  }

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
          scriptUrl={`${scriptUrl}financials.js`}
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(tvSymbol)}
          height={1000}
        />
      </section>
    </div>
  );
}
