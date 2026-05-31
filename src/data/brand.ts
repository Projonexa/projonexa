export const BRAND = {
  name: 'Projonexa',
  tagline: 'Where Innovation Meets Execution.',
  /** Hero display — same message, split for typographic emphasis */
  taglineHero: {
    prefix: 'Where Innovation',
    bridge: 'Meets',
    suffix: 'Execution.',
  },
  url: 'https://projonexa.com',
  email: 'nisargalokhande@gmail.com',
  location: 'Maharashtra, India',
} as const

/** Geographic & local SEO configuration (GEO) */
export const GEO = {
  country: 'India',
  countryCode: 'IN',
  region: 'Maharashtra',
  placename: 'Maharashtra, India',
  locale: 'en_IN',
  language: 'en-IN',
  /** Approximate geo centre — Maharashtra, India */
  latitude: 19.7515,
  longitude: 75.7139,
  areaServed: ['India', 'Global'],
  serviceRadius: 'India and worldwide',
} as const

/** Service Area section — home page */
export const SERVICE_AREA_SECTION = {
  eyebrow: 'Service Area',
  title: 'Serving Students & Clients Across India and Globally',
  lead: 'Remote delivery for students, colleges, startups, and businesses — across India and internationally.',
} as const

export const SERVICE_AREA_DELIVERY = [
  {
    title: 'Remote-first',
    description: 'Collaborate from anywhere with structured updates and milestone delivery.',
  },
  {
    title: 'India-wide',
    description: 'Students and institutions across all states — same quality and mentor support.',
  },
  {
    title: 'Global clients',
    description: 'Startups and businesses abroad with timezone-friendly communication.',
  },
] as const

export const SERVICE_AREA_REGIONS = [
  {
    label: 'India',
    description: 'Students, colleges, and businesses nationwide — remote collaboration with mentor support.',
  },
  {
    label: 'Global',
    description: 'Startups and international clients — timezone-friendly delivery and clear milestones.',
  },
] as const

export const SERVICE_AREA_CLIENTS = [
  {
    title: 'Startups & entrepreneurs',
    detail: 'MVPs, prototypes, and product validation',
    priority: true,
  },
  {
    title: 'Businesses & international clients',
    detail: 'Custom software, AI systems, and long-term delivery',
    priority: true,
  },
  {
    title: 'Engineering & CS students',
    detail: 'BE, BTech, MCA, BCA — final year and mini projects',
  },
  {
    title: 'Colleges & universities',
    detail: 'Department partnerships and bulk student project support',
  },
] as const

/** One-line definition for AEO / AI answer engines */
export const AEO_DEFINITION =
  'Projonexa is a technology-driven innovation platform based in Maharashtra, India that helps students, colleges, startups, and businesses transform ideas into real-world projects — including final year projects, AI/ML systems, startup MVPs, IoT solutions, and custom software with full documentation and mentor support.'

export const AEO_SECTION = {
  eyebrow: 'About Projonexa',
  title: 'What Is Projonexa?',
  lead: 'Clear answers for students, clients, colleges, and search engines.',
  summary:
    'We combine academic rigor, industry-grade engineering, and mentor-led delivery so every project is evaluation-ready and portfolio-worthy — not just a prototype that barely runs.',
} as const

export const AEO_HIGHLIGHTS = [
  {
    title: 'Academic & final-year projects',
    description: 'BE, BTech, MCA, and mini projects with SRS, reports, and viva prep.',
  },
  {
    title: 'AI, web, mobile & IoT',
    description: 'Modern stacks from machine learning pipelines to deployed cloud apps.',
  },
  {
    title: 'Startups & MVPs',
    description: 'Investor-ready products for founders — prototypes, demos, and scalable foundations.',
  },
  {
    title: 'India & global delivery',
    description: 'Remote collaboration for clients across India and international markets.',
  },
] as const

export const FOUNDER = {
  name: 'Nisarga Lokhande',
  title: 'Founder, CEO, Student Entrepreneur & Software Engineer',
  linkedin: 'https://www.linkedin.com/in/nslokhande/',
  github: 'https://github.com/nikobuddy/',
  email: 'nisargalokhande@gmail.com',
  location: 'Maharashtra, India',
  story: `Hi, I'm Nisarga Lokhande.

Like many students, I once struggled to transform ideas into working projects. I had the vision but faced challenges finding the right resources, guidance, documentation, and technical support.

That experience inspired me to build Projonexa.

Today, Projonexa exists to help students, innovators, startups, and businesses turn their ideas into reality with the support of experienced developers, designers, and technology experts.

Our mission is simple:

To make innovation accessible to everyone.`,
} as const

export const VISION =
  "To become the world's leading innovation platform connecting students, freelancers, startups, and businesses through technology-driven project development."

export const MISSION =
  'To empower students and innovators by providing access to technical expertise, mentorship, development resources, and end-to-end project execution.'

export const ACHIEVEMENTS = [
  { title: 'SIH 2025 Winner', subtitle: 'Team Leader' },
  { title: 'Indian Railways Innovation', subtitle: 'Proposed Innovation Project' },
  { title: '100+ Projects', subtitle: 'Successfully Delivered' },
  { title: '150+ Freelancers', subtitle: 'Growing Expert Network' },
  { title: 'Multi-Domain Expertise', subtitle: 'Across Technology Stacks' },
] as const

export const STATS_SECTION = {
  eyebrow: 'Impact',
  title: 'Numbers That Define Our Growth',
  lead: 'Trusted by students, startups, and institutions across India and beyond.',
  body: `Projonexa has grown into a trusted innovation partner — delivering real projects, building a strong freelancer network, and supporting learners from first idea to final submission. These numbers reflect the scale, depth, and commitment behind every engagement.`,
} as const

export const STATS = [
  {
    value: 100,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'End-to-end builds shipped across academics and industry',
  },
  {
    value: 150,
    suffix: '+',
    label: 'Freelancers Network',
    description: 'Developers, designers, and specialists on our expert roster',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Technology Domains',
    description: 'From AI/ML and web to IoT, cloud, and mobile stacks',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Students Assisted',
    description: 'Learners guided through projects, viva prep, and delivery',
  },
] as const

export const WHY_SECTION = {
  eyebrow: 'Why Projonexa',
  title: 'The Premium Choice for Project Excellence',
  lead: 'We combine technical depth, academic rigor, and startup velocity in every engagement.',
} as const

export const WHY_PILLARS = [
  {
    label: 'Technical Depth',
    description: 'Production-grade stacks, scalable architecture, and code you can defend in review.',
  },
  {
    label: 'Academic Rigor',
    description: 'SRS, reports, and viva-ready documentation aligned to university standards.',
  },
  {
    label: 'Startup Velocity',
    description: 'MVPs and prototypes built for real users, demos, and fast iteration.',
  },
] as const

/** Benefit indices under each pillar column (Technical · Academic · Startup) */
export const WHY_BENEFIT_GROUPS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
] as const

export const WHY_CHOOSE = [
  {
    title: 'End-to-End Project Development',
    description:
      'From ideation and architecture to deployment and documentation — we handle the complete project lifecycle.',
  },
  {
    title: 'Industry-Level Documentation',
    description:
      'SRS, design documents, user manuals, and presentation decks crafted to academic and professional standards.',
  },
  {
    title: 'Expert Mentor Support',
    description:
      'Guidance from experienced developers and domain specialists throughout your project journey.',
  },
  {
    title: 'Scalable Architecture',
    description:
      'Production-grade codebases built with modern patterns that grow with your product and career.',
  },
  {
    title: 'Fast Delivery',
    description:
      'Structured sprints and clear milestones ensure your deadlines are met without compromising quality.',
  },
  {
    title: 'Startup-Ready Solutions',
    description:
      'MVPs and prototypes designed for real users, investor demos, and rapid market validation.',
  },
  {
    title: 'Academic Excellence',
    description:
      'Projects aligned with university guidelines, viva preparation, and evaluation criteria.',
  },
  {
    title: 'Affordable Solutions',
    description:
      'Premium quality development at student-friendly pricing with transparent scope and deliverables.',
  },
  {
    title: 'Global Reach',
    description:
      'Serving students, startups, and businesses across India and internationally with remote collaboration.',
  },
] as const
