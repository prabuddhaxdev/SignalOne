"use client";

import { Bell, X } from "lucide-react";

interface SymbolPillProps {
  symbol: string;
  onRemove?: (symbol: string) => void;
  onAlert?: (symbol: string) => void;
}

export function SymbolPill({ symbol, onRemove, onAlert }: SymbolPillProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-700 hover:bg-slate-800 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-pointer group">
      <span>{symbol}</span>
      <div className="flex items-center gap-1 ml-1 opacity-70 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAlert?.(symbol);
          }}
          className="hover:text-emerald-400 transition-colors"
          title={`Add alert for ${symbol}`}
        >
          <Bell className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(symbol);
          }}
          className="hover:text-red-400 transition-colors"
          title={`Remove ${symbol}`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
