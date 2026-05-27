import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { CLIENTS } from "@/lib/clients";

export type SearchEntry = {
  title: string;
  subtitle: string;
  url: string;
  type: "Page" | "Product" | "Service" | "Client" | "Topic";
  keywords: string;
};

const STATIC_PAGES: SearchEntry[] = [
  { title: "Home", subtitle: "Papyrus360 overview", url: "/", type: "Page", keywords: "home overview papyrus360 landing" },
  { title: "Products", subtitle: "7 products — ERP, deckle, specialist", url: "/products", type: "Page", keywords: "products bpapp optrim papy ndm paper agent pdn" },
  { title: "Services", subtitle: "14 services — software + consultancy", url: "/services", type: "Page", keywords: "services consulting implementation support compliance" },
  { title: "Clients", subtitle: "38 paper mills across India", url: "/clients", type: "Page", keywords: "clients customers paper mills india map testimonials" },
  { title: "About", subtitle: "Netique Infotech · 24+ years · founders", url: "/about", type: "Page", keywords: "about netique infotech founders mission history story" },
  { title: "Blog", subtitle: "Articles and insights", url: "/blog", type: "Page", keywords: "blog articles insights papyrus" },
  { title: "Contact", subtitle: "Get in touch", url: "/contact", type: "Page", keywords: "contact email phone whatsapp demo enquiry" },
];

const TOPICS: SearchEntry[] = [
  { title: "Deckle Optimisation", subtitle: "Trim matching · waste reduction", url: "/products/optrim", type: "Topic", keywords: "deckle trim optimization waste reduction matching optrim" },
  { title: "Waste Paper Imports", subtitle: "OCC · ONP · NDLK · SMK · DSOCC", url: "/services/raw-material-import-export", type: "Topic", keywords: "waste paper imports occ onp ndlk smk dsocc raw material" },
  { title: "Woodchip & Pulp Imports", subtitle: "Pulping inputs · global supply", url: "/services/raw-material-import-export", type: "Topic", keywords: "woodchip pulp coal imports pulping raw material" },
  { title: "GST Compliance", subtitle: "GST · TDS · FEMA · PF · ESI", url: "/services/compliance-consulting", type: "Topic", keywords: "gst tds fema pf esi compliance audit tax" },
  { title: "Greenfield Mill Setup", subtitle: "Factory & machine erection", url: "/services/factory-machine-erection", type: "Topic", keywords: "greenfield brownfield mill factory machine erection commissioning" },
  { title: "ERP Implementation", subtitle: "BPApp deployment + training", url: "/services/software-implementation", type: "Topic", keywords: "erp implementation deployment training go-live bpapp" },
];

export function getSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [...STATIC_PAGES, ...TOPICS];

  for (const p of products) {
    entries.push({
      title: p.name,
      subtitle: p.tagline,
      url: `/products/${p.slug}`,
      type: "Product",
      keywords: `${p.name} ${p.tagline} ${p.description} ${p.category} ${p.status} product`,
    });
  }

  for (const s of services) {
    entries.push({
      title: s.name,
      subtitle: s.tagline,
      url: `/services/${s.slug}`,
      type: "Service",
      keywords: `${s.name} ${s.tagline} ${s.description} ${s.category} ${s.points.join(" ")} service`,
    });
  }

  for (const c of CLIENTS) {
    entries.push({
      title: c.name,
      subtitle: `${c.city}, ${c.state}${c.grade ? " · " + c.grade : ""}`,
      url: `/clients#${c.slug}`,
      type: "Client",
      keywords: `${c.name} ${c.short} ${c.city} ${c.state} ${c.country} ${c.grade ?? ""} ${c.product ?? ""} client mill`,
    });
  }

  return entries;
}

export function searchEntries(query: string, entries: SearchEntry[], limit = 20): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  type Scored = { entry: SearchEntry; score: number };
  const scored: Scored[] = [];

  for (const e of entries) {
    const haystack = `${e.title} ${e.subtitle} ${e.keywords} ${e.type}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (e.title.toLowerCase() === t) score += 100;
      if (e.title.toLowerCase().startsWith(t)) score += 40;
      if (e.title.toLowerCase().includes(t)) score += 20;
      if (e.subtitle.toLowerCase().includes(t)) score += 8;
      if (haystack.includes(t)) score += 3;
    }
    if (score > 0) scored.push({ entry: e, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.entry);
}
