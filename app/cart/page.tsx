import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <PagePlaceholder
      kicker="Cart"
      title="Your cups, ready to order."
      blurb="Locked designs, quantities and the free-shipping-over-£100 line will gather here, with a clean mock checkout."
      milestone="Milestone 7"
    />
  );
}
