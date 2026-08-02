export type CupSize = "4oz" | "6oz" | "8oz" | "12oz";

export type Product = {
  size: CupSize;
  slug: string;
  name: string;
  /** Total price for the base 1,000-unit order (as shown on erapack.uk). */
  price1000: number;
  capacity: string;
  use: string;
  blurb: string;
  badge: string;
  popular?: boolean;
};

/**
 * Real catalogue + pricing captured verbatim from erapack.uk product pages.
 * Prices are quoted PER 1,000 UNITS with volume discounts (see QTY_TIERS).
 * NB: the live site mislabels handles — its "6oz" lives at /products/8oz and
 * has no true 6oz; we keep the homepage display labels (4/6/8/12oz).
 */
export const PRODUCTS: Product[] = [
  {
    size: "4oz",
    slug: "4oz",
    name: "4oz paper cups",
    price1000: 85.79,
    capacity: "120ml",
    use: "Espresso · Cortado",
    blurb:
      "Put your brand straight into your customers' hands. Ideal for hot and cold drinks, delivered with fast lead times.",
    badge: "Express delivery",
  },
  {
    size: "6oz",
    slug: "6oz",
    name: "6oz paper cups",
    price1000: 142.55,
    capacity: "175ml",
    use: "Cappuccino · Piccolo",
    blurb:
      "The morning classic — room for milk and a proper crema, printed edge to edge in full colour.",
    badge: "Full colour",
  },
  {
    size: "8oz",
    slug: "8oz",
    name: "8oz paper cups",
    price1000: 82.0,
    capacity: "240ml",
    use: "Flat white · Tea",
    blurb:
      "The everyday hero — flat whites, teas and hot chocolate, made for delivery and dine-in alike.",
    badge: "Made for delivery",
    popular: true,
  },
  {
    size: "12oz",
    slug: "12oz",
    name: "12oz paper cups",
    price1000: 69.99,
    capacity: "340ml",
    use: "Latte · Filter",
    blurb:
      "Go large. Lattes, filter and everything to-go — the best price per cup in the range.",
    badge: "Speedy lead times",
  },
];

/** Relative cup HEIGHT per size (12oz = 1) so the range can be shown to scale. */
export const SIZE_SCALE: Record<CupSize, number> = {
  "4oz": 0.66,
  "6oz": 0.77,
  "8oz": 0.86,
  "12oz": 1,
};

/** Volume tiers (discount curve verbatim from the 4oz page; consistent across sizes). */
export const QTY_TIERS = [
  { qty: 1000, discount: 0 },
  { qty: 2000, discount: 0.0256 },
  { qty: 3000, discount: 0.0513 },
  { qty: 4000, discount: 0.0769 },
  { qty: 5000, discount: 0.1026 },
  { qty: 10000, discount: 0.1841 },
] as const;

export type QtyTier = (typeof QTY_TIERS)[number];

/** Price a product at a given quantity tier. */
export function priceFor(price1000: number, qty: number) {
  const tier =
    QTY_TIERS.find((t) => t.qty === qty) ??
    QTY_TIERS.reduce((a, b) =>
      Math.abs(b.qty - qty) < Math.abs(a.qty - qty) ? b : a,
    );
  const unitBase = price1000 / 1000;
  const perUnit = unitBase * (1 - tier.discount);
  return {
    qty: tier.qty,
    perUnit,
    total: perUnit * tier.qty,
    savingsPct: tier.discount,
  };
}

/** "from £0.070/unit" style label — the cheapest per-unit at max volume. */
export function fromPerUnit(price1000: number) {
  const cheapest = priceFor(price1000, 10000).perUnit;
  return cheapest;
}

/** Shared specs (verbatim from the product pages). */
export const SPECS = {
  board:
    "Double-wall: a 300 GSM outer board over a 320 GSM lined interior for excellent insulation, hot or cold.",
  print: "Printed full-colour CMYK, available with a matte or gloss finish.",
  delivery: "Delivered in 2–3 working days · next-day available.",
  moq: "No minimum order quantity.",
  shipping: "Free UK shipping on orders over £100.",
  design: "Free design help + AI design tool. SW & DW templates available.",
};

export const PRODUCT_FEATURES = [
  "Full-colour custom print",
  "No minimum order",
  "2–3 working-day delivery",
  "100% recyclable board",
];

export const FREE_SHIPPING_THRESHOLD = 100; // £ — free UK shipping over this

/** Per-size cup tints for the product-card glyph (brand palette). */
export const CUP_TINTS: Record<CupSize, { body: string; band: string }> = {
  "4oz": { body: "#EFE6D3", band: "#1A1A1A" },
  "6oz": { body: "#FFFFFF", band: "#39FF14" },
  "8oz": { body: "#DFF7D0", band: "#1FBF07" },
  "12oz": { body: "#1A1A1A", band: "#39FF14" },
};
