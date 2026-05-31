import type { Metadata } from 'next';
import { CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Case Studies — Paper Mill Results | Papyrus360',
  description:
    'Real outcomes from Indian paper mills using Papyrus360 software and services — trim waste reduction with Optrim, full ERP go-lives with BPApp, raw material import savings, and GST compliance overhauls.',
};

type ProductType = 'optrim' | 'bpapp' | 'rawmaterial';

interface CaseStudy {
  title: string;
  location: string;
  millType: string;
  capacity: string;
  product: string;
  productType: ProductType;
  challenge: string;
  solution: string;
  results: string[];
  quote: string;
  quoteRole: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: '1.4% Trim Waste Reduction at a Kraft Paper Mill',
    location: 'Tamil Nadu, India',
    millType: 'Kraft & Packaging Board',
    capacity: '120 TPD',
    product: 'Optrim Web',
    productType: 'optrim',
    challenge:
      'Mill was running deckle planning on paper and Excel. Planners spent 30–45 minutes per shift calculating cut combinations manually. Average trim waste was running at 2.1% of output — above the industry benchmark of 1.5%.',
    solution:
      'Deployed Optrim Web (browser-based, zero installation). Planners now enter the order list and reel widths; the engine returns the optimal cutting plan in under 10 seconds. Accessible on any device from the control room or office.',
    results: [
      'Trim waste reduced from 2.1% to 0.7%',
      'Planning time cut from 45 min to under 2 min per shift',
      'Zero installation — deployed in one day',
      'Used across 3 paper machines simultaneously',
    ],
    quote:
      'The ROI was immediate. We saved more in one month than the entire cost of the software.',
    quoteRole: 'Production Manager',
  },
  {
    title: 'Full ERP Go-Live for 44-Module BPApp in 14 Weeks',
    location: 'Maharashtra, India',
    millType: 'Writing & Printing Paper',
    capacity: '80 TPD',
    product: 'BPApp ERP',
    productType: 'bpapp',
    challenge:
      'Mill was running on a combination of a legacy Tally-based setup, manual production logs, and spreadsheets for HR and compliance. GST reconciliation took 3–4 days per month. No real-time visibility into production or inventory.',
    solution:
      'Full BPApp deployment across sales, production planning, inventory, procurement, finance, HR, and compliance modules. Data migration from legacy systems handled by the Papyrus360 implementation team. Staff training conducted on-site over 2 weeks.',
    results: [
      'Go-live in 14 weeks from contract signing',
      'GST reconciliation time reduced from 4 days to 4 hours',
      'Real-time production dashboards for management',
      'PF and ESI compliance automated',
      'Inventory accuracy improved from ~72% to 98%+',
    ],
    quote: 'For the first time, I can see the entire mill\'s status from my phone at 11pm.',
    quoteRole: 'Managing Director',
  },
  {
    title: 'Sourcing 800 MT/Month OCC from the USA — Landed at 18% Below Local Market',
    location: 'Gujarat, India',
    millType: 'Recycled Fiber Board',
    capacity: '200 TPD',
    product: 'Raw Material Import (OCC)',
    productType: 'rawmaterial',
    challenge:
      'Mill was buying OCC entirely from domestic traders. Quality was inconsistent, supply was unreliable during peak seasons, and prices were 20–25% above import parity. The mill had no direct import experience.',
    solution:
      'Papyrus360 connected the mill to its OCC supplier network in the USA. Handled the entire process — supplier qualification, pricing negotiation, letter of credit, customs clearance, and FEMA compliance documentation.',
    results: [
      '800 MT/month steady OCC supply secured',
      'Landed cost 18% below equivalent domestic grade',
      'Quality consistency significantly improved (OCC grade 11 specification)',
      'FEMA and customs fully managed by Papyrus360',
      'First shipment delivered within 8 weeks of engagement',
    ],
    quote:
      'We had tried to import before but got stuck on FEMA paperwork. Papyrus360 made it completely seamless.',
    quoteRole: 'Procurement Head',
  },
  {
    title: 'Optrim Deckle Optimisation Across a 5-Machine Integrated Mill',
    location: 'Andhra Pradesh, India',
    millType: 'Integrated Pulp & Paper (Newsprint + W&P)',
    capacity: '450 TPD',
    product: 'Optrim (Desktop)',
    productType: 'optrim',
    challenge:
      'Large integrated mill running 5 paper machines with different reel widths. Central planning team manually calculating deckle plans for each machine. Coordination between machines was causing sub-optimal allocation of customer orders, with some machines running high trim while others ran efficiently.',
    solution:
      'Optrim desktop deployed across the central planning team. Custom configuration for each machine\'s reel width and blade allowances. Training for 6 planners over 3 days.',
    results: [
      'Weighted average trim across all 5 machines reduced by 0.9%',
      'At 450 TPD, 0.9% trim = ~4 MT/day saved',
      'Cross-machine order allocation improved significantly',
      'Planning team capacity freed for higher-value work',
    ],
    quote: 'At our scale, even 0.5% trim matters. Optrim delivered more than that.',
    quoteRole: 'VP Operations',
  },
  {
    title: 'GST Compliance Overhaul — From Penalty Risk to Audit-Ready',
    location: 'West Bengal, India',
    millType: 'Tissue & Speciality Paper',
    capacity: '60 TPD',
    product: 'BPApp + Compliance Consulting',
    productType: 'bpapp',
    challenge:
      'Mill received a GST audit notice after two years of manual filing. Reconciliation between GSTR-1, GSTR-3B, and purchase records revealed significant mismatches. E-way bill compliance was incomplete. The MD needed the issue resolved before a formal audit.',
    solution:
      "Papyrus360 compliance team conducted a full GST health check — identified mismatch sources, filed revised returns where applicable, and implemented BPApp's built-in GST reconciliation module. Also set up automated e-way bill generation linked to dispatch.",
    results: [
      'GST mismatch resolved before audit escalation',
      'E-way bill compliance rate reached 100%',
      'GSTR-1 auto-populated from BPApp sales invoices',
      'Reconciliation process now takes 4 hours/month vs 4 days',
      'No penalty issued — audit closed successfully',
    ],
    quote: 'They understood both the software and the regulation. That combination is rare.',
    quoteRole: 'Chief Financial Officer',
  },
];

const productBadgeClasses: Record<ProductType, string> = {
  optrim: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  bpapp: 'text-sky-400 border-sky-500/30 bg-sky-500/[0.08]',
  rawmaterial: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Case Studies
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
            Results from the mill floor.
          </h1>
          <p className="text-text-2 text-base md:text-lg max-w-2xl leading-relaxed">
            Real outcomes from Indian paper mills using Papyrus360 software and services.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-b border-border bg-surface-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-2">
            <span className="flex items-center gap-2">
              <TrendingUp size={14} className="text-amber-400" />
              <span>
                <span className="font-semibold text-foreground">5</span> case studies
              </span>
            </span>
            <span className="text-border">·</span>
            <span>
              <span className="font-semibold text-foreground">3</span> product lines
            </span>
            <span className="text-border">·</span>
            <span>
              <span className="font-semibold text-foreground">4</span> Indian states
            </span>
          </div>
        </div>
      </div>

      {/* Case studies */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-10">
        {caseStudies.map((cs, i) => (
          <article
            key={i}
            className="amber-card rounded-2xl bg-surface border border-border overflow-hidden"
          >
            {/* Gradient left border accent */}
            <div className="flex">
              <div className="w-1 shrink-0 bg-gradient-to-b from-amber-400 to-amber-600" />

              <div className="flex-1 min-w-0 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-wrap items-start gap-3 mb-6">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">
                      {cs.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-text-2">
                      <span className="font-medium text-foreground">{cs.millType}</span>
                      <span className="text-border">·</span>
                      <span>{cs.location}</span>
                      <span className="text-border">·</span>
                      <span>{cs.capacity}</span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border ${productBadgeClasses[cs.productType]}`}
                  >
                    {cs.product}
                  </span>
                </div>

                {/* Challenge / Solution / Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Left: challenge + solution */}
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-2">
                        Challenge
                      </p>
                      <p className="text-sm text-text-2 leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-2">
                        Solution
                      </p>
                      <p className="text-sm text-text-2 leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Right: results checklist */}
                  <div className="rounded-xl bg-surface-2 border border-border p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-4">
                      Results
                    </p>
                    <ul className="space-y-3">
                      {cs.results.map((result, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle
                            size={16}
                            className="text-amber-400 shrink-0 mt-0.5"
                          />
                          <span className="text-sm text-foreground leading-snug">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="border-t border-border pt-5">
                  <p className="text-sm italic text-text-2 leading-relaxed mb-2">
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <footer className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                    — {cs.quoteRole}
                  </footer>
                </blockquote>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* "Your mill could be next" section */}
      <div className="border-t border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Your mill could be next
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-10">
            Proven across mills of every size.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { value: '38 mills', label: 'Active client deployments' },
              { value: '35+ years', label: 'Combined domain expertise' },
              { value: '4 countries', label: 'India, UAE, Oman & beyond' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                <div className="text-sm text-text-2">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all duration-200"
            >
              Talk to us about your mill
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <CTABanner
        eyebrow="Ready to write your own story?"
        title={
          <>
            Tell us about
            <br />
            your mill.
          </>
        }
        subtitle="We'll identify the highest-impact improvement — whether that's trim waste, ERP modernisation, or raw material cost."
        primaryLabel="Start a Conversation"
      />
    </>
  );
}
