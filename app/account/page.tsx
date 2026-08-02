"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Pencil, Trash2, Package, Palette } from "lucide-react";
import { useAuth } from "@/store/auth";
import { useDesigns } from "@/store/designs";
import { useOrders } from "@/store/orders";
import { useCart } from "@/store/cart";
import { useConfigurator, type CupConfig } from "@/store/configurator";
import { PRODUCTS, priceFor } from "@/lib/products";
import { gbp } from "@/lib/format";
import { useHydrated } from "@/lib/useMediaQuery";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-paper-warm rounded-md p-5">
      <div className="display text-ink text-4xl font-bold [font-variant-numeric:tabular-nums]">
        {value}
      </div>
      <p className="text-ink-soft mt-1 text-sm font-semibold">{label}</p>
    </div>
  );
}

function EmptyState({
  text,
  href,
  cta,
}: {
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="border-ink/15 mt-6 rounded-md border-2 border-dashed p-10 text-center">
      <p className="text-ink-soft">{text}</p>
      <Link
        href={href}
        className="text-ink hover:text-green-deep border-ink mt-3 inline-block border-b-2 pb-0.5 text-sm font-bold"
      >
        {cta} →
      </Link>
    </div>
  );
}

export default function AccountPage() {
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const designs = useDesigns((s) => s.designs);
  const removeDesign = useDesigns((s) => s.remove);
  const orders = useOrders((s) => s.orders);
  const addToCart = useCart((s) => s.add);
  const applyPreset = useConfigurator((s) => s.applyPreset);
  const router = useRouter();

  if (!hydrated) return <main className="min-h-[70vh]" />;

  if (!user) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="eyebrow">Your account</p>
        <h1 className="display text-ink mt-3 text-3xl font-bold">
          Sign in to see your designs and orders.
        </h1>
        <p className="text-ink-soft mt-3">
          Everything you design and order is kept here.
        </p>
        <Link
          href="/login"
          className="bg-green text-ink mt-7 inline-block rounded-full px-8 py-4 font-bold shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          Log in
        </Link>
      </main>
    );
  }

  const cupsOrdered = orders.reduce(
    (n, o) => n + o.items.reduce((m, i) => m + i.qty, 0),
    0,
  );

  const reorder = (d: (typeof designs)[number]) => {
    const product = PRODUCTS.find((p) => p.size === d.size);
    const qty = (d.spec.quantity as number) ?? 1000;
    const priced = product ? priceFor(product.price1000, qty) : null;
    addToCart({
      size: (d.spec.size as (typeof PRODUCTS)[number]["size"]) ?? "8oz",
      name: d.name,
      qty,
      unitPrice: priced?.perUnit ?? 0,
      priceLabel: priced ? `${gbp(priced.perUnit)}/unit` : "",
      snapshot: d.snapshot,
      spec: d.spec as CupConfig,
    });
    router.push("/cart");
  };

  const edit = (d: (typeof designs)[number]) => {
    applyPreset(d.spec);
    router.push("/design");
  };

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:px-12">
      <div className="border-ink/12 flex flex-wrap items-end justify-between gap-4 border-b pb-8">
        <div>
          <p className="eyebrow">Your account</p>
          <h1 className="display text-ink text-huge mt-2 font-bold">
            Hello again.
          </h1>
          <p className="text-ink-soft mt-2">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="border-ink text-ink hover:bg-ink hover:text-paper inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatCard label="Saved designs" value={designs.length} />
        <StatCard label="Orders" value={orders.length} />
        <StatCard label="Cups ordered" value={cupsOrdered} />
      </div>

      {/* saved designs */}
      <section className="mt-14">
        <h2 className="display text-ink flex items-center gap-2 text-2xl font-bold">
          <Palette size={20} className="text-green-deep" /> Saved designs
        </h2>
        {designs.length === 0 ? (
          <EmptyState
            text="Nothing saved yet — lock in a design and it lands here."
            href="/design"
            cta="Design a cup"
          />
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {designs.map((d) => (
              <div
                key={d.id}
                className="border-ink/15 flex flex-col rounded-md border-2 p-3"
              >
                <div className="bg-paper-warm grid aspect-square place-items-center overflow-hidden rounded">
                  {d.snapshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={d.snapshot}
                      alt={d.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-ink-soft text-xs">No preview</span>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-ink text-sm font-bold">{d.name}</p>
                  <span className="text-ink-soft text-xs">
                    {new Date(d.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => reorder(d)}
                    className="bg-green text-ink hover:bg-green-soft flex-1 rounded-full py-2 text-xs font-bold"
                  >
                    Reorder
                  </button>
                  <button
                    type="button"
                    onClick={() => edit(d)}
                    aria-label="Edit design"
                    className="border-ink/20 text-ink hover:border-ink grid w-8 place-items-center rounded-full border"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeDesign(d.id)}
                    aria-label="Delete design"
                    className="border-ink/20 text-ink grid w-8 place-items-center rounded-full border hover:border-red-400 hover:text-red-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* orders */}
      <section className="mt-14">
        <h2 className="display text-ink flex items-center gap-2 text-2xl font-bold">
          <Package size={20} className="text-green-deep" /> Order history
        </h2>
        {orders.length === 0 ? (
          <EmptyState
            text="No orders yet."
            href="/shop"
            cta="Shop cups"
          />
        ) : (
          <div className="border-ink/12 divide-ink/10 mt-6 divide-y rounded-md border">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-mono text-sm font-bold">{o.id}</p>
                  <p className="text-ink-soft text-xs">
                    {new Date(o.createdAt).toLocaleDateString("en-GB")} ·{" "}
                    {o.items.length} item{o.items.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="green-block rounded-full px-3 py-1 text-xs font-bold capitalize">
                    {o.status}
                  </span>
                  <span className="display text-ink text-lg font-bold">
                    {gbp(o.total)}
                  </span>
                  <Link
                    href={`/order/${o.id}`}
                    className="text-ink hover:text-green-deep border-ink border-b-2 pb-0.5 text-sm font-bold"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
