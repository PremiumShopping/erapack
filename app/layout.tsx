import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ProcessBackground from "@/components/fx/ProcessBackground";
import GrainOverlay from "@/components/fx/GrainOverlay";
import CustomCursor from "@/components/fx/CustomCursor";
import PromoBanner from "@/components/shell/PromoBanner";
import SiteNav from "@/components/shell/SiteNav";
import SiteFooter from "@/components/shell/SiteFooter";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Era Pack — Custom-branded paper cups, factory direct",
    template: "%s · Era Pack",
  },
  description:
    "Your brand, in every cup. Full-colour custom paper cups from a UK factory — low/no minimum order, 2–3 day delivery, free design help. Design yours live in 3D.",
  openGraph: {
    title: "Era Pack — Your brand, in every cup",
    description:
      "Full-colour custom paper cups, factory direct. Low/no minimum order, 2–3 day delivery. Design yours live in 3D.",
    type: "website",
    locale: "en_GB",
    siteName: "Era Pack",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${fontVariables} h-full antialiased`}>
      <body className="bg-paper text-ink flex min-h-full flex-col">
        <a
          href="#main-content"
          className="focus:bg-ink focus:text-paper sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <ProcessBackground poster="/hero/process-poster.png" scrim={0.28} />
        <GrainOverlay />
        <CustomCursor />
        <CartDrawer />
        <SmoothScroll>
          <PromoBanner />
          <SiteNav />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
