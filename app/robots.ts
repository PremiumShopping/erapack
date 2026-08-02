import type { MetadataRoute } from "next";

const BASE = "http://localhost:3000"; // TODO-CONFIRM: real domain at launch

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/order/", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
