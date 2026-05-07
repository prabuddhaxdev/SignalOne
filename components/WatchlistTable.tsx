"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
} from "./ui/table";
import { Button } from "./ui/button";
import WatchlistButton from "./WatchlistButton";
import { createAlertAction, removeAlertAction } from "@/lib/actions/alert.actions";

export function WatchlistTable({ watchlist }: WatchlistTableProps) {
  const router = useRouter();
  const [alertedSymbols, setAlertedSymbols] = useState<Set<string>>(new Set());

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
          {watchlist.map((item, index) => {
            const isAlerted = alertedSymbols.has(item.symbol);
            
            return (
              <TableRow
                key={item.symbol + index}
                className="table-row"
                onClick={() =>
                  router.push(`/stocks/${encodeURIComponent(item.symbol)}`)
                }
              >
                <TableCell className="pl-4 table-cell">{item.company}</TableCell>

                <TableCell className="table-cell">{item.symbol}</TableCell>

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
