import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import { CTABanner } from '@/components/sections/cta-banner';

export const metadata: Metadata = {
  title: 'FAQ — Paper Industry, ERP & Services | Papyrus360',
  description:
    'Answers to frequently asked questions about Papyrus360, BP App ERP, Optrim deckle optimisation, raw material sourcing, and paper industry terminology. 24+ years serving Indian paper mills.',
};

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  id: string;
  label: string;
  items: FaqItem[];
};

const FAQ_DATA: FaqCategory[] = [
  {
    id: 'about',
    label: 'About Papyrus360',
    items: [
      {
        question: 'What is Papyrus360? Who is behind it?',
        answer:
          'Papyrus360 is a paper-industry-focused software and consultancy brand delivering ERP systems, deckle optimisation tools, and raw material sourcing services exclusively to the pulp and paper sector. It is the flagship brand of Netique Infotech Pvt Ltd., founded in 2002 and headquartered in Bangalore, India. The company was founded and continues to be led by paper industry veterans with over 35 years of domain experience in mill operations, process management, and compliance.',
      },
      {
        question: 'How long have you been in the paper industry?',
        answer:
          'Netique Infotech Pvt Ltd. was established in 2002, giving us more than 24 years of uninterrupted focus on paper industry software and consultancy. Our founding team brings an additional decade-plus of hands-on mill experience, meaning the domain knowledge embedded in our products reflects real-world papermaking — not generic software adapted for the sector. We have supported mills through multiple regulatory transitions including the shift to GST in 2017 and the growth of recycled fibre grades.',
      },
      {
        question: 'Which regions and geographies do you serve?',
        answer:
          'Our primary market is India, where we serve mills across all major papermaking clusters — Gujarat, Maharashtra, Rajasthan, Punjab, Uttar Pradesh, Tamil Nadu, Andhra Pradesh, West Bengal, and Odisha. We also work with mills in the Gulf region. For raw material imports, we source from the USA, Europe, and the Middle East, coordinating logistics and customs clearance for Indian buyers.',
      },
      {
        question: 'Do you work with small mills or only large integrated mills?',
        answer:
          'We serve the full spectrum — from small recycled-fibre mills running a single 50 TPD machine to large integrated operations with multiple machines and captive pulping. BP App is modular, so a smaller mill can start with core finance and production modules and expand over time. Optrim and Optrim Web are equally useful for small mills where every tonne of trim waste directly impacts margins. We have successfully deployed at mills producing as little as 20 TPD.',
      },
      {
        question: 'What is the difference between Papyrus360 and Netique Infotech?',
        answer:
          'Netique Infotech Pvt Ltd. is the registered legal entity — incorporated in 2002 under the Companies Act, based in Bangalore. Papyrus360 is its customer-facing brand identity, used to represent the company\'s complete portfolio of software products, consultancy services, and raw material trading. When you engage with Papyrus360 for software licensing, implementation, or raw material supply, you are contracting with Netique Infotech Pvt Ltd.',
      },
    ],
  },
  {
    id: 'industry',
    label: 'Paper Industry Basics',
    items: [
      {
        question: 'What is GSM and how is it measured?',
        answer:
          'GSM stands for Grams per Square Metre and is the universal metric unit for expressing paper weight (grammage). It tells you how much one square metre of the paper weighs in grams. It is measured by cutting a sample of known dimensions, weighing it on a precision balance, and calculating the result per ISO 536 (or IS 1397 in India). GSM is now the standard in all international paper trade and replaces the older basis weight system used historically in the USA.',
      },
      {
        question: 'What is the difference between basis weight and GSM?',
        answer:
          'Both measure how heavy a paper is, but they use different reference systems. GSM (grammage) is the weight of one square metre of paper in grams — it is absolute and universal. Basis weight is the weight in pounds of 500 sheets at a grade-specific standard sheet size (e.g., 17×22 inches for Bond, 25×38 inches for Text/Book). Because the reference sheet size changes by grade, you cannot compare basis weights across different paper grades without a conversion factor. In Indian paper trade, GSM is the standard.',
      },
      {
        question: 'What is deckle, and why does deckle optimisation matter?',
        answer:
          'Deckle originally referred to the wooden frame that limited the sheet width in handmade papermaking. In a modern paper mill, it refers to the reel or machine width and, crucially, the cutting plan used to produce saleable reels and sheets from a parent reel. Deckle optimisation is the process of mathematically finding the best combination of slit widths and positions that minimises trim waste (offcuts) while fulfilling the order book. Even a 1–2% reduction in trim waste can translate to significant annual savings for a mid-sized mill. Papyrus360\'s Optrim software is purpose-built for this calculation.',
      },
      {
        question: 'What is OCC and why is it important for Indian paper mills?',
        answer:
          'OCC stands for Old Corrugated Containers — recovered corrugated cardboard boxes, the most widely traded wastepaper grade globally. In India, OCC is the primary raw material for kraft, linerboard, and grey board mills that rely on recycled fibre rather than virgin pulp. Domestic OCC availability is growing but often insufficient for mill capacity, making imports from the USA, Europe, and the Middle East essential. Papyrus360 assists mills with OCC and related wastepaper grade imports, including logistics, customs clearance, and FEMA compliance.',
      },
      {
        question: 'What is the standard moisture content for paper trading in India?',
        answer:
          'The standard equilibrium moisture content for paper in India is typically 5–7% by weight, conditioned at 65% relative humidity and 27°C as per IS 1060 / ISO 187 conditioning standards. For trade purposes, paper is commonly invoiced at a declared moisture content (often 5–7%), and significant deviations can be the basis for weight claims. Mills producing in a tropical climate must manage moisture carefully during storage and dispatch, especially during monsoon months.',
      },
      {
        question: 'What is the difference between mechanical pulp and chemical pulp?',
        answer:
          'Mechanical pulp is produced by grinding or refining wood mechanically, retaining most of the lignin and yielding 90–95% of the original wood — high yield but the lignin causes yellowing over time. Chemical pulp (primarily kraft or sulphite) uses chemicals at high temperature to dissolve and remove lignin, leaving only cellulose fibres. Chemical pulp yields 40–50% of the original wood but produces much stronger, brighter, and more permanent paper. Indian mills predominantly use chemical pulp (kraft) or recycled fibre rather than mechanical pulp.',
      },
      {
        question: 'What does UWF mean?',
        answer:
          'UWF stands for Uncoated Woodfree — a major category of printing and writing paper made from chemical (woodfree) pulp without any mineral coating. "Woodfree" means the pulp is free of lignin (i.e., chemically pulped), not that no wood was used. UWF grades include copy paper, offset printing paper, and premium writing papers. They offer excellent dimensional stability, good printability, and permanence. UWF is the largest segment of the Indian writing and printing paper market.',
      },
    ],
  },
  {
    id: 'products',
    label: 'Products & Software',
    items: [
      {
        question: 'What is Papyrus BP App and who is it for?',
        answer:
          'Papyrus BP App (Business Process Application) is Papyrus360\'s flagship cloud ERP system, built specifically for paper mills and board mills. It covers the full mill lifecycle — from raw material procurement through production, quality control, finished goods inventory, sales, logistics, and finance. BP App is designed for Indian paper mills of all sizes: small recycled-fibre mills, integrated kraft mills, board mills, and converting units. Unlike generic ERPs, every module reflects paper industry workflows, terminology, and compliance requirements out of the box.',
      },
      {
        question: 'What modules does Papyrus BP App cover?',
        answer:
          'Papyrus BP App comprises 44 integrated modules spanning every function of a paper mill. Key areas include: Raw Material Management (procurement, waste paper grading, pulp inventory), Production Planning and Process Control, Quality Management (lab results, ISO tracking), Finished Goods and Warehouse Management, Sales Order and Dispatch Management, Finance and Accounts (GL, AP, AR), GST, TDS, PF and ESI compliance, HR and Payroll, Maintenance Management, and Management Information System (MIS) dashboards. Because all modules share a single data model, there is no re-entry of data across departments.',
      },
      {
        question: 'What is Optrim / Optrim Web?',
        answer:
          'Optrim is Papyrus360\'s deckle optimisation software that calculates the optimal cutting plan for a paper machine reel to minimise trim waste and fulfil the order book efficiently. It has been developed and refined over hundreds of real-world mill deployments. Optrim Web is the browser-based cloud version of the same engine — accessible from any device with a login, requiring no local installation. Both versions allow planners to enter reel widths, order widths, and quantities, and instantly receive the optimised cut plan.',
      },
      {
        question: 'Can Optrim be used as a standalone tool without BP App ERP?',
        answer:
          'Yes. Optrim and Optrim Web are fully standalone products. Many mills use Optrim independently of BP App, integrating the cut plans manually or through their existing ERP. If you already have an ERP in place and only need deckle optimisation, you can subscribe to Optrim Web without purchasing BP App. Conversely, BP App users benefit from tighter integration where production orders automatically feed into Optrim for planning.',
      },
      {
        question: 'How quickly can Optrim be deployed?',
        answer:
          'Optrim Web can typically be onboarded within one to two working days — it requires only a browser and user credentials. The initial setup involves entering your machine widths and standard product configurations, which our team guides you through. On-premise Optrim installations require a brief site visit or remote session for installation and configuration. Most mills are using Optrim productively within a week of engagement.',
      },
      {
        question: 'Do your products work on mobile devices?',
        answer:
          'Optrim Web is fully browser-based and works on tablets and smartphones, making it convenient for production planners on the shop floor. BP App is a web application accessible from any modern browser, including mobile browsers, though the desktop experience is optimised for operational workflows. Key dashboards and approval workflows in BP App are designed to be accessible on tablets for supervisors and managers who need real-time visibility without being at a desk.',
      },
      {
        question: 'Do you offer a free trial or demo?',
        answer:
          'Yes. We offer product demonstrations for both BP App and Optrim Web. For BP App, we conduct a structured demo session (in-person or video call) tailored to your mill type and the modules most relevant to your operation — this typically takes 60–90 minutes. For Optrim Web, we can provide a short-duration trial login so your planning team can evaluate it with real order data. Contact us via the website to schedule a demo at a time that suits you.',
      },
    ],
  },
  {
    id: 'rawmaterials',
    label: 'Raw Material & Sourcing',
    items: [
      {
        question: 'Do you supply OCC and waste paper directly to mills?',
        answer:
          'Yes. Papyrus360 (Netique Infotech Pvt Ltd.) acts as an importer and trading intermediary for waste paper and raw material sourcing. We have established relationships with suppliers in the USA, Europe, and the Middle East, and we facilitate end-to-end import transactions — from grade selection and pricing through shipping, customs clearance, and delivery to the mill gate. This is a distinct service line from our software business, and we serve both existing software clients and mills that engage us purely for raw material sourcing.',
      },
      {
        question: 'Which waste paper grades do you import?',
        answer:
          'Our primary import grade is OCC (Old Corrugated Containers), which is in high demand among Indian kraft and board mills. We also source ONP (Old Newsprint), Mixed Paper, and other recovered fibre grades depending on mill requirements and market availability. We work with clients to identify the most cost-effective grade mix for their furnish specification, taking into account contamination limits, moisture, and seasonal availability from source regions.',
      },
      {
        question: 'From which countries do you source raw materials?',
        answer:
          'We source primarily from the United States of America, Western Europe (including the UK, Germany, and the Netherlands), and the Middle East. The USA is a major supplier of OCC and ONP given high recovery rates and established export infrastructure. European grades tend to be cleaner and command a premium. Middle Eastern sources offer proximity advantages for certain Indian ports. We select the sourcing geography based on current pricing, shipping lead times, and mill-specific quality requirements.',
      },
      {
        question: 'Do you handle customs clearance and FEMA compliance?',
        answer:
          'We assist mills through the import process, including documentation for customs clearance and ensuring transactions are structured in compliance with FEMA (Foreign Exchange Management Act) regulations. Import of waste paper into India requires adherence to the Hazardous and Other Wastes (Management and Transboundary Movement) Rules as amended, and we help clients navigate the applicable permissions and documentation. We work with licensed customs brokers and ensure all required certifications are in order before shipment.',
      },
      {
        question: 'Can small-volume buyers also enquire about raw material?',
        answer:
          'Yes. While large-volume transactions are most economical for imports, we do work with smaller mills and are happy to discuss requirements of any scale. For smaller volumes, we sometimes facilitate consolidated shipments or connect buyers to domestic trading options. We encourage any mill facing raw material availability or cost challenges to contact us — even if your volume is modest, we can advise on sourcing strategy and market conditions.',
      },
    ],
  },
  {
    id: 'implementation',
    label: 'Implementation & Support',
    items: [
      {
        question: 'How long does a BP App ERP implementation take?',
        answer:
          'A typical BP App implementation for a mid-sized paper mill takes 3 to 6 months from kick-off to go-live, depending on the number of modules deployed, the complexity of existing processes, and the readiness of the mill\'s master data. A phased approach is common — core finance and production modules go live first, followed by quality, HR, and advanced MIS modules in subsequent phases. We assign a dedicated implementation consultant who works closely with your team throughout the process.',
      },
      {
        question: 'Do you provide on-site support or only remote support?',
        answer:
          'We provide both on-site and remote support. During implementation, on-site visits are scheduled at key milestones such as kick-off, user acceptance testing, and go-live. Post go-live, most day-to-day support is handled remotely via phone, email, and remote desktop tools, which allows us to resolve issues quickly without travel delays. For critical issues or major upgrades, we can arrange on-site visits. Being a Bangalore-based company, we can reach most major mill locations in India within a working day.',
      },
      {
        question: 'What happens after go-live — is there ongoing support?',
        answer:
          'Yes. All BP App clients are covered under an Annual Maintenance Contract (AMC) that includes bug fixes, regulatory updates (GST rate changes, TDS rule updates, etc.), and helpdesk support. We proactively release updates to keep BP App compliant as regulations evolve. Clients can log support requests via phone or email, and our team provides response within agreed SLA windows. We also conduct periodic review calls with larger clients to ensure the system continues to meet their operational needs.',
      },
      {
        question: 'Is BP App compliant with GST, TDS, PF, and ESI requirements?',
        answer:
          'Yes. GST compliance is a core part of BP App — the system handles CGST, SGST, IGST, input tax credit, reverse charge, and e-invoicing as required by the GST Network. TDS deduction, TCS collection, and Form 26Q / 27Q filing support are built in. PF and ESI calculations follow the current statutory rates and wage definitions, with challan generation and returns handled within the HR and Payroll module. Papyrus360 maintains these modules actively and releases updates whenever statutory requirements change.',
      },
      {
        question: 'Can BP App integrate with existing weighbridge or lab systems?',
        answer:
          'Yes. BP App includes integration interfaces for weighbridge data capture, which is essential for raw material receipt and finished goods dispatch in paper mills. Most modern weighbridge controllers support serial or network data output, and we can configure BP App to receive and validate weighbridge readings directly, eliminating manual entry and reducing disputes. For laboratory information systems (LIMS), we support data import from standard formats and have integrated with several third-party lab instruments used in Indian paper mills.',
      },
      {
        question: 'How is data security handled — is it cloud or on-premise?',
        answer:
          'BP App is available in both cloud-hosted and on-premise configurations. The cloud deployment is hosted on secure infrastructure with regular backups, access control, and encrypted data transmission over HTTPS. On-premise deployments give mills full control over their data within their own server environment, which some clients prefer for data sovereignty reasons. Access to BP App is role-based — each user sees only the data and functions appropriate to their role — and all user actions are logged for audit purposes.',
      },
    ],
  },
];

const ALL_CATEGORY_ID = 'all';

export default function FaqPage() {
  const totalQuestions = FAQ_DATA.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">FAQ</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Frequently Asked Questions
          </h1>
          <p className="text-text-2 text-base md:text-lg max-w-2xl leading-relaxed">
            Answers to common questions about Papyrus360, our products, raw material services, and
            the paper industry — from a team with 24+ years in the sector.{' '}
            <span className="text-text-3 text-sm">{totalQuestions} questions across {FAQ_DATA.length} categories.</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Category nav */}
        <nav className="mb-12 overflow-x-auto pb-2" aria-label="FAQ categories">
          <div className="flex gap-2 min-w-max">
            <a
              href="#all"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-surface-2 text-sm font-medium hover:border-amber-500/50 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              All
              <span className="text-xs text-text-3 tabular-nums">({totalQuestions})</span>
            </a>
            {FAQ_DATA.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-surface-2 text-sm font-medium hover:border-amber-500/50 hover:text-amber-400 transition-colors whitespace-nowrap"
              >
                {cat.label}
                <span className="text-xs text-text-3 tabular-nums">({cat.items.length})</span>
              </a>
            ))}
          </div>
        </nav>

        {/* FAQ categories */}
        <div id={ALL_CATEGORY_ID} className="space-y-14">
          {FAQ_DATA.map((category) => (
            <section key={category.id} id={category.id}>
              {/* Category header */}
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-border">
                <h2 className="text-xl font-bold tracking-tight">{category.label}</h2>
                <span className="text-xs text-text-3 tabular-nums">
                  {category.items.length} question{category.items.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Accordion items */}
              <div className="space-y-2">
                {category.items.map((item, idx) => (
                  <details
                    key={idx}
                    className="group border border-border rounded-xl bg-surface-2 hover:border-amber-500/30 transition-colors amber-card overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none">
                      <span className="font-medium text-sm md:text-base leading-snug">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-text-3 group-open:rotate-180 transition-transform duration-200"
                        aria-hidden
                      />
                    </summary>
                    <div className="px-5 pb-5 pt-1 border-t border-border/50">
                      <p className="text-text-2 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* CTA */}
      <CTABanner
        eyebrow="Still have questions?"
        title={
          <>
            Talk to a paper
            <br />
            industry expert.
          </>
        }
        subtitle="Our team has been supporting Indian paper mills for over 24 years. Whether your question is about ERP, deckle optimisation, raw material sourcing, or compliance — we are happy to help."
        primaryLabel="Get in Touch"
      />
    </>
  );
}
