import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { NavLinks } from './nav-links';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#080808]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Papyrus360 home">
            <Image
              src="/papyrus360.png"
              alt="Papyrus360"
              width={135}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <Suspense fallback={null}>
            <NavLinks />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
