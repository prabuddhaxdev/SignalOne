import { getNews, searchStocks, getStocksDetails } from "@/lib/actions/finnhub.actions";
import { getWatchlistWithData } from "@/lib/actions/getWatchlistWithData.actions";
import { getUserWatchlist } from "@/lib/actions/watchlist.actions";
import { getUserAlerts } from "@/lib/actions/alert.actions";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import WatchlistClient from "./WatchlistClient";

export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const userId = session.user.id;

  // Parallel data fetching
  const [watchlistItems, rawAlerts, news] = await Promise.all([
    getUserWatchlist(userId),
    getUserAlerts(userId),
    getNews() // Initial news fetch
  ]);

  const alerts = await Promise.all(
    rawAlerts.map(async (alert: any) => {
      const details = await getStocksDetails(alert.symbol);
      return {
        ...alert,
        currency: details?.currency || "USD",
        logo: details?.logo,
      };
    })
  );

  const initialStocks = await searchStocks();
  const watchlist = await getWatchlistWithData();

  const watchlistSymbols = watchlistItems.map((item: any) => item.symbol);

  // Fallback news if watchlist has items
  const relevantNews = watchlistSymbols.length > 0 ? await getNews(watchlistSymbols) : news;

  return (
    <WatchlistClient
      initialStocks={initialStocks}
      watchlist={watchlist}
      relevantNews={relevantNews || []}
      alerts={alerts}
    />
  );
}