import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import type { ProductStatus } from '@/lib/products';
import { PageHero } from '@/components/ui/page-hero';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'All Papyrus360 products — BPApp ERP, Optrim deckle optimisation, Optrim Web, Papy ERP, PDN Process App, and legacy software for paper mills.',
};

const statusGroups: { status: ProductStatus; label: string; description: string }[] = [
  {
    status: 'active',
    label: 'Active Products',
    description: 'Currently available and actively developed',
  },
  {
    status: 'custom',
    label: 'Custom Engagements',
    description: 'Delivered as bespoke implementations for specific client needs',
  },
  {
    status: 'legacy',
    label: 'Legacy Products',
    description: 'Earlier software that served the industry well — listed for reference',
  },
];

const statusBadge: Record<ProductStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  custom: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  legacy: 'bg-surface-3 text-text-4 border border-border',
};

const statusLabel: Record<ProductStatus, string> = {
  active: 'Active',
  custom: 'Custom',
  legacy: 'Legacy',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        src="/images/products/hero.png"
        alt="Software products for paper mills"
        eyebrow="Products"
        title="Software for paper mills"
        description="Seven products spanning ERP, deckle optimisation, dealer management, and conversion processing — all built exclusively for the paper industry."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      <div className="space-y-16">
        {statusGroups.map(({ status, label, description }) => {
          const group = products.filter((p) => p.status === status);
          if (group.length === 0) return null;
          return (
            <div key={status}>
              <div className="mb-6 pb-4 border-b border-border">
                <h2 className="text-xl font-semibold">{label}</h2>
                <p className="text-sm text-text-3 mt-1">{description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.map((product) => (
                  <Link
                    key={product.slug}
                    href={product.externalUrl ?? `/products/${product.slug}`}
                    {...(product.externalUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="amber-card rounded-2xl p-6 bg-surface flex flex-col gap-3 group"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5"
                        style={{ backgroundColor: product.accent }}
                      />
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge[product.status]}`}
                      >
                        {statusLabel[product.status]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-400 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-sm text-amber-400/70 mt-0.5">{product.tagline}</p>
                    </div>
                    <p className="text-sm text-text-2 leading-relaxed flex-1">
                      {product.description}
                    </p>
                    <span className="text-xs text-text-3 flex items-center gap-1 group-hover:text-amber-400 transition-colors duration-200">
                      {status === 'legacy' ? 'View details' : 'Learn more'}{' '}
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <CTABanner
      eyebrow="Ready to see them in action?"
      title={<>Find the right product<br />for your mill.</>}
      subtitle="From full ERP to standalone deckle matching — let's discuss what fits your operation."
    />
    </>
  );
}
