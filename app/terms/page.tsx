import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Terms of Sale" };

export default function TermsPage() {
  return (
    <PagePlaceholder
      kicker="Legal · Terms"
      title="Terms of Sale."
      blurb="The commercial terms for custom print orders. Final wording is a TODO-CONFIRM item pending the client's legal text."
      milestone="Milestone 10"
    />
  );
}
