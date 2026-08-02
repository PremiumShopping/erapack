"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePrefersReducedMotion, useHydrated } from "@/lib/useMediaQuery";

/**
 * Full-page, fixed background film of the end-to-end Era Pack process,
 * sequenced across whole-page scroll:
 *   cup (design→fill) → print → deliver → cup (fill)
 *
 * The active beat is played and the beats cross-fade as you scroll, so the
 * journey steps with the page. Playback does NOT rely on the browser's
 * autoplay policy: we try native play(), and if it's blocked we advance
 * currentTime ourselves each frame — so the background is always visibly
 * moving (Safari, low-power mode, etc. included). Reduced motion → static
 * poster. A light white scrim keeps overlaid text legible.
 */
const SEQUENCE = [
  "/hero/process.mp4", // design + fill (the branded cup)
  "/hero/print.mp4", // print the green band
  "/hero/deliver.mp4", // deliver
  "/hero/process.mp4", // fill (the branded cup again)
];

export default function ProcessBackground({
  poster,
  scrim = 0.14,
}: {
  poster: string;
  scrim?: number;
}) {
  const hydrated = useHydrated();
  const reduced = usePrefersReducedMotion();
  const srcs = useMemo(() => Array.from(new Set(SEQUENCE)), []);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    if (!hydrated || reduced) return;
    const N = SEQUENCE.length;
    const seg = 1 / N;
    const fade = seg * 0.6;

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;

      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));

      const op: Record<string, number> = {};
      SEQUENCE.forEach((src, i) => {
        const lo = i * seg;
        const hi = (i + 1) * seg;
        const d = p < lo ? lo - p : p > hi ? p - hi : 0;
        const o = Math.max(0, Math.min(1, 1 - d / fade));
        op[src] = Math.max(op[src] ?? 0, o);
      });

      srcs.forEach((s) => {
        const v = refs.current[s];
        if (!v) return;
        const o = op[s] ?? 0;
        v.style.opacity = String(o);
        if (o > 0.02) {
          // active beat: keep it moving, autoplay-policy independent
          if (v.paused) void v.play?.().catch(() => {});
          if (v.paused && v.duration) {
            let nt = v.currentTime + dt;
            if (nt >= v.duration - 0.05) nt = 0;
            v.currentTime = nt;
          }
        } else if (!v.paused) {
          v.pause();
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
        <img src={poster} alt="" className="h-full w-full object-cover" />
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
            autoPlay
            loop
            playsInline
            preload={idx === 0 ? "auto" : "metadata"}
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
