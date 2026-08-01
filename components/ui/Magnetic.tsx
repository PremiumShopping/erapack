"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/useMediaQuery";

/**
 * Magnetic wrapper — the child drifts toward the cursor while hovered, then
 * springs back on leave. Interpolated with useSpring + a translate3d template
 * (GPU). No-ops under reduced-motion / coarse pointers.
 */
export default function Magnetic({
  children,
  strength = 0.4,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const on = fine && !reduce;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.6 });
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!on) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
