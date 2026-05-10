/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { getDateRange, validateArticle, formatArticle, formatMarketCapValue, formatChangePercent, formatPrice } from "@/lib/utils";
import { POPULAR_STOCK_SYMBOLS } from "@/lib/constants";
import { cache } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getWatchlistSymbolsByEmail } from "./watchlist.actions";
import { auth } from "../better-auth/auth";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const NEXT_PUBLIC_FINNHUB_API_KEY =
  process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? "";

async function fetchJSON<T>(
  url: string,
  revalidateSeconds?: number
): Promise<T> {
  const options: RequestInit & { next?: { revalidate?: number } } =
    revalidateSeconds
      ? { cache: "force-cache", next: { revalidate: revalidateSeconds } }
      : { cache: "no-store" };

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export { fetchJSON };

export async function getNews(
  symbols?: string[]
): Promise<MarketNewsArticle[]> {
  try {
    const range = getDateRange(5);
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      throw new Error("FINNHUB API key is not configured");
    }
    const cleanSymbols = (symbols || [])
      .map((s) => s?.trim().toUpperCase())
      .filter((s): s is string => Boolean(s));

    const maxArticles = 6;

    // If we have symbols, try to fetch company news per symbol and round-robin select
    if (cleanSymbols.length > 0) {
      const perSymbolArticles: Record<string, RawNewsArticle[]> = {};

      await Promise.all(
        cleanSymbols.map(async (sym) => {
          try {
            const url = `${FINNHUB_BASE_URL}/company-news?symbol=${encodeURIComponent(
              sym
            )}&from=${range.from}&to=${range.to}&token=${token}`;
            const articles = await fetchJSON<RawNewsArticle[]>(url, 300);
            perSymbolArticles[sym] = (articles || []).filter(validateArticle);
          } catch (e) {
            console.error("Error fetching company news for", sym, e);
            perSymbolArticles[sym] = [];
          }
        })
      );

      const collected: MarketNewsArticle[] = [];
      // Round-robin up to 6 picks
      for (let round = 0; round < maxArticles; round++) {
        for (let i = 0; i < cleanSymbols.length; i++) {
          const sym = cleanSymbols[i];
          const list = perSymbolArticles[sym] || [];
          if (list.length === 0) continue;
          const article = list.shift();
          if (!article || !validateArticle(article)) continue;
          collected.push(formatArticle(article, true, sym, round));
          if (collected.length >= maxArticles) break;
        }
        if (collected.length >= maxArticles) break;
      }

      if (collected.length > 0) {
        // Sort by datetime desc
        collected.sort((a, b) => (b.datetime || 0) - (a.datetime || 0));
        return collected.slice(0, maxArticles);
      }
      // If none collected, fall through to general news
    }

    // General market news fallback or when no symbols provided
    const generalUrl = `${FINNHUB_BASE_URL}/news?category=general&token=${token}`;
    const general = await fetchJSON<RawNewsArticle[]>(generalUrl, 300);

    const seen = new Set<string>();
    const unique: RawNewsArticle[] = [];
    for (const art of general || []) {
      if (!validateArticle(art)) continue;
      const key = `${art.id}-${art.url}-${art.headline}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(art);
      if (unique.length >= 20) break; // cap early before final slicing
    }

    const formatted = unique
      .slice(0, maxArticles)
      .map((a, idx) => formatArticle(a, false, undefined, idx));
    return formatted;
  } catch (err) {
    console.error("getNews error:", err);
    throw new Error("Failed to fetch news");
  }
}

export const searchStocks = cache(
  async (query?: string): Promise<StockWithWatchlistStatus[]> => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user) redirect("/sign-in");

      const userWatchlistSymbols = await getWatchlistSymbolsByEmail(
        session.user.email
      );

      const trimmed = typeof query === "string" ? query.trim() : "";

      const filter = trimmed
        ? [
            { left: "name", operation: "match", right: trimmed },
            { left: "type", operation: "in_range", right: ["stock", "dr", "fund"] }
          ]
        : [
            { left: "type", operation: "in_range", right: ["stock", "dr"] },
            { left: "exchange", operation: "in_range", right: ["NASDAQ", "NYSE"] }
          ];

      const body = {
        filter,
        columns: ["name", "description", "exchange", "type"],
        sort: { sortBy: trimmed ? "Value.Traded" : "market_cap_basic", sortOrder: "desc" },
        range: [0, 15]
      };

      const res = await fetch("https://scanner.tradingview.com/global/scan", {
        method: "POST",
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Scanner API failed");

      const data = await res.json();
      const results = Array.isArray(data?.data) ? data.data : [];

      const mapped: StockWithWatchlistStatus[] = results.map((r: any) => {
        const fullSymbol = r.s; // e.g. "NASDAQ:AAPL"
        const [ticker, name, exchange, type] = r.d;

        const isInWatchlist = userWatchlistSymbols.some((w: string) => {
          const u = w.toUpperCase();
          const cleanU = u.replace(/\.(NS|BO)$/, '');
          return u === ticker || u === fullSymbol || fullSymbol.endsWith(`:${u}`) || fullSymbol.endsWith(`:${cleanU}`);
        });

        return {
          symbol: ticker, // Return only the ticker for cleaner URLs
          name: name || ticker,
          exchange: exchange || "US",
          type: type || "Stock",
          isInWatchlist,
        };
      });

      return mapped;
    } catch (err) {
      console.error("Error in stock search:", err);
      return [];
    }
  }
);

export const getStocksDetails = cache(async (symbol: string) => {
  const cleanSymbol = symbol.trim().toUpperCase();

  try {
    let body;
    if (cleanSymbol.includes(":")) {
      body = {
        symbols: { tickers: [cleanSymbol] },
        columns: ["name", "description", "exchange", "close", "change", "market_cap_basic", "price_earnings_ttm", "currency"]
      };
    } else {
      let searchTicker = cleanSymbol;
      if (cleanSymbol.endsWith(".NS")) searchTicker = cleanSymbol.replace(".NS", "");
      if (cleanSymbol.endsWith(".BO")) searchTicker = cleanSymbol.replace(".BO", "");

      body = {
        filter: [{ left: "name", operation: "equal", right: searchTicker }],
        columns: ["name", "description", "exchange", "close", "change", "market_cap_basic", "price_earnings_ttm", "currency"],
        sort: { sortBy: "Value.Traded", sortOrder: "desc" },
        range: [0, 1]
      };
    }

    const res = await fetch("https://scanner.tradingview.com/global/scan", {
      method: "POST",
      body: JSON.stringify(body)
    });

    if (!res.ok) return null;

    const data = await res.json();
    const result = data?.data?.[0];

    if (!result) return null;

    const [ticker, name, exchange, close, change, marketCap, peRatio, currency] = result.d;

    return {
      symbol: result.s,
      company: name || ticker,
      exchange: exchange || "US",
      currentPrice: close || 0,
      changePercent: change || 0,
      priceFormatted: formatPrice(close || 0, currency || "USD"),
      changeFormatted: formatChangePercent(change || 0),
      peRatio: peRatio?.toFixed(1) || "—",
      marketCapFormatted: formatMarketCapValue(marketCap || 0, currency || "USD"),
      currency: currency || "USD",
    };
  } catch (error) {
    console.error(`Error fetching details for ${cleanSymbol}:`, error);
    return null;
  }
});
