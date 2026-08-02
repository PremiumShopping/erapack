"use client";

import { useEffect, useRef } from "react";
import {
  usePrefersReducedMotion,
  useFinePointer,
  useHydrated,
} from "@/lib/useMediaQuery";

/**
 * Full-page, fixed background video of the end-to-end Era Pack process
 * (design → order → print → deliver → fill), generated with Seedance 2.0.
 *
 * - Desktop (fine pointer, motion OK): the video is PAUSED and its currentTime
 *   is scrubbed by whole-page scroll progress via an rAF lerp + fastSeek — so
 *   the journey unfolds as you scroll. The lerp smooths coarse keyframe seeks.
 * - Touch (no fine pointer): a calm muted autoplay loop (iOS-safe), since
 *   per-frame seeking on scroll is janky on mobile.
 * - Reduced motion: a single static poster frame, no video fetched.
 *
 * A soft white scrim keeps overlaid content readable; the living video reads
 * through the translucent sections above it.
 */
export default function ProcessBackground({
  src,
  poster,
  scrim = 0.4,
}: {
  src: string;
  poster: string;
  scrim?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hydrated = useHydrated();
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();

  const scrub = hydrated && !reduced && fine;
  const loop = hydrated && !reduced && !fine;

  useEffect(() => {
    if (!scrub) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    let duration = video.duration || 0;
    const onMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);

    const readProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      return Math.min(1, Math.max(0, window.scrollY / max));
    };

    let shown = 0;
    let raf = 0;
    const tick = () => {
      const target = readProgress();
      shown += (target - shown) * 0.1;
      if (duration) {
        const t = shown * Math.max(0, duration - 0.05);
        if (Math.abs((video.currentTime || 0) - t) > 0.015) {
          if (typeof video.fastSeek === "function") video.fastSeek(t);
          else video.currentTime = t;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [scrub]);

  return (
    <div
      aria-hidden
      className="bg-paper pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop={loop}
          autoPlay={loop}
          preload="auto"
          className="h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(255,255,255,${scrim})` }}
      />
    </div>
  );
}
