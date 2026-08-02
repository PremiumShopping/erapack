"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CupConfig } from "./configurator";

/** A design the customer locked in — kept so they can reorder or edit it. */
export type SavedDesign = {
  id: string;
  name: string;
  size: string;
  snapshot: string | null; // 3D render data URL (thumbnail)
  spec: Partial<CupConfig>;
  createdAt: number;
};

type DesignsStore = {
  designs: SavedDesign[];
  save: (d: SavedDesign) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useDesigns = create<DesignsStore>()(
  persist(
    (set) => ({
      designs: [],
      save: (d) => set((s) => ({ designs: [d, ...s.designs].slice(0, 60) })),
      remove: (id) =>
        set((s) => ({ designs: s.designs.filter((x) => x.id !== id) })),
      clear: () => set({ designs: [] }),
    }),
    { name: "erapack:designs" },
  ),
);
