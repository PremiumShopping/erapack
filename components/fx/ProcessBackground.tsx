"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useHydrated } from "@/lib/useMediaQuery";

/**
 * Full-page looping background film of the Era Pack process. The four scenes
 * (design → print → deliver → fill) muted-autoplay and dissolve into one
 * another on a timer, cycling forever — it covers the entire page
 * (object-cover) and is not tied to scroll.
 *
 * Each transition is a proper eased cross-fade: the current scene stays opaque
 * underneath while the incoming scene fades in ON TOP (explicit z-index), so
 * every hand-off — including the wrap-around back to scene 1 — dissolves
 * identically and smoothly. Playback is autoplay-policy independent (native
 * play, or we advance currentTime ourselves so it still moves in Safari).
 * Reduced motion → a static poster.
 */
// Real stock footage (Mixkit free licence) — a genuine latte being poured;
// warm tones that sit with the paper-stock palette. A single looping clip.
const CLIPS = ["/hero/cappuccino.mp4"];
const SEG = 8; // seconds a scene holds
const TR = 0.4; // fraction of a segment spent dissolving to the next scene

const smooth = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * c * (c * (c * 6 - 15) + 10); // smootherstep
};

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
    let raf = 0;
    let start = 0;
    let last = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;

      const p = (now - start) / 1000 / SEG;
      const seg = Math.floor(p);
      const cur = ((seg % N) + N) % N;
      const nxt = (cur + 1) % N;
      const f = p - seg;
      const eased = f <= 1 - TR ? 0 : smooth((f - (1 - TR)) / TR);

      for (let i = 0; i < N; i++) {
        const v = refs.current[i];
        if (!v) continue;
        const op = i === cur ? 1 : i === nxt ? eased : 0;
        v.style.opacity = String(op);
        v.style.zIndex = i === nxt ? "2" : i === cur ? "1" : "0";
        if (i === cur || i === nxt) {
          if (v.paused) void v.play?.().catch(() => {});
          if (v.paused && v.duration) {
            let t = v.currentTime + dt;
            if (t >= v.duration - 0.05) t = 0;
            v.currentTime = t;
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
            style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
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
