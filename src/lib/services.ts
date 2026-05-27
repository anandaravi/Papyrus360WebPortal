export type ServiceCategory = 'software' | 'consultancy';

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  points: string[];
  category: ServiceCategory;
};

export const services: Service[] = [

  // ─── SOFTWARE SERVICES ────────────────────────────────────────────────────

  {
    slug: 'software-implementation',
    name: 'Software Implementation',
    tagline: 'End-to-end deployment of Papyrus360 products',
    description:
      'Full implementation lifecycle for BPApp, Optrim, and other Papyrus360 software — requirements, configuration, data migration, training, and go-live support.',
    icon: 'Settings',
    category: 'software',
    points: [
      'Requirements analysis & scoping',
      'System configuration',
      'Data migration',
      'User training',
      'Go-live support',
      'Post-live stabilisation',
    ],
  },
  {
    slug: 'it-support',
    name: 'IT Support',
    tagline: 'Ongoing technical support for paper mills',
    description:
      'Helpdesk, bug resolution, and day-to-day IT support for paper manufacturing operations — remote and on-site.',
    icon: 'Headphones',
    category: 'software',
    points: [
      'Software helpdesk',
      'Bug resolution & patches',
      'Remote support',
      'On-site visits',
      'SLA-based contracts',
    ],
  },
  {
    slug: 'it-infrastructure',
    name: 'IT Infrastructure',
    tagline: 'Technology backbone for paper mills',
    description:
      'Server setup, cloud migration, network design, and infrastructure management tailored for paper manufacturing environments.',
    icon: 'Server',
    category: 'software',
    points: [
      'Server setup & management',
      'Cloud migration',
      'Network design',
      'IT infrastructure contracts',
      'Backup & disaster recovery',
    ],
  },

  // ─── CONSULTANCY SERVICES ─────────────────────────────────────────────────

  {
    slug: 'process-improvement',
    name: 'Process Improvement',
    tagline: 'Optimise paper mill operations end-to-end',
    description:
      'Workflow analysis and redesign for paper manufacturing — production planning, stock preparation, quality systems, and OEE improvement.',
    icon: 'GitBranch',
    category: 'consultancy',
    points: [
      'Operations audit',
      'Workflow redesign',
      'OEE improvement',
      'KPI framework',
      'Benchmarking against industry standards',
    ],
  },
  {
    slug: 'product-development',
    name: 'Product Development',
    tagline: 'New paper grade & product R&D',
    description:
      'Advisory for new paper grade development, product mix optimisation, and quality benchmarking for paper manufacturers and converters.',
    icon: 'FlaskConical',
    category: 'consultancy',
    points: [
      'New grade development',
      'Product mix optimisation',
      'Quality benchmarking',
      'Market standards alignment',
      'Trial management',
    ],
  },
  {
    slug: 'marketing-campaigns',
    name: 'Marketing & Campaigns',
    tagline: 'Market development for paper industry businesses',
    description:
      'Sales network creation, market development, and campaign management for paper manufacturers, traders, and suppliers.',
    icon: 'Megaphone',
    category: 'consultancy',
    points: [
      'Sales network creation',
      'Market development & survey',
      'Campaign planning',
      'Brand positioning',
      'Industry event support',
    ],
  },
  {
    slug: 'sales-support',
    name: 'Sales Support',
    tagline: 'Commercial advisory for paper businesses',
    description:
      'Sales strategy, customer reach, and commercial development advisory for paper mills, traders, and channel partners.',
    icon: 'TrendingUp',
    category: 'consultancy',
    points: [
      'Sales strategy',
      'Customer identification',
      'Distributor network setup',
      'Pricing advisory',
      'Commercial negotiation support',
    ],
  },
  {
    slug: 'factory-machine-erection',
    name: 'Factory or Machine Erections',
    tagline: 'Greenfield mills & individual machine installation',
    description:
      'End-to-end advisory for greenfield paper mill setup, brownfield expansion, and individual machine erection — from layout planning to commissioning and trial runs.',
    icon: 'Building2',
    category: 'consultancy',
    points: [
      'Greenfield mill setup',
      'Brownfield expansion',
      'Individual machine erection',
      'Site selection & layout',
      'Commissioning & trial runs',
    ],
  },
  {
    slug: 'manpower',
    name: 'Manpower & Staffing',
    tagline: 'Human resource solutions for paper industry',
    description:
      'Recruitment, staffing, and HR advisory for paper mills — from shop floor operators to senior technical and management roles.',
    icon: 'Users',
    category: 'consultancy',
    points: [
      'Skilled operator recruitment',
      'Technical staff sourcing',
      'Senior management placement',
      'HR policy advisory',
      'Training & development',
    ],
  },
  {
    slug: 'management-consulting',
    name: 'Management Consulting',
    tagline: 'Strategic advisory for paper industry leaders',
    description:
      'Business strategy, turnaround advisory, and operational excellence consulting for paper mill owners, management, and boards.',
    icon: 'Briefcase',
    category: 'consultancy',
    points: [
      'Business strategy',
      'Turnaround advisory',
      'Cost reduction programs',
      'Operational excellence',
      'Board-level advisory',
    ],
  },
  {
    slug: 'compliance-consulting',
    name: 'Compliance Consulting',
    tagline: 'GST · TDS · FEMA · PF · ESI',
    description:
      'Regulatory compliance for Indian paper industry — tax structuring, labour law, and FEMA compliance for exporters.',
    icon: 'Shield',
    category: 'consultancy',
    points: [
      'GST structuring & filing',
      'TDS management',
      'FEMA compliance',
      'PF / ESI / PT advisory',
      'Audit readiness',
    ],
  },
  {
    slug: 'procurement',
    name: 'Procurement Advisory',
    tagline: 'Strategic sourcing for paper manufacturers',
    description:
      'Procurement strategy, supplier identification, and price benchmarking for paper industry inputs — chemicals, consumables, machinery spares.',
    icon: 'ShoppingCart',
    category: 'consultancy',
    points: [
      'Supplier identification',
      'Price benchmarking',
      'Quality assessment',
      'Procurement strategy',
      'Vendor development',
    ],
  },
  {
    slug: 'raw-material-import-export',
    name: 'Raw Material Import / Export',
    tagline: 'Global sourcing of pulp, waste paper & coal',
    description:
      'Import and export advisory for paper industry raw materials — waste paper (OCC, ONP, NDLK), pulp grades, coal, and woodchips from global markets.',
    icon: 'Ship',
    category: 'consultancy',
    points: [
      'Waste paper (OCC, NDLK, ONP, SMK)',
      'Pulp sourcing',
      'Coal & woodchips',
      'Global supplier network (USA, Europe, Middle East, SE Asia)',
      'FEMA & customs compliance',
    ],
  },
  {
    slug: 'finished-goods-trade',
    name: 'Finished Goods Trade',
    tagline: 'Export & distribution of paper products',
    description:
      'Export and domestic trade support for finished paper and board products — market identification, buyer connections, and logistics advisory.',
    icon: 'Package',
    category: 'consultancy',
    points: [
      'Export market identification',
      'Buyer connections',
      'Packaging board trade',
      'Newsprint & W&P distribution',
      'Logistics & freight advisory',
    ],
  },
];
