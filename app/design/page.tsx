import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = {
  title: "Design your cup — live 3D",
  description:
    "Upload a logo, add text and colours, and see your cup in real-time 3D.",
};

export default function DesignPage() {
  return (
    <PagePlaceholder
      kicker="Design · Live 3D configurator"
      title="Design your cup, in real time."
      blurb="Pick a size, drop in your logo, set your colours and orbit a live 3D cup before you order. The configurator is the centrepiece — it's being engineered next."
      milestone="Milestone 6"
    />
  );
}
