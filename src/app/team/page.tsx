import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Our Team — Paper Industry Experts | Papyrus360',
  description:
    'Meet the Papyrus360 team — paper mill veterans, ERP architects, compliance specialists, and import managers who have spent their careers inside the Indian paper industry.',
};

// TODO: replace with real team data
const team = [
  {
    name: 'Anand Krishnamurthy',
    initials: 'AK',
    role: 'Founder & Managing Director',
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
    role: 'Head of Software Products',
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
    name: 'Rajesh Subramaniam',
    initials: 'RS',
    role: 'Lead Consultant — Mill Operations',
    expertise: ['Production Planning', 'Deckle Optimisation', 'Process Improvement'],
    bio: 'Former production manager at two integrated paper mills in Tamil Nadu and Karnataka. Joined Papyrus360 as a consultant after 18 years on the mill floor. Now helps clients extract maximum yield from every reel.',
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
    role: 'Compliance & Finance Specialist',
    expertise: ['GST', 'TDS', 'FEMA', 'Export-Import Compliance'],
    bio: 'Chartered Accountant with 16 years of experience in paper industry finance and regulatory compliance. Advises mills on GST reconciliation, export-import documentation, and audit readiness. Leads BPApp\'s compliance module design.',
    highlights: [
      'Chartered Accountant (ICAI)',
      '16 years paper industry finance',
      'Handled 50+ GST audits and health checks',
      'Expert in FEMA documentation for waste paper imports',
    ],
    email: null,
  },
  {
    name: 'Karthik Balaji',
    initials: 'KB',
    role: 'Raw Material & Import Manager',
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
    role: 'Customer Success & Implementation Lead',
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
] as const;

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
            enterprise software — most have both.
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

      {/* Team grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="amber-card flex flex-col gap-5 rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-300"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 font-bold text-lg tracking-tight select-none">
                  {member.initials}
                </div>
                <div>
                  <p className="font-bold leading-tight">{member.name}</p>
                  <p className="text-xs text-text-3 mt-0.5 leading-snug">{member.role}</p>
                </div>
              </div>

              {/* Expertise tags */}
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

              {/* Bio */}
              <p className="text-sm text-text-2 leading-relaxed">{member.bio}</p>

              {/* Highlights */}
              <ul className="space-y-1.5">
                {member.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-text-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Email — founder only */}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors mt-auto pt-2"
                >
                  <Mail size={13} />
                  {member.email}
                </a>
              )}
            </div>
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
            genuine interest in manufacturing domain problems. We value experience over credentials
            and depth over breadth.
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
