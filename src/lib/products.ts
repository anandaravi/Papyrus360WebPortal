export type ProductStatus = 'active' | 'custom' | 'legacy';

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  category: 'erp' | 'deckle' | 'specialist';
  accent: string;
  externalUrl?: string;
};

export const products: Product[] = [
  {
    slug: 'bpapp',
    name: 'BPApp',
    tagline: 'Enterprise ERP for Paper Manufacturing',
    description:
      'End-to-end ERP covering 44 modules — sales, production, deckle optimisation, finance, HR, compliance, and AI-powered insights. Built for Indian paper mills.',
    status: 'active',
    category: 'erp',
    accent: '#F59E0B',
    externalUrl: 'https://bpapperp.papyrus360.com',
  },
  {
    slug: 'optrim',
    name: 'Optrim',
    tagline: 'Desktop Deckle Matching Software',
    description:
      'Standalone desktop application for deckle matching and trim optimisation. Minimises paper waste with proprietary optimisation engine.',
    status: 'active',
    category: 'deckle',
    accent: '#3B82F6',
  },
  {
    slug: 'optrim-web',
    name: 'Optrim Web',
    tagline: 'Web-Based Deckle Matching',
    description:
      'Browser-based deckle matching — same optimisation engine as Optrim, accessible from any device without installation.',
    status: 'active',
    category: 'deckle',
    accent: '#6366F1',
  },
  {
    slug: 'papy-erp',
    name: 'Papy ERP',
    tagline: 'Custom Order & Production Management',
    description:
      'Tailored ERP covering order management and production management for paper manufacturers. Custom engagement.',
    status: 'custom',
    category: 'erp',
    accent: '#10B981',
  },
  {
    slug: 'pdn',
    name: 'PDN Process App',
    tagline: 'Conversion Handling App',
    description:
      'Purpose-built application for paper conversion process management. Delivered as a custom engagement for specific operational needs.',
    status: 'custom',
    category: 'specialist',
    accent: '#F97316',
  },
  {
    slug: 'paper-agent',
    name: 'Paper Agent',
    tagline: 'Paper Dealer & Trader Management',
    description:
      'Desktop software for paper dealers and traders — order tracking, inventory, and customer management.',
    status: 'legacy',
    category: 'specialist',
    accent: '#78716C',
  },
  {
    slug: 'ndm',
    name: 'NDM',
    tagline: 'Netique Deckle Matcher',
    description: 'Original desktop deckle matching software. Predecessor to Optrim.',
    status: 'legacy',
    category: 'deckle',
    accent: '#78716C',
  },
];
