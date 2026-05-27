import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { NavLinks } from './nav-links';
import { SearchDialog } from '@/components/search/search-dialog';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#080808]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo + Search */}
          <div className="flex items-center gap-4">
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
            <SearchDialog />
          </div>

          <Suspense fallback={null}>
            <NavLinks />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
