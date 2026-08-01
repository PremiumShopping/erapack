"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Marquee from "@/components/fx/Marquee";
import { ease } from "@/lib/design-tokens";

/* Line-mask reveal: each line rises out of an overflow-hidden clip. */
const lines: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const line: Variants = {
  hidden: { y: "116%" },
  show: { y: "0%", transition: { duration: 0.95, ease: ease.out } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out, delay: 0.65 },
  },
};

function Stars() {
  return (
    <span className="text-clay" aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

export default function HomeHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      {/* soft kraft light pooling in from the right — sets the material mood */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[-20%] h-[70vh] w-[70vh] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200,169,126,0.55), transparent 62%)",
        }}
      />

      {/* ── minimal top bar (the full nav lands in M2) ── */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 pt-7 md:px-12">
        <Link
          href="/"
          className="display text-2xl font-semibold tracking-tight text-ink"
        >
          Era<span className="text-clay">Pack</span>
        </Link>
        <p className="eyebrow hidden sm:block">Custom paper cups · UK factory</p>
        <Link
          href="/design"
          className="eyebrow rounded-full border border-ink/25 px-4 py-2 text-ink transition-colors hover:border-clay hover:text-clay"
        >
          Design yours
        </Link>
      </header>

      {/* ── hero body — asymmetric 12-col ── */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-12 items-end gap-y-10 px-6 pb-10 pt-16 md:px-12 md:pt-24">
        {/* eyebrow, headline, lede, CTAs */}
        <div className="col-span-12 lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow mb-6"
          >
            Est. UK · Factory-direct · No middlemen
          </motion.p>

          <motion.h1
            variants={lines}
            initial="hidden"
            animate="show"
            className="display text-mega font-semibold text-ink"
          >
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                Your brand,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                in every
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={line}
                className="block italic text-clay"
                style={{ fontStyle: "italic" }}
              >
                cup.
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 max-w-md"
          >
            <p className="text-pretty text-lg leading-relaxed text-ink-soft">
              Full-colour cups printed to order in our UK factory. No towering
              minimums, no setup drama — just your brand, kiln-warm and boxed in
              2–3 days.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/design"
                className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-base font-medium text-paper shadow-[0_14px_30px_-14px_rgba(168,53,24,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-deep"
              >
                Design your cup
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/shop"
                className="border-b border-ink/40 pb-1 text-base font-medium text-ink transition-colors hover:border-clay hover:text-clay"
              >
                Explore the sizes
              </Link>
            </div>
          </motion.div>
        </div>

        {/* right rail — social proof, deliberately off the centre axis */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: ease.out }}
          className="col-span-12 lg:col-span-4 lg:pb-4 lg:text-right"
        >
          <div className="lg:ml-auto lg:max-w-[16rem]">
            <Stars />
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Trusted by{" "}
              <span className="font-semibold text-ink">700+ UK brands</span> —
              cafés, roasters, events and studios who wanted their name on the
              cup, not someone else&apos;s.
            </p>
          </div>
        </motion.aside>

        {/* editorial ledger row — three specs, not three cards */}
        <motion.dl
          variants={fade}
          initial="hidden"
          animate="show"
          className="col-span-12 mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/[0.06] sm:grid-cols-3"
        >
          {[
            { n: "700+", l: "Brands on the shelf" },
            { n: "2–3 days", l: "Printed to your door" },
            { n: "MOQ 1", l: "No minimum order" },
          ].map((s) => (
            <div key={s.l} className="bg-paper px-6 py-5">
              <dt className="display text-3xl font-semibold text-ink md:text-4xl">
                {s.n}
              </dt>
              <dd className="eyebrow mt-2 text-ink-soft">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* ── full-bleed marquee band ── */}
      <div className="relative z-10 border-y border-clay-deep/40 bg-clay text-paper">
        <Marquee duration={30} className="py-3">
          {[
            "YOUR BRAND",
            "IN EVERY CUP",
            "FACTORY DIRECT",
            "LOW MINIMUMS",
            "PRINTED IN THE UK",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center gap-8 pr-8 text-sm font-medium tracking-[0.18em]"
            >
              {t}
              <span className="text-paper/60">✳</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
