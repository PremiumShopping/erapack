import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/faq";
import ClosingCTA from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Lead times, artwork formats, minimums, delivery and reorders — the questions we get most about custom paper cups.",
};

export default function FaqPage() {
  return (
    <main>
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-24">
          <p className="eyebrow">FAQ</p>
          <h1 className="display text-mega text-ink mt-4 font-extrabold">
            Good to know.
          </h1>
          <p className="text-ink-soft mt-5 text-lg">
            Everything on lead times, artwork, minimums and reordering. Still
            stuck?{" "}
            <Link
              href="/contact"
              className="text-green-deep font-semibold underline-offset-4 hover:underline"
            >
              Talk to the team
            </Link>
            .
          </p>

          <div className="mt-12">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group border-ink/10 border-b [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
                  <span className="text-ink text-lg font-bold">{f.q}</span>
                  <ChevronDown
                    size={20}
                    className="text-ink-soft shrink-0 transition-transform duration-200 ease-out group-open:rotate-180"
                  />
                </summary>
                <p className="text-ink-soft pr-8 pb-6 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </main>
  );
}
