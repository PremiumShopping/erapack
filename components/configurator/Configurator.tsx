"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type * as THREE from "three";
import {
  Lock,
  Unlock,
  ShoppingBag,
  Check,
  RotateCcw,
  Mail,
  Loader2,
} from "lucide-react";
import ControlsPanel from "@/components/configurator/ControlsPanel";
import { useConfigurator } from "@/store/configurator";
import { useCart } from "@/store/cart";
import { useDesigns } from "@/store/designs";
import { PRODUCTS, priceFor } from "@/lib/products";
import { gbp } from "@/lib/format";
import { useHydrated } from "@/lib/useMediaQuery";
import { drawCupArtwork, ART_W, ART_H } from "@/lib/cupArtwork";

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

// preview scenes — a backdrop behind the (transparent) 3D canvas so people
// can see the cup in context.
type SceneId = "studio" | "cafe" | "bar" | "hand";
const SCENES: { id: SceneId; label: string; bg: string | null }[] = [
  { id: "studio", label: "Studio", bg: null },
  { id: "cafe", label: "Café", bg: "/scenes/cafe.png" },
  { id: "bar", label: "Bar", bg: "/scenes/bar.png" },
  { id: "hand", label: "In hand", bg: "/scenes/hand.png" },
];

// module-scope so the purity rule doesn't flag these (called from handlers)
const genDesignId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `d_${Date.now()}`;
const nowMs = () => Date.now();

export default function Configurator() {
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  const config = useConfigurator();
  const addToCart = useCart((s) => s.add);
  const saveDesign = useDesigns((s) => s.save);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [scene, setScene] = useState<SceneId>("studio");
  const [contactEmail, setContactEmail] = useState("");
  const [submit, setSubmit] = useState<{
    state: "idle" | "sending" | "sent" | "error";
    id?: string;
    delivered?: boolean;
  }>({ state: "idle" });
  const hydrated = useHydrated();

  const product = PRODUCTS.find((p) => p.size === config.size);
  const priced = product ? priceFor(product.price1000, config.quantity) : null;

  // 3D render snapshot (for the on-screen preview + cart thumbnail)
  const capture = () => {
    const gl = glRef.current;
    if (!gl) return null;
    try {
      return gl.domElement.toDataURL("image/png");
    } catch {
      return null;
    }
  };

  // flat, print-ready wrap artwork (what the factory actually prints)
  const captureWrap = async (): Promise<string | null> => {
    const canvas = document.createElement("canvas");
    canvas.width = ART_W;
    canvas.height = ART_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    let logo: HTMLImageElement | null = null;
    if (config.logoDataUrl) {
      logo = await new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = config.logoDataUrl as string;
      });
    }
    try {
      drawCupArtwork(ctx, config, logo);
      return canvas.toDataURL("image/png");
    } catch {
      return null;
    }
  };

  const buildSpec = () => ({
    size: config.size,
    baseColor: config.baseColor,
    pattern: config.pattern,
    patternColor: config.patternColor,
    patternScale: config.patternScale,
    patternAngle: config.patternAngle,
    shapes: config.shapes,
    logoDataUrl: config.logoDataUrl,
    logoScale: config.logoScale,
    logoX: config.logoX,
    logoY: config.logoY,
    logoRotation: config.logoRotation,
    logoFit: config.logoFit,
    logoTileCols: config.logoTileCols,
    logoTileRows: config.logoTileRows,
    textLines: config.textLines,
    quantity: config.quantity,
    locked: true,
  });

  const buildSummary = () =>
    [
      `Size: ${config.size}`,
      `Quantity: ${config.quantity.toLocaleString("en-GB")} cups`,
      priced
        ? `Price: ${gbp(priced.perUnit)}/unit · ${gbp(priced.total)} total (excl. VAT)`
        : "",
      `Cup colour: ${config.baseColor}`,
      config.pattern !== "none"
        ? `Pattern: ${config.pattern} (${config.patternColor})`
        : "Pattern: none",
      `Shapes/elements: ${config.shapes.length}`,
      `Text lines: ${config.textLines.length}`,
      `Logo: ${config.logoDataUrl ? `uploaded — ${config.logoFit}` : "none"}`,
    ]
      .filter(Boolean)
      .join("\n");

  // Lock the design and send it to Era Pack (email → factory).
  const handleLock = async () => {
    const snap = capture();
    setSnapshot(snap);
    config.lock();
    saveDesign({
      id: genDesignId(),
      name: `${config.size} cup`,
      size: config.size,
      snapshot: snap,
      spec: buildSpec(),
      createdAt: nowMs(),
    });
    setSubmit({ state: "sending" });
    try {
      const wrap = await captureWrap();
      const res = await fetch("/api/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spec: buildSpec(),
          summary: buildSummary(),
          snapshot: wrap ?? snap ?? undefined,
          contactEmail: contactEmail.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setSubmit(
        res.ok
          ? { state: "sent", id: data.id, delivered: !!data.delivered }
          : { state: "error" },
      );
    } catch {
      setSubmit({ state: "error" });
    }
  };

  const handleAdd = () => {
    addToCart({
      size: config.size,
      name: product?.name ?? `${config.size} cup`,
      qty: config.quantity,
      unitPrice: priced?.perUnit ?? 0,
      priceLabel: priced ? `${gbp(priced.perUnit)}/unit` : "",
      snapshot,
      spec: buildSpec(),
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
        className="bg-paper-2 relative h-[56vh] bg-cover bg-center lg:sticky lg:top-0 lg:h-[calc(100svh-0px)]"
        style={
          scene === "studio"
            ? undefined
            : {
                backgroundImage: `url(${SCENES.find((s) => s.id === scene)?.bg})`,
              }
        }
      >
        {scene === "studio" && (
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(57,255,20,0.16), transparent 65%)",
            }}
          />
        )}
        <ConfiguratorCanvas onReady={(gl) => (glRef.current = gl)} />

        {/* scene picker — see the cup in context */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
          {SCENES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScene(s.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md transition-colors ${
                scene === s.id
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 bg-paper/70 text-ink hover:border-ink/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-ink pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/50 px-3 py-1 font-mono text-[11px] tracking-[0.2em] uppercase backdrop-blur-sm">
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
            <div className="space-y-3">
              <label className="block">
                <span className="text-ink-soft mb-1.5 block text-xs font-semibold">
                  Your email — so we can confirm your print (optional)
                </span>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-xl border px-4 py-3 text-sm focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={handleLock}
                className="bg-ink text-paper inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Lock size={18} /> Lock &amp; send to Era Pack
              </button>
              <p className="text-ink-soft/80 text-center text-xs">
                Locking sends your print-ready design straight to our team for
                the factory.
              </p>
            </div>
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
              {submit.state !== "idle" && (
                <div
                  className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${
                    submit.state === "error"
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-green/40 bg-green/10 text-ink"
                  }`}
                >
                  {submit.state === "sending" && (
                    <>
                      <Loader2 size={16} className="mt-0.5 animate-spin shrink-0" />
                      <span>Sending your design to Era Pack…</span>
                    </>
                  )}
                  {submit.state === "sent" && (
                    <>
                      <Mail size={16} className="text-green-deep mt-0.5 shrink-0" />
                      <span>
                        Your design is with Era Pack
                        {submit.id ? ` — ref ${submit.id}` : ""}. We&apos;ll
                        prep it for the factory.
                      </span>
                    </>
                  )}
                  {submit.state === "error" && (
                    <>
                      <Mail size={16} className="mt-0.5 shrink-0" />
                      <span>
                        Couldn&apos;t reach our team just now — your design is
                        locked; add it to cart and it&apos;ll come through with
                        your order.
                      </span>
                    </>
                  )}
                </div>
              )}
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
                <dt className="text-ink-soft">Pattern</dt>
                <dd className="text-ink text-right font-semibold capitalize">
                  {config.pattern === "none" ? "None" : config.pattern}
                </dd>
                <dt className="text-ink-soft">Shapes</dt>
                <dd className="text-ink text-right font-semibold">
                  {config.shapes.length}
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

              {priced && (
                <div className="border-ink/10 bg-paper space-y-1 rounded-2xl border p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Quantity</span>
                    <span className="text-ink font-semibold">
                      {config.quantity.toLocaleString("en-GB")} cups
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Per unit</span>
                    <span className="text-ink font-semibold">
                      {gbp(priced.perUnit)}
                    </span>
                  </div>
                  <div className="border-ink/10 flex justify-between border-t pt-1">
                    <span className="text-ink font-bold">
                      Total (excl. VAT)
                    </span>
                    <span className="display text-ink text-lg font-extrabold">
                      {gbp(priced.total)}
                    </span>
                  </div>
                </div>
              )}

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
              setSubmit({ state: "idle" });
              setContactEmail("");
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
