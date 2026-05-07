"use client";

import { useRouter } from "next/navigation";
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
import { createAlertAction } from "@/lib/actions/alert.actions";

export function WatchlistTable({ watchlist }: WatchlistTableProps) {
  const router = useRouter();

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
          if (data.success) return `Alert added for ${item.symbol}`;
          throw new Error(data.message);
        },
        error: (err) => err.message || "Failed to add alert",
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
          {watchlist.map((item, index) => (
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
                  className="add-alert"
                  onClick={(e) => handleAddAlert(e, item)}
                >
                  Add Alert
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
          ))}
        </TableBody>
      </Table>
    </>
  );
}
