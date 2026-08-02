import ProcessBackground from "@/components/fx/ProcessBackground";
import HomeHero from "@/components/sections/HomeHero";
import StatsBand from "@/components/sections/StatsBand";
import WhyEraPack from "@/components/sections/WhyEraPack";
import OurCups from "@/components/sections/OurCups";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <main>
      <ProcessBackground poster="/hero/process-poster.png" scrim={0.18} />
      <HomeHero />
      <StatsBand />
      <WhyEraPack />
      <OurCups />
      <ClosingCTA />
    </main>
  );
}
