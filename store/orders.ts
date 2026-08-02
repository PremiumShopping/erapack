"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart";

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
  };
  createdAt: number;
  status: "confirmed";
};

type OrdersStore = {
  orders: Order[];
  addOrder: (o: Order) => void;
};

export const useOrders = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
    }),
    { name: "erapack:orders" },
  ),
);
