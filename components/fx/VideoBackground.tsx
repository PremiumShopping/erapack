"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

/**
 * Fixed, full-viewport video that sits behind the whole page. A white scrim
 * keeps the (dark) content legible over the bright clip. Reduced-motion users
 * get the static poster instead of an autoplaying video.
 */
export default function VideoBackground({
  src = "/hero/espresso-bright.mp4",
  poster = "/hero/hero-bright.png",
}: {
  src?: string;
  poster?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Nudge muted autoplay (some browsers only start it after a gesture).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    const play = () => v.play().catch(() => {});
    play();
    window.addEventListener("pointerdown", play, { once: true });
    return () => window.removeEventListener("pointerdown", play);
  }, [reduced]);

  return (
    <div aria-hidden className="bg-paper fixed inset-0 -z-10">
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      )}
      {/* soft white scrim — keeps dark content readable over the bright video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.74) 55%, rgba(255,255,255,0.82) 100%)",
        }}
      />
    </div>
  );
}
