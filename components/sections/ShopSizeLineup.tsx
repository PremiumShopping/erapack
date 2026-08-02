"use client";

import { motion } from "framer-motion";
import { PRODUCTS, SIZE_SCALE } from "@/lib/products";
import { ease } from "@/lib/design-tokens";

const MAX_H = 230; // px height of the 12oz cup; others scale down by volume

/** The four cups (real ERA PACK photo) drawn to their real relative size. */
export default function ShopSizeLineup() {
  return (
    <div className="border-ink/15 bg-paper-warm reg-marks rounded-md border-2 p-8 md:p-10">
      <p className="eyebrow">Actual sizes, side by side</p>
      <div className="rule mt-4 mb-8" />
      <div className="flex items-end justify-center gap-4 sm:gap-10 md:gap-16">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: ease.out, delay: i * 0.07 }}
            className="flex flex-col items-center"
          >
            <div
              className="flex items-end"
              style={{ height: SIZE_SCALE[p.size] * MAX_H }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cups/era-cup.png"
                alt={`ERA PACK ${p.size} cup`}
                className="h-full w-auto object-contain object-bottom"
              />
            </div>
            <span className="display text-ink mt-3 text-xl font-bold">
              {p.size}
            </span>
            <span className="text-ink-soft text-xs font-semibold">
              {p.capacity}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
