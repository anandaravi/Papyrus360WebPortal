import Image from 'next/image';
import Link from 'next/link';
import { Award, Mail, Users, Network } from 'lucide-react';
import { CTABanner } from '@/components/sections/cta-banner';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Our Team — Paper Industry Experts',
  path: '/team',
  description:
    'Meet the Papyrus360 core team and our extended network of domain consultants and SMEs — paper mill veterans, ERP architects, compliance specialists, and import managers who have spent their careers inside the Indian paper industry.',
});

type Member = {
  name: string;
  initials: string;
  photo: string | null;
  stat: { value: string; label: string };
  role: string;
  tier: 'core' | 'extended';
  expertise: string[];
  bio: string;
  highlights: string[];
  email: string | null;
};

// TODO: replace with real team data
const team: Member[] = [
  {
    name: 'Anand Krishnamurthy',
    initials: 'AK',
    photo: null,
    stat: { value: '35+', label: 'Years Experience' },
    role: 'Founder & Managing Director',
    tier: 'core',
    expertise: ['Paper Mill Operations', 'ERP Strategy', 'Raw Material Trade'],
    bio: '35+ years in the Indian paper industry — started on the mill floor, moved into operations management, then built Netique Infotech in 2002 to solve the software problems he kept hitting as a mill professional. Personally oversees every major client engagement.',
    highlights: [
      'Founded Netique Infotech in 2002',
      '35+ years paper industry experience',
      'Managed mill operations across South and West India',
      'Pioneered deckle optimisation software for Indian mills',
    ],
    email: 'info@papyrus360.com',
  },
  {
    name: 'Priya Venkataraman',
    initials: 'PV',
    photo: null,
    stat: { value: '20+', label: 'Years Experience' },
    role: 'Head of Software Products',
    tier: 'core',
    expertise: ['BPApp ERP', 'Product Architecture', 'Manufacturing Software'],
    bio: '20 years of enterprise software development, the last 14 building paper-industry-specific ERP modules at Netique. Leads the BPApp product roadmap and oversees all software implementation projects.',
    highlights: [
      'Architected all 44 BPApp modules',
      'Led 30+ ERP implementations',
      'Specialises in GST and compliance automation',
      'BE Computer Science, Anna University',
    ],
    email: null,
  },
  {
    name: 'Karthik Balaji',
    initials: 'KB',
    photo: null,
    stat: { value: '10+', label: 'Years Experience' },
    role: 'Raw Material & Import Manager',
    tier: 'core',
    expertise: ['OCC / ONP Sourcing', 'International Trade', 'Supplier Networks'],
    bio: 'Manages Papyrus360\'s raw material import operations — OCC, ONP, woodchips, pulp, and coal. Maintains supplier relationships across the USA, Europe, Middle East, and South-East Asia. Handles end-to-end logistics from purchase order to mill delivery.',
    highlights: [
      'Manages 1,200+ MT/month import volume',
      'Supplier network across 5 continents',
      'Expert in letter of credit and customs clearance',
      '10+ years in commodity trade and logistics',
    ],
    email: null,
  },
  {
    name: 'Divya Natarajan',
    initials: 'DN',
    photo: null,
    stat: { value: '30+', label: 'Go-Lives Managed' },
    role: 'Customer Success & Implementation Lead',
    tier: 'core',
    expertise: ['BPApp Onboarding', 'Training', 'Client Support'],
    bio: 'Ensures every BPApp implementation goes live on time and that mill staff are fully confident using the system. Leads onboarding, conducts on-site training programmes, and manages post-go-live support for all active clients.',
    highlights: [
      '30+ BPApp go-lives managed',
      'Designed Papyrus360 training methodology',
      'Average go-live time: 12 weeks',
      'Fluent in Tamil, Telugu, Kannada, and Hindi',
    ],
    email: null,
  },
  {
    name: 'Rajesh Subramaniam',
    initials: 'RS',
    photo: null,
    stat: { value: '18+', label: 'Years Experience' },
    role: 'Consultant — Mill Operations',
    tier: 'extended',
    expertise: ['Production Planning', 'Deckle Optimisation', 'Process Improvement'],
    bio: 'Former production manager at two integrated paper mills in Tamil Nadu and Karnataka. Engaged by Papyrus360 as a domain consultant after 18 years on the mill floor. Brought in on client engagements to help extract maximum yield from every reel.',
    highlights: [
      '18 years mill floor experience',
      'Certified in lean manufacturing',
      'Implemented Optrim at 15+ mills',
      'Specialises in trim loss reduction and shift efficiency',
    ],
    email: null,
  },
  {
    name: 'Meera Chandrasekaran',
    initials: 'MC',
    photo: null,
    stat: { value: '16+', label: 'Years Experience' },
    role: 'Consultant — Compliance & Finance',
    tier: 'extended',
    expertise: ['GST', 'TDS', 'FEMA', 'Export-Import Compliance'],
    bio: 'Chartered Accountant with 16 years of experience in paper industry finance and regulatory compliance. Engaged on a consulting basis to advise mills on GST reconciliation, export-import documentation, and audit readiness.',
    highlights: [
      'Chartered Accountant (ICAI)',
      '16 years paper industry finance',
      'Handled 50+ GST audits and health checks',
      'Expert in FEMA documentation for waste paper imports',
    ],
    email: null,
  },
];

const coreTeam = team.filter((m) => m.tier === 'core');
const extendedTeam = team.filter((m) => m.tier === 'extended');

const differentiators = [
  {
    label: 'Industry-first hiring',
    description:
      'We hire people who have worked inside paper mills, not just around them. Domain knowledge is a prerequisite, not a bonus.',
  },
  {
    label: 'No generalists',
    description:
      'Everyone on the team has a defined specialty — mill operations, ERP architecture, compliance, raw material trade, or client success.',
  },
  {
    label: 'On-site, not just remote',
    description:
      'We travel to your mill. Implementations, training, and optimisation reviews are done in person where it matters.',
  },
];

function TeamCard({ member }: { member: Member }) {
  return (
    <div className="amber-card flex flex-col gap-5 rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-300">
      {/* Photo + name — centered profile header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover ring-2 ring-amber-500/30"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/25 to-amber-600/10 text-amber-400 font-bold text-2xl tracking-tight ring-2 ring-amber-500/30 select-none">
              {member.initials}
            </div>
          )}
        </div>
        <div>
          <p className="font-bold leading-tight">{member.name}</p>
          <p className="text-xs text-amber-400 mt-1 leading-snug uppercase tracking-wide">
            {member.role}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-3 px-3 py-1 text-[11px] text-text-3">
            <span className="font-bold text-foreground">{member.stat.value}</span>
            {member.stat.label}
          </span>
          {member.tier === 'extended' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-amber-500/40 bg-amber-500/5 px-3 py-1 text-[11px] text-amber-400">
              Engaged on demand
            </span>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-text-2 leading-relaxed">{member.bio}</p>

      {/* Skills */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-3 mb-2">
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {member.expertise.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface-3 px-2.5 py-0.5 text-xs text-text-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-3 mb-2">
          Achievements
        </p>
        <ul className="space-y-1.5">
          {member.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-text-3">
              <Award size={12} className="mt-0.5 shrink-0 text-amber-500" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Email — founder only */}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors mt-auto pt-2 border-t border-border"
        >
          <Mail size={13} />
          {member.email}
        </a>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Our Team
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Domain experts.<br />Not generalists.
          </h1>
          <p className="text-text-2 text-lg leading-relaxed max-w-2xl">
            Every person on the Papyrus360 team has deep roots in either paper manufacturing or
            enterprise software — most have both. A core team of Netique employees, backed by an
            extended bench of domain consultants engaged as each project requires.
          </p>
        </div>
      </div>

      {/* Placeholder notice */}
      <div className="border-b border-amber-500/20 bg-amber-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2">
          <span className="text-amber-400 text-xs">⚠</span>
          <p className="text-xs text-amber-400/80">
            Team profiles coming soon — names and details on this page are illustrative placeholders until updated with real team information.
          </p>
        </div>
      </div>

      {/* Why our team is different */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((d) => (
              <div key={d.label} className="flex flex-col gap-2">
                <div className="w-1.5 h-5 rounded-full bg-amber-500 mb-1" />
                <h3 className="text-base font-bold">{d.label}</h3>
                <p className="text-sm text-text-2 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core team */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="flex items-start gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
            <Users size={18} className="text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1.5">
              Core Team
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Employed directly by Netique Infotech.
            </h2>
            <p className="text-sm text-text-2 leading-relaxed max-w-2xl">
              The full-time team behind every product and engagement — always in-house, always
              accountable.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreTeam.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Extended team */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="flex items-start gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
            <Network size={18} className="text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1.5">
              Extended Team
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Domain consultants & SMEs, engaged as needed.
            </h2>
            <p className="text-sm text-text-2 leading-relaxed max-w-2xl">
              A bench of independent specialists — subject-matter experts across mill operations,
              compliance, and other disciplines — who are not on payroll but are always available
              and brought onto an engagement exactly when that expertise is required.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {extendedTeam.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {/* Join the team */}
        <div className="mt-20 rounded-2xl border border-border bg-surface-2 px-8 py-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Join Us
          </p>
          <h2 className="text-2xl font-bold mb-3">Always looking for the right people.</h2>
          <p className="text-sm text-text-2 leading-relaxed mb-6">
            Papyrus360 is always open to conversations with paper industry professionals — mill
            managers, production engineers, compliance specialists — and software engineers with a
            genuine interest in manufacturing domain problems. Whether as a core team hire or an
            extended-team consultant, we value experience over credentials and depth over breadth.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-amber-400 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>

      <CTABanner
        eyebrow="Talk to an expert"
        title={<>The right person<br />picks up.</>}
        subtitle="Every enquiry goes directly to a domain expert — not a sales rep."
        primaryLabel="Contact the Team"
      />
    </div>
  );
}
