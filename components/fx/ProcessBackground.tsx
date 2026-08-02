"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useHydrated } from "@/lib/useMediaQuery";

/**
 * Full-page looping background film of the Era Pack process. The four scenes
 * (design → print → deliver → fill) muted-autoplay and continuously cross-fade
 * on a timer, cycling forever — it covers the entire page (object-cover) and is
 * not tied to scroll. Playback is autoplay-policy independent (native play, or
 * we advance currentTime ourselves so it still moves in Safari / low-power).
 * Reduced motion → a static poster. A light scrim keeps overlaid text legible.
 */
const CLIPS = [
  "/hero/design.mp4",
  "/hero/print.mp4",
  "/hero/deliver.mp4",
  "/hero/fill.mp4",
];
const SEG = 5; // seconds each scene is featured before cross-fading

export default function ProcessBackground({
  poster,
  scrim = 0.18,
}: {
  poster: string;
  scrim?: number;
}) {
  const hydrated = useHydrated();
  const reduced = usePrefersReducedMotion();
  const refs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    if (!hydrated || reduced) return;
    const N = CLIPS.length;
    const ringDist = (a: number, b: number) => {
      const d = Math.abs(a - b);
      return Math.min(d, N - d);
    };
    let raf = 0;
    let start = 0;
    let last = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const phase = ((now - start) / 1000 / SEG) % N;

      for (let i = 0; i < N; i++) {
        const v = refs.current[i];
        if (!v) continue;
        const op = Math.max(0, Math.min(1, (1 - ringDist(phase, i)) / 0.5));
        v.style.opacity = String(op);
        if (op > 0.02) {
          if (v.paused) void v.play?.().catch(() => {});
          if (v.paused && v.duration) {
            let nt = v.currentTime + dt;
            if (nt >= v.duration - 0.05) nt = 0;
            v.currentTime = nt;
          }
        } else if (!v.paused) {
          v.pause();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hydrated, reduced]);

  return (
    <div
      aria-hidden
      className="bg-paper pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover" />
      ) : (
        CLIPS.map((src, i) => (
          <video
            key={src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={src}
            poster={i === 0 ? poster : undefined}
            muted
            autoPlay
            loop
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
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
