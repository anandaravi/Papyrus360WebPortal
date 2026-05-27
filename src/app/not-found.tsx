import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
        Error 404
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-text-2 mb-8 max-w-sm">
        This page doesn&apos;t exist or may have moved. Try going back home.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors duration-200"
        >
          <Home size={14} />
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Contact Us
        </Link>
      </div>
    </div>
  );
}
