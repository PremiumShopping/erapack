import type { Metadata } from "next";
import PagePlaceholder from "@/components/shell/PagePlaceholder";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <PagePlaceholder
      kicker="Account"
      title="Sign in to your cups."
      blurb="Your saved designs, orders and reorders will live here. A simple account flow is on the way."
      milestone="Milestone 8"
    />
  );
}
