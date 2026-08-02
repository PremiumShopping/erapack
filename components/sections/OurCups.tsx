"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ease } from "@/lib/design-tokens";
import CupGlyph from "@/components/ui/CupGlyph";
import { CUP_TINTS } from "@/lib/products";
import { gbp } from "@/lib/format";

export default function OurCups() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Our cups · 04 sizes</p>
            <h2 className="display text-huge text-ink mt-5">
              Pick your size.
              <br />
              <span className="text-green-deep">
                We&apos;ll print the rest.
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group border-ink/20 text-ink hover:border-green-deep hover:text-green-deep inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-colors duration-200 ease-out"
          >
            Shop all sizes
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group border-ink/12 bg-paper-2 hover:border-green relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(15,18,17,0.4)]"
              >
                {p.popular && (
                  <span className="bg-green text-ink absolute top-5 right-5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
                    Most popular
                  </span>
                )}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <CupGlyph
                      body={CUP_TINTS[p.size].body}
                      band={CUP_TINTS[p.size].band}
                      className="h-24 w-auto"
                    />
                    <span className="display text-ink text-3xl font-extrabold">
                      {p.size}
                    </span>
                  </div>
                  <p className="text-green-deep mt-1 text-sm font-semibold">
                    {p.use}
                  </p>
                  <p className="text-ink-soft mt-4 text-sm leading-relaxed text-pretty">
                    {p.blurb}
                  </p>
                </div>
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <span className="text-ink-soft text-xs font-semibold tracking-wide uppercase">
                      From
                    </span>
                    <div className="display text-ink text-2xl font-extrabold">
                      {gbp(p.price1000)}
                    </div>
                    <span className="text-ink-soft text-[11px] font-semibold">
                      per 1,000
                    </span>
                  </div>
                  <span className="bg-ink text-paper group-hover:bg-green group-hover:text-ink grid h-11 w-11 place-items-center rounded-full transition-colors duration-200">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-ink-soft/70 mt-6 text-xs">
          Prices shown are placeholders from the current site — quantity basis
          to be confirmed. Full-colour print, no minimum, 2–3 working-day
          delivery.
        </p>
      </div>
    </section>
  );
}
