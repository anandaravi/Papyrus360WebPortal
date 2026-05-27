import type { Metadata } from 'next';
import { ExternalLink, Cloud } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customer Login',
  description: 'Access Papyrus360 cloud services — OptrimWeb deckle optimisation and more.',
};

type CloudService = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  loginUrl: string;
  badge?: string;
};

const CLOUD_SERVICES: CloudService[] = [
  {
    id: 'optrimweb',
    name: 'OptrimWeb',
    tagline: 'Deckle Optimisation — Cloud',
    description:
      'Browser-based deckle matching and trim optimisation. No installation required — access your mill\'s optimisation engine from anywhere.',
    loginUrl: 'https://optrimweb.netiqueinfotech.com/Login?ReturnUrl=%2f',
    badge: 'Live',
  },
];

export default function CustomerLoginPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
          <Cloud size={12} />
          Cloud Services
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Customer Login</h1>
        <p className="text-text-2 text-base max-w-lg mx-auto">
          Access your Papyrus360 cloud services. Select the product below to sign in.
        </p>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {CLOUD_SERVICES.map((service) => (
          <div
            key={service.id}
            className="group rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4 hover:border-amber-500/40 transition-colors duration-200"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">{service.name}</h2>
                <p className="text-xs text-text-3 mt-0.5">{service.tagline}</p>
              </div>
              {service.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {service.badge}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-text-2 leading-relaxed flex-1">
              {service.description}
            </p>

            {/* Login button */}
            <a
              href={service.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors duration-200"
            >
              Sign in to {service.name}
              <ExternalLink size={13} />
            </a>
          </div>
        ))}
      </div>

      {/* Help note */}
      <p className="text-center text-xs text-text-3 mt-10">
        Need access or having trouble signing in?{' '}
        <a href="/contact" className="text-amber-400 hover:text-amber-300 transition-colors">
          Contact support
        </a>
        .
      </p>
    </div>
  );
}
