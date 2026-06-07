import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { posts, getPost, formatPostDate } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { SITE } from '@/lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Only the slugs in the registry exist; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    path: `/blog/${slug}`,
    description: post.description,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE.url}/blog/${slug}`,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/papyrus360.png` },
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <JsonLd data={articleSchema} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-text-3 hover:text-amber-400 transition-colors duration-200 mb-10"
      >
        <ArrowLeft size={14} />
        All articles
      </Link>

      <header className="mb-10 pb-10 border-b border-border">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-text-3">
          <span>{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </header>

      <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-th:text-foreground">
        <Post />
      </article>
    </div>
  );
}
