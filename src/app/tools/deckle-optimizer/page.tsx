import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle, MinusCircle, Zap, Monitor, Globe, LayoutGrid } from 'lucide-react';
import { DeckleClient } from './deckle-client';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Deckle Optimizer — Slitter Pattern Calculator | Papyrus360',
  description:
    'Free deckle optimizer for paper mills. Enter deckle width, knife count, and order widths to get optimal slitter patterns with trim loss and set quantities. See how our production-grade Optrim suite takes it further.',
  keywords: [
    'deckle optimizer',
    'slitter pattern calculator',
    'cutting stock problem',
    'trim loss calculator',
    'paper reel slitting',
    'deckle setting',
    'deckle matching software',
    'paper mill tools',
    'optrim',
  ],
};

// ─── Comparison data ─────────────────────────────────────────────────────────

const COMPARISON = [
  {
    feature: 'Visual pattern bar with knife positions',
    free: true,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Trim loss per pattern',
    free: true,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Set quantity calculation',
    free: true,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Max 10 order widths',
    free: true,
    optrim: null,
    bpapp: null,
  },
  {
    feature: 'Unlimited order widths',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Import orders from ERP / Excel',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Demand carry-forward across batches',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Multi-machine / multi-deckle support',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Proprietary optimisation engine',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'MILP-based solver (mathematically optimal patterns)',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Printable knife-setting sheets for operators',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Rush / priority order handling',
    free: false,
    optrim: true,
    bpapp: true,
  },
  {
    feature: 'Existing stock utilisation',
    free: false,
    optrim: false,
    bpapp: true,
  },
  {
    feature: 'Integrated sales & production orders',
    free: false,
    optrim: false,
    bpapp: true,
  },
  {
    feature: 'Shift-wise production scheduling',
    free: false,
    optrim: false,
    bpapp: true,
  },
  {
    feature: 'Historical trim-loss reports & analytics',
    free: false,
    optrim: false,
    bpapp: true,
  },
  {
    feature: 'Full ERP (sales, finance, HR, compliance)',
    free: false,
    optrim: false,
    bpapp: true,
  },
];

function Cell({ val }: { val: boolean | null }) {
  if (val === null)
    return (
      <td className="px-4 py-3 text-center">
        <MinusCircle size={16} className="inline text-text-4" />
      </td>
    );
  if (val)
    return (
      <td className="px-4 py-3 text-center">
        <CheckCircle2 size={16} className="inline text-emerald-400" />
      </td>
    );
  return (
    <td className="px-4 py-3 text-center">
      <XCircle size={16} className="inline text-text-4/40" />
    </td>
  );
}

// ─── Production suite section ─────────────────────────────────────────────────

function DecklePromo() {
  return (
    <div className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 space-y-20">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Production-Grade Deckle Matching
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The free tool is a starting point.
            <br />
            <span className="text-text-2">Your mill needs more.</span>
          </h2>
          <p className="text-text-2 leading-relaxed">
            Real-world deckle matching involves hundreds of orders, carry-forward demand, multi-machine
            constraints, and operator floor sheets — problems a browser calculator can&apos;t solve.
            Papyrus360 has been building deckle optimisation software for Indian paper mills for over
            a decade, starting with our original Netique Deckle Matcher and evolving into the
            Optrim suite and the BP App deckle module.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Optrim Desktop */}
          <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4 hover:border-blue-500/40 transition-colors group">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Monitor size={18} />
              </span>
              <div>
                <p className="text-xs text-text-3 uppercase tracking-wider font-semibold">Optrim</p>
                <p className="text-xs text-text-4">Desktop Application</p>
              </div>
            </div>
            <h3 className="font-bold text-lg text-foreground">Desktop Deckle Matching</h3>
            <p className="text-sm text-text-2 leading-relaxed flex-1">
              Standalone Windows application with a proprietary optimisation engine. Handles
              unlimited order widths, demand carry-forward, multi-machine deckles, and generates
              printable knife-setting sheets for your slitter operators.
            </p>
            <ul className="space-y-1.5 text-sm text-text-2">
              {[
                'Proprietary optimisation — not just greedy',
                'Import orders from Excel',
                'Printable floor sheets',
                'Multi-machine support',
                'Demand carry-forward',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/products/optrim"
              className="mt-auto inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium group-hover:gap-2.5 transition-all"
            >
              Learn more <ArrowRight size={14} />
            </Link>
          </div>

          {/* Optrim Web */}
          <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4 hover:border-indigo-500/40 transition-colors group">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Globe size={18} />
              </span>
              <div>
                <p className="text-xs text-text-3 uppercase tracking-wider font-semibold">Optrim Web</p>
                <p className="text-xs text-text-4">Browser-Based</p>
              </div>
            </div>
            <h3 className="font-bold text-lg text-foreground">Web-Based Deckle Matching</h3>
            <p className="text-sm text-text-2 leading-relaxed flex-1">
              The same Optrim optimisation engine, accessible from any browser — no installation,
              no IT overhead. Ideal for mills that need optimisation across multiple sites or for
              planners who work remotely.
            </p>
            <ul className="space-y-1.5 text-sm text-text-2">
              {[
                'Same engine as Optrim desktop',
                'No installation required',
                'Multi-site access',
                'Cloud-synced order history',
                'Role-based access',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/products/optrim-web"
              className="mt-auto inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium group-hover:gap-2.5 transition-all"
            >
              Learn more <ArrowRight size={14} />
            </Link>
          </div>

          {/* BP App */}
          <div className="rounded-2xl border border-amber-500/30 bg-surface p-6 flex flex-col gap-4 hover:border-amber-500/60 transition-colors group relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full px-2.5 py-0.5">
              Most Complete
            </div>
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <LayoutGrid size={18} />
              </span>
              <div>
                <p className="text-xs text-text-3 uppercase tracking-wider font-semibold">Papyrus BP App</p>
                <p className="text-xs text-text-4">Full ERP · 44 Modules</p>
              </div>
            </div>
            <h3 className="font-bold text-lg text-foreground">ERP with Deckle Module</h3>
            <p className="text-sm text-text-2 leading-relaxed flex-1">
              The BP App deckle matching module sits inside a full paper-mill ERP. Orders flow
              directly from sales into the deckle planner. Completed patterns update production,
              inventory, and dispatch automatically — no re-entry.
            </p>
            <ul className="space-y-1.5 text-sm text-text-2">
              {[
                'Orders from sales — zero re-entry',
                'Existing stock utilisation',
                'Shift-wise scheduling',
                'Historical trim-loss analytics',
                'Dispatch & billing integration',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/products/bpapp"
              className="mt-auto inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 font-medium group-hover:gap-2.5 transition-all"
            >
              Explore BP App <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Comparison table */}
        <div>
          <h3 className="text-xl font-bold mb-6">Feature Comparison</h3>
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-2">
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-text-3 uppercase tracking-wide w-1/2">
                      Capability
                    </th>
                    <th className="px-4 py-3.5 text-center text-xs font-semibold text-text-3 uppercase tracking-wide">
                      Free Tool
                    </th>
                    <th className="px-4 py-3.5 text-center text-xs font-semibold text-blue-400 uppercase tracking-wide">
                      Optrim
                    </th>
                    <th className="px-4 py-3.5 text-center text-xs font-semibold text-amber-400 uppercase tracking-wide">
                      BP App
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-border/50 ${i % 2 === 0 ? '' : 'bg-surface-2/40'}`}
                    >
                      <td className="px-4 py-3 text-text-2 text-sm">{row.feature}</td>
                      <Cell val={row.free} />
                      <Cell val={row.optrim} />
                      <Cell val={row.bpapp} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-border bg-surface-2/60 flex items-center gap-4 text-xs text-text-4">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400" /> Included</span>
              <span className="flex items-center gap-1.5"><XCircle size={12} className="text-text-4/40" /> Not included</span>
              <span className="flex items-center gap-1.5"><MinusCircle size={12} className="text-text-4" /> Not applicable</span>
            </div>
          </div>
        </div>

        {/* Lead CTA */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
              <Zap size={22} />
            </span>
            <div>
              <h3 className="text-xl font-bold mb-1">Ready to eliminate trim waste at scale?</h3>
              <p className="text-text-2 text-sm leading-relaxed max-w-lg">
                Our team has deployed deckle optimisation at mills across India. Schedule a 30-minute
                demo — bring your current order list and we&apos;ll show you exactly how much trim
                your mill can recover.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors text-sm whitespace-nowrap"
            >
              Request a Demo <ArrowRight size={15} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium rounded-xl hover:border-amber-500/50 hover:text-amber-400 transition-colors text-sm whitespace-nowrap"
            >
              View All Products
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DeckleOptimizerPage() {
  return (
    <>
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Tools
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Deckle Optimizer
          </h1>
          <p className="text-text-2 leading-relaxed max-w-xl">
            Free browser tool — enter your deckle width, knife count, and order widths to get
            optimised slitter patterns with visual knife settings, trim loss, and set quantities.
            For production use, see our{' '}
            <Link href="/products/optrim" className="text-amber-400 hover:underline">
              Optrim
            </Link>{' '}
            and{' '}
            <Link href="/products/bpapp" className="text-amber-400 hover:underline">
              BP App
            </Link>{' '}
            deckle matching suite.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['Trim Loss', 'Knife Settings', 'Set Quantities', 'Pattern Visualizer'].map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full border border-border text-text-3"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <DeckleClient />

      <DecklePromo />

      <CTABanner />
    </>
  );
}
