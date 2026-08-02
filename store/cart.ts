"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CupConfig } from "./configurator";

export type CartItem = {
  id: string;
  size: string;
  name: string;
  qty: number;
  unitPrice: number; // numeric £
  priceLabel: string;
  snapshot: string | null; // dataURL preview thumbnail
  spec: CupConfig;
  addedAt: number;
};

type CartStore = {
  items: CartItem[];
  add: (item: Omit<CartItem, "id" | "addedAt">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `c_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((s) => ({
          items: [...s.items, { ...item, id: uid(), addedAt: Date.now() }],
        })),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, qty) } : i,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "erapack:cart" },
  ),
);

/** Selectors (call with the store hook). */
export const cartCount = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.qty, 0);
export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
