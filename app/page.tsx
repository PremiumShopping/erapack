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
      <section className="relative overflow-hidden bg-charcoal text-paper">
        <div className="mx-auto grid min-h-[110vh] w-full max-w-[1440px] grid-cols-12 items-center gap-y-12 px-6 py-28 md:px-12">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow" style={{ color: "var(--color-clay-glow)" }}>
              How it&apos;s made · 04 steps
            </p>
            <h2 className="display mt-6 text-huge font-semibold text-paper">
              A flat sheet,
              <br />
              <span className="italic text-kraft">wrapped around</span>
              <br />
              your name.
            </h2>
            <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-paper/70">
              Watch a printed blank roll into a cone, seal to its base and curl
              its rim — the whole line, scrubbing to your scroll. It&apos;s being
              installed next.
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
                className="flex items-baseline gap-6 border-t border-paper/15 py-5"
              >
                <span className="font-mono text-sm text-clay-glow">{s.n}</span>
                <span className="display text-2xl font-medium text-paper">
                  {s.t}
                </span>
                <span className="ml-auto text-right text-sm text-paper/50">
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
