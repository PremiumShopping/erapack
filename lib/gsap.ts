"use client";

/**
 * Central GSAP entry — registers ScrollTrigger once, client-side only.
 * Import { gsap, ScrollTrigger } from "@/lib/gsap" everywhere so the plugin
 * is never registered twice.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
