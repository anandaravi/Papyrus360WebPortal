import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'Paper Mill Machines — Complete Equipment Guide | Papyrus360',
  description:
    'Comprehensive visual guide to every major machine in a paper mill — wood yard, pulp mill, stock preparation, forming, pressing, drying, coating, finishing, converting, and chemical recovery. 40 machines illustrated for mill managers, engineers, and procurement teams.',
  keywords: [
    'paper mill machines',
    'paper machine types',
    'fourdrinier machine',
    'headbox paper machine',
    'yankee dryer tissue',
    'simplex duplex triplex winder',
    'kraft digester',
    'slitter rewinder',
    'bleaching tower pulp mill',
    'paper mill equipment complete guide',
  ],
};

interface Machine {
  name: string;
  slug: string;
  description: string;
  detail: string;
}

interface Category {
  title: string;
  description: string;
  machines: Machine[];
}

const categories: Category[] = [
  {
    title: 'Wood Yard & Fibre Preparation',
    description:
      'Raw wood logs and chips are processed into uniform furnish ready for pulping.',
    machines: [
      {
        name: 'Chipper',
        slug: 'chipper',
        description:
          'Converts whole logs or wood waste into uniform wood chips for chemical or mechanical pulping.',
        detail:
          'Disc chippers use a rotating disc with knives to cut logs radially into chips 15–25 mm long and 2–5 mm thick. Drum chippers use a rotating drum and are better suited to varied wood species and sizes. Chip geometry directly affects pulping uniformity: oversized chips under-cook; fines over-cook. A chip screen after the chipper separates acceptable chips from oversize (returned to chipper) and fines (used as fuel).',
      },
      {
        name: 'Chip Screen',
        slug: 'chip-screen',
        description:
          'Classifies wood chips by size, separating accepts, oversize, and fines before pulping.',
        detail:
          'Vibrating deck screens use two or three decks with different aperture sizes. Top deck rejects oversize chips (returned to chipper or rejected). Middle deck accepts properly sized chips for pulping. Bottom deck captures fines — too small to pulp efficiently, typically used as biomass fuel. Proper chip screening reduces digester variability and improves pulp yield and quality.',
      },
    ],
  },
  {
    title: 'Stock Preparation',
    description:
      'Raw fibre is dissolved, cleaned, refined, and blended into papermaking stock before the paper machine.',
    machines: [
      {
        name: 'Hydrapulper',
        slug: 'hydrapulper',
        description:
          'Dissolves wastepaper, pulp bales, or broke in water using a high-speed rotating impeller.',
        detail:
          'The hydrapulper is the entry point for all raw fibre. Bales of OCC, market pulp, or broke are dropped into a cylindrical vessel filled with water (3–5% consistency). The rotor creates turbulence that disintegrates the fibre without over-cutting. Heavy contaminants sink to the extraction zone at the base; cleaned pulp overflows to the next stage.',
      },
      {
        name: 'Drum Pulper',
        slug: 'drum-pulper',
        description:
          'Continuously dissolves old corrugated containers (OCC) and mixed waste in a rotating drum — gentler than a hydrapulper.',
        detail:
          'The drum pulper is a long rotating horizontal cylinder with perforated holes. OCC and water enter at one end; the gentle tumbling action soaks and disintegrates the paper fibres over 15–25 minutes without shredding contaminants. Accepts drain through the holes; large rejects (plastics, strings, tapes) exit from the far end intact and can be sorted. This intact rejection of contaminants is the key advantage over hydrapulpers for mixed waste streams.',
      },
      {
        name: 'Broke Pulper',
        slug: 'broke-pulper',
        description:
          'Continuously re-pulps paper broke, trim, and edge waste generated on the paper machine.',
        detail:
          'Located directly under the paper machine, broke pulpers continuously receive edge trim, sheet breaks, and off-specification paper. They re-pulp this material quickly so it can be pumped back to the stock preparation system and re-used. Effective broke management is critical for mill efficiency — broke typically represents 5–15% of furnish and must be recycled without contaminating the main stock system.',
      },
      {
        name: 'Disc Refiner',
        slug: 'disc-refiner',
        description:
          'Mechanically treats pulp fibres between two rotating discs to improve bonding and paper strength.',
        detail:
          'Refining (beating) controls the degree of fibrillation — the roughening of fibre surfaces that creates inter-fibre hydrogen bonds. Disc refiners use two opposed grooved plates: one stationary, one rotating at 1500 rpm. The gap between them determines refining intensity. More refining = stronger, denser, less porous paper; less refining = bulkier, softer sheet.',
      },
      {
        name: 'Pressure Screen',
        slug: 'pressure-screen',
        description:
          'Removes fibre bundles, contaminants, and shives from pulp under pressure before the wet end.',
        detail:
          'Pressure screens use a cylinder with precisely machined slots or holes (0.10–0.35 mm). Accepts — clean fibre — pass through; rejects — undefibred bundles, plastic, ink specks — are expelled continuously. Multiple stages (primary, secondary, tertiary) achieve very high cleanliness. Critical for coated paper and tissue grades.',
      },
      {
        name: 'Flotation Deinking Cell',
        slug: 'flotation-deinking',
        description:
          'Removes ink from recycled paper pulp using air bubbles in a flotation process.',
        detail:
          'In flotation deinking, air is injected into the pulp slurry (0.8–1.2% consistency). Ink particles, coated with collector chemicals (fatty acids or soaps), attach to the rising air bubbles and float to the surface as a foam. The foam — containing ink, fillers, and some short fibres — is continuously skimmed off. Flotation is the primary deinking method for graphic papers; it achieves high brightness recovery while retaining most of the fibre.',
      },
      {
        name: 'High-Density Cleaner',
        slug: 'high-density-cleaner',
        description:
          'Removes heavy contaminants — sand, staples, grit, glass — from pulp by centrifugal force.',
        detail:
          'Also called centrifugal cleaners or hydrocyclones. Pulp enters the conical vessel tangentially at high velocity, creating a vortex. Heavy particles (density > water) migrate to the wall and exit at the apex reject (bottom). Clean fibre exits the overflow (top). Banks of parallel cleaners handle full mill flow. Three cleaning stages are typical: primary (coarse), secondary (medium), tertiary (fine). Essential before any coated or premium paper grade.',
      },
    ],
  },
  {
    title: 'Pulp Mill',
    description:
      'Virgin wood chips are converted to clean bleached pulp through cooking, washing, and bleaching.',
    machines: [
      {
        name: 'Digester',
        slug: 'digester',
        description:
          'Cooks wood chips in white liquor (NaOH + Na₂S) at high temperature to dissolve lignin and free the cellulose fibres.',
        detail:
          'The digester is the heart of kraft pulping. Wood chips are impregnated with white liquor and cooked at 160–175°C for 1–4 hours. Lignin dissolves while cellulose fibres are preserved. Continuous digesters (Kamyr type) process chips in a tall cylindrical vessel 60–80 m high. Batch digesters are used in smaller mills. Digester control determines kappa number, yield, and fibre quality.',
      },
      {
        name: 'Brown Stock Washer',
        slug: 'brown-stock-washer',
        description:
          'Washes black liquor from cooked brown pulp using a countercurrent hot water system.',
        detail:
          'After cooking, the brown pulp is saturated with black liquor (dissolved lignin and spent chemicals). The brown stock washer recovers this liquor efficiently for the chemical recovery cycle. Drum washers form a pulp mat on a rotating drum; hot wash water displaces the black liquor. Modern diffusion washers and pressure washers achieve higher wash efficiencies. Wash efficiency directly impacts chemical recovery and effluent load.',
      },
      {
        name: 'Oxygen Delignification Reactor',
        slug: 'oxygen-delignification',
        description:
          'Removes residual lignin from brown pulp with oxygen before bleaching, reducing chemical demand.',
        detail:
          'Oxygen delignification (O-stage) uses molecular oxygen in an alkaline environment to oxidise and dissolve residual lignin. Operating at 90–110°C and 6–8 bar, the reactor reduces kappa number by 40–50% before the bleach plant. This dramatically reduces bleaching chemical demand (especially chlorine compounds) and lowers the organic load in bleach plant effluent. Standard in all modern kraft mills.',
      },
      {
        name: 'Bleaching Tower',
        slug: 'bleaching-tower',
        description:
          'Multi-stage process that removes residual lignin and chromophores from pulp to achieve target brightness.',
        detail:
          'Modern ECF (elemental chlorine-free) bleaching sequences use stages such as D (chlorine dioxide), E (extraction), P (peroxide), and Q (chelation). Each stage has a dedicated tower where pulp reacts with chemicals at controlled temperature, consistency, and time. Between towers, washers remove spent chemicals. A full bleaching sequence takes the pulp from kappa 10–15 (after O-stage) to 88–92 ISO brightness. TCF (totally chlorine-free) sequences use only O, P, and Q stages.',
      },
    ],
  },
  {
    title: 'Forming Section',
    description:
      'The dilute fibre suspension is deposited on a forming fabric where water drains to form the paper web.',
    machines: [
      {
        name: 'Headbox',
        slug: 'headbox',
        description:
          'Distributes the dilute fibre suspension uniformly across the full machine width onto the forming wire.',
        detail:
          'The headbox is where the papermaking stock (0.3–1% fibre in water) is transformed into a uniform jet. Modern hydraulic headboxes use a tapered manifold and turbulence generators (tubes or vanes) to ensure even basis weight distribution from edge to edge. Headbox jet velocity vs. wire speed ratio (jet-to-wire ratio) controls fibre orientation and MD/CD strength balance.',
      },
      {
        name: 'Fourdrinier Machine',
        slug: 'fourdrinier',
        description:
          'The classic paper machine design using a flat continuous forming wire on which the web drains and forms.',
        detail:
          'Patented in 1806 and still the most widely used forming concept. The headbox deposits stock onto a woven synthetic forming fabric travelling at 200–2000 m/min. Water drains by gravity and suction through the fabric. The table contains foils, suction boxes, and a dandy roll. Suitable for a very wide range of paper grades at all speeds.',
      },
      {
        name: 'Twin-Wire Former',
        slug: 'twin-wire-former',
        description:
          'High-speed forming between two converging fabrics for better formation and reduced two-sidedness.',
        detail:
          'Modern gap formers inject the headbox jet between two moving forming fabrics. Water drains simultaneously through both sides, giving superior formation and eliminating wire side / felt side differences. Essential above 800 m/min and for grades demanding excellent printability. Dominating newsprint, LWC, and fine paper.',
      },
      {
        name: 'Cylinder Mould (Vat Machine)',
        slug: 'cylinder-mould',
        description:
          'Rotating cylindrical moulds submerged in fibre vats — the primary forming method for multi-ply board.',
        detail:
          'Vat machines use one or more cylindrical wire-covered moulds rotating in vats of fibre suspension. The fibre deposits on the outside of the mould as water drains inward. Multiple vats in series build up individual plies that are couched together wet — creating multi-ply board with different fibre compositions in each ply (e.g., white top ply, grey middle, brown back). Used for duplex board, triplex board, and specialty papers requiring controlled two-sidedness.',
      },
    ],
  },
  {
    title: 'Water Removal (Press Section)',
    description:
      'Water is mechanically squeezed from the wet web before energy-intensive thermal drying.',
    machines: [
      {
        name: 'Conventional Press',
        slug: 'conventional-press',
        description:
          'Two counter-rotating rolls that squeeze water from the wet web through press felts.',
        detail:
          'The conventional press uses two rolls forming a nip with press felts on one or both sides. As the web passes through the nip, water is squeezed out and absorbed into the felt, then removed by suction press rolls or uhle boxes. A typical press section has 2–3 press nips in series. Nip pressure, roll cover hardness, and felt design determine dryness — typically achieving 40–45% dry content exiting the press section.',
      },
      {
        name: 'Shoe Press',
        slug: 'shoe-press',
        description:
          'Extended-nip press that applies pressure over a longer zone for maximum water removal before drying.',
        detail:
          'A shoe press uses a stationary concave shoe pressing a flexible belt against a backing roll, creating a nip 250 mm long vs. ~5 mm for conventional presses. This dramatically increases dwell time and water removal — achieving 50–55% dry content. Less thermal energy needed in the dryer section. Modern paper machines use shoe presses as the final and most powerful press stage.',
      },
      {
        name: 'Yankee Dryer',
        slug: 'yankee-dryer',
        description:
          'A large polished steam-heated cylinder used in tissue making for one-side drying and creping.',
        detail:
          'The Yankee is a 3–6 m diameter polished steel pressure vessel operating at 3–5 bar steam. The wet tissue web is pressed against the Yankee surface and dried rapidly. A doctor blade at the bottom scrapes the sheet off, creping it — accordion-folding the fibres to create the characteristic softness and stretch of facial and toilet tissue. Hot air hoods around the top accelerate drying.',
      },
    ],
  },
  {
    title: 'Drying & Finishing',
    description:
      'The web is dried to final moisture, then surface-treated for printability and appearance.',
    machines: [
      {
        name: 'Multi-Cylinder Dryer Section',
        slug: 'dryer-section',
        description:
          'Rows of steam-heated cast-iron cylinders that evaporate water from the web after pressing.',
        detail:
          'The dryer section of a typical paper machine has 40–80 cylinders, each 1.5 m diameter, heated internally by steam at 3–6 bar (130–160°C). The paper web snakes over and under alternate cylinders, held in contact by dryer felts. Water evaporates progressively. The section consumes 60–70% of total mill energy. Controlled drying profiles prevent warping, curl, and moisture streaks.',
      },
      {
        name: 'Size Press',
        slug: 'size-press',
        description:
          'Applies a surface layer of starch or other sizing agent by flooding the nip between two rolls.',
        detail:
          'Located midway through the dryer section (after ~70% drying), the conventional size press impregnates the sheet surface with a starch solution at the flooded nip between two rolls. This closes the surface, reduces porosity, improves ink hold-out, and dramatically increases surface and internal bond strength. The flooded nip design has largely been replaced by the film press on modern machines.',
      },
      {
        name: 'Film Press',
        slug: 'film-press',
        description:
          'Metered size press that applies a precisely controlled film of starch or functional coatings — no flooded nip.',
        detail:
          'Film press technology (e.g., Opticoat Rod, SymSizer) uses metering rods or blades to pre-apply a controlled film of coating/starch to the roll surface before contact with the web. This eliminates the uncontrolled penetration of the flooded size press, allowing higher solids, heavier coat weights, and functional coatings (barrier, pigmented pre-coat). Now standard on all modern fine paper and board machines.',
      },
      {
        name: 'Blade Coater',
        slug: 'blade-coater',
        description:
          'Applies a mineral coating (clay, calcium carbonate) to the paper surface for print quality.',
        detail:
          'Coating is applied as a slurry (60–70% solids) onto the moving web and levelled to a precise weight by a flexible steel blade. The blade presses excess coating back, leaving a perfectly smooth metered layer. Multiple coating stations apply 10–30 g/m² per side. Coating must be dried immediately after application by infrared heaters and air flotation dryers.',
      },
      {
        name: 'Curtain Coater',
        slug: 'curtain-coater',
        description:
          'Applies coating as a free-falling curtain without any contact between the applicator and the web.',
        detail:
          'The curtain coater extrudes coating liquid through a slot die to form a continuous thin curtain falling onto the moving paper web below. Key advantages: contactless application prevents surface damage; multiple layers can be applied simultaneously (multilayer curtain die); excellent coat weight uniformity at high speeds. Increasingly used for premium coated papers, specialty packaging, and functional coatings where blade contact is undesirable.',
      },
      {
        name: 'Soft Calender',
        slug: 'soft-calender',
        description:
          'Two-nip calender using one hard and one soft roll for gloss and smoothness without severe caliper loss.',
        detail:
          'The soft calender uses an elastic polymer-covered roll against a heated hard steel roll. The soft roll conforms to the paper surface, polishing and smoothing without the aggressive caliper reduction of a hard-nip calender stack. Typically placed inline after coating. Achieves Parker Print Surf (PPS) smoothness of 0.8–1.5 μm and gloss of 65–80% for quality coated grades without the energy and caliper penalty of supercalendering.',
      },
      {
        name: 'Machine Calender',
        slug: 'machine-calender',
        description:
          'A stack of heavy rolls at the end of the paper machine that compresses the sheet for smoothness and caliper uniformity.',
        detail:
          'The inline machine calender is the last process before reeling. Hard steel rolls compress the sheet under high load (100–400 kN/m), reducing caliper variation and improving surface smoothness. Critical for gravure and offset grades requiring tight caliper tolerance. Steam shower before the calender nip softens lignin and improves gloss response.',
      },
      {
        name: 'Supercalender',
        slug: 'supercalender',
        description:
          'Offline calendering with alternating steel and fibrous rolls to achieve maximum gloss without coating.',
        detail:
          'The supercalender operates offline, processing parent reels. A stack of 8–16 alternating steel and cotton/synthetic-filled rolls applies combined heat, moisture, and pressure. The alternating roll types create a polishing effect. SC-A paper achieves 50–60 PPS smoothness — approaching coated paper quality — from an uncoated base.',
      },
    ],
  },
  {
    title: 'Reeling & Converting',
    description:
      'Finished paper is wound into jumbo reels, then converted to customer reel sizes and sheet formats.',
    machines: [
      {
        name: 'Pope Reel',
        slug: 'pope-reel',
        description:
          'Winds the continuous paper web from the machine into a large jumbo parent reel.',
        detail:
          'The pope reel (drum reel) is the final machine on the paper machine line. A spool is pressed against a driven drum by the web tension. As the reel builds in diameter, the spool moves outward on rails. When full (3–4 m diameter, 30–100 tonnes), the reel is automatically transferred to storage. The reel change sequence must be seamless to avoid web breaks and waste.',
      },
      {
        name: 'Simplex Winder',
        slug: 'simplex-winder',
        description:
          'Single-position winder that slits and rewinds one set of finished reels from a parent reel at a time.',
        detail:
          'The simplex winder is the most basic winding configuration: one set of customer reels builds on a single rewinding station. When the reels are full, the machine stops, the set is removed, and a new set starts. Simple to operate and maintain; low initial cost; best for lower volume operations or specialty grades requiring frequent width changes. Limited productivity compared to duplex or triplex configurations.',
      },
      {
        name: 'Duplex Winder',
        slug: 'duplex-winder',
        description:
          'Two rewinding positions operate alternately so one set winds while the other is removed — near-continuous operation.',
        detail:
          'The duplex winder has two rewinding stations side by side. While one set of finished reels is being removed and the core set up, the other station is already winding. This minimises downtime between sets and dramatically improves productivity. Most common configuration in medium-to-large paper mills. The parent reel can continue unwinding during the changeover, though at reduced speed.',
      },
      {
        name: 'Triplex Winder',
        slug: 'triplex-winder',
        description:
          'Three simultaneous rewinding positions for maximum throughput on high-speed machines.',
        detail:
          'The triplex winder runs three rewinding stations simultaneously, staggering the set changes so one station is always finishing, one is in mid-wind, and one is just starting. Highest productivity winding configuration; suited to very high-speed machines producing large volumes of standard widths. Complex to operate and requires careful scheduling. Used in newsprint, tissue, and high-volume commodity paper mills.',
      },
      {
        name: 'Slitter-Rewinder',
        slug: 'slitter-rewinder',
        description:
          'Converts wide parent reels into narrower customer reels by slitting and rewinding simultaneously.',
        detail:
          'The winder unwinds the parent reel through circular slitting knives positioned at programmed widths (the deckle plan). Multiple finished reels are built simultaneously on the rewinding section. The combination of web tension, hardness profile, and density control determines roll quality. Trim waste (typically 0.5–2%) is minimised by the deckle optimisation system.',
      },
      {
        name: 'Salvage Cutter',
        slug: 'salvage-cutter',
        description:
          'Removes damaged outer layers or defective ends from paper reels to recover usable stock.',
        detail:
          'When a paper reel has a damaged surface, wet end, or contaminated outer layers, the salvage cutter trims these away to expose clean paper underneath. A traversing blade or cutting head removes the spoiled layers in controlled passes. Salvaged reels are re-wound or sent directly to converting. Reduces waste significantly — a reel that would otherwise be scrapped can often recover 70–90% of its weight as saleable paper.',
      },
      {
        name: 'Sheet Cutter',
        slug: 'sheet-cutter',
        description:
          'Cuts paper reels into precisely sized sheets for ream and carton packing.',
        detail:
          'High-speed sheeters unwind reels and cut them cross-direction using a rotating cutter blade at speeds up to 600 m/min. Multiple reels can feed in parallel for productivity. The cut sheets are counted, jogged to align edges, and delivered to the packing line as reams (typically 500 sheets). Precision cutting and squareness (within ±0.5 mm) is critical for copier and digital printing grades.',
      },
      {
        name: 'Guillotine Cutter',
        slug: 'guillotine-cutter',
        description:
          'Trims stacked sheets to precise final dimensions using a hydraulic drop blade.',
        detail:
          'The guillotine (programmatic cutter) is a three-knife or single-knife machine that trims pre-cut sheet stacks to exact finished size. Stacks of 100–500 sheets are clamped by a beam and cut by a descending blade at high pressure. Three-knife trimmers cut three sides simultaneously for maximum productivity. Essential for cut-size (A4/Letter) reams and specialty sheet products requiring exact trimmed dimensions.',
      },
      {
        name: 'Core Cutter',
        slug: 'core-cutter',
        description:
          'Cuts standard long cardboard cores into precise lengths for use as paper winding mandrels.',
        detail:
          'All paper rolls are wound on cardboard cores of specific inner diameter (typically 76 mm, 152 mm, or 300 mm). The core cutter receives standard-length tubes from the core manufacturer and saws them to the exact ordered width using a saw blade or rotary cutter. Core length must match the ordered reel width precisely; errors cause reel tracking problems and customer complaints.',
      },
      {
        name: 'Roll Wrapper',
        slug: 'roll-wrapper',
        description:
          'Automatically applies protective kraft wrapping and end caps to finished paper rolls for shipment.',
        detail:
          'The roll wrapper (reel wrapper) applies a helical spiral wrap of kraft paper around the roll circumference, plus circular end boards and metallic end caps. Modern automatic wrappers run at 15–25 rolls/hour and can handle reels from 500 mm to 3000 mm in diameter. Proper wrapping protects against moisture, handling damage, and edge crushing during transport. Labelling and barcoding are typically integrated.',
      },
    ],
  },
  {
    title: 'Chemical Recovery (Kraft)',
    description:
      'Spent cooking chemicals are recovered and regenerated in a closed-loop process, also generating steam and power.',
    machines: [
      {
        name: 'Black Liquor Evaporators',
        slug: 'black-liquor-evaporators',
        description:
          'Concentrates weak black liquor from ~15% to 65–75% solids before burning in the recovery boiler.',
        detail:
          'Weak black liquor leaving the brown stock washers is too dilute to burn economically (~15% solids). Multiple-effect evaporators use steam from each stage to heat the next, achieving high thermal efficiency while evaporating enormous quantities of water. Modern mills use 6–7-effect evaporators plus a concentrator to reach 75–80% solids. High solids are essential for stable combustion in the recovery boiler and maximum energy recovery.',
      },
      {
        name: 'Recovery Boiler',
        slug: 'recovery-boiler',
        description:
          'Burns concentrated black liquor to recover cooking chemicals and generate steam and power.',
        detail:
          'The recovery boiler is unique to kraft mills and drives their economics. Black liquor (65–75% solids) is burned in a specially designed boiler. The organic content generates steam for the mill; the inorganic sodium and sulfur compounds form a smelt at the base, which is dissolved and causticised back to white liquor. A modern recovery boiler generates 1–2 MW of electricity per tonne of pulp.',
      },
      {
        name: 'Causticizer',
        slug: 'causticizer',
        description:
          'Reacts quicklime with green liquor to regenerate white cooking liquor (NaOH + Na₂S).',
        detail:
          'Green liquor (smelt dissolved in water) contains sodium carbonate and sodium sulphide. The causticizer adds quicklime (CaO), which reacts with sodium carbonate to form sodium hydroxide and calcium carbonate (lime mud): Na₂CO₃ + CaO + H₂O → 2NaOH + CaCO₃. The resulting white liquor (NaOH + Na₂S) is the active cooking chemical. Lime mud is washed and sent to the lime kiln for regeneration.',
      },
      {
        name: 'Lime Kiln',
        slug: 'lime-kiln',
        description:
          'Calcines lime mud (CaCO₃) back to quicklime (CaO) at high temperature for re-use in causticizing.',
        detail:
          'The lime kiln is a long rotating horizontal cylinder (60–120 m) operating at 1000–1100°C. Lime mud fed at the cold end moves toward the firing end where natural gas or oil (or bio-fuel) flames calcine it: CaCO₃ → CaO + CO₂. The recovered quicklime returns to the causticizer. The lime cycle reduces make-up lime consumption and operating costs. Kiln efficiency and lime quality directly affect white liquor strength and pulping performance.',
      },
    ],
  },
];

export default function PaperMillMachinesPage() {
  const totalMachines = categories.reduce((s, c) => s + c.machines.length, 0);

  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Reference
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl">
            Paper Mill Machines
          </h1>
          <p className="text-text-2 leading-relaxed max-w-xl">
            Complete visual guide to every major machine in a modern paper mill — from wood yard
            through pulping, stock preparation, forming, drying, coating, converting, and chemical
            recovery. Essential reference for mill managers, engineers, and procurement teams.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-xs text-text-3">
            <span>{totalMachines} machines &middot; {categories.length} process stages</span>
            <span className="text-border">|</span>
            <Link href="/glossary" className="hover:text-amber-400 transition-colors">
              Paper Industry Glossary &rarr;
            </Link>
            <Link href="/paper-grades" className="hover:text-amber-400 transition-colors">
              Paper Grade Guide &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Process Stage Nav */}
      <div className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {categories.map((cat, i) => (
              <a
                key={cat.title}
                href={`#stage-${i}`}
                className="px-3 h-8 flex items-center rounded text-xs font-medium text-text-3 hover:text-amber-400 hover:bg-surface-2 transition-colors whitespace-nowrap"
              >
                {i + 1}. {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-20">
          {categories.map((cat, catIndex) => (
            <section key={cat.title} id={`stage-${catIndex}`} className="scroll-mt-16">
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="shrink-0 w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-amber-400">{catIndex + 1}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{cat.title}</h2>
                  <p className="text-sm text-text-2 mt-1 max-w-2xl">{cat.description}</p>
                </div>
              </div>

              {/* Machine Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.machines.map((machine) => (
                  <div
                    key={machine.slug}
                    className="rounded-xl border border-border bg-surface-2 overflow-hidden hover:border-amber-500/30 transition-colors duration-200 group"
                  >
                    {/* Machine Image */}
                    <div className="relative w-full aspect-[4/3] bg-surface overflow-hidden">
                      <Image
                        src={`/images/machines/${machine.slug}.png`}
                        alt={`${machine.name} — paper mill equipment`}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-black/60 text-amber-400 backdrop-blur-sm">
                          {cat.title}
                        </span>
                      </div>
                    </div>

                    {/* Machine Info */}
                    <div className="px-5 py-4">
                      <h3 className="font-semibold text-foreground mb-1.5 text-base">
                        {machine.name}
                      </h3>
                      <p className="text-sm text-text-2 leading-relaxed mb-3">
                        {machine.description}
                      </p>
                      <details className="group/detail">
                        <summary className="text-xs text-amber-400 cursor-pointer hover:text-amber-300 transition-colors list-none flex items-center gap-1 select-none">
                          <span>How it works</span>
                          <svg
                            className="w-3 h-3 transition-transform group-open/detail:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="mt-3 text-xs text-text-3 leading-relaxed border-t border-border pt-3">
                          {machine.detail}
                        </p>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20 rounded-xl border border-border bg-surface-2 p-6">
          <h2 className="text-lg font-semibold mb-3">End-to-End Paper Mill Process Flow</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-2">
            {[
              'Logs',
              'Chipper',
              'Digester',
              'Brown Stock Washer',
              'Bleaching',
              'Pulper',
              'Refiner',
              'Screen',
              'Headbox',
              'Forming',
              'Press',
              'Dryers',
              'Coater',
              'Calender',
              'Pope Reel',
              'Winder',
              'Customer',
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span
                  className={
                    i === 0 || i === arr.length - 1
                      ? 'font-semibold text-amber-400'
                      : 'text-text-2'
                  }
                >
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <svg
                    className="w-3 h-3 text-border shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a href="#" className="text-xs text-text-3 hover:text-amber-400 transition-colors">
            Back to top &uarr;
          </a>
        </div>
      </main>

      <CTABanner
        eyebrow="Need help optimising your mill?"
        title={
          <>
            35 years of paper mill
            <br />
            expertise, on demand.
          </>
        }
        subtitle="From headbox to winder — our team has worked with every machine type in this guide."
        primaryLabel="Talk to an Expert"
        primaryHref="/contact"
      />
    </>
  );
}
