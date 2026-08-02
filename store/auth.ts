"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * STUB auth for localhost only. No real authentication — it just remembers a
 * mock session in localStorage so the account flow can be demoed. Replace with
 * a real provider (see README) before launch. Never store real passwords here.
 */
type AuthStore = {
  user: { email: string } | null;
  signIn: (email: string) => void;
  signOut: () => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      signIn: (email) => set({ user: { email } }),
      signOut: () => set({ user: null }),
    }),
    { name: "erapack:auth" },
  ),
);
