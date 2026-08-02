"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS, SIZE_SCALE } from "@/lib/products";
import { ease } from "@/lib/design-tokens";
import { gbp } from "@/lib/format";

// cups scale within this box, aligned to the base — the row reads like a size chart
const GLYPH_BOX = 116;

export default function OurCups() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The range</p>
            <h2 className="display text-huge text-ink mt-4 font-bold">
              Four sizes.
              <br />
              <span className="text-green-deep">You bring the artwork.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-ink hover:text-green-deep border-ink border-b-2 pb-0.5 text-sm font-bold transition-colors"
          >
            Prices &amp; sizes →
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 items-end gap-5 sm:grid-cols-2 lg:grid-cols-[0.9fr_1fr_1.1fr_1.3fr]">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: ease.out, delay: i * 0.06 }}
            >
              <Link
                href="/design"
                className="group border-ink bg-paper hover:border-green-deep relative flex h-full flex-col rounded-md border-2 p-6 transition-colors duration-200 ease-out"
              >
                {p.popular && (
                  <span className="ink-block absolute -top-3 left-6 px-2 py-1 text-[10px] font-bold tracking-wide uppercase">
                    Most popular
                  </span>
                )}
                <div className="flex items-end justify-between">
                  <div className="flex items-end" style={{ height: GLYPH_BOX }}>
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
                <p className="text-green-deep mt-5 text-sm font-semibold">
                  {p.use}
                </p>
                <p className="text-ink-soft mt-2 flex-1 text-sm leading-relaxed text-pretty">
                  {p.blurb}
                </p>
                <div className="rule-green mt-5 flex items-end justify-between pt-4">
                  <div>
                    <span className="text-ink-soft text-[11px] font-semibold tracking-wide uppercase">
                      From
                    </span>
                    <div className="display text-ink text-2xl font-bold [font-variant-numeric:tabular-nums]">
                      {gbp(p.price1000)}
                    </div>
                    <span className="text-ink-soft text-[11px]">per 1,000</span>
                  </div>
                  <span className="text-ink group-hover:text-green-deep pb-1 text-sm font-bold transition-colors">
                    Design →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-ink-soft mt-8 max-w-2xl text-xs leading-relaxed">
          Prices are per 1,000, full-colour, before VAT. No minimum, no plate
          fees, boxed in 2–3 working days.
        </p>
      </div>
    </section>
  );
}
