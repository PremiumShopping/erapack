"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check, Star, Zap } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { ease } from "@/lib/design-tokens";

const HeroCup = dynamic(() => import("@/components/three/HeroCupCanvas"), {
  ssr: false,
  loading: () => null,
});

const lines: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const line: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: ease.out } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out, delay: 0.45 + d },
  }),
};

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

const BADGES = [
  { icon: Check, label: "Low MOQ" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: Star, label: "Premium Quality" },
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* live 3D cup — full-bleed on mobile, biased right on desktop */}
      <div className="absolute inset-y-0 right-0 h-full w-full lg:w-[64%]">
        <HeroCup />
      </div>

      {/* legibility scrims: keep the left (text) clean white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #fff 0%, #fff 24%, rgba(255,255,255,0.82) 40%, rgba(255,255,255,0) 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.72) 34%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* content (pointer-events pass through to the cup except on controls) */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[78svh] w-full max-w-[1440px] flex-col justify-start px-6 pt-14 pb-16 md:px-12 lg:min-h-[86svh] lg:justify-center lg:py-20">
        <div className="max-w-xl">
          <motion.h1
            variants={lines}
            initial="hidden"
            animate="show"
            className="display text-mega text-ink font-extrabold"
          >
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                Your brand,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                in{" "}
                <span className="text-green-deep relative inline-block">
                  every
                  <span className="bg-green absolute inset-x-0 -bottom-1 h-[0.14em] rounded-full" />
                </span>{" "}
                cup.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-ink-soft mt-7 max-w-md text-lg leading-relaxed"
          >
            Custom paper cups — direct from the manufacturer. No middlemen. Just
            high-quality cups, low minimum orders, and fast delivery.
          </motion.p>

          {/* google trust */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mt-7 flex items-center gap-3"
          >
            <GoogleG className="h-6 w-6" />
            <span className="flex text-[#F5A623]" aria-label="Rated 5 out of 5">
              {"★★★★★"}
            </span>
            <span className="text-ink text-sm font-semibold">
              Trusted by 700+ customers
            </span>
          </motion.div>

          {/* CTAs — re-enable pointer events */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <Link
                href="/shop"
                className="group bg-green text-ink hover:bg-green-soft inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold shadow-[0_16px_34px_-16px_rgba(57,255,20,0.85)] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
                Shop Cups
              </Link>
            </Magnetic>
            <Link
              href="/design"
              className="border-ink/25 text-ink hover:border-green-deep hover:text-green-deep border-b-2 pb-1 text-base font-semibold transition-colors duration-200 ease-out"
            >
              Design your cup
            </Link>
          </motion.div>

          {/* feature badges */}
          <motion.ul
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {BADGES.map((b) => (
              <li key={b.label} className="flex items-center gap-2">
                <span className="bg-green/15 text-green-deep grid h-6 w-6 place-items-center rounded-full">
                  <b.icon size={13} strokeWidth={2.5} />
                </span>
                <span className="text-ink text-sm font-semibold">
                  {b.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* subtle hint that the cup is interactive (desktop) */}
        <p className="text-ink-soft/60 pointer-events-none absolute right-8 bottom-6 hidden font-mono text-[11px] tracking-[0.2em] uppercase lg:block">
          Drag the cup ↻
        </p>
      </div>
    </section>
  );
}
