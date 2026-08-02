"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe, reactive media query — via useSyncExternalStore so there's no
 * setState-in-effect and no hydration flash. Server snapshot is `false`.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () => useMediaQuery("(pointer: fine)");

/**
 * Reads a persisted "1" flag from localStorage without a setState-in-effect.
 * Not reactive across tabs (no subscription) — only the current value at
 * mount/hydration matters for our dismiss-once banners.
 */
/** True only after client hydration — gate persisted-store UI to avoid flashes. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function usePersistentFlag(key: string): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(key) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
}
