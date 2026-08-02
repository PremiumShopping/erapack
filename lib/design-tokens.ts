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
  paper: "#FFFFFF", // white base (inherited from erapack.uk)
  paper2: "#F4F6F2", // soft off-white section band
  paper3: "#E9EDE7", // pressed paper, hairline fills
  kraft: "#CDEEC6", // pale-green tint (soft accent surface)
  kraftDeep: "#7AD86A", // mid green
  ink: "#0F1211", // near-black — primary text
  inkSoft: "#57605A", // muted grey — captions, meta
  charcoal: "#0D0F0D", // the single dark register (video / footer)
  charcoal2: "#171A16", // charcoal panel
  green: "#39FF14", // ⭐ THE accent — electric green
  greenDeep: "#1FBF07", // accent hover / contrast
  greenSoft: "#67FF47", // accent highlight
  clay: "#39FF14", // alias of green (kept so existing utilities re-skin)
  clayDeep: "#1FBF07",
  clayGlow: "#67FF47",
  line: "rgba(15, 18, 17, 0.12)", // hairline on white
  lineDark: "rgba(255, 255, 255, 0.16)", // hairline on charcoal
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
  // Stronger UI curves (Emil Kowalski standards) — used for shell/interactions.
  uiOut: "cubic-bezier(0.23, 1, 0.32, 1)",
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

/**
 * Apple-style spring — easier to reason about than stiffness/damping.
 * Keep bounce subtle (0.1–0.3); reserve visible bounce for drag/playful UI.
 */
export const appleSpring = {
  press: { type: "spring", duration: 0.4, bounce: 0.2 } as const,
  cursor: { type: "spring", stiffness: 500, damping: 40, mass: 0.6 } as const,
  cursorRing: {
    type: "spring",
    stiffness: 220,
    damping: 26,
    mass: 0.7,
  } as const,
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
