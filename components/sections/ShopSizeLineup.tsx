"use client";

import { motion } from "framer-motion";
import { PRODUCTS, CUP_TINTS, SIZE_SCALE } from "@/lib/products";
import { ease } from "@/lib/design-tokens";
import CupGlyph from "@/components/ui/CupGlyph";

const MAX_H = 210; // px height of the 12oz cup; others scale down by volume

/** The four cups drawn to their real relative size, aligned on the counter. */
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
              <CupGlyph
                body={CUP_TINTS[p.size].body}
                band={CUP_TINTS[p.size].band}
                className="h-full w-auto"
              />
            </div>
            <span className="display text-ink mt-4 text-xl font-bold">
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
