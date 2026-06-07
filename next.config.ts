import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Let .md/.mdx files act as pages and be imported as components
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

const withMDX = createMDX({
  options: {
    // String form is required for Turbopack (functions can't cross to Rust)
    remarkPlugins: ['remark-gfm'],
  },
});

export default withMDX(nextConfig);
