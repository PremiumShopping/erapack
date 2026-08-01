import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = {
  title: "Shop — custom paper cups",
  description:
    "4oz, 6oz, 8oz and 12oz custom-branded paper cups, factory-direct.",
};

export default function ShopPage() {
  return (
    <PagePlaceholder
      kicker="Shop · 04 sizes"
      title="Four sizes, one job: your brand."
      blurb="The full range — 4oz espresso to 12oz filter, all full-colour and factory-direct — is being racked up here next."
      milestone="Milestone 5"
    />
  );
}
