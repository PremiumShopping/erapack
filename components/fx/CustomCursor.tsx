"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/useMediaQuery";

/**
 * Custom cursor — a fast clay dot + a lagging ring that swells over
 * interactive elements. The ring is spring-interpolated (decorative motion,
 * per Emil's "use useSpring for mouse tracking" rule) and driven through a
 * translate3d template so it stays GPU-accelerated.
 *
 * Only mounts on fine pointers with motion allowed; touch + reduced-motion
 * users keep the native cursor. Elements can label the cursor via
 * `data-cursor="Drag"`.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.7 });
  const dotX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  const ringTransform = useMotionTemplate`translate3d(${ringX}px, ${ringY}px, 0)`;
  const dotTransform = useMotionTemplate`translate3d(${dotX}px, ${dotY}px, 0)`;

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none-fine");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [data-cursor], input, textarea, select, [role='button']",
      );
      setActive(Boolean(el));
      setLabel(el?.getAttribute("data-cursor") ?? null);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div
        style={{ transform: ringTransform }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{ scale: active ? 1.85 : 1 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
          className="-mt-4 -ml-4 flex h-8 w-8 items-center justify-center rounded-full border"
          style={{
            borderColor: active ? "var(--color-clay)" : "var(--color-ink)",
            opacity: active ? 1 : 0.55,
          }}
        />
      </motion.div>

      <motion.div
        style={{ transform: dotTransform }}
        className="absolute top-0 left-0"
      >
        <div className="bg-clay -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full" />
      </motion.div>

      {label && (
        <motion.div
          style={{ transform: ringTransform }}
          className="absolute top-0 left-0"
        >
          <span className="bg-green text-ink mt-4 ml-5 inline-block rounded-full px-2.5 py-1 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase">
            {label}
          </span>
        </motion.div>
      )}
    </div>
  );
}
