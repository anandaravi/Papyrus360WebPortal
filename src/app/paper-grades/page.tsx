import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Paper Grade Guide — Types, GSM Ranges & Properties | Papyrus360',
  description:
    'Comprehensive guide to paper and board grades — newsprint, SC, LWC, HWC, art coated, UWF/bond, kraft, duplex, FBB, tissue. Compare GSM ranges, brightness, opacity, base fibre, coating, and typical uses. Includes India-specific grades.',
  keywords: [
    'paper grades guide',
    'paper grade comparison',
    'newsprint gsm',
    'LWC paper grade',
    'art coated paper',
    'kraft paper grade',
    'FBB folding box board',
    'UWF paper grade',
    'paper grade selection',
    'paper brightness opacity comparison',
  ],
};

const grades = [
  {
    name: 'Newsprint',
    gsmRange: '40–52',
    baseFibre: 'Mechanical / Recycled',
    coating: 'None',
    brightnessISO: '55–62',
    opacity: '88–92%',
    typical_uses: ['Newspapers', 'Directories', 'Free-sheets'],
    notes:
      'Low cost, browning over time due to mechanical pulp lignin. ONP grade for recycling.',
  },
  {
    name: 'SC (Super-Calendered)',
    gsmRange: '40–70',
    baseFibre: 'Mechanical + Chemical',
    coating: 'None (heavy calendering)',
    brightnessISO: '68–74',
    opacity: '90–94%',
    typical_uses: ['Consumer magazines', 'Mail-order catalogues', 'Inserts'],
    notes:
      'Achieves smoothness and gloss without coating through supercalendering.',
  },
  {
    name: 'LWC (Lightweight Coated)',
    gsmRange: '48–72',
    baseFibre: 'Mechanical + Chemical',
    coating: 'Single coat, both sides',
    brightnessISO: '70–78',
    opacity: '91–95%',
    typical_uses: ['Mass-market magazines', 'Commercial printing', 'Inserts'],
    notes:
      'Good print quality at economical weight. Contains 50–65% mechanical pulp.',
  },
  {
    name: 'MWC / HWC (Medium/Heavyweight Coated)',
    gsmRange: '70–135',
    baseFibre: 'Chemical (woodfree or LWC base)',
    coating: 'Double coat, both sides',
    brightnessISO: '80–88',
    opacity: '94–97%',
    typical_uses: ['Premium magazines', 'Brochures', 'Annual reports', 'Art books'],
    notes: 'Better ink hold-out and colour reproduction than LWC.',
  },
  {
    name: 'Art Coated / Chrome',
    gsmRange: '90–350',
    baseFibre: 'Chemical (woodfree)',
    coating: 'Heavy cast coat, both sides',
    brightnessISO: '88–94',
    opacity: '96–99%',
    typical_uses: ['Premium packaging', 'Labels', 'Luxury print', 'Pharma leaflets'],
    notes:
      'High-gloss or matte finish. Excellent colour fidelity. Cast-coated = mirror finish.',
  },
  {
    name: 'UWF / Bond / Copier',
    gsmRange: '60–200',
    baseFibre: 'Chemical (100% woodfree)',
    coating: 'None (some surface-sized)',
    brightnessISO: '80–92',
    opacity: '90–96%',
    typical_uses: ['Office copier/laser', 'Offset printing', 'Stationery', 'Books'],
    notes:
      'Permanent, acid-free when neutral/alkaline sized. Higher brightness grades are whitener-treated.',
  },
  {
    name: 'Kraft / Brown Bag',
    gsmRange: '60–400',
    baseFibre: 'Unbleached kraft (softwood)',
    coating: 'None',
    brightnessISO: '20–45',
    opacity: '85–95%',
    typical_uses: ['Multiwall bags', 'Grocery sacks', 'Wrapping', 'Industrial packaging'],
    notes:
      'Extremely high tear and tensile strength. Bleached kraft available for food-contact applications.',
  },
  {
    name: 'Duplex / Grey Board',
    gsmRange: '200–500',
    baseFibre: 'Chemical top, recycled base',
    coating: 'White top coat',
    brightnessISO: '78–86',
    opacity: '95–99%',
    typical_uses: ['Shoe boxes', 'Rigid packaging', 'Book covers', 'Garment boxes'],
    notes: 'Grey or brown back, white front. Economical for non-food packaging.',
  },
  {
    name: 'FBB (Folding Box Board)',
    gsmRange: '200–450',
    baseFibre: 'Chemical (GC1/GC2 quality)',
    coating: 'Triple coat, white both sides',
    brightnessISO: '85–92',
    opacity: '97–99%',
    typical_uses: ['Food packaging', 'Pharma cartons', 'Cosmetics', 'Confectionery'],
    notes:
      'GC1 = no mechanical pulp. GC2 = mechanical pulp allowed in middle ply. Both food-contact approved.',
  },
  {
    name: 'Tissue',
    gsmRange: '12–35',
    baseFibre: 'Virgin chemical / Recycled',
    coating: 'None (creped)',
    brightnessISO: '70–86',
    opacity: '60–85%',
    typical_uses: ['Facial tissue', 'Toilet tissue', 'Kitchen towel', 'Industrial wipes'],
    notes:
      'Creped on Yankee dryer for softness. TAD (through-air dried) tissue = premium softness.',
  },
  {
    name: 'Newsprint (India)',
    gsmRange: '45–52',
    baseFibre: 'Bamboo / Agri-waste / OCC',
    coating: 'None',
    brightnessISO: '55–60',
    opacity: '88–92%',
    typical_uses: ['Indian newspapers', 'Vernacular press', 'Directories'],
    notes:
      'Indian mills largely use bamboo, bagasse, and OCC in place of wood pulp. Key grades: Hindustan Newsprint, TNPL.',
  },
];

const decisionGuide = [
  {
    useCase: 'High-speed newspaper printing',
    recommendation: 'Newsprint (40–52 GSM)',
    reason: 'Lowest cost, designed for coldset web offset at high speed.',
  },
  {
    useCase: 'Consumer magazine on a tight budget',
    recommendation: 'LWC (48–72 GSM)',
    reason: 'Good colour at economical weight; contains mechanical pulp.',
  },
  {
    useCase: 'Premium magazine or brand brochure',
    recommendation: 'MWC / HWC (70–135 GSM)',
    reason: 'Superior colour reproduction and gloss; double-coated woodfree base.',
  },
  {
    useCase: 'Office copier, laser or inkjet printer',
    recommendation: 'UWF / Bond / Copier (75–100 GSM)',
    reason: 'Sized for toner/inkjet; permanent and acid-free.',
  },
  {
    useCase: 'Luxury packaging, cosmetics cartons, pharma',
    recommendation: 'FBB (200–350 GSM) or Art Coated',
    reason: 'FBB for food-contact compliance; art coated for premium visuals.',
  },
  {
    useCase: 'Industrial sacks, grocery bags, wrapping',
    recommendation: 'Kraft / Brown Bag (70–120 GSM)',
    reason: 'Maximum tensile and tear strength from unbleached long-fibre kraft.',
  },
  {
    useCase: 'Shoe boxes, garment packaging, book covers',
    recommendation: 'Duplex / Grey Board (250–400 GSM)',
    reason: 'Cost-effective recycled base with white presentation surface.',
  },
  {
    useCase: 'Facial tissue, hygiene products',
    recommendation: 'Tissue (12–20 GSM)',
    reason: 'Creped or TAD for softness; virgin or recycled furnish options.',
  },
  {
    useCase: 'Indian newspaper or vernacular press',
    recommendation: 'India Newsprint (45–52 GSM)',
    reason: 'Bamboo/bagasse/OCC furnish; compliant with Indian BIS specifications.',
  },
];

export default function PaperGradesPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Reference
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Paper Grade Guide
          </h1>
          <p className="text-text-2 leading-relaxed max-w-xl">
            Compare {grades.length} major paper and board grades by GSM range, base fibre,
            coating, brightness, and opacity. Includes a decision guide to help you select the
            right grade for your application.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {grades.map((g) => (
              <span
                key={g.name}
                className="text-xs px-3 py-1 rounded-full border border-border text-text-3"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Grade Comparison Table</h2>
        <p className="text-text-2 text-sm mb-6">
          All brightness values are ISO brightness (D65 illuminant). GSM ranges are indicative;
          grades may be produced outside these ranges.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-surface-3 border-b border-border">
                <th className="sticky left-0 bg-surface-3 px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                  Grade
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                  GSM Range
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                  Base Fibre
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                  Coating
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                  Brightness (ISO)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                  Opacity
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                  Typical Uses
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {grades.map((grade, i) => (
                <tr
                  key={grade.name}
                  className={`hover:bg-surface-2 transition-colors duration-100 ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-2/50'
                  }`}
                >
                  <td className="sticky left-0 bg-inherit px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {grade.name}
                  </td>
                  <td className="px-4 py-3 text-text-2 whitespace-nowrap font-mono text-xs">
                    {grade.gsmRange}
                  </td>
                  <td className="px-4 py-3 text-text-2 whitespace-nowrap">
                    {grade.baseFibre}
                  </td>
                  <td className="px-4 py-3 text-text-2 whitespace-nowrap">
                    {grade.coating}
                  </td>
                  <td className="px-4 py-3 text-text-2 whitespace-nowrap font-mono text-xs">
                    {grade.brightnessISO}
                  </td>
                  <td className="px-4 py-3 text-text-2 whitespace-nowrap font-mono text-xs">
                    {grade.opacity}
                  </td>
                  <td className="px-4 py-3 text-text-2">
                    <div className="flex flex-wrap gap-1">
                      {grade.typical_uses.map((use) => (
                        <span
                          key={use}
                          className="text-xs px-2 py-0.5 rounded-full bg-surface-3 border border-border text-text-3"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grade Detail Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 pb-14">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Grade Details</h2>
        <p className="text-text-2 text-sm mb-8">
          Technical notes and application context for each grade.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {grades.map((grade) => (
            <article
              key={grade.name}
              className="rounded-xl border border-border bg-surface-2 p-5 hover:border-amber-500/30 transition-colors duration-200 flex flex-col gap-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-foreground leading-snug">{grade.name}</h3>
                  <span className="shrink-0 text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 whitespace-nowrap">
                    {grade.gsmRange} GSM
                  </span>
                </div>
                <p className="text-sm text-text-2 leading-relaxed">{grade.notes}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-surface-3 rounded-lg px-3 py-2">
                  <p className="text-text-3 mb-0.5">Brightness</p>
                  <p className="font-mono text-foreground">{grade.brightnessISO}</p>
                </div>
                <div className="bg-surface-3 rounded-lg px-3 py-2">
                  <p className="text-text-3 mb-0.5">Opacity</p>
                  <p className="font-mono text-foreground">{grade.opacity}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-text-3 mb-2 uppercase tracking-widest font-semibold">
                  Uses
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {grade.typical_uses.map((use) => (
                    <span
                      key={use}
                      className="text-xs px-2.5 py-1 rounded-full bg-surface-3 border border-border text-text-2"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Choosing the Right Grade */}
      <section className="border-t border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
              Decision Guide
            </p>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Choosing the Right Grade
            </h2>
            <p className="text-text-2 text-sm mb-8">
              Match your end-use to the appropriate grade using this quick reference. Always
              verify with your converter or printer for final confirmation.
            </p>

            <div className="space-y-3">
              {decisionGuide.map((item) => (
                <div
                  key={item.useCase}
                  className="rounded-xl border border-border bg-surface p-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-start hover:border-amber-500/30 transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm mb-1">{item.useCase}</p>
                    <p className="text-xs text-text-3 leading-relaxed">{item.reason}</p>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                    {item.recommendation}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-3 mt-6">
              Need detailed grade specifications or raw material sourcing?{' '}
              <Link href="/contact" className="text-amber-400 hover:underline">
                Talk to the Papyrus360 team.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Raw material sourcing made simple"
        title={
          <>
            Source the right grade
            <br />
            at the right price.
          </>
        }
        subtitle="Papyrus360 sources market pulp, recovered fibre, and specialty raw materials for Indian paper mills — backed by 24+ years of trade relationships."
        primaryLabel="Explore Raw Materials"
        primaryHref="/services/raw-material-import-export"
      />
    </>
  );
}
