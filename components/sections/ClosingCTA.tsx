import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ClosingCTA() {
  return (
    <section className="green-block reg-marks">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow !text-ink/60">Free 3D design studio</p>
            <h2 className="display text-ink text-huge mt-4 max-w-2xl font-bold">
              Design your cup in minutes.
            </h2>
            <p className="text-ink/75 mt-6 max-w-md text-lg leading-relaxed">
              Drop in your logo, colours and text right in the browser — no
              back-and-forth. Let&apos;s make something worth holding.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/design"
              className="group bg-ink text-paper inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold shadow-[3px_3px_0_0_rgba(15,18,17,0.25)] transition-transform duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5"
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
      </div>
    </section>
  );
}
