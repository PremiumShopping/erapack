import HomeHero from "@/components/sections/HomeHero";

export default function Home() {
  return (
    <main>
      <HomeHero />

      {/*
        The dark "manufacturing" register. In M3 this becomes the pinned,
        scroll-scrubbed 3D canvas where a flat sheet becomes a finished,
        branded cup. For now it stands as the editorial lead-in.
      */}
      <section className="bg-charcoal text-paper relative overflow-hidden">
        <div className="mx-auto grid min-h-[110vh] w-full max-w-[1440px] grid-cols-12 items-center gap-y-12 px-6 py-28 md:px-12">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow" style={{ color: "var(--color-clay-glow)" }}>
              How it&apos;s made · 04 steps
            </p>
            <h2 className="display text-huge text-paper mt-6 font-semibold">
              A flat sheet,
              <br />
              <span className="text-kraft italic">wrapped around</span>
              <br />
              your name.
            </h2>
            <p className="text-paper/70 mt-8 max-w-md text-lg leading-relaxed text-pretty">
              Watch a printed blank roll into a cone, seal to its base and curl
              its rim — the whole line, scrubbing to your scroll. It&apos;s
              being installed next.
            </p>
          </div>

          <ol className="col-span-12 space-y-px lg:col-span-5">
            {[
              { n: "01", t: "Print the wrap", d: "Full-colour, edge to edge." },
              { n: "02", t: "Roll the cone", d: "The blank becomes a body." },
              { n: "03", t: "Seal the base", d: "A disc locks the bottom." },
              { n: "04", t: "Curl the rim", d: "Rolled lip, ready to fill." },
            ].map((s) => (
              <li
                key={s.n}
                className="border-paper/15 flex items-baseline gap-6 border-t py-5"
              >
                <span className="text-clay-glow font-mono text-sm">{s.n}</span>
                <span className="display text-paper text-2xl font-medium">
                  {s.t}
                </span>
                <span className="text-paper/50 ml-auto text-right text-sm">
                  {s.d}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
