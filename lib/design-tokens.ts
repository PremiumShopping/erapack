/**
 * Era Pack — Design Tokens (single source of truth)
 * ---------------------------------------------------
 * Colours are mirrored in app/globals.css (@theme) for Tailwind utilities.
 * Motion tokens live ONLY here and are consumed by Framer Motion, GSAP and R3F
 * so every animation across the site shares the same physical character.
 *
 * Art direction: warm kraft / paper material world, espresso ink, ONE confident
 * accent (terracotta "clay"), with a single dramatic charcoal "manufacturing"
 * register for contrast. No purple-blue gradients. No glassmorphism-everywhere.
 */

export const colors = {
  paper: "#F6F1E7", // base off-white, the "unprinted stock"
  paper2: "#EFE7D6", // slightly deeper paper for panels / alternating sections
  paper3: "#E7DCC6", // pressed paper, hairline fills
  kraft: "#C8A97E", // kraft board
  kraftDeep: "#9C7B4E", // kraft in shadow, secondary strokes
  ink: "#2B2320", // espresso ink — primary text
  inkSoft: "#6B5D50", // muted ink — captions, meta
  charcoal: "#17120F", // the dark "how it's made" register
  charcoal2: "#221B16", // charcoal panel
  clay: "#D24B27", // ⭐ THE accent — terracotta / kiln
  clayDeep: "#A83518", // accent pressed / hover
  clayGlow: "#E9714E", // accent highlight (sparingly)
  line: "rgba(43, 35, 32, 0.14)", // hairline on paper
  lineDark: "rgba(246, 241, 231, 0.16)", // hairline on charcoal
} as const;

/**
 * Easing curves. `out` is the house curve — used for nearly every reveal.
 * Kept as [n,n,n,n] tuples so both Framer Motion and GSAP can eat them.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number], // house reveal
  inOut: [0.83, 0, 0.17, 1] as [number, number, number, number], // section swaps
  in: [0.55, 0, 1, 0.45] as [number, number, number, number],
} as const;

/** CSS-string equivalents for GSAP (`ease: cssEase.out`) and CSS transitions. */
export const cssEase = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.83, 0, 0.17, 1)",
  in: "cubic-bezier(0.55, 0, 1, 0.45)",
} as const;

/** Spring presets for Framer Motion — physical mass, never linear fades. */
export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 1 } as const,
  snappy: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 } as const,
  gentle: { type: "spring", stiffness: 70, damping: 18, mass: 1.1 } as const,
  magnetic: { type: "spring", stiffness: 260, damping: 22, mass: 0.6 } as const,
} as const;

/** Standard durations (seconds) for tween-based motion. */
export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 1.1,
  epic: 1.8,
} as const;

/** Reusable Framer Motion variant: rise + fade with the house curve. */
export const rise = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
} as const;

export const tokens = { colors, ease, cssEase, spring, duration, rise };
export default tokens;
