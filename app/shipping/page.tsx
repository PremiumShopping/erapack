import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Shipping & Refunds" };

export default function ShippingPage() {
  return (
    <PagePlaceholder
      kicker="Legal · Shipping & Refunds"
      title="Shipping & Refunds."
      blurb="Free UK shipping over £100, 2–3 day turnaround, and our returns approach. Exact policy wording is a TODO-CONFIRM item."
      milestone="Milestone 10"
    />
  );
}
