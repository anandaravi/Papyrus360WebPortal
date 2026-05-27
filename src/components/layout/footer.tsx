import Link from 'next/link';
import { products } from '@/lib/products';
import { services } from '@/lib/services';

const activeProducts = products.filter((p) => p.status !== 'legacy');

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/blog', label: 'Blog' },
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

          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-4">
              Products
            </h3>
            <ul className="space-y-2.5">
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

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:vs@papyrus360.com"
                  className="text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
                >
                  vs@papyrus360.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@papyrus360.com"
                  className="text-sm text-text-2 hover:text-amber-400 transition-colors duration-200"
                >
                  support@papyrus360.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-4">
            &copy; 2025 Netique Infotech Pvt Ltd. All rights reserved.
          </p>
          <p className="text-xs text-text-4">
            24+ years in operation · 35+ years of paper industry expertise
          </p>
        </div>
      </div>
    </footer>
  );
}
