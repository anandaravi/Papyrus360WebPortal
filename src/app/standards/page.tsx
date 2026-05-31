import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Paper Industry Testing Standards — BIS, ISO & TAPPI Reference | Papyrus360',
  description:
    'Complete reference for paper and board testing standards — Indian BIS (IS), international ISO, and TAPPI standards for grammage, caliper, tensile, burst, tear, opacity, brightness, moisture and more.',
  keywords: [
    'paper testing standards',
    'BIS paper standards',
    'IS 1397 grammage',
    'ISO 536 paper',
    'TAPPI paper standards',
    'paper mill quality standards India',
    'paper burst strength standard',
    'paper brightness ISO',
  ],
};

type Standard = {
  code: string;
  title: string;
  parameter: string;
  notes?: string;
};

type Group = {
  body: string;
  fullName: string;
  color: string;
  standards: Standard[];
};

const STANDARDS: Group[] = [
  {
    body: 'BIS',
    fullName: 'Bureau of Indian Standards',
    color: 'text-orange-400 border-orange-500/30 bg-orange-500/8',
    standards: [
      { code: 'IS 1060', title: 'Paper and Board — Vocabulary', parameter: 'Terminology', notes: 'Indian vocabulary standard for paper, board, and pulp.' },
      { code: 'IS 1397', title: 'Grammage of Paper and Board', parameter: 'GSM', notes: 'Method for determining mass per unit area (g/m²).' },
      { code: 'IS 1543', title: 'Thickness (Caliper) of Paper and Board', parameter: 'Caliper', notes: 'Micrometer method under specified pressure (100 kPa).' },
      { code: 'IS 6474', title: 'Bursting Strength — Paper', parameter: 'Burst', notes: 'Mullen hydraulic bursting test. Result in kPa.' },
      { code: 'IS 6474 (Pt. 2)', title: 'Bursting Strength — Board', parameter: 'Burst (board)', notes: 'Higher range Mullen test for heavy boards and corrugated.' },
      { code: 'IS 6475', title: 'Tensile Strength and Elongation', parameter: 'Tensile', notes: 'Tensile breaking force (N/15mm) and stretch (%) in MD and CD.' },
      { code: 'IS 6476', title: 'Internal Bond Strength (Z-direction)', parameter: 'Internal bond', notes: 'Scott Bond method. Important for coated grades and boards.' },
      { code: 'IS 6477', title: 'Water Absorption — Cobb Test', parameter: 'Absorbency', notes: 'Weight of water absorbed in 60 s (g/m²). Critical for packaging grades.' },
      { code: 'IS 6478', title: 'Air Permeance (Gurley)', parameter: 'Porosity', notes: 'Seconds for 100 mL air to pass through. Lower = more porous.' },
      { code: 'IS 6479', title: 'Folding Endurance', parameter: 'Fold', notes: 'Number of double folds before failure. Schopper or MIT method.' },
      { code: 'IS 6480', title: 'Tear Resistance (Elmendorf)', parameter: 'Tear', notes: 'Force (mN) to propagate a tear. Pendulum method, MD and CD.' },
      { code: 'IS 6481', title: 'Opacity', parameter: 'Opacity', notes: 'Printing opacity. Key for show-through in book and writing papers.' },
      { code: 'IS 6482', title: 'Brightness (R457)', parameter: 'Brightness', notes: 'Blue reflectance at 457 nm. Also known as ISO brightness.' },
      { code: 'IS 6483', title: 'Smoothness (Bekk)', parameter: 'Smoothness', notes: 'Seconds for air to leak between glass plate and paper surface. Higher = smoother.' },
      { code: 'IS 6484', title: 'pH of Aqueous Extract', parameter: 'pH', notes: 'Cold extraction pH. Indicates acidity/alkalinity of sizing agents.' },
      { code: 'IS 7273', title: 'Writing and Printing Paper — Specification', parameter: 'W&P spec', notes: 'Grade specification standard for Indian writing and printing papers.' },
      { code: 'IS 14492', title: 'Moisture Content', parameter: 'Moisture', notes: 'Oven drying method. Standard conditioning: 50% RH, 23°C per IS 1060.' },
    ],
  },
  {
    body: 'ISO',
    fullName: 'International Organization for Standardization',
    color: 'text-blue-400 border-blue-500/30 bg-blue-500/8',
    standards: [
      { code: 'ISO 536', title: 'Grammage Determination', parameter: 'GSM', notes: 'Fundamental standard for mass per unit area measurement.' },
      { code: 'ISO 534', title: 'Thickness and Apparent Density', parameter: 'Caliper', notes: 'Thickness measurement under 100 kPa; calculates apparent density.' },
      { code: 'ISO 187', title: 'Standard Atmosphere for Conditioning', parameter: 'Conditioning', notes: '50 ± 2% RH, 23 ± 1°C. All physical tests require pre-conditioning.' },
      { code: 'ISO 4046', title: 'Paper, Board, Pulps — Vocabulary', parameter: 'Terminology', notes: 'International vocabulary. Companion to IS 1060 for global trade.' },
      { code: 'ISO 2758', title: 'Bursting Strength — Paper', parameter: 'Burst', notes: 'Hydraulic method. Equivalent to IS 6474.' },
      { code: 'ISO 2759', title: 'Bursting Strength — Board', parameter: 'Burst (board)', notes: 'Higher-pressure Mullen test for heavy boards.' },
      { code: 'ISO 1924-1', title: 'Tensile Properties — Const. Rate of Loading', parameter: 'Tensile', notes: 'Breaking force (N/m) and elongation at break.' },
      { code: 'ISO 1924-2', title: 'Tensile Properties — Const. Rate of Elongation', parameter: 'Tensile', notes: 'Modern CRE method. Generally preferred over CRL for accuracy.' },
      { code: 'ISO 1974', title: 'Tear Resistance (Elmendorf)', parameter: 'Tear', notes: 'Tearing resistance in mN. MD and CD measured separately.' },
      { code: 'ISO 5626', title: 'Folding Endurance (Schopper)', parameter: 'Fold', notes: 'Double folds to failure under tension. Key for banknote and map papers.' },
      { code: 'ISO 2469', title: 'Diffuse Reflectance Factor', parameter: 'Optical basis', notes: 'Measurement geometry for brightness/opacity. Basis for ISO 2470 and 2471.' },
      { code: 'ISO 2470-1', title: 'Brightness (D65 illuminant)', parameter: 'Brightness', notes: 'Current international standard. Replaces older R457 (TAPPI) in global specs.' },
      { code: 'ISO 2471', title: 'Opacity (Printing Opacity)', parameter: 'Opacity', notes: 'Ratio of reflectance with black backing to reflectance with white backing.' },
      { code: 'ISO 9416', title: 'Light Scattering and Absorption Coefficients', parameter: 'Optical', notes: 'Kubelka-Munk parameters. Used to model brightness/opacity trade-offs.' },
      { code: 'ISO 5267-1', title: 'Drainability — Schopper-Riegler', parameter: 'Freeness (°SR)', notes: 'Freeness of pulp. Higher °SR = more refined. European standard.' },
      { code: 'ISO 5267-2', title: 'Drainability — Canadian Std Freeness', parameter: 'Freeness (CSF)', notes: 'Freeness of pulp 0–900 mL. Higher CSF = less refined. North American standard.' },
      { code: 'ISO 302', title: 'Kappa Number of Pulp', parameter: 'Kappa', notes: 'Residual lignin content in pulp after cooking. Guides bleaching sequence.' },
      { code: 'ISO 5351', title: 'Viscosity of Pulp (CED)', parameter: 'Viscosity', notes: 'Degree of polymerization of cellulose. Indicates fibre degradation.' },
    ],
  },
  {
    body: 'TAPPI',
    fullName: 'Technical Association of the Pulp and Paper Industry',
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/8',
    standards: [
      { code: 'TAPPI T410', title: 'Grammage of Paper and Paperboard', parameter: 'GSM', notes: 'US equivalent of ISO 536. Used in North American trade specs.' },
      { code: 'TAPPI T411', title: 'Thickness (Caliper) of Paper', parameter: 'Caliper', notes: 'US caliper standard. Pressure 50 kPa (vs ISO 100 kPa) — gives higher readings.' },
      { code: 'TAPPI T403', title: 'Bursting Strength of Paper', parameter: 'Burst', notes: 'US Mullen test. Results comparable to ISO 2758 but not identical.' },
      { code: 'TAPPI T414', title: 'Internal Tearing Resistance', parameter: 'Tear', notes: 'Elmendorf pendulum tear. Widely cited in US packaging specs.' },
      { code: 'TAPPI T452', title: 'Brightness of Pulp, Paper and Paperboard (R457)', parameter: 'Brightness (R457)', notes: 'The original R457 brightness. Still used in North America. Note: ISO 2470 D65 values are ~1–3 points higher.' },
      { code: 'TAPPI T494', title: 'Tensile Properties (CRE)', parameter: 'Tensile', notes: 'Breaking length and stretch. Equivalent of ISO 1924-2 in US specs.' },
      { code: 'TAPPI T441', title: 'Water Absorptiveness — Cobb', parameter: 'Absorbency', notes: 'Cobb 60 test. Matches IS 6477 / ISO 535 in method.' },
      { code: 'TAPPI T425', title: 'Opacity of Paper', parameter: 'Opacity', notes: 'C/2° geometry. US opacity standard for printing and writing papers.' },
      { code: 'TAPPI T498', title: 'Internal Bond (Scott Bond)', parameter: 'Internal bond', notes: 'Critical for laminates, coated grades, and corrugated medium.' },
      { code: 'TAPPI T511', title: 'Folding Endurance (MIT)', parameter: 'Fold', notes: 'MIT method under tension. Used for documents, currency, maps.' },
    ],
  },
];

export default function StandardsPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Reference
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Paper Testing Standards
          </h1>
          <p className="text-text-2 leading-relaxed max-w-xl">
            BIS, ISO, and TAPPI standards for paper and board testing — grammage, caliper,
            strength, optical properties, and more. Reference for quality labs, buyers, and mill
            managers.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['BIS / IS', 'ISO', 'TAPPI'].map((b) => (
              <span
                key={b}
                className="text-xs px-3 py-1 rounded-full border border-border text-text-3"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
        {STANDARDS.map((group) => (
          <div key={group.body}>
            <div className="flex items-center gap-3 mb-8">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${group.color}`}
              >
                {group.body}
              </span>
              <div>
                <h2 className="text-2xl font-bold">{group.body} Standards</h2>
                <p className="text-text-3 text-xs mt-0.5">{group.fullName}</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-2">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-3 uppercase tracking-wide w-36">
                      Standard
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-3 uppercase tracking-wide">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-3 uppercase tracking-wide w-36 hidden sm:table-cell">
                      Parameter
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-3 uppercase tracking-wide hidden lg:table-cell">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.standards.map((s, i) => (
                    <tr
                      key={s.code}
                      className={`border-b border-border/50 hover:bg-surface-2 transition-colors ${
                        i % 2 === 0 ? '' : 'bg-surface-2/30'
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-amber-400 text-xs font-semibold whitespace-nowrap">
                        {s.code}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{s.title}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs px-2 py-0.5 rounded-full border border-border text-text-3 whitespace-nowrap">
                          {s.parameter}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-2 leading-relaxed hidden lg:table-cell">
                        {s.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Cross-standards note */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <h3 className="font-semibold text-amber-400 mb-2">BIS vs ISO vs TAPPI — Key differences</h3>
          <ul className="space-y-2 text-sm text-text-2">
            <li>• <strong className="text-foreground">Brightness:</strong> ISO 2470 (D65) values are ~1–3 points higher than TAPPI T452 (R457). Specify which when quoting.</li>
            <li>• <strong className="text-foreground">Caliper:</strong> TAPPI T411 uses 50 kPa vs ISO/BIS 100 kPa — TAPPI values are slightly higher for the same sheet.</li>
            <li>• <strong className="text-foreground">Indian exports:</strong> Most mills report both BIS (IS) codes and ISO equivalents. Buyers in Europe/Middle East expect ISO citations.</li>
            <li>• <strong className="text-foreground">Conditioning:</strong> All physical tests require pre-conditioning to ISO 187 / IS 1060 (50% RH, 23°C, minimum 4 hours) for valid comparison.</li>
          </ul>
        </div>
      </div>

      <CTABanner
        eyebrow="Need QC support?"
        title={<>We&apos;ve run mills.<br />We know the tests.</>}
        subtitle="Our consultants can set up your lab testing protocols, interpret spec sheets, and align your quality system to BIS and ISO requirements."
        primaryLabel="Talk to an Expert"
      />
    </>
  );
}
