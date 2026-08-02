import type { Metadata } from "next";
import Configurator from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Design your cup — live 3D",
  description:
    "Upload a logo, add text and colours, and see your custom paper cup in real-time 3D. Lock it in and order — no minimum, 2–3 day delivery.",
};

export default function DesignPage() {
  return <Configurator />;
}
