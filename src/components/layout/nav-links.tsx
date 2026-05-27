'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/clients', label: 'Clients' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
        {navLinks.map(({ href, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-2 text-sm rounded-lg transition-colors duration-200',
                active
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-text-2 hover:text-foreground hover:bg-surface-2',
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/contact"
          className="px-4 py-2 text-sm font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors duration-200"
        >
          Get in Touch
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-text-2 hover:text-foreground"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu — rendered outside header flow via portal-like approach */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 right-0 border-t border-border bg-surface z-50">
          <nav className="flex flex-col px-4 py-3 gap-1" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-3 py-2.5 text-sm rounded-lg transition-colors duration-200',
                    active
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-text-2 hover:text-foreground hover:bg-surface-2',
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 text-sm font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors duration-200 text-center"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
