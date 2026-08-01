import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <PagePlaceholder
      kicker="FAQ"
      title="Lead times, artwork, minimums — answered."
      blurb="The questions we get most — turnaround, file formats, minimum order, price matching — are being collected here."
      milestone="Milestone 8"
    />
  );
}
