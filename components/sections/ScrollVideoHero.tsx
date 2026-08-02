"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

const STAGES = [
  {
    eyebrow: "01 · The blank",
    title: "Start with your cup.",
    body: "A clean, branded canvas — kraft-warm and print-ready.",
    at: 0.08,
  },
  {
    eyebrow: "02 · Pull the shot",
    title: "Fill it with espresso.",
    body: "Full-colour print wraps the cup as the coffee pours in.",
    at: 0.4,
  },
  {
    eyebrow: "03 · Crema settles",
    title: "The good stuff on top.",
    body: "A hazelnut crema — the sign it was worth the wait.",
    at: 0.68,
  },
  {
    eyebrow: "04 · Ready to serve",
    title: "Your brand, in every cup.",
    body: "Boxed and out the door in 2–3 working days.",
    at: 0.92,
  },
];

/**
 * Scroll-scrubbed video hero. Scroll progress drives video.currentTime through
 * an rAF lerp (smooth, interruptible) using fastSeek where available. Captions
 * cross-fade per stage. Reduced-motion shows the poster + a calm caption list.
 */
export default function ScrollVideoHero({
  src = "/hero/espresso.mp4",
  poster = "/hero/cup-empty.png",
}: {
  src?: string;
  poster?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = usePrefersReducedMotion();
  const [nearby, setNearby] = useState(false);

  // Only fetch the (heavy) hero video once the section is near the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setNearby(true),
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!video || !section || !pin) return;

    let duration = video.duration || 0;
    const onMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);

    const updateCaptions = (p: number) => {
      STAGES.forEach((s, i) => {
        const el = captionsRef.current[i];
        if (!el) return;
        const o = Math.max(0, 1 - Math.abs(p - s.at) / 0.2);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 22}px, 0)`;
      });
    };

    // rAF lerp toward the scroll target for buttery scrubbing.
    let target = 0;
    let shown = 0;
    let raf = 0;
    const tick = () => {
      shown += (target - shown) * 0.12;
      if (duration) {
        const t = shown * duration;
        if (Math.abs((video.currentTime || 0) - t) > 0.02) {
          if (typeof video.fastSeek === "function") video.fastSeek(t);
          else video.currentTime = t;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=220%",
      pin,
      scrub: 1,
      onUpdate: (self) => {
        target = self.progress;
        updateCaptions(self.progress);
      },
    });

    updateCaptions(0);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-charcoal text-paper relative overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt="A branded Era Pack paper cup of espresso"
            className="w-full rounded-3xl object-cover"
          />
          <ol className="flex flex-col justify-center gap-8">
            {STAGES.map((s) => (
              <li key={s.eyebrow}>
                <p
                  className="eyebrow"
                  style={{ color: "var(--color-clay-glow)" }}
                >
                  {s.eyebrow}
                </p>
                <h3 className="display mt-2 text-3xl font-semibold">
                  {s.title}
                </h3>
                <p className="text-paper/60 mt-1 max-w-sm">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-charcoal text-paper relative">
      <div ref={pinRef} className="relative h-svh overflow-hidden">
        <video
          ref={videoRef}
          src={nearby ? src : undefined}
          poster={poster}
          muted
          playsInline
          preload={nearby ? "auto" : "none"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* legibility scrim — left-anchored on desktop where the caption sits */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(23,18,15,0.72) 0%, rgba(23,18,15,0.35) 42%, transparent 70%)",
          }}
        />
        {/* bottom-anchored scrim on mobile where the caption is full-width */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(23,18,15,0.82) 0%, rgba(23,18,15,0.3) 45%, transparent 65%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1440px] items-end px-6 pb-16 md:items-center md:px-12">
          <div className="relative h-44 w-full md:h-56 md:max-w-md">
            {STAGES.map((s, i) => (
              <div
                key={s.eyebrow}
                ref={(el) => {
                  captionsRef.current[i] = el;
                }}
                className="absolute inset-x-0 bottom-0 md:top-0 md:bottom-auto"
                style={{ opacity: 0 }}
              >
                <p
                  className="eyebrow"
                  style={{ color: "var(--color-clay-glow)" }}
                >
                  {s.eyebrow}
                </p>
                <h3 className="display mt-3 text-4xl leading-[1.02] font-semibold md:text-5xl">
                  {s.title}
                </h3>
                <p className="text-paper/70 mt-3 max-w-sm text-lg">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-paper/40 pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.25em] uppercase">
          Scroll to brew
        </div>
      </div>
    </section>
  );
}
