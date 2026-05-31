import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function CTABanner({
  eyebrow = "Ready to modernise your operations?",
  title = (
    <>
      Talk to Papyrus360
      <br />
      about your mill.
    </>
  ),
  subtitle = "Whether you need an ERP, deckle optimisation, compliance advisory, or raw-material supply — start a conversation with the team that's been doing this for 24+ years.",
  primaryLabel = "Get in Touch",
  primaryHref = "/contact",
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />

      <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-28 text-center">
        <div>
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-5">
            {eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-text-2 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryHref}
              {...(primaryHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all duration-200"
            >
              {primaryLabel}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="px-8 py-4 rounded-xl border border-border-light text-foreground hover:border-amber-500/40 text-sm font-medium transition-all duration-200"
            >
              Email us directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
