import HomeHero from "@/components/sections/HomeHero";
import StatsBand from "@/components/sections/StatsBand";
import WhyEraPack from "@/components/sections/WhyEraPack";
import OurCups from "@/components/sections/OurCups";
import ScrollVideoHero from "@/components/sections/ScrollVideoHero";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      {/* Scroll-scrubbed espresso-fill video (Higgsfield-generated) — the
          first scroll moment, right after the hero. */}
      <ScrollVideoHero />
      <StatsBand />
      <WhyEraPack />
      <OurCups />
      <ClosingCTA />
    </main>
  );
}
