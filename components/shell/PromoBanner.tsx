"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { usePersistentFlag } from "@/lib/useMediaQuery";

const KEY = "erapack:promo-dismissed";

/**
 * Thin espresso strip at the very top. Dismissible (remembered in
 * localStorage). Scrolls away with the page — only the nav sticks.
 */
export default function PromoBanner() {
  const persisted = usePersistentFlag(KEY);
  const [justDismissed, setJustDismissed] = useState(false);

  if (persisted || justDismissed) return null;

  return (
    <div className="bg-ink text-paper relative z-40">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center px-10 py-2">
        <p className="eyebrow !text-paper/90 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>Free UK shipping over £100</span>
          <span className="text-clay-glow hidden sm:inline">✳</span>
          <span className="hidden sm:inline">Low / no minimum order</span>
          <span className="text-clay-glow hidden md:inline">✳</span>
          <span className="hidden md:inline">2–3 day turnaround</span>
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* localStorage unavailable */
            }
            setJustDismissed(true);
          }}
          aria-label="Dismiss announcement"
          className="text-paper/70 hover:bg-paper/10 hover:text-paper absolute right-3 grid h-7 w-7 place-items-center rounded-full transition-colors duration-200 ease-out"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
