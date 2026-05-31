import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import { products } from '@/lib/products';
import { services } from '@/lib/services';
import { SITE } from '@/lib/constants';
import { NewsletterForm } from '@/components/layout/newsletter-form';

const activeProducts = products.filter((p) => p.status !== 'legacy');


export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mb-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Papyrus360 home">
              <Image
                src="/papyrus360.png"
                alt="Papyrus360"
                width={117}
                height={52}
                className="shrink-0"
                unoptimized
              />
            </Link>
            <p className="text-sm text-text-2 max-w-xs leading-relaxed">
              The Papyrus360 brand of <span className="text-foreground font-medium">{SITE.company}</span> — software products,
              consulting, and direct raw-material supply for the Indian paper industry.
            </p>
            <p className="text-[11px] text-text-4 max-w-xs leading-relaxed">
              Founded by domain experts with 35+ years of paper industry experience.
            </p>

            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-sm text-text-2 hover:text-amber-400 transition-colors"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-2">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>{SITE.city}</span>
              </li>
            </ul>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
                Company
              </h3>
              <ul className="space-y-2">
                {[
                  { href: '/about', label: 'About Us' },
                  { href: '/clients', label: 'Clients' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/contact', label: 'Contact' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
                Products
              </h3>
              <ul className="space-y-2">
                {activeProducts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
                Services
              </h3>
              <ul className="space-y-2">
                {services.slice(0, 7).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="text-xs text-text-3 hover:text-amber-400 transition-colors"
                  >
                    +{services.length - 7} more →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
                Resources
              </h3>
              <ul className="space-y-2">
                {[
                  { href: '/tools', label: 'Tools' },
                  { href: '/glossary', label: 'Glossary' },
                  { href: '/paper-grades', label: 'Paper Grades' },
                  { href: '/paper-mill-machines', label: 'Paper Mill Machines' },
                  { href: '/standards', label: 'Testing Standards' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
                Stay Updated
              </h3>
              <NewsletterForm source="footer" />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-4">
            &copy; {new Date().getFullYear()} {SITE.company} All rights reserved.
          </p>
          <p className="text-xs text-text-4">
            24+ years in operation · 35+ years of paper industry expertise
          </p>
        </div>
      </div>
    </footer>
  );
}
