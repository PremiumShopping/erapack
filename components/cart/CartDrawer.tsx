"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useUI } from "@/store/ui";
import { useCart, cartSubtotal } from "@/store/cart";
import { gbp, shippingFor, FREE_SHIPPING } from "@/lib/format";

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);

  const subtotal = cartSubtotal(items);
  const shipping = shippingFor(subtotal);
  const toFree = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = cartOpen ? "hidden" : "";
    let raf = 0;
    if (cartOpen) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      raf = requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      lastFocused.current?.focus?.();
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [cartOpen, closeCart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="bg-ink/40 fixed inset-0 z-[90] backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="bg-paper fixed top-0 right-0 z-[91] flex h-full w-full max-w-md flex-col shadow-2xl"
          >
            <header className="border-ink/10 flex items-center justify-between border-b px-6 py-5">
              <h2 className="display text-ink text-xl font-extrabold">
                Your cart
              </h2>
              <button
                ref={closeRef}
                onClick={closeCart}
                aria-label="Close cart"
                className="text-ink-soft hover:bg-ink/5 hover:text-ink grid h-9 w-9 place-items-center rounded-full"
              >
                <X size={18} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="bg-paper-2 text-ink-soft grid h-16 w-16 place-items-center rounded-full">
                  <ShoppingBag size={26} />
                </span>
                <p className="text-ink-soft">Your cart is empty.</p>
                <Link
                  href="/design"
                  onClick={closeCart}
                  className="bg-green text-ink hover:bg-green-soft rounded-full px-6 py-3 text-sm font-bold"
                >
                  Design a cup
                </Link>
              </div>
            ) : (
              <>
                {/* free shipping bar */}
                <div className="border-ink/10 border-b px-6 py-4">
                  <p className="text-ink-soft text-sm">
                    {toFree > 0 ? (
                      <>
                        You&apos;re{" "}
                        <span className="text-ink font-bold">
                          {gbp(toFree)}
                        </span>{" "}
                        from free UK shipping.
                      </>
                    ) : (
                      <span className="text-green-deep font-bold">
                        Free UK shipping unlocked ✓
                      </span>
                    )}
                  </p>
                  <div className="bg-ink/10 mt-2 h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-green h-full rounded-full transition-[width] duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* items */}
                <ul className="divide-ink/8 flex-1 divide-y overflow-y-auto px-6">
                  {items.map((it) => (
                    <li key={it.id} className="flex gap-4 py-5">
                      <div className="border-ink/10 h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white">
                        {it.snapshot ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={it.snapshot}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div
                            className="h-full w-full"
                            style={{ background: it.spec.baseColor }}
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <span className="text-ink font-bold">{it.name}</span>
                          <span className="text-ink font-bold">
                            {gbp(it.unitPrice * it.qty)}
                          </span>
                        </div>
                        <span className="text-ink-soft text-xs">
                          Custom design · {it.priceLabel} each
                        </span>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-2">
                            <button
                              aria-label="Decrease"
                              onClick={() => setQty(it.id, it.qty - 1)}
                              className="border-ink/20 text-ink hover:border-ink/40 grid h-9 w-9 place-items-center rounded-full border"
                            >
                              −
                            </button>
                            <span className="text-ink w-6 text-center text-sm font-bold">
                              {it.qty}
                            </span>
                            <button
                              aria-label="Increase"
                              onClick={() => setQty(it.id, it.qty + 1)}
                              className="border-ink/20 text-ink hover:border-ink/40 grid h-9 w-9 place-items-center rounded-full border"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => remove(it.id)}
                            aria-label="Remove"
                            className="text-ink-soft hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* totals */}
                <footer className="border-ink/10 border-t px-6 py-5">
                  <div className="text-ink-soft flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="text-ink font-semibold">
                      {gbp(subtotal)}
                    </span>
                  </div>
                  <div className="text-ink-soft mt-1 flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-ink font-semibold">
                      {shipping === 0 ? "Free" : gbp(shipping)}
                    </span>
                  </div>
                  <div className="border-ink/10 mt-3 flex justify-between border-t pt-3">
                    <span className="text-ink font-bold">Total</span>
                    <span className="display text-ink text-lg font-extrabold">
                      {gbp(subtotal + shipping)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="bg-green text-ink mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    Checkout <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-ink-soft hover:text-ink mt-2 block text-center text-sm font-semibold"
                  >
                    View full cart
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
