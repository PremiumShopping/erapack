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
      <StatsBand />
      <WhyEraPack />
      <OurCups />
      {/* Scroll-scrubbed espresso-fill video (Higgsfield-generated). */}
      <ScrollVideoHero />
      <ClosingCTA />
    </main>
  );
}
