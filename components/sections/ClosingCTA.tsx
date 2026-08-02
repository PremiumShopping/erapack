import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ClosingCTA() {
  return (
    <section className="bg-green/70 text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-24 text-center md:px-12 md:py-28">
        <p className="eyebrow !text-ink/60">Free design help included</p>
        <h2 className="display text-huge mx-auto mt-5 max-w-3xl font-extrabold">
          Ready to put your brand on every cup?
        </h2>
        <p className="text-ink/75 mx-auto mt-5 max-w-xl text-lg font-medium">
          Low minimums, factory-direct pricing and cups boxed in 2–3 working
          days. Let&apos;s make something worth holding.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/design"
            className="group bg-ink text-paper inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Design your cup
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/shop"
            className="border-ink text-ink hover:bg-ink hover:text-paper inline-flex items-center rounded-full border-2 px-8 py-4 text-base font-bold transition-colors duration-200 ease-out"
          >
            Shop cups
          </Link>
        </div>
      </div>
    </section>
  );
}
