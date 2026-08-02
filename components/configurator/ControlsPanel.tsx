"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Trash2, Plus, X, ImageIcon } from "lucide-react";
import { useConfigurator, type CupSize } from "@/store/configurator";
import { PRODUCTS } from "@/lib/products";

const SIZES: CupSize[] = ["4oz", "6oz", "8oz", "12oz"];

const BASE_SWATCHES = [
  "#F4EEE1",
  "#FFFFFF",
  "#C8A97E",
  "#1A1A1A",
  "#39FF14",
  "#14532D",
  "#D2552A",
  "#1E3A8A",
];

const PRESETS: {
  name: string;
  base: string;
  textColor: string;
  text?: string;
}[] = [
  { name: "Kraft", base: "#C8A97E", textColor: "#2B2320", text: "FRESH" },
  { name: "Cream", base: "#F4EEE1", textColor: "#1A1A1A", text: "DAILY" },
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
    (accepted: File[], rejected: { errors: { code: string }[] }[]) => {
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
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/svg+xml": [],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    disabled: c.locked,
  });

  const price = PRODUCTS.find((p) => p.size === c.size)?.price ?? "";
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
        <p className="text-ink-soft mt-2 text-sm">
          From <span className="text-ink font-bold">{price}</span>
        </p>
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
              value={c.baseColor}
              onChange={(e) => c.setBaseColor(e.target.value)}
              className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] cursor-pointer"
            />
          </label>
        </div>
      </Field>

      {/* logo upload */}
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
            <Slider
              label="Size"
              value={c.logoScale}
              min={0.2}
              max={1.4}
              step={0.02}
              onChange={(v) => c.setLogoTransform({ logoScale: v })}
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
            <Slider
              label="Rotate"
              value={c.logoRotation}
              min={-45}
              max={45}
              step={1}
              onChange={(v) => c.setLogoTransform({ logoRotation: v })}
            />
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

      {/* text */}
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
                      text: e.target.value.slice(0, 22),
                    })
                  }
                  className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
                  placeholder="Cup text"
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
                min={0.5}
                max={2}
                step={0.05}
                onChange={(v) => c.updateTextLine(line.id, { size: v })}
              />
              <Slider
                label="Height"
                value={line.y}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => c.updateTextLine(line.id, { y: v })}
              />
            </div>
          ))}
          {c.textLines.length < 3 && (
            <button
              type="button"
              onClick={c.addTextLine}
              className="border-ink/20 text-ink hover:border-green-deep hover:text-green-deep inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
            >
              <Plus size={16} /> Add a line
            </button>
          )}
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
                  textLines: p.text
                    ? [
                        {
                          id: `preset-${p.name}`,
                          text: p.text,
                          color: p.textColor,
                          size: 1,
                          y: 0.5,
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
