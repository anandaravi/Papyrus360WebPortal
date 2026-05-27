import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { CLIENTS } from '@/lib/clients';
import { MapLoader } from '@/components/clients/map-loader';
import { PageHero } from '@/components/ui/page-hero';

export const metadata: Metadata = {
  title: 'Clients',
  description:
    '38 paper mills across India and the Gulf trust Papyrus360 software — spanning kraft, board, newsprint, tissue, and writing & printing grades since 2002.',
};

const indiaCount = CLIENTS.filter((c) => c.country === 'India').length;
const intlCount = CLIENTS.filter((c) => c.country !== 'India').length;
const testimonials = CLIENTS.filter((c) => c.testimonial);

const regions: { label: string; count: number }[] = [
  { label: 'West India', count: 11 },
  { label: 'North India', count: 11 },
  { label: 'South India', count: 9 },
  { label: 'East India', count: 3 },
  { label: 'Gulf', count: 2 },
];

export default function ClientsPage() {
  return (
    <>
      <PageHero
        src="/images/clients/hero.png"
        alt="Paper mills trust Papyrus360"
        eyebrow="Clients"
        title="Trusted by paper mills since 2002."
        description={`${indiaCount} Indian mills and ${intlCount} international customers run Netique / Papyrus360 software — spanning kraft, board, newsprint, tissue, and writing & printing grades.`}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: `${CLIENTS.length}+`, label: 'Active deployments' },
          { value: '24+ yrs', label: 'In operation (est. 2002)' },
          { value: `${intlCount}`, label: 'Countries' },
          { value: '0.5–1.7%', label: 'Typical trim saved' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
            <div className="text-sm text-text-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">India + Gulf · {CLIENTS.length} mill deployments</h2>
        </div>
        <p className="text-text-2 text-sm mb-6">
          Bangalore HQ · India {indiaCount} · Gulf {intlCount} · dotted lines = HQ to client cities
        </p>
        <MapLoader clients={CLIENTS} />
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">What clients say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((client) => (
            <div key={client.slug} className="amber-card rounded-2xl p-8 bg-surface flex flex-col gap-4">
              <Quote size={20} className="text-amber-500 shrink-0" />
              <p className="text-sm text-text-2 leading-relaxed flex-1">
                &ldquo;{client.testimonial}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground text-sm">{client.short}</div>
                <div className="text-xs text-text-3">{client.city}, {client.state}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional breakdown */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Coverage by region</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {regions.map((r) => (
            <div key={r.label} className="rounded-2xl border border-border bg-surface p-5 text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">{r.count}</div>
              <div className="text-xs text-text-2">{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full roster */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-2">The roster</h2>
        <p className="text-text-2 text-sm mb-8">{CLIENTS.length} mills. One platform partner.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLIENTS.map((client) => (
            <div
              key={client.slug}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground leading-tight">{client.name}</h3>
                  <p className="text-xs text-text-3 mt-1 flex items-center gap-1.5">
                    <MapPin size={11} />
                    {client.city}, {client.state}
                    {client.country !== 'India' && ` · ${client.country}`}
                  </p>
                </div>
                {client.verified && (
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-1" />
                )}
              </div>
              {client.grade && (
                <p className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 inline-block mb-3">
                  {client.grade}
                </p>
              )}
              {client.testimonial && (
                <blockquote className="text-xs text-text-2 italic leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                  <Quote size={10} className="inline text-emerald-400 mr-1" />
                  {client.testimonial.length > 180
                    ? client.testimonial.slice(0, 178).trimEnd() + '…'
                    : client.testimonial}
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Join 38+ mills already running on Papyrus360</h2>
        <p className="text-text-2 mb-6 max-w-lg mx-auto text-sm">
          From kraft mills in Gujarat to newsprint plants in Odisha — we know your industry.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors duration-200"
        >
          Get in Touch
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
    </>
  );
}
