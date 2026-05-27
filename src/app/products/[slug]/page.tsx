import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, ExternalLink, ArrowLeft } from 'lucide-react';
import { products } from '@/lib/products';
import fs from 'fs';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const imgPath = `/images/products/${slug}.png`;
  const imgFsPath = `${process.cwd()}/public${imgPath}`;
  const hasImage = fs.existsSync(imgFsPath) && fs.statSync(imgFsPath).size > 10000;

  const statusLabel = {
    active: 'Active Product',
    custom: 'Custom Engagement',
    legacy: 'Legacy Product',
  }[product.status];

  const statusStyle = {
    active: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    custom: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    legacy: 'bg-surface-3 text-text-4 border border-border',
  }[product.status];

  const categoryLabel = {
    erp: 'ERP',
    deckle: 'Deckle Optimisation',
    specialist: 'Specialist',
  }[product.category];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Back */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-text-3 hover:text-amber-400 transition-colors duration-200 mb-10"
      >
        <ArrowLeft size={14} />
        All Products
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle}`}>
            {statusLabel}
          </span>
          <span className="text-xs text-text-4">
            {categoryLabel}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="w-3 h-3 rounded-full mt-3 shrink-0"
            style={{ backgroundColor: product.accent }}
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-amber-400">{product.tagline}</p>
          </div>
        </div>
      </div>

      {/* Product image */}
      {hasImage && (
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-12 border border-border">
          <Image
            src={imgPath}
            alt={`${product.name} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      {/* Description */}
      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-lg text-text-2 leading-relaxed">{product.description}</p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
        {product.externalUrl ? (
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors duration-200"
          >
            Visit BPApp Portal
            <ExternalLink size={16} />
          </a>
        ) : null}
        <Link
          href="/contact"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors duration-200 ${
            product.externalUrl
              ? 'border border-border text-foreground hover:border-amber-500/50 hover:text-amber-400'
              : 'bg-amber-500 text-black hover:bg-amber-400'
          }`}
        >
          {product.status === 'active' ? 'Request a Demo' : 'Get in Touch'}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
