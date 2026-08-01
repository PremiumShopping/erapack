import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "About Era Pack" };

export default function AboutPage() {
  return (
    <PagePlaceholder
      kicker="About Era Pack"
      title="A UK factory that puts your name on the cup."
      blurb="The story, the factory, the sustainability commitments — recyclable stock, renewable-energy operations — are being written up here."
      milestone="Milestone 8"
    />
  );
}
