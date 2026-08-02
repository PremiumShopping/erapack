import HomeHero from "@/components/sections/HomeHero";
import ScrollVideoHero from "@/components/sections/ScrollVideoHero";

export default function Home() {
  return (
    <main>
      <HomeHero />
      {/* Scroll-scrubbed espresso-fill video hero (Higgsfield-generated). */}
      <ScrollVideoHero />
    </main>
  );
}
