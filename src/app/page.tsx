import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { services } from '@/lib/services';

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
          <div className="max-w-3xl">
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
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Products
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Software built for paper mills
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeProducts.map((product) => (
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
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              End-to-end engagement
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="amber-card rounded-2xl p-6 bg-background flex flex-col gap-3 group"
              >
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Papyrus360 */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Why Papyrus360
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built different. For paper mills.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex flex-col gap-3">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start a conversation
          </h2>
          <p className="text-text-2 mb-8 max-w-xl mx-auto">
            Tell us about your mill. We&apos;ll show you how Papyrus360 products and
            services can fit your operations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors duration-200 text-lg"
          >
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
