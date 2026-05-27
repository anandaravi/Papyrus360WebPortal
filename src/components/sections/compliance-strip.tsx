import { ShieldCheck } from "lucide-react";

const BADGES = [
  { label: "GST", sub: "GSTR-1 / 3B / 9 · e-Invoice", color: "#F59E0B" },
  { label: "TDS / TCS", sub: "26Q · 27Q · 27EQ · Form 16A", color: "#A855F7" },
  { label: "FEMA", sub: "Exports · LC · Forex revaluation", color: "#10B981" },
  { label: "PF / ESI", sub: "ECR · Challan · Form 16", color: "#3B82F6" },
  { label: "e-Way Bill", sub: "Auto-generate · Cancel · Extend", color: "#F97316" },
  { label: "ISO Ready", sub: "9001 · 14001 alignment", color: "#EC4899" },
];

export function ComplianceStrip() {
  return (
    <section className="py-20 bg-background border-b border-border-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Indian Compliance
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight">
              Built for India&apos;s regulatory stack.
              <br />
              <span className="text-text-3">Not bolted on.</span>
            </h2>
          </div>
          <p className="text-text-3 text-sm max-w-sm leading-relaxed">
            Every statutory obligation handled across our products and consulting engagements —
            no third-party compliance bolt-ons required.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="bg-surface border rounded-xl p-5 flex flex-col gap-3 transition-colors"
              style={{ borderColor: `${b.color}25` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center border"
                style={{ background: `${b.color}12`, borderColor: `${b.color}35` }}
              >
                <ShieldCheck size={16} style={{ color: b.color }} />
              </div>
              <div>
                <p className="text-foreground font-bold text-sm mb-1">{b.label}</p>
                <p className="text-text-3 text-[11px] leading-snug">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
