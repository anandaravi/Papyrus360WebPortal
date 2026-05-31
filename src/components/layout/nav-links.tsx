'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, LogIn, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/clients', label: 'Clients' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/case-studies', label: 'Case Studies' },
];

const resourceLinks = [
  { href: '/tools', label: 'Tools' },
  { href: '/tools/deckle-optimizer', label: 'Deckle Optimizer' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/paper-grades', label: 'Paper Grades' },
  { href: '/paper-mill-machines', label: 'Paper Mill Machines' },
  { href: '/faq', label: 'FAQ' },
];

export function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const [companyOpen, setCompanyOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const companyActive = companyLinks.some((l) => pathname.startsWith(l.href));
  const resourcesActive = resourceLinks.some((l) => pathname.startsWith(l.href));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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

        {/* Company dropdown */}
        <div ref={companyRef} className="relative">
          <button
            onClick={() => setCompanyOpen((v) => !v)}
            className={cn(
              'flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors duration-200',
              companyActive || companyOpen
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-text-2 hover:text-foreground hover:bg-surface-2',
            )}
          >
            Company
            <ChevronDown
              size={13}
              className={cn('transition-transform duration-200', companyOpen && 'rotate-180')}
            />
          </button>
          {companyOpen && (
            <div className="absolute top-full left-0 mt-1 w-44 rounded-xl border border-border bg-surface shadow-lg z-50 py-1.5">
              {companyLinks.map(({ href, label }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setCompanyOpen(false)}
                    className={cn(
                      'block px-4 py-2 text-sm transition-colors duration-150',
                      active
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-text-2 hover:text-foreground hover:bg-surface-2',
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Resources dropdown */}
        <div ref={resourcesRef} className="relative">
          <button
            onClick={() => setResourcesOpen((v) => !v)}
            className={cn(
              'flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors duration-200',
              resourcesActive || resourcesOpen
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-text-2 hover:text-foreground hover:bg-surface-2',
            )}
          >
            Resources
            <ChevronDown
              size={13}
              className={cn('transition-transform duration-200', resourcesOpen && 'rotate-180')}
            />
          </button>
          {resourcesOpen && (
            <div className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-border bg-surface shadow-lg z-50 py-1.5">
              {resourceLinks.map(({ href, label }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setResourcesOpen(false)}
                    className={cn(
                      'block px-4 py-2 text-sm transition-colors duration-150',
                      active
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-text-2 hover:text-foreground hover:bg-surface-2',
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/customer-login"
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-border text-text-2 rounded-lg hover:text-foreground hover:border-amber-500/50 transition-colors duration-200"
        >
          <LogIn size={14} />
          Customer Login
        </Link>
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
            <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-text-3">
              Company
            </p>
            {companyLinks.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 pl-5',
                    active
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-text-2 hover:text-foreground hover:bg-surface-2',
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-text-3">
              Resources
            </p>
            {resourceLinks.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 pl-5',
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
              href="/customer-login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-border text-text-2 rounded-lg hover:text-foreground transition-colors duration-200 text-center"
            >
              <LogIn size={14} />
              Customer Login
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 px-4 py-2.5 text-sm font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors duration-200 text-center"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
