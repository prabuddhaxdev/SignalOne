
import TradingViewWidget from "@/components/TradingViewWidget";
import { TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";

const NewsPage = () => {
  const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-100 tracking-tight">Market News</h1>
        <p className="text-gray-500 text-lg">
          Stay ahead of the market with real-time top stories and financial news.
        </p>
      </div>

      <div className="w-full rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl transition-all duration-300 hover:border-gray-600/50">
        <TradingViewWidget
          scriptUrl={scriptUrl}
          config={TOP_STORIES_WIDGET_CONFIG}
          height={450}
          className="p-1"
        />
      </div>
    </div>
  );
};

export default NewsPage;
