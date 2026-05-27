import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { services } from '@/lib/services';
import fs from 'fs';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  const imgPath = `/images/services/${slug}.png`;
  const imgFsPath = `${process.cwd()}/public${imgPath}`;
  const hasImage = fs.existsSync(imgFsPath) && fs.statSync(imgFsPath).size > 10000;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm text-text-3 hover:text-amber-400 transition-colors duration-200 mb-10"
      >
        <ArrowLeft size={14} />
        All Services
      </Link>

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
          Service
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          {service.name}
        </h1>
        <p className="text-xl text-amber-400">{service.tagline}</p>
      </div>

      <p className="text-lg text-text-2 leading-relaxed mb-10 border-b border-border pb-10">
        {service.description}
      </p>

      {/* Service image */}
      {hasImage && (
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 border border-border">
          <Image
            src={imgPath}
            alt={`${service.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">What&apos;s included</h2>
        <ul className="space-y-4">
          {service.points.map((pt) => (
            <li key={pt} className="flex items-start gap-3">
              <CheckCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-text-2">{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-8 border-t border-border">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors duration-200"
        >
          Discuss This Service
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
