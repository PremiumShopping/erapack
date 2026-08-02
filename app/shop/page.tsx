import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ShopGrid from "@/components/sections/ShopGrid";
import ShopSizeLineup from "@/components/sections/ShopSizeLineup";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { PRODUCTS } from "@/lib/products";
import { gbp } from "@/lib/format";

export const metadata: Metadata = {
  title: "Shop — custom paper cups",
  description:
    "4oz, 6oz, 8oz and 12oz custom-branded paper cups. Full-colour print, no minimum order, 2–3 working-day delivery, factory-direct.",
};

const COLS = [
  "Size",
  "Capacity",
  "Best for",
  "Print",
  "MOQ",
  "Delivery",
  "From",
];

export default function ShopPage() {
  return (
    <main>
      {/* header */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-14 md:px-12 md:pt-20">
          <p className="eyebrow">The range</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h1 className="display text-mega text-ink max-w-2xl font-bold">
              Four sizes,
              <br />
              <span className="text-green-deep">factory-direct.</span>
            </h1>
            <p className="text-ink-soft max-w-sm text-lg leading-relaxed">
              Full-colour and yours to brand — printed in our own UK factory. No
              minimum, 2–3 working-day delivery, free UK shipping over £100.
            </p>
          </div>
        </div>
      </section>

      {/* to-scale line-up */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 pb-12 md:px-12">
          <ShopSizeLineup />
        </div>
      </section>

      {/* product grid */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 pb-8 md:px-12">
          <ShopGrid />
        </div>
      </section>

      {/* spec comparison table */}
      <section className="bg-paper-warm">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12">
          <h2 className="display text-huge text-ink font-bold">
            The whole range, on one line
          </h2>
          <p className="text-ink-soft mt-4 max-w-xl">
            Same promise across every size — full-colour print, no minimum, fast
            turnaround.
          </p>

          <div className="border-ink bg-paper mt-10 overflow-x-auto rounded-md border-2">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="green-block">
                  {COLS.map((c) => (
                    <th
                      key={c}
                      className="px-6 py-4 text-xs font-bold tracking-wide uppercase"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr
                    key={p.slug}
                    className="border-ink/10 hover:bg-green/[0.06] border-b transition-colors last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <span className="display text-ink text-xl font-bold">
                        {p.size}
                      </span>
                      {p.popular && (
                        <span className="ink-block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="text-ink-soft px-6 py-5">{p.capacity}</td>
                    <td className="text-ink-soft px-6 py-5">{p.use}</td>
                    <td className="text-ink-soft px-6 py-5">Full-colour</td>
                    <td className="text-ink-soft px-6 py-5">1 (no minimum)</td>
                    <td className="text-ink-soft px-6 py-5">2–3 days</td>
                    <td className="px-6 py-5">
                      <span className="text-ink font-bold [font-variant-numeric:tabular-nums]">
                        {gbp(p.price1000)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-soft mt-4 text-xs">
            Prices are per 1,000, full-colour, before VAT. No plate fees, no
            minimum, boxed in 2–3 working days.
          </p>

          <Link
            href="/design"
            className="bg-ink text-paper mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold shadow-[3px_3px_0_0_var(--color-green)] transition-transform duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Design your cup
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <ClosingCTA />
    </main>
  );
}
