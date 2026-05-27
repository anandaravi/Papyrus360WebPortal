"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { products } from "@/lib/products";
import { services } from "@/lib/services";

const HIDE_ON = new Set<string>(["/", "/contact"]);

const LABELS: Record<string, string> = {
  about: "About",
  blog: "Blog",
  clients: "Clients",
  contact: "Contact",
  products: "Products",
  services: "Services",
};

function humanize(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function labelFor(parentSlug: string | null, slug: string): string {
  if (parentSlug === "products") {
    const p = products.find((x) => x.slug === slug);
    if (p) return p.name;
  }
  if (parentSlug === "services") {
    const s = services.find((x) => x.slug === slug);
    if (s) return s.name;
  }
  return LABELS[slug] ?? humanize(slug);
}

export function Breadcrumbs() {
  const pathname = usePathname() ?? "/";
  if (HIDE_ON.has(pathname)) return null;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const parent = i > 0 ? segments[i - 1] : null;
    return { href, label: labelFor(parent, seg), last: i === segments.length - 1 };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-border-dim bg-background/85 backdrop-blur-md"
    >
      <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1.5 text-xs overflow-x-auto whitespace-nowrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-text-3 hover:text-amber-400 transition-colors"
            aria-label="Home"
          >
            <Home size={12} />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-text-4 flex-shrink-0" />
            {c.last ? (
              <span className="text-foreground font-medium" aria-current="page">
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="text-text-3 hover:text-amber-400 transition-colors"
              >
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
