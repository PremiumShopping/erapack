"use client";

import Link from "next/link";
import { ArrowRight, Check, Star, Zap } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

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
    <section className="relative isolate flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* soft white halo so the centred content stays legible over the video */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 62% 52% at 50% 46%, rgba(255,255,255,0.82), rgba(255,255,255,0.35) 55%, transparent 74%)",
        }}
      />

      <h1 className="display text-mega text-ink rise-in font-extrabold">
        Your brand,
        <br />
        in{" "}
        <span className="text-green-deep relative inline-block">
          every
          <span className="bg-green absolute inset-x-0 -bottom-1 h-[0.14em] rounded-full" />
        </span>{" "}
        cup.
      </h1>

      <p
        className="text-ink rise-in mt-7 max-w-xl text-lg leading-relaxed font-medium"
        style={{ animationDelay: "0.12s" }}
      >
        Custom paper cups — direct from the manufacturer. No middlemen. Just
        high-quality cups, low minimum orders, and fast delivery.
      </p>

      <div
        className="rise-in mt-7 flex items-center gap-3"
        style={{ animationDelay: "0.2s" }}
      >
        <GoogleG className="h-6 w-6" />
        <span className="flex text-[#F5A623]" aria-label="Rated 5 out of 5">
          {"★★★★★"}
        </span>
        <span className="text-ink text-sm font-semibold">
          Trusted by 700+ customers
        </span>
      </div>

      <div
        className="rise-in mt-9 flex flex-wrap items-center justify-center gap-4"
        style={{ animationDelay: "0.28s" }}
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
          className="border-ink/30 text-ink hover:border-green-deep hover:text-green-deep border-b-2 pb-1 text-base font-semibold transition-colors duration-200 ease-out"
        >
          Design your cup
        </Link>
      </div>

      <ul
        className="rise-in mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        style={{ animationDelay: "0.36s" }}
      >
        {BADGES.map((b) => (
          <li key={b.label} className="flex items-center gap-2">
            <span className="bg-green/20 text-green-deep grid h-6 w-6 place-items-center rounded-full">
              <b.icon size={13} strokeWidth={2.5} />
            </span>
            <span className="text-ink text-sm font-semibold">{b.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
