"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, ArrowUp, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

const WA_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export function FloatingActions() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);
  const hide = pathname?.startsWith("/contact");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hide) return null;

  return (
    <>
      {/* WhatsApp FAB */}
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-40 right-4 bottom-20 sm:bottom-6 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle size={26} strokeWidth={2} fill="currentColor" className="text-white" />
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
      </a>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="hidden sm:flex fixed z-40 right-4 bottom-24 w-11 h-11 rounded-full bg-surface border border-border-light hover:border-amber-500/50 text-text-2 hover:text-amber-400 items-center justify-center transition-colors"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Sticky mobile CTA bar */}
      <div className="lg:hidden fixed z-30 inset-x-0 bottom-0 border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2 px-3 py-2.5 max-w-md mx-auto">
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border-light text-foreground text-sm font-medium active:bg-surface"
          >
            Email
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-bold active:bg-amber-400"
          >
            Get in Touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
