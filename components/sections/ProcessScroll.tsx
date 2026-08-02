"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

/* ---------------------------------------------------------------- helpers -- */

const G = "#39FF14";
const GD = "#1FBF07";
const INK = "#0F1211";
const KRAFT = "#C8A97E";

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const range = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

export type SceneHandle = { animate: (t: number) => void };

/* --------------------------------------------------------------- scene 1 -- */

const SceneDesign = forwardRef<SceneHandle>(function SceneDesign(_, ref) {
  const band = useRef<SVGRectElement>(null);
  const mark = useRef<SVGGElement>(null);
  const cursor = useRef<SVGGElement>(null);
  const ripple = useRef<SVGCircleElement>(null);

  useImperativeHandle(ref, () => ({
    animate(t) {
      const e = easeOut(clamp01(t));
      if (band.current) {
        band.current.style.transformBox = "fill-box";
        band.current.style.transformOrigin = "center";
        band.current.style.transform = `scaleY(${clamp01(t / 0.6)})`;
      }
      if (mark.current) mark.current.style.opacity = String(range(t, 0.5, 0.85));
      if (cursor.current)
        cursor.current.setAttribute(
          "transform",
          `translate(${lerp(64, 0, e)}, ${lerp(46, 0, e)})`,
        );
      if (ripple.current) {
        const r = range(t, 0.45, 0.62);
        ripple.current.setAttribute("r", String(2 + r * 20));
        ripple.current.style.opacity = String((1 - r) * 0.6 * (r > 0 ? 1 : 0));
      }
    },
  }));

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* browser window */}
      <rect x="26" y="26" width="268" height="188" rx="18" fill="#fff" stroke={INK} strokeOpacity="0.12" strokeWidth="2" />
      <rect x="26" y="26" width="268" height="30" rx="18" fill="#F4F6F2" />
      <circle cx="44" cy="41" r="4" fill={INK} opacity="0.25" />
      <circle cx="58" cy="41" r="4" fill={INK} opacity="0.25" />
      <circle cx="72" cy="41" r="4" fill={G} />
      <rect x="120" y="35" width="120" height="12" rx="6" fill={INK} opacity="0.06" />
      {/* tools sidebar */}
      <rect x="38" y="70" width="34" height="128" rx="10" fill="#F4F6F2" />
      <rect x="48" y="82" width="14" height="14" rx="4" fill={G} />
      <text x="55" y="118" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} opacity="0.6" fontFamily="Assistant, sans-serif">T</text>
      <circle cx="55" cy="140" r="7" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="2" />
      <rect x="49" y="158" width="12" height="12" rx="6" fill={KRAFT} />
      {/* cup preview */}
      <path d="M120 82 L182 82 L173 176 Q172 182 166 182 L136 182 Q130 182 129 176 Z" fill="#fff" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
      <rect ref={band} x="116" y="112" width="70" height="30" fill={G} />
      <g ref={mark} style={{ opacity: 0 }}>
        <circle cx="151" cy="127" r="8" fill="none" stroke={INK} strokeWidth="2.4" />
        <circle cx="151" cy="127" r="2.4" fill={INK} />
      </g>
      <ellipse cx="151" cy="82" rx="31" ry="7" fill="#fff" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
      {/* palette */}
      <g>
        <circle cx="222" cy="92" r="8" fill={INK} />
        <circle cx="246" cy="92" r="8" fill={G} stroke={INK} strokeWidth="2" />
        <circle cx="270" cy="92" r="8" fill={KRAFT} />
        <circle cx="222" cy="116" r="8" fill="#1E3A8A" />
        <circle cx="246" cy="116" r="8" fill="#E11D48" />
      </g>
      <rect x="214" y="140" width="64" height="8" rx="4" fill={INK} opacity="0.12" />
      <rect x="214" y="156" width="46" height="8" rx="4" fill={INK} opacity="0.12" />
      {/* ripple + cursor */}
      <circle ref={ripple} cx="151" cy="127" r="0" fill="none" stroke={GD} strokeWidth="2.5" style={{ opacity: 0 }} />
      <g ref={cursor} transform="translate(64,46)">
        <path d="M151 132 l22 8 -9 3 -3 9 z" fill={GD} stroke="#fff" strokeWidth="1.5" />
      </g>
    </svg>
  );
});

/* --------------------------------------------------------------- scene 2 -- */

const SceneOrder = forwardRef<SceneHandle>(function SceneOrder(_, ref) {
  const lineEls = useRef<Array<SVGRectElement | null>>([]);
  const badge = useRef<SVGGElement>(null);
  const tick = useRef<SVGPathElement>(null);

  useImperativeHandle(ref, () => ({
    animate(t) {
      // receipt lines type in, staggered
      [0, 1, 2, 3].forEach((i) => {
        const el = lineEls.current[i];
        if (!el) return;
        const w = range(t, i * 0.09, i * 0.09 + 0.22);
        el.style.transformBox = "fill-box";
        el.style.transformOrigin = "left";
        el.style.transform = `scaleX(${w})`;
      });
      if (badge.current) {
        const s = easeOut(range(t, 0.55, 0.82));
        badge.current.style.transformBox = "fill-box";
        badge.current.style.transformOrigin = "center";
        badge.current.style.transform = `scale(${s})`;
        badge.current.style.opacity = String(clamp01(s * 1.3));
      }
      if (tick.current) {
        const len = 46;
        tick.current.style.strokeDasharray = String(len);
        tick.current.style.strokeDashoffset = String((1 - range(t, 0.72, 0.95)) * len);
      }
    },
  }));

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* receipt */}
      <rect x="66" y="30" width="150" height="176" rx="12" fill="#fff" stroke={INK} strokeOpacity="0.12" strokeWidth="2" />
      <rect x="66" y="30" width="150" height="34" rx="12" fill={INK} />
      <text x="141" y="52" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="Assistant, sans-serif" letterSpacing="1">ORDER</text>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          ref={(el) => {
            lineEls.current[i] = el;
          }}
          x="84"
          y={82 + i * 20}
          width={i % 2 ? 96 : 116}
          height="8"
          rx="4"
          fill={INK}
          opacity={i === 0 ? "0.8" : "0.22"}
        />
      ))}
      {/* barcode */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={84 + i * 8} y="170" width={i % 3 ? 3 : 5} height="24" fill={INK} opacity="0.7" />
      ))}
      {/* accepted badge */}
      <g ref={badge} style={{ opacity: 0 }}>
        <circle cx="214" cy="176" r="36" fill={G} />
        <path ref={tick} d="M198 176 l11 12 22 -26" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
});

/* --------------------------------------------------------------- scene 3 -- */

const ScenePrint = forwardRef<SceneHandle>(function ScenePrint(_, ref) {
  const roller1 = useRef<SVGGElement>(null);
  const roller2 = useRef<SVGGElement>(null);
  const cup = useRef<SVGGElement>(null);
  const band = useRef<SVGRectElement>(null);
  const ink = useRef<SVGGElement>(null);

  useImperativeHandle(ref, () => ({
    animate(t) {
      const spin = t * 900;
      [roller1, roller2].forEach((r) => {
        if (r.current) {
          r.current.style.transformBox = "fill-box";
          r.current.style.transformOrigin = "center";
          r.current.style.transform = `rotate(${spin}deg)`;
        }
      });
      if (cup.current)
        cup.current.setAttribute("transform", `translate(${lerp(-6, 60, easeOut(t))}, 0)`);
      if (band.current) {
        band.current.style.transformBox = "fill-box";
        band.current.style.transformOrigin = "left";
        band.current.style.transform = `scaleX(${range(t, 0.15, 0.7)})`;
      }
      if (ink.current) {
        const d = (t * 2) % 1;
        ink.current.setAttribute("transform", `translate(0, ${d * 46})`);
        ink.current.style.opacity = String(1 - d);
      }
    },
  }));

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* press frame */}
      <rect x="40" y="60" width="240" height="86" rx="16" fill="#F4F6F2" stroke={INK} strokeOpacity="0.12" strokeWidth="2" />
      <rect x="60" y="48" width="200" height="14" rx="7" fill={INK} opacity="0.85" />
      {/* rollers */}
      <g ref={roller1}>
        <circle cx="98" cy="104" r="26" fill="#fff" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
        <path d="M98 78 v52 M72 104 h52" stroke={G} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g ref={roller2}>
        <circle cx="222" cy="104" r="26" fill="#fff" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
        <path d="M222 78 v52 M196 104 h52" stroke={GD} strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* ink drop */}
      <g ref={ink}>
        <path d="M160 40 c6 10 10 15 10 22 a10 10 0 0 1 -20 0 c0 -7 4 -12 10 -22 z" fill={G} />
      </g>
      {/* conveyor */}
      <rect x="36" y="206" width="248" height="10" rx="5" fill={INK} opacity="0.1" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={52 + i * 28} cy="211" r="3" fill={INK} opacity="0.25" />
      ))}
      {/* printed cup */}
      <g ref={cup}>
        <path d="M124 152 L184 152 L175 202 Q174 208 168 208 L140 208 Q134 208 133 202 Z" fill="#fff" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
        <rect ref={band} x="120" y="170" width="68" height="20" fill={G} />
        <ellipse cx="154" cy="152" rx="30" ry="6" fill="#fff" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
      </g>
    </svg>
  );
});

/* --------------------------------------------------------------- scene 4 -- */

const SceneDeliver = forwardRef<SceneHandle>(function SceneDeliver(_, ref) {
  const van = useRef<SVGGElement>(null);
  const wheel1 = useRef<SVGGElement>(null);
  const wheel2 = useRef<SVGGElement>(null);
  const lines = useRef<SVGGElement>(null);

  useImperativeHandle(ref, () => ({
    animate(t) {
      if (van.current)
        van.current.setAttribute("transform", `translate(${lerp(-150, 26, easeOut(t))}, 0)`);
      const spin = t * 1000;
      [wheel1, wheel2].forEach((w) => {
        if (w.current) {
          w.current.style.transformBox = "fill-box";
          w.current.style.transformOrigin = "center";
          w.current.style.transform = `rotate(${spin}deg)`;
        }
      });
      if (lines.current)
        lines.current.style.opacity = String(0.3 + Math.abs(Math.sin(t * 12)) * 0.5);
    },
  }));

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* road */}
      <rect x="20" y="200" width="280" height="6" rx="3" fill={INK} opacity="0.12" />
      <g ref={lines} style={{ opacity: 0.4 }}>
        <rect x="8" y="120" width="30" height="7" rx="3" fill={GD} />
        <rect x="2" y="142" width="40" height="7" rx="3" fill={GD} opacity="0.7" />
        <rect x="12" y="164" width="24" height="7" rx="3" fill={GD} opacity="0.85" />
      </g>
      <g ref={van} transform="translate(26,0)">
        {/* cargo box */}
        <rect x="40" y="92" width="132" height="86" rx="12" fill="#fff" stroke={INK} strokeOpacity="0.2" strokeWidth="2.5" />
        <rect x="58" y="108" width="98" height="22" rx="6" fill={G} />
        <text x="107" y="124" textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily="Assistant, sans-serif">ERA PACK</text>
        {/* parcel + cup icon on side */}
        <rect x="66" y="142" width="26" height="24" rx="4" fill={KRAFT} opacity="0.5" />
        {/* cabin */}
        <path d="M172 116 h40 l30 34 v28 h-70 z" fill="#F4F6F2" stroke={INK} strokeOpacity="0.2" strokeWidth="2.5" />
        <path d="M178 122 h30 l20 24 h-50 z" fill="#dfeef0" />
        <circle cx="238" cy="150" r="4" fill={G} />
        {/* wheels */}
        <g ref={wheel1}>
          <circle cx="82" cy="182" r="19" fill={INK} />
          <circle cx="82" cy="182" r="7" fill="#fff" />
          <path d="M82 168 v28 M68 182 h28" stroke="#fff" strokeWidth="2.5" />
        </g>
        <g ref={wheel2}>
          <circle cx="210" cy="182" r="19" fill={INK} />
          <circle cx="210" cy="182" r="7" fill="#fff" />
          <path d="M210 168 v28 M196 182 h28" stroke="#fff" strokeWidth="2.5" />
        </g>
      </g>
    </svg>
  );
});

/* --------------------------------------------------------------- scene 5 -- */

const SceneFill = forwardRef<SceneHandle>(function SceneFill(_, ref) {
  const fill = useRef<SVGRectElement>(null);
  const crema = useRef<SVGEllipseElement>(null);
  const steam = useRef<SVGGElement>(null);
  const pour = useRef<SVGRectElement>(null);

  useImperativeHandle(ref, () => ({
    animate(t) {
      const level = easeOut(clamp01(t));
      if (fill.current) {
        const h = level * 150;
        fill.current.setAttribute("height", String(h));
        fill.current.setAttribute("y", String(200 - h));
      }
      if (pour.current) {
        const p = range(t, 0.05, 0.7);
        pour.current.style.opacity = String(p > 0 && t < 0.75 ? 0.85 : 0);
        pour.current.setAttribute("height", String(range(t, 0.05, 0.25) * 46));
      }
      if (crema.current) {
        const c = range(t, 0.55, 0.8);
        crema.current.setAttribute("cy", String(200 - level * 150 - 2));
        crema.current.style.opacity = String(c);
        crema.current.setAttribute("rx", String(c * 34));
      }
      if (steam.current) {
        const s = range(t, 0.72, 1);
        steam.current.style.opacity = String(s * 0.6);
        steam.current.setAttribute("transform", `translate(0, ${(1 - s) * 14})`);
      }
    },
  }));

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <clipPath id="proc-cup-clip">
          <path d="M112 44 L208 44 L194 196 Q193 204 185 204 L135 204 Q127 204 126 196 Z" />
        </clipPath>
      </defs>
      {/* espresso pour */}
      <rect ref={pour} x="156" y="12" width="8" height="0" rx="4" fill="#2a1206" style={{ opacity: 0 }} />
      {/* coffee */}
      <rect ref={fill} x="118" y="200" width="84" height="0" fill="#2a1206" clipPath="url(#proc-cup-clip)" />
      <ellipse ref={crema} cx="160" cy="198" rx="0" ry="5" fill="#c77f49" clipPath="url(#proc-cup-clip)" style={{ opacity: 0 }} />
      {/* cup body + band */}
      <rect x="108" y="92" width="104" height="28" fill={G} clipPath="url(#proc-cup-clip)" />
      <text x="160" y="110" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} clipPath="url(#proc-cup-clip)" fontFamily="Assistant, sans-serif">ERA PACK</text>
      <path d="M112 44 L208 44 L194 196 Q193 204 185 204 L135 204 Q127 204 126 196 Z" fill="none" stroke={INK} strokeOpacity="0.22" strokeWidth="2.5" />
      <ellipse cx="160" cy="44" rx="48" ry="11" fill="#fff" stroke={INK} strokeOpacity="0.25" strokeWidth="2.5" />
      <ellipse cx="160" cy="44" rx="38" ry="8" fill={INK} opacity="0.05" />
      {/* steam */}
      <g ref={steam} style={{ opacity: 0 }}>
        <path d="M146 30 q-9 -13 0 -26 q9 -13 0 -22" fill="none" stroke={GD} strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
        <path d="M174 30 q9 -13 0 -26 q-9 -13 0 -22" fill="none" stroke={GD} strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
});

/* --------------------------------------------------------------- content -- */

const STAGES = [
  {
    n: "01",
    title: "Design it",
    body: "Upload your logo, add text and colours in the live 3D studio — watch it wrap the cup in real time.",
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
    body: "Boxed and on its way in 2–3 working days, next-day available. Free UK shipping over £100.",
  },
  {
    n: "05",
    title: "You fill it up",
    body: "Your brand, in every cup — poured, served, and remembered. That's the whole point.",
  },
];

const SCENE_COMPONENTS = [
  SceneDesign,
  SceneOrder,
  ScenePrint,
  SceneDeliver,
  SceneFill,
];

export default function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sceneWrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sceneApiRefs = useRef<Array<SceneHandle | null>>([]);
  const capRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !pinRef.current) return;
    const N = STAGES.length;

    const update = (p: number) => {
      const active = Math.min(N - 1, Math.floor(p * N + 0.0001));
      STAGES.forEach((_, i) => {
        const center = (i + 0.5) / N;
        const o = Math.max(0, 1 - Math.abs(p - center) / (0.62 / N));
        const wrap = sceneWrapRefs.current[i];
        const cap = capRefs.current[i];
        if (wrap) {
          wrap.style.opacity = String(o);
          wrap.style.transform = `translate3d(0, ${(1 - o) * 24}px, 0) scale(${0.95 + o * 0.05})`;
        }
        if (cap) {
          cap.style.opacity = String(o);
          cap.style.transform = `translate3d(0, ${(1 - o) * 16}px, 0)`;
        }
        const dot = dotRefs.current[i];
        if (dot) {
          dot.style.background = i <= active ? G : "rgba(15,18,17,0.15)";
          dot.style.transform = i === active ? "scale(1.5)" : "scale(1)";
        }
        // per-scene micro animation
        sceneApiRefs.current[i]?.animate(clamp01((p - i / N) * N));
      });
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=420%",
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
          <h2 className="display mt-4 text-huge font-extrabold text-ink">
            From your screen to their hands.
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((s, i) => {
              const Scene = SCENE_COMPONENTS[i];
              return (
                <li key={s.n}>
                  <div className="grid h-44 place-items-center rounded-2xl bg-paper">
                    <Scene />
                  </div>
                  <p className="mt-4 font-mono text-sm text-green-deep">{s.n}</p>
                  <h3 className="display mt-1 text-2xl font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-ink-soft">{s.body}</p>
                </li>
              );
            })}
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
        <p className="eyebrow absolute left-1/2 top-10 -translate-x-1/2">
          How it works · 05 steps
        </p>

        {/* stacked scenes */}
        <div className="relative h-[40vh] max-h-[360px] w-full max-w-md">
          {SCENE_COMPONENTS.map((Scene, i) => (
            <div
              key={i}
              ref={(el) => {
                sceneWrapRefs.current[i] = el;
              }}
              className="absolute inset-0 grid place-items-center"
              style={{ opacity: 0 }}
            >
              <Scene
                ref={(el) => {
                  sceneApiRefs.current[i] = el;
                }}
              />
            </div>
          ))}
        </div>

        {/* stacked captions */}
        <div className="relative mt-4 h-40 w-full max-w-lg text-center">
          {STAGES.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => {
                capRefs.current[i] = el;
              }}
              className="absolute inset-x-0 top-0"
              style={{ opacity: 0 }}
            >
              <p className="font-mono text-sm font-bold text-green-deep">
                {s.n} / 05
              </p>
              <h2 className="display mt-2 text-3xl font-extrabold text-ink md:text-4xl">
                {s.title}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-ink-soft">{s.body}</p>
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
