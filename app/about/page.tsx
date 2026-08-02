import type { Metadata } from "next";
import { Boxes, BadgePoundSterling, Truck, Recycle } from "lucide-react";
import ClosingCTA from "@/components/sections/ClosingCTA";
import StatsBand from "@/components/sections/StatsBand";

export const metadata: Metadata = {
  title: "About Era Pack",
  description:
    "A UK manufacturer of custom-branded, eco-friendly paper cups. Made in the UK, low minimums, factory-direct, 100% recyclable.",
};

const VALUES = [
  {
    icon: Boxes,
    title: "Low minimums",
    body: "Every business deserves access to quality cups, which is why we keep minimums low — start-ups to chains alike.",
  },
  {
    icon: BadgePoundSterling,
    title: "Factory-direct",
    body: "No middlemen, just factory-direct pricing — backed by price matching and a price guarantee.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    body: "Next-day delivery is available, and standard orders are boxed in 2–3 working days.",
  },
  {
    icon: Recycle,
    title: "Eco friendly",
    body: "100% recyclable materials, with a goal to power all operations on 50% renewable energy by 2030.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-14 md:px-12 md:pt-24">
          <p className="eyebrow">About Era Pack</p>
          <h1 className="display text-mega text-ink mt-5 max-w-4xl leading-[0.95] font-extrabold">
            Be seen. Be remembered.
            <br />
            <span className="text-green-deep">One cup at a time.</span>
          </h1>
          <p className="text-ink-soft mt-8 max-w-2xl text-xl leading-relaxed">
            EraPack is a leading UK-based paper cup manufacturer specialising in
            eco-friendly, high-quality branded paper cups. By manufacturing
            directly, we help brands streamline the process, reduce costs, and
            create packaging that leaves a lasting impression.
          </p>
        </div>
      </section>

      <StatsBand />

      {/* values */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12">
          <h2 className="display text-huge text-ink max-w-2xl font-extrabold">
            Helping businesses stand out — one cup at a time.
          </h2>
          <p className="text-ink-soft mt-5 max-w-xl text-lg">
            Helping businesses elevate their brands and create lasting customer
            connections through custom packaging designed to make you stand out.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title}>
                <span className="bg-green/15 text-green-deep grid h-12 w-12 place-items-center rounded-full">
                  <v.icon size={22} strokeWidth={2.2} />
                </span>
                <h3 className="display text-ink mt-5 text-xl font-bold">
                  {v.title}
                </h3>
                <p className="text-ink-soft mt-2 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* sustainability */}
      <section className="bg-charcoal text-paper">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-24 md:grid-cols-2 md:px-12">
          <div>
            <p className="eyebrow" style={{ color: "var(--color-green-soft)" }}>
              Sustainability
            </p>
            <h2 className="display text-huge mt-5 font-extrabold">
              Low footprint,
              <br />
              <span className="text-green">no fuss.</span>
            </h2>
          </div>
          <p className="text-paper/70 text-lg leading-relaxed">
            Sustainability sits at the heart of everything we do. We use 100%
            recyclable materials, water-based inks, and we&apos;re working
            toward powering all operations on 50% renewable energy by 2030.
            <span className="text-paper/40 mt-3 block text-sm">
              TODO-CONFIRM: the live site&apos;s homepage says &ldquo;renewable
              energy&rdquo; while the About page states the 50%-by-2030 goal.
            </span>
          </p>
        </div>
      </section>

      <ClosingCTA />
    </main>
  );
}
