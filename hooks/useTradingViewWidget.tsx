"use client";

import { useEffect, useRef } from "react";

function coerceHeightFromConfig(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}

export function useTradingViewWidget(
  scriptUrl: string,
  config: Record<string, unknown>,
  heightProp?: number
) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;
    if (container.dataset.loaded) return;

    const resolvedHeight =
      heightProp !== undefined && Number.isFinite(heightProp)
        ? heightProp
        : coerceHeightFromConfig(config.height, 600);

    const embedConfig = { ...config, height: resolvedHeight };

    container.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${resolvedHeight}px;"></div>`;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.innerHTML = JSON.stringify(embedConfig);

    container.appendChild(script);
    container.dataset.loaded = "true";

    return () => {
      container.innerHTML = "";
      delete container.dataset.loaded;
    };
  }, [scriptUrl, config, heightProp]);

  return containerRef;
}
