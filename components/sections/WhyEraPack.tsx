"use client";

import { motion } from "framer-motion";
import { Boxes, BadgePoundSterling, Truck, Leaf } from "lucide-react";
import { ease } from "@/lib/design-tokens";

const VALUES = [
  {
    icon: Boxes,
    title: "No minimum order",
    body: "Most printers want 5,000 before they'll turn the press on. We'll do one sleeve.",
  },
  {
    icon: BadgePoundSterling,
    title: "Factory-direct pricing",
    body: "We own the press, so there's no reseller margin on top. Find it cheaper and we'll match it.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    body: "Next-day if you're in a hurry; otherwise boxed and couriered in two to three working days.",
  },
  {
    icon: Leaf,
    title: "Genuinely eco",
    body: "Recyclable board, water-based inks, a factory on renewable power. We don't make a song and dance about it.",
  },
];

export default function WhyEraPack() {
  return (
    <section className="bg-paper-warm">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* left — heading (sticky on desktop) */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">The honest pitch</p>
          <h2 className="display text-huge text-ink mt-5 font-bold">
            Big-brand cups,
            <br />
            <span className="text-green-deep">without the minimums.</span>
          </h2>
          <p className="text-ink-soft mt-6 max-w-sm text-lg leading-relaxed">
            A UK manufacturer built for fast turnaround and low minimums — so
            independents and chains alike get affordable, properly-printed
            custom cups.
          </p>
        </div>

        {/* right — editorial list organised by green keylines */}
        <ol>
          {VALUES.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: ease.out, delay: i * 0.06 }}
              className={`grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-2 py-8 ${
                i === 0 ? "" : "rule-green"
              }`}
            >
              <span className="bg-ink text-green ring-green/50 grid h-12 w-12 place-items-center rounded-[3px] ring-1">
                <v.icon size={20} strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="display text-ink text-2xl font-semibold md:text-3xl">
                  {v.title}
                </h3>
                <p className="text-ink-soft mt-2 max-w-lg leading-relaxed text-pretty">
                  {v.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
