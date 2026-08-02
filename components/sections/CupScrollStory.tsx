"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "@/lib/gsap";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMediaQuery";

const CupCanvas = dynamic(() => import("@/components/three/CupCanvas"), {
  ssr: false,
  loading: () => <CanvasFallback />,
});

const STAGES = [
  {
    eyebrow: "01 · The blank",
    title: "Start with your cup.",
    body: "A clean, branded canvas — kraft-warm and print-ready.",
    at: 0.07,
  },
  {
    eyebrow: "02 · Pull the shot",
    title: "Fill it with espresso.",
    body: "Full-colour print wraps the cup as the coffee pours in.",
    at: 0.36,
  },
  {
    eyebrow: "03 · Crema settles",
    title: "The good stuff on top.",
    body: "A hazelnut crema — the sign it was worth the wait.",
    at: 0.64,
  },
  {
    eyebrow: "04 · Ready to serve",
    title: "Your brand, in every cup.",
    body: "Boxed and out the door in 2–3 working days.",
    at: 0.9,
  },
];

function CanvasFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="text-paper/40 flex flex-col items-center gap-3">
        <span className="bg-clay h-2 w-2 animate-pulse rounded-full" />
        <span className="font-mono text-xs tracking-widest uppercase">
          Warming the press…
        </span>
      </div>
    </div>
  );
}

export default function CupScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const captionsRef = useRef<Array<HTMLDivElement | null>>([]);

  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [inView, setInView] = useState(false);

  // Only mount the WebGL canvas when the section is near the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll-scrub the progress value + cross-fade captions (no React re-render
  // per frame — we write styles directly).
  useEffect(() => {
    if (reduced || !sectionRef.current || !pinRef.current) return;

    const updateCaptions = (p: number) => {
      STAGES.forEach((s, i) => {
        const el = captionsRef.current[i];
        if (!el) return;
        const o = Math.max(0, 1 - Math.abs(p - s.at) / 0.19);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 22}px, 0)`;
      });
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=220%",
      pin: pinRef.current,
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        updateCaptions(self.progress);
      },
    });

    updateCaptions(0);
    ScrollTrigger.refresh();
    return () => st.kill();
  }, [reduced]);

  // Reduced-motion: a calm, static editorial telling instead of a pinned scrub.
  if (reduced) {
    return (
      <section className="bg-charcoal text-paper relative overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 md:grid-cols-2 md:px-12">
          <div className="grid min-h-[50vh] place-items-center">
            {/* Calm static espresso emblem — no WebGL, no motion. */}
            <svg
              viewBox="0 0 240 240"
              className="h-64 w-64"
              role="img"
              aria-label="A cup of espresso with crema, top-down"
            >
              <circle cx="120" cy="120" r="112" fill="#EFE7D6" />
              <circle cx="120" cy="120" r="98" fill="#9C7B4E" opacity="0.5" />
              <circle cx="120" cy="120" r="94" fill="#c77f49" />
              <circle cx="120" cy="120" r="76" fill="#2a1206" />
              <ellipse
                cx="104"
                cy="100"
                rx="26"
                ry="14"
                fill="#4a2410"
                opacity="0.7"
              />
            </svg>
          </div>
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
        {/* warm glow behind the cup */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(210,75,39,0.55), transparent 60%)",
          }}
        />

        {/* the 3D stage */}
        <div className="absolute inset-0">
          {inView ? (
            <CupCanvas
              progressRef={progressRef}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
            />
          ) : (
            <CanvasFallback />
          )}
        </div>

        {/* captions overlay */}
        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1440px] items-end px-6 pb-16 md:items-center md:px-12">
          <div className="relative h-40 w-full md:h-56 md:max-w-md">
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
                <p className="text-paper/65 mt-3 max-w-sm text-lg">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div className="text-paper/40 pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.25em] uppercase">
          Scroll to brew
        </div>
      </div>
    </section>
  );
}
