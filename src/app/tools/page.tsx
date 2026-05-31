import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, LayoutList, FlaskConical } from 'lucide-react';
import { CTABanner } from '@/components/sections/cta-banner';
import { ToolsClient } from './tools-client';

export const metadata: Metadata = {
  title: 'Paper Industry Calculators & Conversion Tools',
  description:
    'Free online calculators for the paper industry — GSM calculator, basis weight converter, ream weight, roll weight, roll length, caliper converter, sheet count, and price per ream tools.',
  keywords: [
    'gsm calculator',
    'paper weight converter',
    'basis weight to gsm',
    'ream weight calculator',
    'paper roll weight calculator',
    'paper roll length calculator',
    'caliper to micron',
    'paper price calculator',
    'paper industry tools',
  ],
};

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Tools
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Paper Industry Calculators
          </h1>
          <p className="text-text-2 leading-relaxed max-w-xl">
            Eight free calculators covering everything from GSM conversions and ream weights to roll
            lengths and per-sheet pricing. Bookmark this page — your daily paper maths, done in
            seconds.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['GSM', 'Basis Weight', 'Ream Weight', 'Roll Weight', 'Roll Length', 'Caliper', 'Sheet Count', 'Price'].map(
              (t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full border border-border text-text-3"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <p className="text-xs text-text-3 mt-6">
            Need a custom calculator or formula?{' '}
            <Link href="/contact" className="text-amber-400 hover:underline">
              Tell us
            </Link>{' '}
            and we&apos;ll add it.
          </p>
        </div>
      </div>

      {/* Reference pages strip */}
      <div className="border-y border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-4">
            Reference Pages
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/glossary"
              className="amber-card rounded-xl border border-border bg-surface p-5 flex items-start gap-3 group"
            >
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <BookOpen size={16} />
              </span>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-amber-400 transition-colors">
                  Paper Glossary
                </h3>
                <p className="text-xs text-text-2 mt-0.5 leading-relaxed">
                  63 industry terms — GSM, bulk, kappa, freeness, deckle and more.
                </p>
              </div>
            </Link>
            <Link
              href="/paper-grades"
              className="amber-card rounded-xl border border-border bg-surface p-5 flex items-start gap-3 group"
            >
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <LayoutList size={16} />
              </span>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-amber-400 transition-colors">
                  Paper Grades Guide
                </h3>
                <p className="text-xs text-text-2 mt-0.5 leading-relaxed">
                  Compare newsprint, LWC, art, kraft, duplex, tissue — GSM, brightness, opacity.
                </p>
              </div>
            </Link>
            <Link
              href="/standards"
              className="amber-card rounded-xl border border-border bg-surface p-5 flex items-start gap-3 group"
            >
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <FlaskConical size={16} />
              </span>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-amber-400 transition-colors">
                  Testing Standards
                </h3>
                <p className="text-xs text-text-2 mt-0.5 leading-relaxed">
                  BIS (IS), ISO, and TAPPI standards for paper and board quality testing.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <ToolsClient />

      <CTABanner
        eyebrow="Automate these calculations"
        title={<>Let the ERP do<br />the maths.</>}
        subtitle="Papyrus360 BPApp handles GSM tracking, roll inventory, and pricing automatically — no manual conversion needed."
        primaryLabel="See BPApp"
        primaryHref="https://bpapperp.papyrus360.com"
      />
    </>
  );
}
