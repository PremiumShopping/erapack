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

export type CupConfig = {
  size: CupSize;
  baseColor: string; // cup body colour
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
    { name: "erapack:design-v3" },
  ),
);
