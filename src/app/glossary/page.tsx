import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Paper Industry Glossary — Key Terms & Definitions | Papyrus360',
  description:
    'A comprehensive A–Z glossary of paper industry terminology covering pulp chemistry, papermaking processes, paper grades, quality measurements, and trade terms. Reference guide for mill managers, traders, and procurement teams.',
  keywords: [
    'paper industry glossary',
    'papermaking terms',
    'paper grade definitions',
    'GSM definition',
    'kraft process',
    'paper mill terminology',
    'pulp and paper terms',
    'caliper definition paper',
    'basis weight definition',
    'paper industry reference',
  ],
};

const terms = [
  { term: 'Absorbency', definition: 'Ability of paper to absorb liquids such as water and ink. Measured by the Cobb test (IS 1060). Critical for inkjet papers and packaging grades.' },
  { term: 'Antique finish', definition: 'Rough, uncalendered surface that mimics old handmade paper. High bulk, used in book printing and luxury stationery.' },
  { term: 'Art paper', definition: 'Coated paper with a mineral coating (kaolin/calcium carbonate) on one or both sides. Produces high-gloss or matte finish. Used for magazines, brochures, and annual reports.' },
  { term: 'Basis weight', definition: 'US system for paper weight. The weight in pounds of 500 sheets at the grade-specific standard sheet size (e.g. 17×22″ for Bond, 25×38″ for Text). Convert to GSM using grade-specific factors.' },
  { term: 'Beating', definition: 'Mechanical treatment of pulp fibres to hydrate and fibrillate the cellulose, improving inter-fibre bonding and paper strength. Also called refining.' },
  { term: 'Bleaching', definition: 'Multi-stage chemical process to remove residual lignin and chromophores from pulp, increasing brightness and whiteness.' },
  { term: 'Bond paper', definition: 'Premium uncoated writing and printing paper, 60–120 GSM. Named after early use for government bonds. High strength and permanence.' },
  { term: 'Brightness', definition: 'Reflectance of paper to 457 nm (blue) light, expressed as a percentage. Measured per ISO 2470 (D65) or TAPPI T452. Higher brightness = whiter appearance.' },
  { term: 'Broke', definition: 'Paper damaged or rejected during manufacture that is repulped and recycled back into the process. Broke handling is critical for mill efficiency.' },
  { term: 'Bulk', definition: 'Reciprocal of apparent density. Calculated as: Caliper (mm) × 1000 / GSM. Higher bulk means thicker feel per gram — important for books and premium stationery.' },
  { term: 'Bursting strength', definition: 'Resistance of paper to rupture under uniform hydraulic pressure (Mullen test). Measured in kPa per IS 6474 / ISO 2758. Critical for bags, sacks, and corrugated board.' },
  { term: 'Calender', definition: 'Stack of heavy rollers at the end of a paper machine (or as a separate off-machine unit) that compress and smooth the paper surface, reducing caliper and improving gloss.' },
  { term: 'Caliper', definition: 'Physical thickness of a sheet of paper or board. Measured in microns (μm) or mils (0.001 inch). Measured per IS 1543 / ISO 534.' },
  { term: 'China clay (Kaolin)', definition: 'The primary mineral filler and coating pigment in papermaking. Improves brightness, smoothness, opacity, and printability.' },
  { term: 'Coated paper', definition: 'Paper with one or more layers of mineral coating (clay, calcium carbonate, talc) applied to improve surface smoothness, brightness, and ink receptivity.' },
  { term: 'Consistency', definition: 'Concentration of fibre in the papermaking stock suspension, expressed as a percentage by weight. Wet end consistency is typically 0.2–1.5%; headbox consistency 0.3–1%.' },
  { term: 'Creping', definition: 'Process in tissue manufacture where the paper web is scraped off the Yankee dryer cylinder with a doctor blade, creating a soft creped texture.' },
  { term: 'Cross direction (CD)', definition: 'The direction in a paper sheet perpendicular to the direction of travel through the paper machine. CD properties (stretch, tensile) are generally weaker than MD.' },
  { term: 'Dandy roll', definition: 'A light cylindrical roll on the wet end wire section that can impress watermarks or wove/laid textures into the paper web before it fully drains.' },
  { term: 'Deckle', definition: 'Originally the wooden frame limiting sheet width in handmaking. In modern mills, refers to the reel/web width and the cutting plan that maximizes saleable output from each reel pass.' },
  { term: 'Deckle edge', definition: 'The natural rough, untrimmed edge of handmade or mould-made paper, formed where the pulp thins at the deckle frame. Prized in fine art and book printing.' },
  { term: 'Deinking', definition: 'Removal of ink from recovered printed paper during recycling. Uses flotation (bubbles collect ink) or washing. Critical for producing high-brightness recycled pulp.' },
  { term: 'Dryer section', definition: 'Part of the paper machine where the pressed wet web is passed over a series of steam-heated cylinders (typically 100–140°C) to evaporate remaining moisture.' },
  { term: 'Duplex board', definition: 'Paperboard with a bright/white top ply bonded to a grey or brown recycled fibre base. Used for cartons, shoe boxes, and lightweight packaging.' },
  { term: 'Esparto', definition: 'A grass (Stipa tenacissima) used as a cellulose fibre source, mainly in North Africa and Spain. Produces high-bulk, high-opacity paper.' },
  { term: 'Filler', definition: 'Inorganic mineral particles — kaolin, precipitated calcium carbonate (PCC), ground calcium carbonate (GCC), talc, or TiO₂ — added to the furnish to improve opacity, brightness, smoothness, and reduce cost.' },
  { term: 'Formation', definition: 'The uniformity of fibre distribution in a sheet, visible as light/dark patterns when held to light. Good formation is critical for printing quality and tensile uniformity.' },
  { term: 'Fourdrinier', definition: 'The most common paper machine design (patented 1806), using a continuous flat wire belt (forming fabric) onto which the headbox deposits the dilute stock to drain and form a web.' },
  { term: 'Freeness (CSF)', definition: 'The rate at which water drains from a pulp suspension. Expressed as Canadian Standard Freeness (CSF, 0–900 mL) or Schopper-Riegler (°SR). Lower CSF / higher °SR = more refined pulp.' },
  { term: 'Furnish', definition: 'The complete mixture of fibres, fillers, sizing agents, retention aids, and other additives that constitutes the papermaking stock.' },
  { term: 'Grain direction', definition: 'The predominant alignment of fibres in a finished sheet, parallel to the machine direction. Long-grain sheets are stiffer in the long dimension; folding against the grain causes cracking.' },
  { term: 'GSM (Grammage)', definition: 'Grams per square metre — the universal metric unit for paper and board weight. Measured per IS 1397 / ISO 536. Replaces "basis weight" in all modern international trade.' },
  { term: 'Headbox', definition: 'The device at the wet end of a paper machine that distributes the dilute fibre suspension evenly across the full width of the forming wire at controlled pressure and velocity.' },
  { term: 'Integrated mill', definition: 'A paper mill that produces its own pulp on-site from virgin fibre (wood, bamboo, sugarcane bagasse), rather than buying market pulp.' },
  { term: 'Jumbo reel', definition: 'The large roll (often 4–8 m diameter) wound at the dry end of a paper machine before slitting and rewinding into customer reels or cutting into sheets.' },
  { term: 'Kappa number', definition: 'A measure of residual lignin content in unbleached or semi-bleached pulp. Determined per ISO 302. Lower kappa number indicates more delignification.' },
  { term: 'Kraft process', definition: 'The dominant chemical pulping process. Wood chips are cooked in sodium hydroxide (NaOH) and sodium sulphide (Na₂S) at high temperature to dissolve lignin, leaving strong cellulose fibres.' },
  { term: 'Kraft paper', definition: 'Strong, durable paper made from unbleached kraft pulp. Brown colour. Used for multiwall bags, wrapping, grocery sacks, and industrial applications.' },
  { term: 'Laid paper', definition: 'Paper showing closely-spaced parallel lines (laid lines) and wider chain lines, formed by the laid mould or dandy roll. Traditional premium paper appearance.' },
  { term: 'Lignin', definition: 'The natural polymer that binds cellulose fibres in wood and provides structural rigidity to trees. Must be removed in chemical pulping. Residual lignin causes paper to yellow.' },
  { term: 'Machine direction (MD)', definition: 'The direction parallel to the flow of the paper web on the paper machine. Paper is generally stronger, stiffer, and less extensible in MD than CD.' },
  { term: 'Machine glazed (MG)', definition: 'Paper dried on a large polished Yankee cylinder, giving one very smooth, glossy surface and one rougher surface. Used for greaseproof base, tissue, and wrapping papers.' },
  { term: 'Moisture content', definition: 'Percentage of water in paper by weight. Standard conditioning per ISO 187: 50% RH, 23°C. Most paper is shipped and sold at 5–9% moisture content.' },
  { term: 'Newsprint', definition: 'Lightweight (40–52 GSM) paper made primarily from mechanical pulp. Low brightness (55–60 ISO), good printability at speed. Primary grade for newspapers.' },
  { term: 'OCC (Old Corrugated Containers)', definition: 'The most traded wastepaper grade globally. Recovered corrugated boxes used as primary fibre for linerboard, fluting, and kraft liners.' },
  { term: 'Opacity', definition: 'The ability of paper to prevent the printing or substrate on the reverse showing through. 100% = perfectly opaque. Measured per ISO 2471 (printing opacity) or ISO 2469.' },
  { term: 'Press section', definition: 'Part of the paper machine between the wire and dryer sections where water is mechanically removed from the wet web by compression between rolls and felts.' },
  { term: 'Pulp', definition: 'Fibrous raw material for papermaking. Produced by mechanical treatment (groundwood, TMP, CTMP) or chemical treatment (kraft, sulphite) of wood, bamboo, sugarcane, or recycled paper.' },
  { term: 'Ream', definition: 'A standard quantity of paper. Most commonly 500 sheets. Some trades use 480 (short ream) or 516 (printer\'s ream). Indian standard ream = 500 sheets.' },
  { term: 'Refining', definition: 'See Beating. The controlled mechanical treatment of pulp fibres to increase surface area, fibrillation, and bonding potential for improved paper strength.' },
  { term: 'Retention', definition: 'The percentage of added fine fibres, fillers, and chemicals that remain in the paper sheet rather than passing through the wire with white water. Critical for quality and raw material cost.' },
  { term: 'Short-fibre pulp', definition: 'Pulp from hardwoods (eucalyptus, acacia, birch) with average fibre length 0.5–1.5 mm. Improves formation, smoothness, and printability vs. long-fibre grades.' },
  { term: 'Sizing', definition: 'Treatment to reduce paper absorbency. Internal sizing (rosin, AKD, ASA added to furnish) and surface sizing (starch applied at size press). Improves water resistance and printability.' },
  { term: 'Super-calendered (SC)', definition: 'Paper calendered to high smoothness and gloss using a supercalender (alternating steel and fiber rolls) without coating. Used for magazines and catalogues.' },
  { term: 'Tear resistance', definition: 'Force required to continue a tear after an initial cut. Measured by Elmendorf pendulum test per IS 6480 / ISO 1974. Important for bags, forms, and technical papers.' },
  { term: 'Tensile strength', definition: 'Maximum force per unit width before a paper strip breaks under tension. Measured per IS 6475 / ISO 1924. Reported as kN/m or breaking length (km).' },
  { term: 'Tissue', definition: 'Very lightweight paper (12–35 GSM), typically creped for softness. Includes facial tissue, toilet tissue, kitchen towel, and industrial wipers.' },
  { term: 'Trim', definition: 'The edge waste generated when slitting a reel to the ordered width. Minimising trim waste (typically 0.5–2% of output) is the goal of deckle optimisation.' },
  { term: 'UWF (Uncoated Woodfree)', definition: 'Premium printing and writing paper made entirely from chemical pulp with no mechanical wood component. Includes office copier paper, offset printing paper, and premium stationery.' },
  { term: 'Virgin fibre', definition: 'New cellulose fibre derived from primary raw materials (wood, bamboo, sugarcane bagasse) as opposed to recovered/recycled fibre.' },
  { term: 'Watermark', definition: 'A design or text embedded in the paper sheet during manufacture using a dandy roll. Visible when held to light. Used for security documents, banknotes, and branded stationery.' },
  { term: 'Web', definition: 'The continuous sheet of paper formed on the paper machine, travelling from wet end to reel at speeds of 200–2000 m/min in modern machines.' },
  { term: 'Wire (forming fabric)', definition: 'The woven synthetic fabric belt on the wet end of a paper machine on which the fibre suspension drains to form the paper web.' },
  { term: 'Yankee dryer', definition: 'A large (3–6 m diameter) steam-heated polished steel cylinder used in tissue manufacture to dry the web and, with creping, impart softness.' },
  { term: 'Yield', definition: 'In chemical pulping, the percentage of fibre obtained relative to the initial dry wood weight. Kraft yield is typically 42–50%; mechanical pulp yield 85–95%.' },
];

// Group terms by first letter
const grouped = terms.reduce<Record<string, typeof terms>>((acc, t) => {
  const letter = t.term[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(t);
  return acc;
}, {});

const letters = Object.keys(grouped).sort();

export default function GlossaryPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Reference
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Paper Industry Glossary
          </h1>
          <p className="text-text-2 leading-relaxed max-w-xl">
            Over 60 essential terms covering pulp chemistry, paper machine operations, quality
            measurements, and trade terminology — curated for mill professionals, traders, and
            procurement teams.
          </p>
          <p className="text-xs text-text-3 mt-5">
            {terms.length} terms &middot; Updated 2025
          </p>
        </div>
      </div>

      {/* A–Z Quick Nav */}
      <div className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded text-xs font-semibold text-text-3 hover:text-amber-400 hover:bg-surface-2 transition-colors duration-150"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Glossary Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-14">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-16">
              {/* Letter heading */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-black text-amber-400 leading-none w-10 shrink-0">
                  {letter}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Terms */}
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grouped[letter].map((item) => (
                  <div
                    key={item.term}
                    className="rounded-xl border border-border bg-surface-2 px-5 py-4 hover:border-amber-500/30 transition-colors duration-200"
                  >
                    <dt className="font-semibold text-foreground mb-1.5">{item.term}</dt>
                    <dd className="text-sm text-text-2 leading-relaxed">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        {/* Back to top */}
        <div className="mt-14 text-center">
          <a
            href="#"
            className="text-xs text-text-3 hover:text-amber-400 transition-colors"
          >
            Back to top &uarr;
          </a>
        </div>
      </main>

      <CTABanner
        eyebrow="Got a term we missed?"
        title={
          <>
            Suggest a term
            <br />
            or definition.
          </>
        }
        subtitle="We update this glossary regularly based on industry feedback."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
