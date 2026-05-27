import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { services, type Service } from '@/lib/services';
import { PageHero } from '@/components/ui/page-hero';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Papyrus360 services — software implementation, IT support, process improvement, product development, marketing, sales, factory erection, manpower, management consulting, compliance, procurement, import/export for Indian paper industry.',
};

function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="amber-card rounded-2xl overflow-hidden bg-surface flex flex-col group"
        >
          {/* Image */}
          <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-2">
            <Image
              src={`/images/services/${service.slug}.png`}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-3 flex-1">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-400 transition-colors duration-200">
                {service.name}
              </h3>
              <p className="text-xs text-amber-400 mt-0.5">{service.tagline}</p>
            </div>
            <p className="text-sm text-text-2 leading-relaxed">{service.description}</p>
            <ul className="space-y-1.5 mt-1">
              {service.points.slice(0, 3).map((pt) => (
                <li key={pt} className="flex items-center gap-2 text-xs text-text-3">
                  <CheckCircle size={12} className="text-amber-500 shrink-0" />
                  {pt}
                </li>
              ))}
              {service.points.length > 3 && (
                <li className="text-xs text-text-4 pl-5">
                  +{service.points.length - 3} more
                </li>
              )}
            </ul>
            <span className="inline-flex items-center gap-1.5 text-xs text-text-3 group-hover:text-amber-400 transition-colors duration-200 pt-2 border-t border-border mt-auto">
              View details <ArrowRight size={12} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const softwareServices = services.filter((s) => s.category === 'software');
  const consultancyServices = services.filter((s) => s.category === 'consultancy');

  return (
    <>
      <PageHero
        src="/images/services/management-consulting.png"
        alt="360 degree services for paper industry"
        eyebrow="Services"
        title="360° services for paper industry"
        description="Netique Infotech Pvt Ltd. delivers the full spectrum under the Papyrus360 brand — software products, IT support, and deep domain consultancy covering every aspect of paper manufacturing operations."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* Software Services */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Software Services</h2>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 border border-amber-500/30 rounded-full px-3 py-1">
            {softwareServices.length} services
          </span>
        </div>
        <p className="text-text-2 text-sm mb-8 max-w-xl">
          Implementation, IT support, and infrastructure services for Papyrus360 software products.
        </p>
        <ServiceGrid items={softwareServices} />
      </div>

      <div className="border-t border-border mb-14" />

      {/* Consultancy Services */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Paper Industry Consultancy</h2>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 border border-amber-500/30 rounded-full px-3 py-1">
            {consultancyServices.length} services
          </span>
        </div>
        <p className="text-text-2 text-sm mb-8 max-w-xl">
          Domain expertise built over 35 years — process, compliance, and procurement consulting
          for paper manufacturers and converters.
        </p>
        <ServiceGrid items={consultancyServices} />
      </div>

    </div>
    <CTABanner
      eyebrow="Not sure which service fits?"
      title={<>Tell us about<br />your mill.</>}
      subtitle="We'll recommend the right combination of products and services for your operation."
      primaryLabel="Start a Conversation"
    />
    </>
  );
}
