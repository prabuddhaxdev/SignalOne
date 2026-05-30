import { searchStocks } from "@/lib/actions/finnhub.actions";
import SearchCommand from "@/components/SearchCommand";
import { ManageSymbolsPanel } from "@/components/watchlist/ManageSymbolsPanel";
import { Plus } from "lucide-react";
import { getWatchlistWithData } from "@/lib/actions/getWatchlistWithData.actions";

export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  const initialStocks = await searchStocks();
  const watchlist = await getWatchlistWithData();

  return (
    <div className="min-h-screen bg-[#06080c] text-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Watchlist</h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              Track your favorite stocks and manage alerts.
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="inline-flex">
              <SearchCommand
                initialStocks={initialStocks}
                renderAs="button"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] h-auto border-none"
                label={
                  (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Stock
                    </>
                  ) as unknown as string
                }
              />
            </div>
          </div>
        </div>

        {/* Main Watchlist Container */}
        <div className="w-full">
          <ManageSymbolsPanel initialData={watchlist} />
        </div>

      </div>
    </div>
  );
}
