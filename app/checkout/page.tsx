"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { useCart, cartSubtotal } from "@/store/cart";
import { useOrders } from "@/store/orders";
import { gbp, shippingFor } from "@/lib/format";
import { useHydrated } from "@/lib/useMediaQuery";

type Delivery = "standard" | "express";
const EXPRESS = 9.99;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const FIELDS = [
  { key: "name", label: "Full name", type: "text", autoComplete: "name" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  {
    key: "address",
    label: "Address",
    type: "text",
    autoComplete: "street-address",
  },
  {
    key: "city",
    label: "Town / city",
    type: "text",
    autoComplete: "address-level2",
  },
  {
    key: "postcode",
    label: "Postcode",
    type: "text",
    autoComplete: "postal-code",
  },
] as const;

export default function CheckoutPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const addOrder = useOrders((s) => s.addOrder);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cartSubtotal(items);
  const shipping = delivery === "express" ? EXPRESS : shippingFor(subtotal);
  const total = subtotal + shipping;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (Object.values(form).some((v) => !v.trim())) {
      setError("Please fill in every field.");
      return;
    }
    if (!EMAIL.test(form.email)) {
      setError("That email doesn't look right.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: form,
          subtotal,
          shipping,
          total,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const { orderId, receivedAt } = await res.json();
      addOrder({
        id: orderId,
        items,
        subtotal,
        shipping,
        total,
        customer: form,
        createdAt: receivedAt ?? 0,
        status: "confirmed",
      });
      clear();
      router.push(`/order/${orderId}`);
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  }

  if (hydrated && items.length === 0) {
    return (
      <main className="mx-auto max-w-[1440px] px-6 py-24 text-center md:px-12">
        <h1 className="display text-huge text-ink font-extrabold">
          Your cart is empty.
        </h1>
        <Link
          href="/design"
          className="bg-green text-ink hover:bg-green-soft mt-8 inline-block rounded-full px-7 py-3.5 text-sm font-bold"
        >
          Design a cup
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12">
      <p className="eyebrow">Checkout</p>
      <h1 className="display text-huge text-ink mt-4 font-extrabold">
        Almost there.
      </h1>

      <form
        onSubmit={submit}
        className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.9fr]"
      >
        {/* details */}
        <div className="space-y-8">
          <fieldset>
            <legend className="display text-ink text-xl font-extrabold">
              Delivery details
            </legend>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <label
                  key={f.key}
                  className={f.key === "address" ? "sm:col-span-2" : ""}
                >
                  <span className="text-ink mb-1.5 block text-sm font-semibold">
                    {f.label}
                  </span>
                  <input
                    type={f.type}
                    autoComplete={f.autoComplete}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, [f.key]: e.target.value }))
                    }
                    className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="display text-ink text-xl font-extrabold">
              Delivery speed
            </legend>
            <div className="mt-5 space-y-3">
              {[
                {
                  id: "standard" as Delivery,
                  title: "Standard · 2–3 working days",
                  price:
                    shippingFor(subtotal) === 0
                      ? "Free"
                      : gbp(shippingFor(subtotal)),
                },
                {
                  id: "express" as Delivery,
                  title: "Express · next working day",
                  price: gbp(EXPRESS),
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
                    delivery === opt.id
                      ? "border-green bg-green/10"
                      : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                      className="accent-green-deep"
                    />
                    <span className="text-ink font-semibold">{opt.title}</span>
                  </span>
                  <span className="text-ink font-bold">{opt.price}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="bg-paper-2 text-ink-soft rounded-2xl p-4 text-sm">
            This is a demo checkout — no payment is taken. A Stripe test-mode
            seam is wired in <code>app/api/order</code>.
          </p>
        </div>

        {/* summary */}
        <aside className="border-ink/12 bg-paper-2 h-fit rounded-3xl border p-7 lg:sticky lg:top-28">
          <h2 className="display text-ink text-xl font-extrabold">
            Order summary
          </h2>
          <ul className="mt-5 space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex items-center gap-3">
                <div className="border-ink/10 h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-white">
                  {it.snapshot && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.snapshot}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
                <span className="text-ink flex-1 text-sm">
                  {it.name} × {it.qty}
                </span>
                <span className="text-ink text-sm font-semibold">
                  {gbp(it.unitPrice * it.qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="border-ink/10 mt-6 space-y-2 border-t pt-4 text-sm">
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
            <div className="border-ink/10 flex justify-between border-t pt-2">
              <dt className="text-ink font-bold">Total</dt>
              <dd className="display text-ink text-lg font-extrabold">
                {gbp(total)}
              </dd>
            </div>
          </dl>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-green text-ink mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60"
          >
            {submitting ? (
              "Placing order…"
            ) : (
              <>
                <Lock size={16} /> Place order {gbp(total)}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </aside>
      </form>
    </main>
  );
}
