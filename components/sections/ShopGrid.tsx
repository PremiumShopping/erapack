"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { PRODUCTS, PRODUCT_FEATURES, SIZE_SCALE } from "@/lib/products";
import { ease } from "@/lib/design-tokens";
import { gbp } from "@/lib/format";

const GLYPH_BOX = 132; // px — cups scale within this, aligned to the base

export default function ShopGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PRODUCTS.map((p, i) => (
        <motion.article
          key={p.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: ease.out, delay: i * 0.06 }}
          className="group border-ink bg-paper hover:border-green-deep relative flex flex-col rounded-md border-2 p-6 transition-colors duration-200 ease-out"
        >
          {p.popular && (
            <span className="ink-block absolute -top-3 left-6 px-2 py-1 text-[10px] font-bold tracking-wide uppercase">
              Most popular
            </span>
          )}
          <div className="flex items-end justify-between">
            <div
              className="flex items-end"
              style={{ height: GLYPH_BOX }}
            >
              <div
                className="flex items-end"
                style={{ height: SIZE_SCALE[p.size] * GLYPH_BOX }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cups/era-cup.png"
                  alt={`ERA PACK ${p.size} cup`}
                  className="h-full w-auto object-contain object-bottom"
                />
              </div>
            </div>
            <span className="display text-ink text-3xl font-bold">
              {p.size}
            </span>
          </div>
          <p className="text-green-deep mt-4 text-sm font-semibold">
            {p.capacity} · {p.use}
          </p>
          <p className="text-ink-soft mt-2 text-sm leading-relaxed text-pretty">
            {p.blurb}
          </p>

          <ul className="mt-5 space-y-2">
            {PRODUCT_FEATURES.map((f) => (
              <li
                key={f}
                className="text-ink-soft flex items-center gap-2 text-sm"
              >
                <Check
                  size={14}
                  strokeWidth={3}
                  className="text-green-deep shrink-0"
                />
                {f}
              </li>
            ))}
          </ul>

          <div className="rule-green mt-6 flex items-end justify-between pt-4">
            <div>
              <span className="text-ink-soft text-[11px] font-semibold tracking-wide uppercase">
                From
              </span>
              <div className="display text-ink text-2xl font-bold [font-variant-numeric:tabular-nums]">
                {gbp(p.price1000)}
              </div>
              <span className="text-ink-soft text-[11px] font-semibold">
                per 1,000
              </span>
            </div>
          </div>

          <Link
            href="/design"
            className="bg-green text-ink mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_var(--color-ink)] transition-transform duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Customise this cup
            <ArrowRight size={16} />
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
