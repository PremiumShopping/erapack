/**
 * Product data — sizes + placeholder pricing captured from erapack.uk.
 * TODO-CONFIRM: the price BASIS (per case / per 1000 / per unit) is not stated
 * on the live site and the individual product pages could not be fetched. The
 * odd ordering (6oz dearest, 12oz cheapest) implies these are NOT on the same
 * quantity basis. Confirm units + quantity breaks before launch.
 */
export type Product = {
  size: string;
  slug: string;
  name: string;
  price: string;
  capacity: string;
  blurb: string;
  use: string;
  popular?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    size: "4oz",
    slug: "4oz",
    name: "4oz Espresso",
    price: "£85.79",
    capacity: "120ml",
    blurb: "Short and punchy — the perfect espresso and cortado cup.",
    use: "Espresso · Cortado",
  },
  {
    size: "6oz",
    slug: "6oz",
    name: "6oz Cappuccino",
    price: "£142.55",
    capacity: "175ml",
    blurb: "The morning classic. Room for milk and a proper crema.",
    use: "Cappuccino · Piccolo",
  },
  {
    size: "8oz",
    slug: "8oz",
    name: "8oz Flat White",
    price: "£82.00",
    capacity: "240ml",
    blurb: "The everyday hero — flat whites, teas, hot chocolate.",
    use: "Flat white · Tea",
    popular: true,
  },
  {
    size: "12oz",
    slug: "12oz",
    name: "12oz Latte",
    price: "£69.99",
    capacity: "340ml",
    blurb: "Go large. Lattes, filter and everything to-go.",
    use: "Latte · Filter",
  },
];

/** Everything below is true for every size (from the live product cards). */
export const PRODUCT_FEATURES = [
  "Full-colour custom print",
  "No minimum order",
  "2–3 working-day delivery",
  "100% recyclable board",
];

export const FREE_SHIPPING_THRESHOLD = 100; // £ — free UK shipping over this
