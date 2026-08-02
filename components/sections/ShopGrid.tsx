"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { PRODUCTS, PRODUCT_FEATURES, CUP_TINTS } from "@/lib/products";
import { ease } from "@/lib/design-tokens";
import CupGlyph from "@/components/ui/CupGlyph";

export default function ShopGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {PRODUCTS.map((p, i) => (
        <motion.article
          key={p.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: ease.out, delay: i * 0.06 }}
          className="group border-ink/12 bg-paper hover:border-green relative flex flex-col rounded-3xl border p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(15,18,17,0.4)]"
        >
          {p.popular && (
            <span className="bg-green text-ink absolute top-5 right-5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
              Most popular
            </span>
          )}
          <div className="mb-3 flex items-center justify-between">
            <CupGlyph
              body={CUP_TINTS[p.size].body}
              band={CUP_TINTS[p.size].band}
              className="h-28 w-auto"
            />
            <span className="display text-ink text-3xl font-extrabold">
              {p.size}
            </span>
          </div>
          <p className="text-green-deep mt-1 text-sm font-semibold">
            {p.capacity} · {p.use}
          </p>
          <p className="text-ink-soft mt-4 text-sm leading-relaxed text-pretty">
            {p.blurb}
          </p>

          <ul className="mt-6 space-y-2">
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

          <div className="border-ink/10 mt-7 flex items-end justify-between border-t pt-5">
            <div>
              <span className="text-ink-soft text-xs font-semibold tracking-wide uppercase">
                From
              </span>
              <div className="display text-ink text-2xl font-extrabold">
                {p.price}
              </div>
            </div>
          </div>

          <Link
            href="/design"
            className="bg-green text-ink hover:bg-green-soft mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 ease-out active:scale-[0.98]"
          >
            Customise this cup
            <ArrowRight size={16} />
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
