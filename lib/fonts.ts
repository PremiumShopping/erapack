/**
 * Type system. Assistant (from the live erapack.uk) stays the body/UI
 * workhorse. A UK print-shop voice is layered on top:
 *   - Bricolage Grotesque — the display face (headlines), real weight/width.
 *   - Fraunces — an editorial serif used sparingly, in italic, for emphasis.
 *   - Space Mono — SKU / spec / ledger rows only.
 * All self-hosted via next/font.
 */
import {
  Assistant,
  Space_Mono,
  Bricolage_Grotesque,
  Fraunces,
} from "next/font/google";

// Body + UI workhorse (matches the live site).
export const brandFont = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ff-brand",
  display: "swap",
});

// Display face for headlines (variable).
export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-bricolage",
  display: "swap",
});

// Editorial serif for the occasional italic emphasis (variable).
export const editorialFont = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-fraunces",
  display: "swap",
});

export const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});

/** All font CSS-variable classes for the <html> element. */
export const fontVariables = `${brandFont.variable} ${displayFont.variable} ${editorialFont.variable} ${monoFont.variable}`;
