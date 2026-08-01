import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      kicker="Legal · Privacy"
      title="Privacy Policy."
      blurb="How we handle your data, plainly stated. The full policy copy is a TODO-CONFIRM item pending the client's legal text."
      milestone="Milestone 10"
    />
  );
}
