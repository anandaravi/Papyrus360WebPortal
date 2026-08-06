export type ProductStatus = 'active' | 'custom' | 'legacy';

export type FeatureGroup = {
  title: string;
  items: string[];
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  category: 'erp' | 'deckle' | 'specialist';
  accent: string;
  externalUrl?: string;
  /** Headline capability chips shown above the feature grid. */
  highlights?: string[];
  /** Grouped capability list rendered on the product detail page. */
  featureGroups?: FeatureGroup[];
};

export const products: Product[] = [
  {
    slug: 'bpapp',
    name: 'Papyrus BP App',
    tagline: 'Enterprise ERP for Paper Manufacturing',
    description:
      'End-to-end ERP across 32 integrated modules — sales & exports, production, deckle optimisation, inventory, procurement, finance, HR & payroll, quality, maintenance, yard, CRM and AI insights. Live machine and warehouse digital twins, and a production workflow that scales from "log today\'s tonnage" to a fully optimised mill.',
    status: 'active',
    category: 'erp',
    accent: '#F59E0B',
    externalUrl: 'https://bpapperp.papyrus360.com',
    highlights: [
      '32 integrated modules',
      'Live digital twins',
      'Scales to your mill maturity',
      'English · Hindi · Tamil',
      'Multi-company & multi-plant',
      'Partner portal for customers & suppliers',
      'Web · mobile · barcode scanner',
      'Guided setup wizard',
    ],
    featureGroups: [
      {
        title: 'Fits Your Mill — Maturity Tiers',
        items: [
          'Planning maturity set per mill: Log-only → Direct WO → Deckle-driven → Plan-driven → Full MRP → Optimised',
          'Process footprint toggled independently: pulping, stock prep, paper machine, coating, finishing, converting, QC',
          'Covers integrated agro/wood, recycled (RCF), non-integrated and job-work converter archetypes',
          'Make-to-order or make-to-stock demand mode; backflush or explicit consumption',
          'Pick a tier at setup and the workflow presets apply — no code fork, no consultant rebuild',
          'Simple mode trims the interface for smaller mills; advanced flags stay available',
        ],
      },
      {
        title: 'Digital Twins & Live Shop Floor',
        items: [
          'Machine twins for paper machines, rewinders, simplex and duplex sheeters, and packaging lines',
          'Section-level schematic view with live parameter readings against target, min and max thresholds',
          'Plant and line overview twins showing the whole run end to end',
          'Warehouse twin with rack elevation, bin occupancy and stock-ageing view',
          'Live streaming over server-sent events — values update without refresh',
          'Built on real production data — machine sections, parameter readings and OEE records',
        ],
      },
      {
        title: 'Production & Quality',
        items: [
          'Production planning, scheduling and grade sequencing',
          'Work orders, shop-floor entry, shift handover and shift reports',
          'Machine master, downtime capture, OEE analytics',
          'Stock preparation, chemical dosing, broke handling, converting',
          'Quality plans, lab test results, CoA generation, SPC and calibration',
          'NCR, CAPA and internal quality audits (ISO 9001, 5S)',
        ],
      },
      {
        title: 'Deckle & Trim Optimisation',
        items: [
          'Cutting-stock solver with multi-pattern generation',
          'Multi-machine balancing and side-by-side plan comparison',
          'Grade substitution, customer tolerance and position constraints',
          'Reel picking, knife sequencing, supervisor packet PDFs',
          'Plan-vs-actual tracking, goal presets and explainability',
        ],
      },
      {
        title: 'Sales, Dispatch & Exports',
        items: [
          'Quotation → order → ATP → credit check → dispatch → invoice',
          'Dispatch control tower, load suggestion, delivery challan',
          'e-Invoice (IRN via GSP) and e-Way Bill generate / cancel / extend',
          'Exports: packing list, bill of entry, eBRC, ECGC, duty drawback, FTA',
          'Pricing, discounts, free goods, commission, dunning and collections',
        ],
      },
      {
        title: 'Inventory & Warehouse',
        items: [
          'Multi-warehouse with bin locations, putaway, picking and reservations',
          'Reel-level tracking, batch/lot, serial numbers and genealogy',
          'GRN with inspection, material issue/return, stock transfers',
          'Physical verification, stock ledger, valuation and recall',
        ],
      },
      {
        title: 'Procurement',
        items: [
          'PR → quotation scoring → PO → amendment → GRN → three-way match',
          'MRP-driven auto requisitions, budget commitment and contracts',
          'GSTR-2B reconciliation, ITC eligibility and reversal, reverse charge',
          'MSME payment tracking, advance payments, import cost sheets',
          'Vendor scorecards, chemical SDS and quality certificates',
        ],
      },
      {
        title: 'Finance & Indian Compliance',
        items: [
          'GL, AP/AR, banking, cost & profit centres, fixed assets and CWIP',
          'GSTR-1, GSTR-3B, ITC ledger, TCS and TDS (24Q / 26Q / 27EQ)',
          'FEMA compliance, forex revaluation, LC and trade finance',
          'Product costing, budgets, cash forecast, financial statements',
          'Tally sync with reconciliation and variance resolution',
        ],
      },
      {
        title: 'HR & Payroll',
        items: [
          'Employee master, onboarding, documents, skills and work history',
          'Biometric attendance devices, shifts, overtime and leave policies',
          'Payroll runs, arrears, loans, full & final settlement, bank advice',
          'PF ECR, ESI, PT, LWF, Form 16 and investment declarations',
          'Recruitment: requisition → interview → offer → onboarding → background verification',
          'Contract labour with contractor compliance, forms and invoicing',
          'Appraisals, competency, grievance, disciplinary, ESS and MSS portals',
        ],
      },
      {
        title: 'Maintenance & Yard',
        items: [
          'Preventive plans, breakdown work orders, checklists, failure codes',
          'Asset register, functional locations and service contracts',
          'Gate movement, weighbridge, weight reconciliation and detention',
          'Yard zones and slots, call-forward, visitor appointments',
        ],
      },
      {
        title: 'AI & Analytics',
        items: [
          'Natural-language query across ERP data',
          'Demand forecasting, cash-flow and payment prediction, credit risk',
          'Bottleneck detection, dead-stock analysis and reorder optimisation',
          'Invoice anomaly detection, supplier scoring, churn prediction',
          'Document intelligence and in-form assistance',
        ],
      },
      {
        title: 'Platform & Collaboration',
        items: [
          'Role-based access control with effective-permission matrix',
          'Approval workflows with delegation and SLA escalation',
          'Report builder — pivots, charts, scheduling, subscriptions, exports',
          'Email Hub — IMAP/Outlook, classification, order-draft generation, support tickets',
          'CRM — leads, opportunities, campaigns, customer 360 and forecasting',
          'Mobile app for approvals, attendance and notifications; barcode scanning for GRN, stock and work orders',
        ],
      },
      {
        title: 'Partner Portal',
        items: [
          'Separate branded login for your customers and suppliers — no ERP seat required',
          'Customers: order status, dispatch tracking, invoices, ledger, CoA download, complaints',
          'Suppliers: purchase orders, GRN visibility, invoice submission and payment status',
          'Shared document library and support requests, scoped per party',
          'Partner team management with per-user access',
        ],
      },
      {
        title: 'Onboarding & Configuration',
        items: [
          'Guided setup wizard — company, sites, fiscal year, modules, users, machines, grades, products, parties',
          'Opening stock and opening financials captured in the same flow',
          'Template packs pre-seed a mill by type; picker filters products and OEM machine specs to match',
          'Bulk CSV upload with validation; autosave, resume and extend-later support',
          'Business profile switch (paper mill / trader / both) turns whole feature sets on or off',
          'Per-company configuration store with global fallback — no hardcoded behaviour',
        ],
      },
      {
        title: 'Automation Hub & Device Registry',
        items: [
          'Gateway, device, channel and metric-map registry for shop-floor instrumentation',
          'Protocol support declared per device: Modbus RTU/TCP, OPC-UA, BACnet, MQTT, SNMP, analog, REST',
          'Metric mapping with aggregation modes — last, average, min, max, sum, delta, counter',
          'Device lifecycle states (active / maintenance / offline) with health visibility',
          'Designed to feed the digital twins as telemetry ingestion phases in',
        ],
      },
      {
        title: 'Help, Docs & Adoption',
        items: [
          'Context-sensitive in-app help — press F1 on any screen',
          'Guided tours with progress tracking, plus an AI help assistant over your published content',
          'Error messages link straight to the matching documentation page',
          'Full documentation portal in English, Hindi and Tamil',
          'Company-specific help content overrides the shipped defaults',
        ],
      },
    ],
  },
  {
    slug: 'optrim',
    name: 'Optrim',
    tagline: 'Desktop Deckle Matching Software',
    description:
      'Standalone desktop application for deckle matching and trim optimisation. Minimises paper waste with proprietary optimisation engine.',
    status: 'active',
    category: 'deckle',
    accent: '#3B82F6',
  },
  {
    slug: 'optrim-web',
    name: 'Optrim Web',
    tagline: 'Web-Based Deckle Matching',
    description:
      'Browser-based deckle matching — same optimisation engine as Optrim, accessible from any device without installation.',
    status: 'active',
    category: 'deckle',
    accent: '#6366F1',
  },
  {
    slug: 'papy-erp',
    name: 'Papy ERP',
    tagline: 'Custom Order & Production Management',
    description:
      'Tailored ERP covering order management and production management for paper manufacturers. Custom engagement.',
    status: 'custom',
    category: 'erp',
    accent: '#10B981',
  },
  {
    slug: 'pdn',
    name: 'PDN Process App',
    tagline: 'Conversion Handling App',
    description:
      'Purpose-built application for paper conversion process management. Delivered as a custom engagement for specific operational needs.',
    status: 'custom',
    category: 'specialist',
    accent: '#F97316',
  },
  {
    slug: 'paper-agent',
    name: 'Paper Agent',
    tagline: 'Paper Dealer & Trader Management',
    description:
      'Desktop software for paper dealers and traders — order tracking, inventory, and customer management.',
    status: 'legacy',
    category: 'specialist',
    accent: '#78716C',
  },
  {
    slug: 'ndm',
    name: 'NDM',
    tagline: 'Netique Deckle Matcher',
    description: 'Original desktop deckle matching software. Predecessor to Optrim.',
    status: 'legacy',
    category: 'deckle',
    accent: '#78716C',
  },
];
