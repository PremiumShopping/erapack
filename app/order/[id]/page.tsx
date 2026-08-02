"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import { useOrders } from "@/store/orders";
import { gbp } from "@/lib/format";
import { useHydrated } from "@/lib/useMediaQuery";

export default function OrderConfirmationPage() {
  const hydrated = useHydrated();
  const params = useParams<{ id: string }>();
  const id = String(params?.id ?? "");
  const order = useOrders((s) => s.orders.find((o) => o.id === id));

  if (!hydrated) return <main className="min-h-[60vh]" />;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20 md:px-12">
      <div className="flex flex-col items-center text-center">
        <span className="bg-green grid h-16 w-16 place-items-center rounded-full">
          <Check size={30} className="text-ink" strokeWidth={3} />
        </span>
        <p className="eyebrow mt-6">Order {id}</p>
        <h1 className="display text-huge text-ink mt-3 font-extrabold">
          You&apos;re all set.
        </h1>
        <p className="text-ink-soft mt-4 max-w-md text-lg">
          {order?.customer.name ? `Thanks, ${order.customer.name}. ` : ""}
          Your cups are queued for print. We&apos;ll email a proof and dispatch
          in 2–3 working days.
        </p>
      </div>

      {order && (
        <div className="border-ink/12 bg-paper-2 mt-12 rounded-3xl border p-7">
          <h2 className="display text-ink text-lg font-extrabold">
            What you ordered
          </h2>
          <ul className="divide-ink/10 mt-5 divide-y">
            {order.items.map((it) => (
              <li key={it.id} className="flex items-center gap-4 py-4">
                <div className="border-ink/10 h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-white">
                  {it.snapshot && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.snapshot}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
                <span className="text-ink flex-1 font-semibold">
                  {it.name} × {it.qty}
                </span>
                <span className="text-ink font-bold">
                  {gbp(it.unitPrice * it.qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="border-ink/10 mt-4 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="text-ink font-semibold">
                {order.shipping === 0 ? "Free" : gbp(order.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink font-bold">Total paid</dt>
              <dd className="display text-ink text-lg font-extrabold">
                {gbp(order.total)}
              </dd>
            </div>
          </dl>
          <p className="text-ink-soft mt-5 text-sm">
            Shipping to {order.customer.address}, {order.customer.city},{" "}
            {order.customer.postcode}.
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/design"
          className="bg-green text-ink hover:bg-green-soft rounded-full px-7 py-3.5 text-sm font-bold"
        >
          Design another
        </Link>
        <Link
          href="/shop"
          className="border-ink/20 text-ink hover:border-ink/40 rounded-full border px-7 py-3.5 text-sm font-bold"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
