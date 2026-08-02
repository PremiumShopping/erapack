export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(n);

export const FREE_SHIPPING = 100; // £
export const FLAT_SHIPPING = 5.99; // £ under threshold

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : FLAT_SHIPPING;
}
