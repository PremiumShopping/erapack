import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PagePlaceholder
      kicker="Contact"
      title="Talk to a real person."
      blurb="Free design help, quotes and questions — a proper contact form and our details are on the way."
      milestone="Milestone 8"
    />
  );
}
