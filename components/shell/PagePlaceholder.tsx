import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Branded interim page for routes a later milestone fully builds out. Keeps the
 * nav/footer entirely clickable while the site comes together, without ever
 * showing a raw 404.
 */
export default function PagePlaceholder({
  kicker,
  title,
  blurb,
  milestone,
}: {
  kicker: string;
  title: string;
  blurb: string;
  milestone: string;
}) {
  return (
    <main className="mx-auto flex min-h-[72vh] w-full max-w-[1440px] flex-col justify-center px-6 py-32 md:px-12">
      <p className="eyebrow">{kicker}</p>
      <h1 className="display text-huge text-ink mt-5 max-w-3xl leading-[0.98] font-semibold">
        {title}
      </h1>
      <p className="text-ink-soft mt-6 max-w-xl text-lg leading-relaxed text-pretty">
        {blurb}
      </p>
      <p className="border-ink/15 text-ink-soft mt-10 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs tracking-widest uppercase">
        <span className="bg-clay h-1.5 w-1.5 animate-pulse rounded-full" />
        On the line · {milestone}
      </p>
      <Link
        href="/"
        className="text-clay hover:text-clay-deep mt-10 inline-flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 ease-out"
      >
        <ArrowLeft size={16} /> Back home
      </Link>
    </main>
  );
}
