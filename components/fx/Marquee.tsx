"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Seamless CSS marquee. Content is rendered twice inside one animated track;
 * translating the track by -50% shifts it exactly one copy → no seam.
 * Pauses under prefers-reduced-motion (handled in globals.css).
 */
export default function Marquee({
  children,
  duration = 26,
  gap = "3rem",
  className = "",
  reverse = false,
}: {
  children: ReactNode;
  duration?: number;
  gap?: string;
  className?: string;
  reverse?: boolean;
}) {
  const trackStyle = {
    "--marquee-duration": `${duration}s`,
    gap,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  const copyStyle = { gap, paddingRight: gap } as CSSProperties;

  return (
    <div className={`relative flex w-full overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex shrink-0 items-center"
        style={trackStyle}
      >
        <span className="flex shrink-0 items-center" style={copyStyle}>
          {children}
        </span>
        <span
          className="flex shrink-0 items-center"
          style={copyStyle}
          aria-hidden
        >
          {children}
        </span>
      </div>
    </div>
  );
}
