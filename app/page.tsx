import HomeHero from "@/components/sections/HomeHero";
import ProcessScroll from "@/components/sections/ProcessScroll";
import StatsBand from "@/components/sections/StatsBand";
import WhyEraPack from "@/components/sections/WhyEraPack";
import OurCups from "@/components/sections/OurCups";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      {/* Scroll-driven end-to-end process: design → order → print → deliver → fill. */}
      <ProcessScroll />
      <StatsBand />
      <WhyEraPack />
      <OurCups />
      <ClosingCTA />
    </main>
  );
}
