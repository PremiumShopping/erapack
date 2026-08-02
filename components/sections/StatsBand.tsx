import CountUp from "@/components/ui/CountUp";

const STATS: { value: React.ReactNode; label: string }[] = [
  { value: <CountUp to={700} suffix="+" />, label: "UK brands served" },
  { value: "2–3", label: "Working-day delivery" },
  { value: "1", label: "Minimum order (yes, one)" },
  { value: <CountUp to={100} suffix="%" />, label: "Recyclable board" },
];

export default function StatsBand() {
  return (
    <section className="border-ink/10 border-y">
      <div className="bg-ink/10 mx-auto grid max-w-[1440px] grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-paper/25 px-6 py-12 md:px-10 md:py-16">
            <div className="display text-ink text-5xl font-extrabold md:text-6xl">
              {s.value}
            </div>
            <div className="bg-green mt-3 h-0.5 w-8 rounded-full" />
            <p className="text-ink-soft mt-3 text-sm font-semibold">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
