/**
 * Type system — loaded via next/font (self-hosted, no external requests).
 *
 * Display : Fraunces        — editorial "old-style" serif with optical size,
 *                              SOFT + WONK axes. Warm, characterful, artisanal.
 * Sans    : Hanken Grotesk  — humanist grotesque for body. Readable, not Inter.
 * Mono    : Space Mono      — technical eyebrows / spec labels / the "factory"
 *                              register (counters, kickers, ledger rows).
 */
import { Fraunces, Hanken_Grotesk, Space_Mono } from "next/font/google";

export const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
  style: ["normal", "italic"],
});

export const sansFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

export const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});

/** Convenience: all font CSS-variable classes for the <html> element. */
export const fontVariables = `${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`;
