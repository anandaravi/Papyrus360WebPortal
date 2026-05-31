import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { services } from '@/lib/services';
import { StatsBar } from '@/components/sections/stats-bar';
import { ComplianceStrip } from '@/components/sections/compliance-strip';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeIn } from '@/components/ui/fade-in';

const activeProducts = products.filter((p) => p.status !== 'legacy');

const trustPoints = [
  {
    title: '35+ Years of Domain Expertise',
    description:
      'Founded and led by paper industry veterans with 35+ years in the field — we understand the nuances of paper manufacturing that generic ERP vendors miss.',
    image: '/images/home/why-expertise.png',
    imageAlt: 'Paper industry expert on mill floor',
  },
  {
    title: 'Compliance Depth',
    description:
      'GST, TDS, FEMA, PF, ESI — built into the product from day one, not bolted on. Stay audit-ready without manual reconciliation.',
    image: '/images/home/why-compliance.png',
    imageAlt: 'CFO reviewing GST compliance dashboard',
  },
  {
    title: 'Proprietary Optimisation Engine',
    description:
      'Our deckle matching engine has been refined across hundreds of real-world paper mill deployments, delivering measurable waste reduction.',
    image: '/images/home/why-optimization.png',
    imageAlt: 'Production planner reviewing deckle optimization',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <Image
          src="/images/home/hero.png"
          alt="Indian paper manufacturing facility"
          fill
          priority
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
          <FadeIn className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
              Netique Infotech Pvt Ltd. · Est. 2002 · 24+ years in operation
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              <span className="amber-text">35+ years</span> of paper industry
              <br className="hidden md:block" /> expertise. One platform.
            </h1>
            <p className="text-lg md:text-xl text-text-2 mb-10 max-w-2xl leading-relaxed">
              From deckle optimisation to full ERP — Papyrus360 products and services are
              purpose-built for paper mills. No generic software, no workarounds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors duration-200"
              >
                Explore Products
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl hover:border-amber-500/50 hover:text-amber-400 transition-colors duration-200"
              >
                Start a Conversation
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <StatsBar />

      {/* Products */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Products
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Software built for paper mills
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeProducts.map((product, i) => (
              <FadeIn key={product.slug} delay={i * 80}>
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="amber-card rounded-2xl p-6 bg-surface flex flex-col gap-3 group"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5"
                    style={{ backgroundColor: product.accent }}
                  />
                  {product.status === 'custom' && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface-2 text-text-3">
                      Custom
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-400 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-sm text-amber-400/80 mt-0.5">{product.tagline}</p>
                </div>
                <p className="text-sm text-text-2 leading-relaxed flex-1">
                  {product.description}
                </p>
                <span className="text-xs text-text-3 flex items-center gap-1 group-hover:text-amber-400 transition-colors duration-200">
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
            >
              View all products including legacy software <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              End-to-end engagement
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 80}>
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="amber-card rounded-2xl overflow-hidden bg-background flex flex-col group"
              >
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-2">
                  <Image
                    src={`/images/services/${service.slug}.png`}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-base font-semibold text-foreground group-hover:text-amber-400 transition-colors duration-200">
                  {service.name}
                </h3>
                <p className="text-xs font-medium text-amber-400/80 -mt-1">{service.tagline}</p>
                <p className="text-sm text-text-2 leading-relaxed flex-1">
                  {service.description}
                </p>
                <ul className="space-y-1">
                  {service.points.slice(0, 3).map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-xs text-text-3">
                      <CheckCircle size={12} className="text-amber-500 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                </div>
              </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Raw Material Imports Highlight */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/services/raw-material-import-export.png"
                alt="Waste paper and woodchip imports for Indian paper mills"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
            </FadeIn>
            <FadeIn delay={150}>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
                Raw Material Supply
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Waste paper & woodchip imports
              </h2>
              <p className="text-text-2 leading-relaxed mb-6">
                Beyond software and consulting, we directly source and import waste paper grades,
                woodchips, pulp, and coal for Indian paper mills — backed by a global supplier
                network built over two decades.
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8">
                {[
                  'OCC · ONP · NDLK · SMK',
                  'DSOCC · LP Cup Stock',
                  'Woodchips & wood powder',
                  'Virgin & recycled pulp',
                  'Coal for boilers',
                  'FEMA + customs handled',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-2">
                    <CheckCircle size={14} className="text-amber-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 text-xs text-text-3 mb-6">
                <span className="px-3 py-1 rounded-full border border-border bg-surface">USA</span>
                <span className="px-3 py-1 rounded-full border border-border bg-surface">Europe</span>
                <span className="px-3 py-1 rounded-full border border-border bg-surface">Middle East</span>
                <span className="px-3 py-1 rounded-full border border-border bg-surface">SE Asia</span>
                <span className="px-3 py-1 rounded-full border border-border bg-surface">Australia</span>
              </div>
              <Link
                href="/services/raw-material-import-export"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Explore sourcing services <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Papyrus360 */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Why Papyrus360
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built different. For paper mills.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((point, i) => (
              <FadeIn key={point.title} delay={i * 100} className="flex flex-col gap-3">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2">
                  <Image
                    src={point.image}
                    alt={point.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="w-8 h-0.5 bg-amber-500" />
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="text-sm text-text-2 leading-relaxed">{point.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ComplianceStrip />

      {/* Clients */}
      <section className="py-16 border-b border-border bg-surface">
        <FadeIn className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-4">
            Clients
          </p>
          <h2 className="text-2xl font-bold mb-3">
            Trusted by paper mills across India
          </h2>
          <p className="text-text-2 text-sm max-w-xl mx-auto">
            From small converters to large integrated paper mills — our software runs at
            facilities across Tamil Nadu, Karnataka, Maharashtra, and beyond.
          </p>
        </FadeIn>
      </section>

      <CTABanner
        eyebrow="Start a conversation"
        title={<>Tell us about<br />your mill.</>}
        subtitle="We'll show you how Papyrus360 products and services can fit your operations — software, consulting, or raw-material supply."
        primaryLabel="Get in Touch"
      />
    </>
  );
}
