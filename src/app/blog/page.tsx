import Link from 'next/link';
import { ArrowRight, Rss } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { pageMeta } from '@/lib/seo';
import { posts, formatPostDate } from '@/lib/posts';

export const metadata = pageMeta({
  title: 'Blog',
  path: '/blog',
  description:
    'Insights on paper manufacturing, ERP, deckle optimisation, and Indian compliance — from the Papyrus360 team.',
});

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
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="amber-card group flex flex-col rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold leading-snug mb-2 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-text-2 leading-relaxed mb-5 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-xs text-text-3 mt-auto">
                  <span>{formatPostDate(post.date)}</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty state — shown until the first post is published */
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
        )}
      </div>
    </>
  );
}
