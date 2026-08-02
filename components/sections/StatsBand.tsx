import CountUp from "@/components/ui/CountUp";

const STATS: { value: React.ReactNode; label: string; accent?: boolean }[] = [
  { value: <CountUp to={700} suffix="+" />, label: "UK brands served" },
  { value: "2–3", label: "Working-day delivery" },
  { value: "1", label: "Minimum order — yes, one", accent: true },
  { value: <CountUp to={100} suffix="%" />, label: "Recyclable board" },
];

export default function StatsBand() {
  return (
    <section className="border-ink/12 bg-paper-warm relative border-y">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-12 md:px-10 md:py-16 ${
              i > 0 ? "border-ink/12 md:border-l" : ""
            } ${i >= 2 ? "border-ink/12 border-t md:border-t-0" : ""} ${
              s.accent ? "green-block" : ""
            }`}
          >
            <div className="display text-ink text-5xl font-bold [font-variant-numeric:tabular-nums_lining-nums] md:text-6xl">
              {s.value}
            </div>
            <p
              className={`mt-3 text-sm font-semibold ${
                s.accent ? "text-ink/70" : "text-ink-soft"
              }`}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
