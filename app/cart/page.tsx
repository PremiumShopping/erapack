"use client";

import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart, cartSubtotal } from "@/store/cart";
import { gbp, shippingFor, FREE_SHIPPING } from "@/lib/format";
import { useHydrated } from "@/lib/useMediaQuery";

export default function CartPage() {
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);

  const subtotal = cartSubtotal(items);
  const shipping = shippingFor(subtotal);
  const toFree = Math.max(0, FREE_SHIPPING - subtotal);

  if (!hydrated) {
    return <main className="min-h-[60vh]" />;
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12">
      <p className="eyebrow">Cart</p>
      <h1 className="display text-huge text-ink mt-4 font-extrabold">
        Your cups.
      </h1>

      {items.length === 0 ? (
        <div className="border-ink/12 bg-paper-2 mt-12 flex flex-col items-center gap-5 rounded-3xl border py-20 text-center">
          <span className="bg-paper text-ink-soft grid h-16 w-16 place-items-center rounded-full">
            <ShoppingBag size={26} />
          </span>
          <p className="text-ink-soft">Nothing here yet.</p>
          <Link
            href="/design"
            className="bg-green text-ink hover:bg-green-soft rounded-full px-7 py-3.5 text-sm font-bold"
          >
            Design your cup
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_0.9fr]">
          {/* items */}
          <ul className="divide-ink/10 border-ink/10 divide-y border-y">
            {items.map((it) => (
              <li key={it.id} className="flex gap-5 py-6">
                <div className="border-ink/10 h-28 w-28 shrink-0 overflow-hidden rounded-2xl border bg-white">
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
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="text-ink font-bold">{it.name}</h3>
                      <p className="text-ink-soft text-sm">
                        Custom design · {it.priceLabel} each
                      </p>
                    </div>
                    <span className="display text-ink text-lg font-extrabold">
                      {gbp(it.unitPrice * it.qty)}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Decrease"
                        onClick={() => setQty(it.id, it.qty - 1)}
                        className="border-ink/20 text-ink hover:border-ink/40 grid h-8 w-8 place-items-center rounded-full border"
                      >
                        −
                      </button>
                      <span className="text-ink w-8 text-center font-bold">
                        {it.qty}
                      </span>
                      <button
                        aria-label="Increase"
                        onClick={() => setQty(it.id, it.qty + 1)}
                        className="border-ink/20 text-ink hover:border-ink/40 grid h-8 w-8 place-items-center rounded-full border"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="text-ink-soft flex items-center gap-1.5 text-sm hover:text-red-600"
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* summary */}
          <aside className="border-ink/12 bg-paper-2 h-fit rounded-3xl border p-7 lg:sticky lg:top-28">
            <h2 className="display text-ink text-xl font-extrabold">Summary</h2>
            {toFree > 0 ? (
              <p className="text-ink-soft mt-2 text-sm">
                Spend <span className="text-ink font-bold">{gbp(toFree)}</span>{" "}
                more for free UK shipping.
              </p>
            ) : (
              <p className="text-green-deep mt-2 text-sm font-bold">
                Free UK shipping unlocked ✓
              </p>
            )}
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="text-ink font-semibold">{gbp(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="text-ink font-semibold">
                  {shipping === 0 ? "Free" : gbp(shipping)}
                </dd>
              </div>
              <div className="border-ink/10 flex justify-between border-t pt-3">
                <dt className="text-ink font-bold">Total</dt>
                <dd className="display text-ink text-lg font-extrabold">
                  {gbp(subtotal + shipping)}
                </dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className="bg-green text-ink mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Checkout <ArrowRight size={18} />
            </Link>
            <Link
              href="/shop"
              className="text-ink-soft hover:text-ink mt-3 block text-center text-sm font-semibold"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
