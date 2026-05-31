import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { StatsBar } from '@/components/sections/stats-bar';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Papyrus360 is the brand of Netique Infotech Pvt Ltd. — 24+ years in operation, founded by domain experts with 35+ years of paper industry experience. Software products and consultancy for paper manufacturers.',
};

const milestones = [
  { year: '2002', event: 'Netique Infotech Pvt Ltd. incorporated (CIN: U72200TN2002PTC049220) — Papyrus360 brand, 360-degree services for paper industry' },
  { year: '2003', event: 'NDM (Netique Deckle Matcher) — deckle optimisation software launched; Paper Agent released for dealers and traders' },
  { year: '2005', event: 'Papy ERP — custom order & production management for large mills' },
  { year: '2010', event: 'Optrim desktop launched — second-generation deckle optimisation' },
  { year: '2015', event: 'PDN Process App — bespoke conversion handling delivered' },
  { year: '2020', event: 'Optrim Web — browser-based deckle matching, zero installation' },
  { year: '2026', event: 'Papyrus BP App — full 44-module cloud ERP for paper manufacturing launched' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden border-b border-border">
        <Image
          src="/images/about/hero.png"
          alt="Indian paper manufacturing facility"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <StatsBar />

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
          About Papyrus360
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          24+ years. One industry.
        </h1>
        <p className="text-base text-amber-400 font-semibold mb-4">
          Founded and led by domain experts with 35+ years of paper industry experience.
        </p>
        <p className="text-lg text-text-2 leading-relaxed">
          Netique Infotech Pvt Ltd. has been building enterprise software for Indian paper mills
          since 2002. Our founders came from the industry itself — we don&apos;t serve every
          sector, we go deep in one.
        </p>
      </div>

      {/* Company story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 border-b border-border pb-20">
        <div>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6">
            <Image
              src="/images/about/story.png"
              alt="Founder explaining deckle optimization to engineers"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="space-y-4 text-text-2 leading-relaxed text-sm">
            <p>
              Netique Infotech Pvt Ltd. was incorporated on 4 July 2002 with a single
              focus: software for the Indian paper industry. Our founders brought over
              35 years of hands-on paper industry experience — at a time when mills were
              running on manual processes or generic ERP systems that didn&apos;t understand
              deckle planning, broke management, or Indian regulatory compliance.
            </p>
            <p>
              Our first product addressed deckle matching — the problem of cutting large
              paper reels into customer-specified widths with minimal trim waste. It was a
              hard optimisation problem, and we built a proprietary engine to solve it.
              That engine has been refined continuously for over 30 years.
            </p>
            <p>
              Over time, we expanded into full ERP territory: sales, production planning,
              procurement, finance, HR, and compliance. Today, Papyrus BP App covers 44 modules
              purpose-built for paper manufacturing, while Optrim remains the leading
              standalone deckle optimisation product in the market.
            </p>
            <p>
              Papyrus360 is the brand of Netique Infotech Pvt Ltd., representing our
              360-degree service offering around the paper industry — software products,
              consultancy, direct import of waste paper and woodchips for raw material supply,
              and compliance advisory, all under one roof.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Mission</h2>
          <p className="text-text-2 leading-relaxed text-sm mb-6">
            To give Indian paper manufacturers the software infrastructure they need to
            run efficiently, stay compliant, and compete — without compromising on
            domain depth.
          </p>
          <div className="space-y-4">
            {[
              'Deep domain expertise over broad market coverage',
              'Compliance built-in — GST, TDS, FEMA, PF, ESI',
              'Long-term partnership, not one-time implementation',
              'Proprietary optimisation for deckle and production',
              'Direct imports of waste paper & woodchips for mill raw material supply',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <p className="text-sm text-text-2">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="mb-20 border-b border-border pb-20">
        <h2 className="text-2xl font-bold mb-10">Key Milestones</h2>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`flex gap-6 py-5 ${i < milestones.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="text-amber-400 font-mono text-sm font-bold w-12 shrink-0 pt-0.5">
                {m.year}
              </div>
              <p className="text-sm text-text-2">{m.event}</p>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* Meet the Team */}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="rounded-2xl border border-border bg-surface-2 px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Meet the Team
          </p>
          <h2 className="text-2xl font-bold mb-1">The people behind Papyrus360.</h2>
          <p className="text-sm text-text-2">
            Mill veterans, ERP architects, and compliance specialists — all under one roof.
          </p>
        </div>
        <Link
          href="/team"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-amber-400 transition-colors"
        >
          View the team
        </Link>
      </div>
    </div>
    <CTABanner
      eyebrow="Ready to talk?"
      title={<>Let&apos;s discuss<br />your mill.</>}
      subtitle="Whether you're evaluating ERP, need deckle optimisation, or want to discuss compliance consulting — we're here."
      primaryLabel="Contact Us"
    />
    </div>
  );
}
