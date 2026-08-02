"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePrefersReducedMotion, useHydrated } from "@/lib/useMediaQuery";

/**
 * The whole page background: one scroll-driven process film. Scroll position
 * IS the timeline — the top of the page is the very beginning (a blank branded
 * cup being designed) and it advances, beat by beat, to the espresso fill at
 * the bottom:
 *   design → print → deliver → fill
 *
 * Each beat owns a quarter of the scroll; the active clip is scrubbed by its
 * local scroll progress and the beats cross-fade at the seams (design + fill
 * are two ends of the one cup film). object-contain keeps the whole scene in
 * view (no giant crop). Reduced motion → static poster. Light scrim for text.
 */
type Beat = { src: string; t0: number; t1: number };

const BEATS: Beat[] = [
  { src: "/hero/process.mp4", t0: 0.0, t1: 0.42 }, // design (blank cup → green glow)
  { src: "/hero/print.mp4", t0: 0.0, t1: 1.0 }, // print the band
  { src: "/hero/deliver.mp4", t0: 0.0, t1: 1.0 }, // deliver
  { src: "/hero/process.mp4", t0: 0.42, t1: 1.0 }, // fill with espresso
];

export default function ProcessBackground({
  poster,
  scrim = 0.16,
}: {
  poster: string;
  scrim?: number;
}) {
  const hydrated = useHydrated();
  const reduced = usePrefersReducedMotion();
  const srcs = useMemo(() => Array.from(new Set(BEATS.map((b) => b.src))), []);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    if (!hydrated || reduced) return;
    const N = BEATS.length;
    const seg = 1 / N;
    const fade = seg * 0.5;
    const shown: Record<string, number> = {};
    let raf = 0;

    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));

      // for each source pick its highest-opacity beat (design + fill share one clip)
      const chosen: Record<string, { op: number; t: number }> = {};
      BEATS.forEach((b, i) => {
        const lo = i * seg;
        const hi = (i + 1) * seg;
        const d = p < lo ? lo - p : p > hi ? p - hi : 0;
        const op = Math.max(0, Math.min(1, 1 - d / fade));
        const localT = Math.min(1, Math.max(0, (p - lo) / seg));
        const v = refs.current[b.src];
        const dur = v?.duration || 0;
        const t = (b.t0 + (b.t1 - b.t0) * localT) * dur;
        const cur = chosen[b.src];
        if (!cur || op > cur.op) chosen[b.src] = { op, t };
      });

      srcs.forEach((s) => {
        const v = refs.current[s];
        if (!v) return;
        const c = chosen[s] || { op: 0, t: 0 };
        v.style.opacity = String(c.op);
        if (!v.paused) v.pause();
        // smooth the scrub, and set currentTime explicitly so the frame paints
        const prev = shown[s] ?? c.t;
        const next = prev + (c.t - prev) * 0.2;
        shown[s] = next;
        if (v.readyState >= 1 && Math.abs((v.currentTime || 0) - next) > 0.01) {
          if (typeof v.fastSeek === "function") v.fastSeek(next);
          else v.currentTime = next;
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hydrated, reduced, srcs]);

  return (
    <div
      aria-hidden
      className="bg-paper pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-contain" />
      ) : (
        srcs.map((s, idx) => (
          <video
            key={s}
            ref={(el) => {
              refs.current[s] = el;
            }}
            src={s}
            poster={poster}
            muted
            playsInline
            preload={idx === 0 ? "auto" : "metadata"}
            className="absolute inset-0 h-full w-full object-contain"
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
