/**
 * Type system — inherited from the real erapack.uk, which uses **Assistant**
 * (Google Fonts) for both headings and body. Self-hosted via next/font.
 * Space Mono is kept only for small technical/spec labels (craft accents).
 */
import { Assistant, Space_Mono } from "next/font/google";

// Single brand face for display + body (matches the live site).
export const brandFont = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ff-brand",
  display: "swap",
});

export const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});

/** All font CSS-variable classes for the <html> element. */
export const fontVariables = `${brandFont.variable} ${monoFont.variable}`;
