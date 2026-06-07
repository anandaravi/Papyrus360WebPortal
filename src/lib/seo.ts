import type { Metadata } from 'next';

const OG_IMAGE = {
  url: '/papyrus360.png',
  width: 1200,
  height: 630,
  alt: 'Papyrus360 — Enterprise Software for Indian Paper Manufacturing',
};

type PageMetaArgs = {
  /** Bare page title — branding (" — Papyrus360") is added automatically. */
  title: string;
  description: string;
  /** Route path, e.g. "/products". Used for the self-referencing canonical and og:url. */
  path: string;
  keywords?: string[];
  ogImage?: { url: string; width?: number; height?: number; alt?: string };
};

/**
 * Build per-route metadata with a self-referencing canonical and full Open Graph
 * / Twitter cards. Metadata is shallowly merged in the App Router — setting
 * `openGraph` on a page replaces the layout's entirely — so this re-declares the
 * shared OG fields (siteName, locale, image) on every page.
 *
 * Note: `title.template` from the root layout does NOT apply to `og:title`, so the
 * branded title is composed here directly.
 */
export function pageMeta({ title, description, path, keywords, ogImage }: PageMetaArgs): Metadata {
  const fullTitle = `${title} — Papyrus360`;
  const image = ogImage ?? OG_IMAGE;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'Papyrus360',
      locale: 'en_IN',
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
