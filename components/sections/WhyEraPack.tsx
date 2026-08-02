"use client";

import { motion } from "framer-motion";
import { Boxes, BadgePoundSterling, Truck, Leaf } from "lucide-react";
import { ease } from "@/lib/design-tokens";

const VALUES = [
  {
    icon: Boxes,
    title: "No minimum order",
    body: "Every business deserves access to quality cups — so we set no minimum order quantity. Order a single sleeve or ten thousand.",
  },
  {
    icon: BadgePoundSterling,
    title: "Factory-direct pricing",
    body: "No middlemen, just factory-direct pricing. That's why we confidently offer price matching and a price guarantee.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    body: "Busy days or a last-minute event? We get it. Next-day delivery is available, with your cups boxed in 2–3 working days.",
  },
  {
    icon: Leaf,
    title: "Genuinely eco",
    body: "Sustainability sits at the heart of it: 100% recyclable materials, water-based inks and operations run on renewable energy.",
  },
];

export default function WhyEraPack() {
  return (
    <section className="bg-paper-2/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* left — heading (sticky on desktop) */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">Why EraPack</p>
          <h2 className="display text-huge text-ink mt-5">
            Big-brand cups,
            <br />
            <span className="text-green-deep">without the minimums.</span>
          </h2>
          <p className="text-ink-soft mt-6 max-w-sm text-lg leading-relaxed">
            A UK manufacturer specialising in fast turnaround and low minimums —
            so independents and chains alike get affordable, high-quality
            custom-branded cups.
          </p>
        </div>

        {/* right — numbered editorial list */}
        <ol>
          {VALUES.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: ease.out, delay: i * 0.06 }}
              className="border-ink/12 grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-2 border-t py-8 first:border-t-0 first:pt-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-green-deep font-mono text-sm">
                  0{i + 1}
                </span>
                <span className="bg-green/15 text-green-deep grid h-12 w-12 place-items-center rounded-full">
                  <v.icon size={20} strokeWidth={2.2} />
                </span>
              </div>
              <div>
                <h3 className="display text-ink text-2xl font-bold md:text-3xl">
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
