import type { MetadataRoute } from "next";

// TODO-CONFIRM: swap the base URL for the real production domain at launch.
const BASE = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    "/design",
    "/about",
    "/faq",
    "/contact",
    "/login",
    "/privacy",
    "/shipping",
    "/terms",
  ];
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
