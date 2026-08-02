"use client";

import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import {
  Upload,
  Trash2,
  Plus,
  X,
  ImageIcon,
  Square,
  Circle,
  Minus,
  Triangle,
} from "lucide-react";
import {
  useConfigurator,
  type CupSize,
  type PatternKind,
  type ShapeKind,
  type LogoFit,
} from "@/store/configurator";
import { PRODUCTS, QTY_TIERS, priceFor } from "@/lib/products";
import { gbp } from "@/lib/format";

const SIZES: CupSize[] = ["4oz", "6oz", "8oz", "12oz"];

const PATTERNS: { kind: PatternKind; label: string }[] = [
  { kind: "none", label: "None" },
  { kind: "stripes", label: "Stripes" },
  { kind: "diagonal", label: "Diagonal" },
  { kind: "dots", label: "Dots" },
  { kind: "grid", label: "Grid" },
  { kind: "chevron", label: "Chevron" },
];

const SHAPE_TOOLS: { kind: ShapeKind; label: string; Icon: typeof Square }[] = [
  { kind: "rect", label: "Rectangle", Icon: Square },
  { kind: "circle", label: "Circle", Icon: Circle },
  { kind: "line", label: "Line", Icon: Minus },
  { kind: "triangle", label: "Triangle", Icon: Triangle },
];

const LOGO_FITS: { mode: LogoFit; label: string }[] = [
  { mode: "fill", label: "Fill" },
  { mode: "fit", label: "Fit" },
  { mode: "stretch", label: "Stretch" },
  { mode: "tile", label: "Tile" },
  { mode: "custom", label: "Place" },
];

const BASE_SWATCHES = [
  "#FFFFFF",
  "#F4EEE1",
  "#1A1A1A",
  "#39FF14",
  "#14532D",
  "#1E3A8A",
  "#C8A97E",
  "#E11D48",
];

const PRESETS: {
  name: string;
  base: string;
  textColor: string;
  text?: string;
}[] = [
  { name: "Clean", base: "#FFFFFF", textColor: "#0F1211", text: "BREW" },
  { name: "Electric", base: "#FFFFFF", textColor: "#1FBF07", text: "FRESH" },
  { name: "Midnight", base: "#1A1A1A", textColor: "#39FF14", text: "LATE" },
  { name: "Eco green", base: "#DFF7D0", textColor: "#14532D", text: "GREEN" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow !text-ink mb-3">{label}</p>
      {children}
    </div>
  );
}

export default function ControlsPanel() {
  const c = useConfigurator();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      setUploadError(null);
      if (rejected.length) {
        setUploadError(
          rejected[0].errors[0]?.code === "file-too-large"
            ? "That file is over 5MB — try a smaller one."
            : "Please upload a PNG, JPG or SVG.",
        );
        return;
      }
      const file = accepted[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => c.setLogo(reader.result as string);
      reader.onerror = () => setUploadError("Couldn't read that file.");
      reader.readAsDataURL(file);
    },
    [c],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpeg": [], "image/svg+xml": [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    disabled: c.locked,
  });

  const product = PRODUCTS.find((p) => p.size === c.size);
  const priced = product ? priceFor(product.price1000, c.quantity) : null;
  const disabled = c.locked;

  return (
    <div
      className={`space-y-9 ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      {/* size */}
      <Field label="Size">
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => c.setSize(s)}
              className={`rounded-xl border py-3 text-sm font-bold transition-colors duration-150 ease-out ${
                c.size === s
                  ? "border-green bg-green/15 text-ink"
                  : "border-ink/15 text-ink-soft hover:border-ink/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      {/* quantity — real volume tiers from erapack.uk */}
      <Field label="Quantity">
        <div className="grid grid-cols-3 gap-2">
          {QTY_TIERS.map((t) => (
            <button
              key={t.qty}
              type="button"
              onClick={() => c.setQuantity(t.qty)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors duration-150 ease-out ${
                c.quantity === t.qty
                  ? "border-green bg-green/15 text-ink"
                  : "border-ink/15 text-ink-soft hover:border-ink/40"
              }`}
            >
              {t.qty.toLocaleString("en-GB")}
              {t.discount > 0 && (
                <span className="text-green-deep block text-[10px] font-semibold">
                  −{Math.round(t.discount * 100)}%
                </span>
              )}
            </button>
          ))}
        </div>
        {priced && (
          <p className="text-ink-soft mt-3 text-sm">
            <span className="text-ink font-bold">{gbp(priced.perUnit)}</span>
            /unit ·{" "}
            <span className="text-ink font-bold">{gbp(priced.total)}</span>{" "}
            total
            <span className="text-ink-soft/70"> (excl. VAT)</span>
          </p>
        )}
      </Field>

      {/* base colour */}
      <Field label="Cup colour">
        <div className="flex flex-wrap items-center gap-2">
          {BASE_SWATCHES.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`Base colour ${s}`}
              onClick={() => c.setBaseColor(s)}
              style={{ background: s }}
              className={`h-9 w-9 rounded-full border transition-transform hover:scale-110 ${
                c.baseColor.toLowerCase() === s.toLowerCase()
                  ? "border-ink ring-green ring-2 ring-offset-2"
                  : "border-ink/15"
              }`}
            />
          ))}
          <label className="border-ink/40 relative h-9 w-9 cursor-pointer overflow-hidden rounded-full border border-dashed">
            <input
              type="color"
              aria-label="Custom cup colour"
              value={c.baseColor}
              onChange={(e) => c.setBaseColor(e.target.value)}
              className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] cursor-pointer"
            />
          </label>
        </div>
      </Field>

      {/* pattern */}
      <Field label="Pattern">
        <div className="grid grid-cols-3 gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p.kind}
              type="button"
              onClick={() => c.setPattern({ pattern: p.kind })}
              className={`rounded-xl border py-2.5 text-xs font-bold transition-colors duration-150 ease-out ${
                c.pattern === p.kind
                  ? "border-green bg-green/15 text-ink"
                  : "border-ink/15 text-ink-soft hover:border-ink/40"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        {c.pattern !== "none" && (
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3">
              <span className="text-ink-soft w-14 shrink-0 text-xs font-semibold">
                Colour
              </span>
              <input
                type="color"
                value={c.patternColor}
                onChange={(e) => c.setPattern({ patternColor: e.target.value })}
                aria-label="Pattern colour"
                className="border-ink/15 h-8 w-9 shrink-0 cursor-pointer rounded-lg border"
              />
            </label>
            <Slider
              label="Scale"
              value={c.patternScale}
              min={0.3}
              max={2}
              step={0.05}
              onChange={(v) => c.setPattern({ patternScale: v })}
            />
            {c.pattern === "diagonal" && (
              <Slider
                label="Angle"
                value={c.patternAngle}
                min={0}
                max={90}
                step={1}
                onChange={(v) => c.setPattern({ patternAngle: v })}
              />
            )}
          </div>
        )}
      </Field>

      {/* logo */}
      <Field label="Your logo">
        {c.logoDataUrl ? (
          <div className="space-y-4">
            <div className="border-ink/12 bg-paper-2 flex items-center gap-3 rounded-2xl border p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logoDataUrl}
                alt="Your logo"
                className="h-12 w-12 rounded-lg bg-white object-contain p-1"
              />
              <span className="text-ink-soft flex-1 text-sm">Logo added</span>
              <button
                type="button"
                onClick={() => c.setLogo(null)}
                aria-label="Remove logo"
                className="text-ink-soft hover:bg-ink/5 hover:text-ink grid h-8 w-8 place-items-center rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* fit mode — wallpaper-style placement */}
            <div className="grid grid-cols-5 gap-1.5">
              {LOGO_FITS.map((m) => (
                <button
                  key={m.mode}
                  type="button"
                  onClick={() => c.setLogoTransform({ logoFit: m.mode })}
                  className={`rounded-lg border py-2 text-[11px] font-bold transition-colors duration-150 ease-out ${
                    c.logoFit === m.mode
                      ? "border-green bg-green/15 text-ink"
                      : "border-ink/15 text-ink-soft hover:border-ink/40"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {c.logoFit === "custom" && (
              <>
                <Slider
                  label="Size"
                  value={c.logoScale}
                  min={0.2}
                  max={1.6}
                  step={0.02}
                  onChange={(v) => c.setLogoTransform({ logoScale: v })}
                />
                <Slider
                  label="Rotate"
                  value={c.logoRotation}
                  min={-180}
                  max={180}
                  step={1}
                  onChange={(v) => c.setLogoTransform({ logoRotation: v })}
                />
                <Slider
                  label="Across"
                  value={c.logoX}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(v) => c.setLogoTransform({ logoX: v })}
                />
                <Slider
                  label="Height"
                  value={c.logoY}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(v) => c.setLogoTransform({ logoY: v })}
                />
              </>
            )}

            {c.logoFit === "tile" && (
              <>
                <Slider
                  label="Size"
                  value={c.logoScale}
                  min={0.2}
                  max={1.6}
                  step={0.02}
                  onChange={(v) => c.setLogoTransform({ logoScale: v })}
                />
                <Slider
                  label="Across"
                  value={c.logoTileCols}
                  min={1}
                  max={8}
                  step={1}
                  onChange={(v) => c.setLogoTransform({ logoTileCols: v })}
                />
                <Slider
                  label="Down"
                  value={c.logoTileRows}
                  min={1}
                  max={6}
                  step={1}
                  onChange={(v) => c.setLogoTransform({ logoTileRows: v })}
                />
              </>
            )}

            {(c.logoFit === "fill" ||
              c.logoFit === "fit" ||
              c.logoFit === "stretch") && (
              <p className="text-ink-soft text-xs leading-relaxed">
                {c.logoFit === "fill" &&
                  "Your logo covers the whole cup, cropping to fit."}
                {c.logoFit === "fit" &&
                  "Your logo sits as large as it can without cropping."}
                {c.logoFit === "stretch" &&
                  "Your logo is stretched to wrap the cup edge to edge."}
              </p>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
              isDragActive
                ? "border-green bg-green/10"
                : "border-ink/20 hover:border-ink/40"
            }`}
          >
            <input {...getInputProps()} />
            <span className="bg-green/15 text-green-deep grid h-11 w-11 place-items-center rounded-full">
              {isDragActive ? <ImageIcon size={20} /> : <Upload size={20} />}
            </span>
            <p className="text-ink text-sm font-semibold">
              Drop a logo, or click to browse
            </p>
            <p className="text-ink-soft text-xs">PNG, JPG or SVG · up to 5MB</p>
          </div>
        )}
        {uploadError && (
          <p className="mt-2 text-sm text-red-600">{uploadError}</p>
        )}
      </Field>

      {/* text — unlimited lines, full control */}
      <Field label="Text">
        <div className="space-y-4">
          {c.textLines.map((line) => (
            <div
              key={line.id}
              className="border-ink/12 bg-paper-2 space-y-3 rounded-2xl border p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  value={line.text}
                  onChange={(e) =>
                    c.updateTextLine(line.id, {
                      text: e.target.value.slice(0, 24),
                    })
                  }
                  className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
                  placeholder="Cup text"
                  aria-label="Cup text"
                />
                <input
                  type="color"
                  value={line.color}
                  onChange={(e) =>
                    c.updateTextLine(line.id, { color: e.target.value })
                  }
                  aria-label="Text colour"
                  className="border-ink/15 h-9 w-9 shrink-0 cursor-pointer rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => c.removeTextLine(line.id)}
                  aria-label="Remove line"
                  className="text-ink-soft hover:bg-ink/5 hover:text-ink grid h-9 w-9 shrink-0 place-items-center rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
              <Slider
                label="Size"
                value={line.size}
                min={0.4}
                max={2.4}
                step={0.05}
                onChange={(v) => c.updateTextLine(line.id, { size: v })}
              />
              <Slider
                label="Across"
                value={line.x}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => c.updateTextLine(line.id, { x: v })}
              />
              <Slider
                label="Height"
                value={line.y}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => c.updateTextLine(line.id, { y: v })}
              />
              <Slider
                label="Rotate"
                value={line.rotation}
                min={-90}
                max={90}
                step={1}
                onChange={(v) => c.updateTextLine(line.id, { rotation: v })}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={c.addTextLine}
            className="border-ink/20 text-ink hover:border-green-deep hover:text-green-deep inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          >
            <Plus size={16} /> Add text
          </button>
        </div>
      </Field>

      {/* shapes & elements — the layered editor */}
      <Field label="Shapes & elements">
        <div className="space-y-4">
          {c.shapes.map((sh) => (
            <div
              key={sh.id}
              className="border-ink/12 bg-paper-2 space-y-3 rounded-2xl border p-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-ink flex-1 text-sm font-bold capitalize">
                  {sh.kind}
                </span>
                <input
                  type="color"
                  value={sh.color}
                  onChange={(e) =>
                    c.updateShape(sh.id, { color: e.target.value })
                  }
                  aria-label="Shape colour"
                  className="border-ink/15 h-9 w-9 shrink-0 cursor-pointer rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => c.removeShape(sh.id)}
                  aria-label="Remove shape"
                  className="text-ink-soft hover:bg-ink/5 hover:text-ink grid h-9 w-9 shrink-0 place-items-center rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
              <Slider
                label="Width"
                value={sh.w}
                min={0.02}
                max={1}
                step={0.01}
                onChange={(v) => c.updateShape(sh.id, { w: v })}
              />
              <Slider
                label={sh.kind === "line" ? "Thick" : "Height"}
                value={sh.h}
                min={sh.kind === "line" ? 0.004 : 0.02}
                max={sh.kind === "line" ? 0.12 : 1}
                step={sh.kind === "line" ? 0.004 : 0.01}
                onChange={(v) => c.updateShape(sh.id, { h: v })}
              />
              <Slider
                label="Across"
                value={sh.x}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => c.updateShape(sh.id, { x: v })}
              />
              <Slider
                label="Up"
                value={sh.y}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => c.updateShape(sh.id, { y: v })}
              />
              <Slider
                label="Rotate"
                value={sh.rotation}
                min={-180}
                max={180}
                step={1}
                onChange={(v) => c.updateShape(sh.id, { rotation: v })}
              />
              <Slider
                label="Opacity"
                value={sh.opacity}
                min={0.1}
                max={1}
                step={0.05}
                onChange={(v) => c.updateShape(sh.id, { opacity: v })}
              />
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            {SHAPE_TOOLS.map(({ kind, label, Icon }) => (
              <button
                key={kind}
                type="button"
                onClick={() => c.addShape(kind)}
                className="border-ink/20 text-ink hover:border-green-deep hover:text-green-deep inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </div>
      </Field>

      {/* presets */}
      <Field label="Starter presets">
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() =>
                c.applyPreset({
                  baseColor: p.base,
                  logoFit: "custom",
                  textLines: p.text
                    ? [
                        {
                          id: `preset-${p.name}`,
                          text: p.text,
                          color: p.textColor,
                          size: 1,
                          x: 0.5,
                          y: 0.5,
                          rotation: 0,
                        },
                      ]
                    : [],
                })
              }
              className="border-ink/12 text-ink-soft hover:border-ink/40 flex flex-col items-center gap-2 rounded-xl border p-2 text-[11px] font-semibold transition-colors"
            >
              <span
                className="border-ink/10 h-8 w-8 rounded-full border"
                style={{ background: p.base }}
              />
              {p.name}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="text-ink-soft w-14 shrink-0 text-xs font-semibold">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="bg-ink/15 accent-green-deep h-1.5 w-full cursor-pointer appearance-none rounded-full"
      />
    </label>
  );
}
