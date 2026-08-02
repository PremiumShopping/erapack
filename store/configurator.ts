"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CupSize } from "@/lib/products";
export type { CupSize } from "@/lib/products";

export type TextLine = {
  id: string;
  text: string;
  color: string;
  size: number; // relative font size
  x: number; // 0..1 horizontal position on the wrap
  y: number; // 0..1 vertical position on the wrap
  rotation: number; // degrees
};

/** Repeating background pattern printed over the base colour. */
export type PatternKind =
  | "none"
  | "stripes"
  | "diagonal"
  | "dots"
  | "grid"
  | "chevron";

/** A free-placed design element (a layer above the base + pattern). */
export type ShapeKind = "rect" | "circle" | "line" | "triangle";
export type Shape = {
  id: string;
  kind: ShapeKind;
  color: string;
  x: number; // 0..1 centre across the wrap
  y: number; // 0..1 centre vertically
  w: number; // 0..1 width relative to the wrap
  h: number; // 0..1 height relative to the wrap
  rotation: number; // degrees
  opacity: number; // 0..1
};

export type CupConfig = {
  size: CupSize;
  baseColor: string; // cup body colour
  pattern: PatternKind;
  patternColor: string;
  patternScale: number; // 0.3..2 — pattern feature size
  patternAngle: number; // degrees — for diagonal stripes
  shapes: Shape[];
  logoDataUrl: string | null;
  logoScale: number; // 0.2..1.4
  logoX: number; // 0..1 around the wrap
  logoY: number; // 0..1 vertical
  logoRotation: number; // degrees
  logoTile: boolean; // repeat the logo across the whole wrap
  logoTileCols: number; // horizontal repeats when tiling
  logoTileRows: number; // vertical repeats when tiling
  textLines: TextLine[];
  quantity: number; // order quantity (tier)
  locked: boolean;
};

type ConfigStore = CupConfig & {
  setSize: (s: CupSize) => void;
  setBaseColor: (c: string) => void;
  setLogo: (dataUrl: string | null) => void;
  setLogoTransform: (
    t: Partial<
      Pick<
        CupConfig,
        | "logoScale"
        | "logoX"
        | "logoY"
        | "logoRotation"
        | "logoTile"
        | "logoTileCols"
        | "logoTileRows"
      >
    >,
  ) => void;
  setQuantity: (q: number) => void;
  setPattern: (
    t: Partial<
      Pick<
        CupConfig,
        "pattern" | "patternColor" | "patternScale" | "patternAngle"
      >
    >,
  ) => void;
  addShape: (kind: ShapeKind) => void;
  updateShape: (id: string, patch: Partial<Shape>) => void;
  removeShape: (id: string) => void;
  addTextLine: () => void;
  updateTextLine: (id: string, patch: Partial<TextLine>) => void;
  removeTextLine: (id: string) => void;
  applyPreset: (p: Partial<CupConfig>) => void;
  lock: () => void;
  unlock: () => void;
  reset: () => void;
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `t_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

const DEFAULT: CupConfig = {
  size: "8oz",
  baseColor: "#FFFFFF",
  pattern: "none",
  patternColor: "#39FF14",
  patternScale: 1,
  patternAngle: 45,
  shapes: [],
  logoDataUrl: null,
  logoScale: 0.6,
  logoX: 0.5,
  logoY: 0.5,
  logoRotation: 0,
  logoTile: false,
  logoTileCols: 3,
  logoTileRows: 3,
  textLines: [],
  quantity: 1000,
  locked: false,
};

export const useConfigurator = create<ConfigStore>()(
  persist(
    (set) => ({
      ...DEFAULT,
      setSize: (size) => set({ size }),
      setBaseColor: (baseColor) => set({ baseColor }),
      setLogo: (logoDataUrl) => set({ logoDataUrl }),
      setLogoTransform: (t) => set((s) => ({ ...s, ...t })),
      setQuantity: (quantity) => set({ quantity }),
      setPattern: (t) => set((s) => ({ ...s, ...t })),
      addShape: (kind) =>
        set((s) => ({
          shapes: [
            ...s.shapes,
            {
              id: uid(),
              kind,
              color: kind === "line" ? "#0F1211" : "#39FF14",
              x: 0.5,
              y: 0.5,
              w: kind === "line" ? 0.5 : 0.22,
              h: kind === "line" ? 0.02 : 0.22,
              rotation: 0,
              opacity: 1,
            },
          ],
        })),
      updateShape: (id, patch) =>
        set((s) => ({
          shapes: s.shapes.map((sh) =>
            sh.id === id ? { ...sh, ...patch } : sh,
          ),
        })),
      removeShape: (id) =>
        set((s) => ({ shapes: s.shapes.filter((sh) => sh.id !== id) })),
      addTextLine: () =>
        set((s) => ({
          textLines: [
            ...s.textLines,
            {
              id: uid(),
              text: "YOUR TEXT",
              color: "#0F1211",
              size: 1,
              x: 0.5,
              y: Math.max(0.06, 0.5 - s.textLines.length * 0.12),
              rotation: 0,
            },
          ],
        })),
      updateTextLine: (id, patch) =>
        set((s) => ({
          textLines: s.textLines.map((l) =>
            l.id === id ? { ...l, ...patch } : l,
          ),
        })),
      removeTextLine: (id) =>
        set((s) => ({ textLines: s.textLines.filter((l) => l.id !== id) })),
      applyPreset: (p) => set((s) => ({ ...s, ...p, locked: false })),
      lock: () => set({ locked: true }),
      unlock: () => set({ locked: false }),
      reset: () => set({ ...DEFAULT }),
    }),
    { name: "erapack:design-v4" },
  ),
);
