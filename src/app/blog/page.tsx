import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Rss } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on paper manufacturing, ERP, deckle optimisation, and Indian compliance — from the Papyrus360 team.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        src="/images/blog/hero.png"
        alt="Paper industry insights and articles"
        eyebrow="Blog"
        title="Insights & Updates"
        description="Perspectives on paper manufacturing, enterprise software, deckle optimisation, and compliance for Indian paper mills."
        height="sm"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* Coming soon state */}
      <div className="rounded-2xl border border-border bg-surface p-16 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
          <Rss size={22} className="text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold mb-3">Blog coming soon</h2>
        <p className="text-sm text-text-2 mb-8 leading-relaxed">
          We&apos;re preparing articles on ERP implementation, deckle optimisation
          best practices, GST compliance, and paper manufacturing operations. Check
          back soon, or get in touch with a specific question.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors duration-200"
        >
          Ask Us Directly
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
    </>
  );
}
