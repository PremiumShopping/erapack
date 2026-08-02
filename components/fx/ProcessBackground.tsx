"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  usePrefersReducedMotion,
  useFinePointer,
  useHydrated,
} from "@/lib/useMediaQuery";

/**
 * Full-page, fixed background film of the end-to-end Era Pack process,
 * sequenced across whole-page scroll:
 *   design → print → deliver → fill  (design + fill reuse the one cup film).
 *
 * Each beat owns a slice of scroll; beats cross-fade into one another and,
 * on desktop, the active beat's clip is scrubbed by its local scroll progress
 * (an rAF lerp smooths coarse seeks). Touch devices get calm muted autoplay
 * loops (per-frame seeking is janky on mobile); reduced motion gets a static
 * poster. A soft white scrim keeps overlaid content legible.
 */
type Beat = { src: string; t0: number; t1: number };

const BEATS: Beat[] = [
  { src: "/hero/process.mp4", t0: 0.0, t1: 0.4 }, // design (green glow, empty cup)
  { src: "/hero/print.mp4", t0: 0.0, t1: 1.0 }, // print the green band
  { src: "/hero/deliver.mp4", t0: 0.0, t1: 1.0 }, // deliver
  { src: "/hero/process.mp4", t0: 0.42, t1: 1.0 }, // fill with espresso
];

export default function ProcessBackground({
  poster,
  scrim = 0.28,
}: {
  poster: string;
  scrim?: number;
}) {
  const hydrated = useHydrated();
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();

  const srcs = useMemo(() => Array.from(new Set(BEATS.map((b) => b.src))), []);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const scrub = hydrated && !reduced && fine;
  const loop = hydrated && !reduced && !fine;

  useEffect(() => {
    if (!hydrated || reduced) return;
    const N = BEATS.length;
    const shown: Record<string, number> = {};
    let raf = 0;

    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));

      // for each source, adopt the values of its highest-opacity beat
      const chosen: Record<string, { op: number; t: number }> = {};
      BEATS.forEach((b, i) => {
        const center = (i + 0.5) / N;
        const op = Math.max(0, 1 - Math.abs(p - center) / (0.72 / N));
        const localT = Math.min(1, Math.max(0, (p - i / N) * N));
        const v = videoRefs.current[b.src];
        const dur = v?.duration || 0;
        const t = (b.t0 + (b.t1 - b.t0) * localT) * dur;
        const cur = chosen[b.src];
        if (!cur || op > cur.op) chosen[b.src] = { op, t };
      });

      srcs.forEach((s) => {
        const v = videoRefs.current[s];
        if (!v) return;
        const c = chosen[s] || { op: 0, t: 0 };
        v.style.opacity = String(c.op);
        if (scrub) {
          const prev = shown[s] ?? c.t;
          const next = prev + (c.t - prev) * 0.15;
          shown[s] = next;
          if (Math.abs((v.currentTime || 0) - next) > 0.02) {
            if (typeof v.fastSeek === "function") v.fastSeek(next);
            else v.currentTime = next;
          }
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hydrated, reduced, scrub, srcs]);

  return (
    <div
      aria-hidden
      className="bg-paper pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover" />
      ) : (
        srcs.map((s, idx) => (
          <video
            key={s}
            ref={(el) => {
              videoRefs.current[s] = el;
            }}
            src={s}
            poster={idx === 0 ? poster : undefined}
            muted
            playsInline
            loop={loop}
            autoPlay={loop}
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: idx === 0 ? 1 : 0 }}
          />
        ))
      )}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(255,255,255,${scrim})` }}
      />
    </div>
  );
}
