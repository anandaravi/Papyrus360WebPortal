export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-06-05" */
  date: string;
  readingMinutes: number;
  tags: string[];
  author: string;
};

// Registry of published posts. Each entry has a matching MDX file at
// src/content/blog/<slug>.mdx. Order newest-first; the index renders this order.
export const posts: Post[] = [
  {
    slug: 'deckle-optimisation-trim-loss',
    title: 'Deckle optimisation explained: how trim loss eats your margin',
    description:
      'Trim loss is the quiet tax on every reel you slit. Here is how deckle optimisation works, why a few percent of waste compounds into real money, and what to do about it.',
    date: '2026-06-05',
    readingMinutes: 9,
    tags: ['Deckle optimisation', 'Operations', 'Cost'],
    author: 'Papyrus360',
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  // Deterministic, locale-stable formatting (avoids SSR/CSR mismatch).
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
