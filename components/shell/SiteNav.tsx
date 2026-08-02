"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Leaf, Menu, ShoppingBag, X } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { useUI } from "@/store/ui";
import { useCart, cartCount } from "@/store/cart";

const MAIN = [
  { href: "/shop", label: "Shop" },
  { href: "/design", label: "Design" },
];

const ABOUT = [
  {
    href: "/about",
    label: "About Era Pack",
    note: "Factory, ethos, sustainability",
  },
  { href: "/faq", label: "FAQ", note: "Lead times, artwork, minimums" },
  { href: "/contact", label: "Contact", note: "Talk to a real person" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const openCart = useUI((s) => s.openCart);
  const count = useCart((s) => cartCount(s.items));
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset menus when the route changes — the "adjust state during render"
  // pattern (React docs). Avoids a setState-in-effect and closes before paint.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setAboutOpen(false);
  }

  // Subtle solidify-on-scroll (listener only; setState lives in the callback).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes; lock body scroll while the mobile sheet is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAboutOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const openAbout = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAboutOpen(true);
  };
  const scheduleCloseAbout = () => {
    closeTimer.current = setTimeout(() => setAboutOpen(false), 120);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-out ${
        scrolled
          ? "border-ink/10 bg-paper/85 border-b shadow-[0_10px_30px_-24px_rgba(43,35,32,0.9)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12">
        {/* wordmark */}
        <Magnetic strength={0.5}>
          <Link
            href="/"
            className="text-ink flex items-center gap-1.5"
            data-cursor="Home"
          >
            <Leaf className="text-green-deep" size={22} strokeWidth={2.5} />
            <span className="display text-2xl font-extrabold tracking-tight">
              EraPack
            </span>
          </Link>
        </Magnetic>

        {/* desktop links */}
        <div className="hidden items-center gap-9 lg:flex">
          {MAIN.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group text-ink hover:text-clay relative text-[15px] font-medium transition-colors duration-200 ease-out"
            >
              {l.label}
              <span
                className={`bg-clay absolute -bottom-1.5 left-0 h-px transition-all duration-300 ease-out ${
                  isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {/* About dropdown */}
          <div
            className="relative"
            onMouseEnter={openAbout}
            onMouseLeave={scheduleCloseAbout}
          >
            <button
              type="button"
              aria-expanded={aboutOpen}
              aria-haspopup="menu"
              onClick={() => setAboutOpen((v) => !v)}
              className="text-ink hover:text-clay flex items-center gap-1 text-[15px] font-medium transition-colors duration-200 ease-out"
            >
              About
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ease-out ${
                  aboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transformOrigin: "top left" }}
                  className="card-paper border-ink/10 absolute top-full left-0 mt-3 w-72 rounded-2xl border p-2"
                >
                  {ABOUT.map((a) => (
                    <Link
                      key={a.href}
                      href={a.href}
                      role="menuitem"
                      className="hover:bg-paper-3 block rounded-xl px-4 py-3 transition-colors duration-150 ease-out"
                    >
                      <span className="text-ink block text-[15px] font-medium">
                        {a.label}
                      </span>
                      <span className="text-ink-soft mt-0.5 block text-xs">
                        {a.note}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* right actions */}
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href="/login"
            className="text-ink hover:text-clay hidden text-[15px] font-medium transition-colors duration-200 ease-out sm:block"
          >
            Log in
          </Link>

          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={openCart}
              data-cursor="Cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="border-ink/20 text-ink hover:border-green-deep hover:text-green-deep relative flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium transition-all duration-200 ease-out active:scale-[0.97]"
            >
              <ShoppingBag size={16} strokeWidth={2} />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="bg-green text-ink absolute -top-1 -right-1 grid h-5 min-w-[20px] place-items-center rounded-full px-1 text-[11px] font-bold">
                  {count}
                </span>
              )}
            </button>
          </Magnetic>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="text-ink hover:bg-ink/5 grid h-10 w-10 place-items-center rounded-full transition-colors duration-200 ease-out lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* mobile full-screen sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="bg-paper fixed inset-0 z-[60] lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-ink flex items-center gap-1.5">
                <Leaf className="text-green-deep" size={22} strokeWidth={2.5} />
                <span className="display text-2xl font-extrabold tracking-tight">
                  EraPack
                </span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-ink hover:bg-ink/5 grid h-10 w-10 place-items-center rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
              className="flex flex-col gap-1 px-6 pt-8"
            >
              {[
                ...MAIN,
                { href: "/login", label: "Log in" },
                { href: "/cart", label: "Cart" },
              ].map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={l.href}
                    className="display border-ink/10 text-ink block border-b py-4 text-4xl font-semibold"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <p className="eyebrow mt-8">About</p>
              {ABOUT.map((a) => (
                <motion.div
                  key={a.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={a.href}
                    className="text-ink-soft hover:text-clay block py-2 text-lg transition-colors"
                  >
                    {a.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
