import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { services } from '@/lib/services';

const BASE = 'https://papyrus360.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/clients`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => !p.externalUrl)
    .map((p) => ({
      url: `${BASE}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes];
}
