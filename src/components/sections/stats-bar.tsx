const STATS = [
  { value: "38", label: "Paper mill clients" },
  { value: "24+", label: "Years in operation" },
  { value: "35+", label: "Years industry expertise" },
  { value: "7", label: "Products" },
  { value: "14", label: "Services" },
];

export function StatsBar() {
  return (
    <section className="relative border-y border-border-dim bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-3xl md:text-4xl font-black text-amber-400 font-mono tracking-tight">
                {s.value}
              </span>
              <span className="text-xs text-text-3">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
