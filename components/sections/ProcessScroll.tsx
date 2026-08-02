"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

/* ---------------------------------------------------------------- scenes -- */

const G = "#39FF14";
const GD = "#1FBF07";
const INK = "#0F1211";

function SceneDesign() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* browser window */}
      <rect
        x="34"
        y="30"
        width="252"
        height="176"
        rx="16"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.12"
        strokeWidth="2"
      />
      <rect x="34" y="30" width="252" height="30" rx="16" fill="#F4F6F2" />
      <circle cx="52" cy="45" r="4" fill={INK} opacity="0.3" />
      <circle cx="66" cy="45" r="4" fill={INK} opacity="0.3" />
      <circle cx="80" cy="45" r="4" fill={G} />
      {/* cup on canvas */}
      <path
        d="M132 86 L196 86 L186 172 Q185 178 179 178 L149 178 Q143 178 142 172 Z"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <rect x="128" y="118" width="72" height="24" fill={G} />
      <ellipse
        cx="164"
        cy="86"
        rx="32"
        ry="7"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      {/* palette */}
      <circle cx="228" cy="96" r="9" fill={INK} />
      <circle cx="228" cy="120" r="9" fill={G} />
      <circle cx="228" cy="144" r="9" fill="#C8A97E" />
      {/* cursor */}
      <path
        d="M196 150 l22 8 -9 3 -3 9 z"
        fill={GD}
        stroke="#fff"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SceneOrder() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* receipt */}
      <rect
        x="70"
        y="40"
        width="150"
        height="160"
        rx="12"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.12"
        strokeWidth="2"
      />
      <rect
        x="90"
        y="64"
        width="90"
        height="9"
        rx="4"
        fill={INK}
        opacity="0.85"
      />
      <rect
        x="90"
        y="88"
        width="110"
        height="7"
        rx="3"
        fill={INK}
        opacity="0.25"
      />
      <rect
        x="90"
        y="104"
        width="80"
        height="7"
        rx="3"
        fill={INK}
        opacity="0.25"
      />
      <rect
        x="90"
        y="120"
        width="100"
        height="7"
        rx="3"
        fill={INK}
        opacity="0.25"
      />
      <rect
        x="90"
        y="150"
        width="60"
        height="12"
        rx="4"
        fill={GD}
        opacity="0.85"
      />
      {/* accepted check */}
      <circle cx="212" cy="168" r="34" fill={G} />
      <path
        d="M197 168 l10 11 20 -24"
        fill="none"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScenePrint() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* press body */}
      <rect
        x="44"
        y="70"
        width="232"
        height="70"
        rx="14"
        fill="#F4F6F2"
        stroke={INK}
        strokeOpacity="0.12"
        strokeWidth="2"
      />
      <circle
        cx="96"
        cy="105"
        r="22"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <circle cx="96" cy="105" r="6" fill={G} />
      <circle
        cx="224"
        cy="105"
        r="22"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <circle cx="224" cy="105" r="6" fill={G} />
      {/* freshly printed cup on the belt */}
      <path
        d="M138 150 L198 150 L189 206 Q188 212 182 212 L154 212 Q148 212 147 206 Z"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <rect x="134" y="170" width="68" height="20" fill={G} />
      {/* belt */}
      <rect
        x="40"
        y="212"
        width="240"
        height="8"
        rx="4"
        fill={INK}
        opacity="0.15"
      />
      {/* ink drop */}
      <path
        d="M168 44 c6 10 10 15 10 22 a10 10 0 0 1 -20 0 c0 -7 4 -12 10 -22 z"
        fill={GD}
      />
    </svg>
  );
}

function SceneDeliver() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* van body */}
      <rect
        x="40"
        y="96"
        width="150"
        height="80"
        rx="12"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="M190 116 h44 l30 30 v30 h-74 z"
        fill="#F4F6F2"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <rect x="60" y="112" width="110" height="20" rx="5" fill={G} />
      <circle cx="92" cy="182" r="18" fill={INK} />
      <circle cx="92" cy="182" r="7" fill="#fff" />
      <circle cx="218" cy="182" r="18" fill={INK} />
      <circle cx="218" cy="182" r="7" fill="#fff" />
      {/* motion lines */}
      <rect
        x="8"
        y="120"
        width="26"
        height="6"
        rx="3"
        fill={GD}
        opacity="0.6"
      />
      <rect
        x="4"
        y="140"
        width="34"
        height="6"
        rx="3"
        fill={GD}
        opacity="0.4"
      />
      <rect
        x="12"
        y="160"
        width="20"
        height="6"
        rx="3"
        fill={GD}
        opacity="0.5"
      />
    </svg>
  );
}

function SceneFill({
  fillRef,
}: {
  fillRef: React.RefObject<SVGRectElement | null>;
}) {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <clipPath id="proc-cup-clip">
          <path d="M116 46 L204 46 L191 196 Q190 204 182 204 L138 204 Q130 204 129 196 Z" />
        </clipPath>
      </defs>
      {/* coffee (height driven by scroll) */}
      <rect
        ref={fillRef}
        x="120"
        y="200"
        width="80"
        height="0"
        fill="#2a1206"
        clipPath="url(#proc-cup-clip)"
      />
      {/* cup body */}
      <path
        d="M116 46 L204 46 L191 196 Q190 204 182 204 L138 204 Q130 204 129 196 Z"
        fill="none"
        stroke={INK}
        strokeOpacity="0.22"
        strokeWidth="2.5"
      />
      <rect
        x="112"
        y="96"
        width="96"
        height="26"
        fill={G}
        clipPath="url(#proc-cup-clip)"
      />
      <ellipse
        cx="160"
        cy="46"
        rx="44"
        ry="10"
        fill="#fff"
        stroke={INK}
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      {/* steam */}
      <path
        d="M150 30 q-8 -12 0 -22"
        fill="none"
        stroke={GD}
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M170 30 q8 -12 0 -22"
        fill="none"
        stroke={GD}
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StageScene({
  index,
  fillRef,
}: {
  index: number;
  fillRef: React.RefObject<SVGRectElement | null>;
}) {
  switch (index) {
    case 0:
      return <SceneDesign />;
    case 1:
      return <SceneOrder />;
    case 2:
      return <ScenePrint />;
    case 3:
      return <SceneDeliver />;
    default:
      return <SceneFill fillRef={fillRef} />;
  }
}

/* --------------------------------------------------------------- content -- */

const STAGES = [
  {
    n: "01",
    title: "Design it",
    body: "Upload your logo, add text and colours in the live 3D studio — see it wrap the cup in real time.",
  },
  {
    n: "02",
    title: "We accept your order",
    body: "Lock it in and check out. No minimum order, instant confirmation, and your design saved for reorders.",
  },
  {
    n: "03",
    title: "We print & prepare",
    body: "Printed full-colour and factory-direct in the UK — double-wall board, matte or gloss, to spec.",
  },
  {
    n: "04",
    title: "We deliver",
    body: "Boxed and on its way in 2–3 working days, with next-day available. Free UK shipping over £100.",
  },
  {
    n: "05",
    title: "You fill it up",
    body: "Your brand, in every cup — poured, served, and remembered. That's the whole point.",
  },
];

export default function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const capRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const fillRef = useRef<SVGRectElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !pinRef.current) return;
    const N = STAGES.length;

    const update = (p: number) => {
      const active = Math.min(N - 1, Math.floor(p * N + 0.0001));
      STAGES.forEach((_, i) => {
        const center = (i + 0.5) / N;
        const d = Math.abs(p - center);
        const o = Math.max(0, 1 - d / (0.62 / N));
        const scene = sceneRefs.current[i];
        const cap = capRefs.current[i];
        if (scene) {
          scene.style.opacity = String(o);
          scene.style.transform = `translate3d(0, ${(1 - o) * 26}px, 0) scale(${0.94 + o * 0.06})`;
        }
        if (cap) {
          cap.style.opacity = String(o);
          cap.style.transform = `translate3d(0, ${(1 - o) * 18}px, 0)`;
        }
        const dot = dotRefs.current[i];
        if (dot) {
          dot.style.background = i <= active ? G : "rgba(15,18,17,0.15)";
          dot.style.transform = i === active ? "scale(1.5)" : "scale(1)";
        }
      });
      // coffee fills over the final stage
      const fill = Math.max(0, Math.min(1, (p - (N - 1) / N) * N));
      if (fillRef.current) {
        const h = fill * 150;
        fillRef.current.setAttribute("height", String(h));
        fillRef.current.setAttribute("y", String(200 - h));
      }
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=380%",
      pin: pinRef.current,
      scrub: 1,
      onUpdate: (self) => update(self.progress),
    });
    update(0);
    ScrollTrigger.refresh();
    return () => st.kill();
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-paper-2">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12">
          <p className="eyebrow">How it works · 05 steps</p>
          <h2 className="display text-huge text-ink mt-4 font-extrabold">
            From your screen to their hands.
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((s, i) => (
              <li key={s.n}>
                <div className="bg-paper h-40 rounded-2xl p-4">
                  <StageScene index={i} fillRef={fillRef} />
                </div>
                <p className="text-green-deep mt-4 font-mono text-sm">{s.n}</p>
                <h3 className="display text-ink mt-1 text-2xl font-bold">
                  {s.title}
                </h3>
                <p className="text-ink-soft mt-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-paper-2">
      <div
        ref={pinRef}
        className="relative flex h-svh flex-col items-center justify-center overflow-hidden px-6"
      >
        <p className="eyebrow absolute top-10 left-1/2 -translate-x-1/2">
          How it works · 05 steps
        </p>

        {/* stacked scenes */}
        <div className="relative h-[38vh] max-h-[340px] w-full max-w-md">
          {[SceneDesign, SceneOrder, ScenePrint, SceneDeliver].map(
            (Scene, i) => (
              <div
                key={i}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                className="absolute inset-0 grid place-items-center"
                style={{ opacity: 0 }}
              >
                <Scene />
              </div>
            ),
          )}
          <div
            ref={(el) => {
              sceneRefs.current[4] = el;
            }}
            className="absolute inset-0 grid place-items-center"
            style={{ opacity: 0 }}
          >
            <SceneFill fillRef={fillRef} />
          </div>
        </div>

        {/* stacked captions */}
        <div className="relative mt-6 h-40 w-full max-w-lg text-center">
          {STAGES.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => {
                capRefs.current[i] = el;
              }}
              className="absolute inset-x-0 top-0"
              style={{ opacity: 0 }}
            >
              <p className="text-green-deep font-mono text-sm font-bold">
                {s.n} / 05
              </p>
              <h2 className="display text-ink mt-2 text-3xl font-extrabold md:text-4xl">
                {s.title}
              </h2>
              <p className="text-ink-soft mx-auto mt-3 max-w-md">{s.body}</p>
            </div>
          ))}
        </div>

        {/* step dots */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2.5">
          {STAGES.map((s, i) => (
            <span
              key={s.n}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-2 w-2 rounded-full transition-transform"
              style={{ background: "rgba(15,18,17,0.15)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
