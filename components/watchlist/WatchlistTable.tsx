"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WATCHLIST_TABLE_HEADER } from "@/lib/constants";
import { cn, getChangeColorClass } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import WatchlistButton from "@/components/WatchlistButton";
import { createAlertAction, removeAlertAction } from "@/lib/actions/alert.actions";

export function WatchlistTable({ watchlist }: WatchlistTableProps) {
  const router = useRouter();
  const [removedSymbols, setRemovedSymbols] = useState<Set<string>>(new Set());
  const [alertedSymbols, setAlertedSymbols] = useState<Set<string>>(new Set());

  // Filter the watchlist based on local pending removals
  const displayWatchlist = watchlist.filter((item) => !removedSymbols.has(item.symbol));

  useEffect(() => {
    // Synchronize removedSymbols with the actual watchlist from the server.
    // If an item is no longer in the server-side watchlist, we can stop tracking its removal locally.
    setRemovedSymbols((prev) => {
      if (prev.size === 0) return prev;
      const serverSymbols = new Set(watchlist.map((item) => item.symbol));
      const next = new Set(prev);
      let changed = false;
      prev.forEach((symbol) => {
        if (!serverSymbols.has(symbol)) {
          next.delete(symbol);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [watchlist]);

  const handleWatchlistChange = (symbol: string, isAdded: boolean) => {
    if (!isAdded) {
      setRemovedSymbols((prev) => new Set(prev).add(symbol));
    } else {
      setRemovedSymbols((prev) => {
        const next = new Set(prev);
        next.delete(symbol);
        return next;
      });
    }
  };

  const handleAddAlert = async (e: React.MouseEvent, item: StockWithData) => {
    e.stopPropagation();

    toast.promise(
      createAlertAction({
        symbol: item.symbol,
        company: item.company,
        threshold: item.currentPrice || 0,
        alertType: "upper",
      }),
      {
        loading: "Adding alert...",
        success: (data) => {
          if (data.success) {
            setAlertedSymbols((prev) => new Set(prev).add(item.symbol));
            return `Alert added for ${item.symbol}`;
          }
          throw new Error(data.message);
        },
        error: (err) => err.message || "Failed to add alert",
      }
    );
  };

  const handleRemoveAlert = async (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation();

    toast.promise(
      removeAlertAction({ symbol }),
      {
        loading: "Removing alert...",
        success: (data) => {
          if (data.success) {
            setAlertedSymbols((prev) => {
              const next = new Set(prev);
              next.delete(symbol);
              return next;
            });
            return `Alert removed for ${symbol}`;
          }
          throw new Error(data.message);
        },
        error: (err) => err.message || "Failed to remove alert",
      }
    );
  };

  return (
    <>
      <Table className="scrollbar-hide-default watchlist-table">
        <TableHeader>
          <TableRow className="table-header-row">
            {WATCHLIST_TABLE_HEADER.map((label) => (
              <TableHead className="table-header" key={label}>
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {displayWatchlist.map((item, index) => {
            const isAlerted = alertedSymbols.has(item.symbol);

            return (
              <TableRow
                key={item.symbol + index}
                className="table-row"
                onClick={() => {
                  const symbolOnly = item.symbol.includes(":") ? item.symbol.split(":")[1] : item.symbol;
                  router.push(`/stocks/${encodeURIComponent(symbolOnly)}`);
                }}
              >
                <TableCell className="pl-4 table-cell">{item.company}</TableCell>

                <TableCell className="table-cell">{item.symbol.replace(":", " : ")}</TableCell>

                <TableCell className="table-cell">
                  {item.priceFormatted || "—"}
                </TableCell>

                <TableCell
                  className={cn(
                    "table-cell",
                    getChangeColorClass(item.changePercent)
                  )}
                >
                  {item.changeFormatted || "—"}
                </TableCell>

                <TableCell className="table-cell">
                  {item.marketCap || "—"}
                </TableCell>

                <TableCell className="table-cell">
                  {item.peRatio || "—"}
                </TableCell>

                <TableCell>
                  <Button
                    variant={isAlerted ? "outline" : "default"}
                    className={cn(
                      "add-alert transition-all duration-300",
                      isAlerted && "border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:border-red-500/30"
                    )}
                    onClick={(e) => isAlerted ? handleRemoveAlert(e, item.symbol) : handleAddAlert(e, item)}
                  >
                    {isAlerted ? "Remove Alert" : "Add Alert"}
                  </Button>
                </TableCell>

                <TableCell onClick={(e) => e.stopPropagation()}>
                  <WatchlistButton
                    symbol={item.symbol}
                    company={item.company}
                    isInWatchlist={true}
                    showTrashIcon={true}
                    type="icon"
                    onWatchlistChange={handleWatchlistChange}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
