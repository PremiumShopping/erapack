import Link from "next/link";
import { ArrowUpRight, Recycle, Wind } from "lucide-react";
import NewsletterForm from "@/components/shell/NewsletterForm";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "4oz espresso", href: "/shop" },
      { label: "6oz flat white", href: "/shop" },
      { label: "8oz latte", href: "/shop" },
      { label: "12oz filter", href: "/shop" },
      { label: "Design your cup", href: "/design" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Era Pack", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Log in", href: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Shipping & Refunds", href: "/shipping" },
      { label: "Terms of Sale", href: "/terms" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-charcoal text-paper relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 md:px-12">
        {/* newsletter + sustainability */}
        <div className="border-paper/12 grid grid-cols-1 gap-14 border-b pb-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow" style={{ color: "var(--color-clay-glow)" }}>
              Keep in the loop
            </p>
            <h2 className="display mt-4 max-w-md text-4xl leading-[1.05] font-semibold md:text-5xl">
              Good cups, <span className="text-green">now and then.</span>
            </h2>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-5 lg:items-end lg:text-right">
            <div className="text-paper/80 flex items-center gap-3">
              <Recycle size={20} className="text-clay-glow" />
              <span className="text-lg">100% recyclable stock</span>
            </div>
            <div className="text-paper/80 flex items-center gap-3">
              <Wind size={20} className="text-clay-glow" />
              <span className="text-lg">Printed on renewable energy</span>
            </div>
            <p className="text-paper/50 max-w-sm text-sm leading-relaxed">
              We keep the footprint low without making a fuss about it —
              recyclable board, water-based inks, a factory that runs clean.
            </p>
          </div>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="display text-3xl font-semibold tracking-tight"
            >
              Era<span className="text-green">Pack</span>
            </Link>
            <p className="text-paper/55 mt-4 max-w-xs text-sm leading-relaxed">
              Custom-branded paper cups, printed factory-direct in the UK. Your
              brand, in every cup.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="group text-paper/70 hover:text-clay-glow flex items-center gap-1 text-sm transition-colors duration-200 ease-out"
                >
                  {s.label}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow text-paper/50">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-paper/75 hover:text-paper text-[15px] transition-colors duration-200 ease-out"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* oversized signature wordmark */}
      <div
        aria-hidden
        className="display text-paper/[0.05] px-6 text-[22vw] leading-[0.8] font-semibold tracking-tight whitespace-nowrap select-none md:px-12"
      >
        Your brand.
      </div>

      <div className="text-paper/45 mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-3 px-6 py-8 text-sm md:flex-row md:items-center md:px-12">
        <p>© {2026} Era Pack Ltd. Made in the UK.</p>
        <p className="font-mono text-xs tracking-widest uppercase">
          Your brand · in every cup
        </p>
      </div>
    </footer>
  );
}
