"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { addToWatchlist, removeFromWatchlist } from "@/lib/actions/watchlist.actions";

import { StarIcon, Trash2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// Minimal WatchlistButton implementation to satisfy page requirements.
// This component focuses on UI contract only. It toggles local state and
// calls onWatchlistChange if provided. Styling hooks match globals.css.

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = "button",
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist);

  const label = useMemo(() => {
    if (type === "icon") return added ? "" : "";
    return added ? "Remove from Watchlist" : "Add to Watchlist";
  }, [added, type]);


  // Handle adding/removing stocks from watchlist
  async function toggleWatchlist() {
    const result = added
      ? await removeFromWatchlist(symbol)
      : await addToWatchlist(symbol, company);

    if (result.success) {
      toast.success(added ? "Removed from Watchlist" : "Added to Watchlist", {
        description: `${company} ${
          added ? "removed from" : "added to"
        } your watchlist`,
      });
    }
  }

  // Debounce the toggle function to prevent rapid API calls (300ms delay)
  const debouncedToggle = useDebounce(toggleWatchlist, 300);

  // Click handler that provides optimistic UI updates
  function handleClick(e: React.MouseEvent) {
    // Prevent event bubbling and default behavior
    e.stopPropagation();
    e.preventDefault();

    const nextAdded = !added;
    setAdded(nextAdded);
    onWatchlistChange?.(symbol, nextAdded);

    if (nextAdded) {
      debouncedToggle();
    } else {
      toggleWatchlist();
    }
  }

  if (type === "icon") {
    return (
      <button
        title={
          added
            ? `Remove ${symbol.includes(":") ? symbol.split(":")[1] : symbol} from watchlist`
            : `Add ${company} to watchlist`
        }
        aria-label={
          added
            ? `Remove ${symbol.includes(":") ? symbol.split(":")[1] : symbol} from watchlist`
            : `Add ${symbol.includes(":") ? symbol.split(":")[1] : symbol} to watchlist`
        }
        className={`watchlist-icon-btn ${added ? "watchlist-icon-added" : ""}`}
        onClick={handleClick}
      >
        <StarIcon fill={added ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <button
      className={`watchlist-btn ${added ? "watchlist-remove" : ""}`}
      onClick={handleClick}
    >
      {showTrashIcon && added ? <Trash2Icon /> : null}
      <span>{label}</span>
    </button>
  );
};

export default WatchlistButton;
