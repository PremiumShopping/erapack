"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type * as THREE from "three";
import { Lock, Unlock, ShoppingBag, Check, RotateCcw } from "lucide-react";
import ControlsPanel from "@/components/configurator/ControlsPanel";
import { useConfigurator } from "@/store/configurator";
import { useCart } from "@/store/cart";
import { PRODUCTS } from "@/lib/products";
import { useHydrated } from "@/lib/useMediaQuery";

const ConfiguratorCanvas = dynamic(
  () => import("@/components/three/ConfiguratorCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center">
        <span className="text-ink-soft font-mono text-xs tracking-widest uppercase">
          Loading your cup…
        </span>
      </div>
    ),
  },
);

const priceToNumber = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;

export default function Configurator() {
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  const config = useConfigurator();
  const addToCart = useCart((s) => s.add);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const hydrated = useHydrated();

  const product = PRODUCTS.find((p) => p.size === config.size);

  const capture = () => {
    const gl = glRef.current;
    if (!gl) return null;
    try {
      return gl.domElement.toDataURL("image/png");
    } catch {
      return null;
    }
  };

  const handleLock = () => {
    setSnapshot(capture());
    config.lock();
  };

  const handleAdd = () => {
    addToCart({
      size: config.size,
      name: product?.name ?? `${config.size} cup`,
      qty,
      unitPrice: priceToNumber(product?.price ?? "0"),
      priceLabel: product?.price ?? "",
      snapshot,
      spec: {
        size: config.size,
        baseColor: config.baseColor,
        logoDataUrl: config.logoDataUrl,
        logoScale: config.logoScale,
        logoX: config.logoX,
        logoY: config.logoY,
        logoRotation: config.logoRotation,
        textLines: config.textLines,
        locked: true,
      },
    });
    setAdded(true);
  };

  // Gate persisted-config rendering until hydration (avoids SSR mismatch).
  if (!hydrated) return <div className="min-h-[80svh]" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
      {/* preview */}
      <div
        data-cursor="Drag"
        className="bg-paper-2 relative h-[56vh] lg:sticky lg:top-0 lg:h-[calc(100svh-0px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(57,255,20,0.16), transparent 65%)",
          }}
        />
        <ConfiguratorCanvas onReady={(gl) => (glRef.current = gl)} />
        <p className="text-ink-soft pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.22em] uppercase">
          Drag to rotate · scroll to zoom
        </p>
      </div>

      {/* controls */}
      <div className="border-ink/10 border-t px-6 py-10 lg:border-t-0 lg:border-l lg:px-10">
        <p className="eyebrow">Design your cup · live 3D</p>
        <h1 className="display text-ink mt-4 text-4xl font-extrabold md:text-5xl">
          Make it yours.
        </h1>
        <p className="text-ink-soft mt-3 max-w-md">
          Pick a size, drop in your logo, add text and colours — the cup updates
          in real time. Lock it in when it&apos;s right.
        </p>

        <div className="mt-10">
          <ControlsPanel />
        </div>

        {/* order bar */}
        <div className="border-ink/12 bg-paper-2 mt-10 rounded-3xl border p-6">
          {!config.locked ? (
            <button
              type="button"
              onClick={handleLock}
              className="bg-ink text-paper inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Lock size={18} /> Lock this design
            </button>
          ) : added ? (
            <div className="text-center">
              <span className="bg-green mx-auto grid h-12 w-12 place-items-center rounded-full">
                <Check size={22} className="text-ink" />
              </span>
              <p className="text-ink mt-3 font-bold">Added to your cart.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link
                  href="/cart"
                  className="bg-green text-ink hover:bg-green-soft rounded-full px-6 py-3 text-sm font-bold"
                >
                  Go to cart
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setAdded(false);
                    config.unlock();
                  }}
                  className="border-ink/20 text-ink hover:border-ink/40 rounded-full border px-6 py-3 text-sm font-bold"
                >
                  Keep editing
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {snapshot && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={snapshot}
                  alt="Your locked cup design"
                  className="mx-auto h-40 w-auto rounded-2xl bg-white object-contain"
                />
              )}
              {/* print-ready summary */}
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-ink-soft">Size</dt>
                <dd className="text-ink text-right font-semibold">
                  {config.size}
                </dd>
                <dt className="text-ink-soft">Cup colour</dt>
                <dd className="text-ink flex items-center justify-end gap-2 font-semibold">
                  <span
                    className="border-ink/15 h-4 w-4 rounded-full border"
                    style={{ background: config.baseColor }}
                  />
                  {config.baseColor}
                </dd>
                <dt className="text-ink-soft">Logo</dt>
                <dd className="text-ink text-right font-semibold">
                  {config.logoDataUrl ? "Uploaded" : "None"}
                </dd>
                <dt className="text-ink-soft">Text lines</dt>
                <dd className="text-ink text-right font-semibold">
                  {config.textLines.length}
                </dd>
              </dl>

              <div className="flex items-center justify-between">
                <span className="text-ink-soft text-sm font-semibold">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="border-ink/20 text-ink hover:border-ink/40 grid h-8 w-8 place-items-center rounded-full border"
                  >
                    −
                  </button>
                  <span className="text-ink w-8 text-center font-bold">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase"
                    onClick={() => setQty((q) => q + 1)}
                    className="border-ink/20 text-ink hover:border-ink/40 grid h-8 w-8 place-items-center rounded-full border"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-green text-ink inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <ShoppingBag size={18} /> Add to cart
                </button>
                <button
                  type="button"
                  onClick={config.unlock}
                  aria-label="Unlock and edit"
                  className="border-ink/20 text-ink hover:border-ink/40 inline-flex items-center gap-2 rounded-full border px-5 py-4 text-sm font-bold"
                >
                  <Unlock size={16} /> Edit
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              config.reset();
              setSnapshot(null);
              setAdded(false);
              setQty(1);
            }}
            className="text-ink-soft hover:text-ink mt-4 inline-flex items-center gap-1.5 text-xs font-semibold"
          >
            <RotateCcw size={13} /> Start over
          </button>
        </div>
      </div>
    </div>
  );
}
