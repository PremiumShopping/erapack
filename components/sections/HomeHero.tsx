"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function HomeHero() {
  return (
    <section className="relative isolate grid min-h-[90svh] grid-cols-12 content-end gap-y-6 px-6 pt-28 pb-16 md:px-12 md:pb-20">
      {/* left-weighted scrim — keeps the copy legible while the film reads to the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 30%, rgba(255,255,255,0.28) 56%, transparent 76%)",
        }}
      />

      <div className="col-span-12 lg:col-span-8">
        <p className="eyebrow rise-in">Custom paper cups, printed in Britain</p>

        <h1 className="display text-ink text-mega rise-in mt-4 leading-[0.9] -tracking-[0.03em]">
          <span className="block font-normal">Your brand,</span>
          <span className="block font-bold">
            in{" "}
            <span className="font-editorial text-green-deep font-normal italic">
              every
            </span>{" "}
            cup.
          </span>
        </h1>

        <p
          className="text-ink rise-in mt-7 max-w-xl text-lg leading-relaxed"
          style={{ animationDelay: "0.1s" }}
        >
          We print custom paper cups in our own UK factory — no reseller marking
          them up. Order a single sleeve or ten thousand; boxed and gone in two
          to three working days.
        </p>

        <div
          className="rise-in mt-9 flex flex-wrap items-center gap-6"
          style={{ animationDelay: "0.18s" }}
        >
          <Magnetic strength={0.3}>
            <Link
              href="/shop"
              className="group bg-green text-ink inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold shadow-[3px_3px_0_0_var(--color-ink)] transition-transform duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
            >
              See the cups
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </Magnetic>
          <Link
            href="/design"
            className="border-ink/40 text-ink hover:border-green-deep hover:text-green-deep border-b-2 pb-0.5 text-base font-semibold transition-colors duration-200 ease-out"
          >
            Or design one now →
          </Link>
        </div>

        <p
          className="text-ink-soft rise-in mt-7 font-mono text-xs tracking-wide"
          style={{ animationDelay: "0.26s" }}
        >
          Order just one · Boxed in 2–3 days · Printed in Britain
        </p>
      </div>
    </section>
  );
}
