import { BRAND, GEO } from './brand'

export interface BreadcrumbItem {
  name: string
  path: string
}

export interface PageSEO {
  title: string
  description: string
  keywords: string[]
  path: string
  breadcrumb?: BreadcrumbItem[]
  /** Include FAQPage schema (AEO) */
  faqSchema?: boolean
  /** Include Service catalog schema */
  serviceSchema?: boolean
}

const GEO_KEYWORDS = [
  'final year projects India',
  'engineering projects Maharashtra',
  'project development Pune',
  'project development Mumbai',
  'academic projects India',
  'BE project help India',
  'BTech final year project',
  'MCA project development',
  'student project assistance India',
]

export const BASE_KEYWORDS = [
  'final year projects',
  'engineering projects',
  'AI projects',
  'startup MVP development',
  'software development',
  'project assistance',
  'academic projects',
  'mini projects',
  'internship projects',
  'IoT projects',
  'web development projects',
  'mobile app projects',
  'Projonexa',
  ...GEO_KEYWORDS,
]

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: `${BRAND.name} | Final Year Projects & Innovation Platform — ${GEO.region}, ${GEO.country}`,
    description:
      'Projonexa is India\'s trusted innovation platform for final year projects, AI/ML, and startup MVPs. End-to-end development with documentation, deployment & viva prep — serving students & clients across India and globally.',
    keywords: BASE_KEYWORDS,
    path: '/',
    faqSchema: true,
    serviceSchema: true,
  },
  about: {
    title: `About ${BRAND.name} | Innovation Platform — ${GEO.country}`,
    description:
      `Learn about Projonexa — a Maharashtra, India-based technology platform helping students, colleges, startups, and businesses turn ideas into production-ready projects with expert mentorship and 100+ delivered projects.`,
    keywords: [...BASE_KEYWORDS, 'about projonexa', 'innovation platform India'],
    path: '/about',
    breadcrumb: [{ name: 'About', path: '/about' }],
  },
  services: {
    title: `Project Development Services | ${BRAND.name} — Final Year, AI, MVP`,
    description:
      'Projonexa services: final year projects, mini projects, AI/ML, web & mobile apps, IoT, startup MVPs, and custom software. Complete deliverables — code, SRS, PPT, deployment & viva support across India.',
    keywords: [...BASE_KEYWORDS, 'project development services', 'final year project help'],
    path: '/services',
    breadcrumb: [{ name: 'Services', path: '/services' }],
    serviceSchema: true,
  },
  projects: {
    title: `My Projects | ${BRAND.name} — SPPU BUDDY & More`,
    description:
      'Explore live products from Projonexa — including SPPU BUDDY, the free Android app for Savitribai Phule Pune University students with notes, PYQs, syllabus, dark mode, and SGPA tools.',
    keywords: [
      ...BASE_KEYWORDS,
      'SPPU BUDDY',
      'SPPU app',
      'SPPU notes app',
      'engineering student app',
      'my projects portfolio',
    ],
    path: '/projects',
    breadcrumb: [{ name: 'Projects', path: '/projects' }],
  },
  blog: {
    title: `Blog | ${BRAND.name} — Project Guides & Tech Insights`,
    description:
      'Expert guides on final year projects, AI development, startup MVPs, and engineering trends — from the Projonexa team serving students across India.',
    keywords: [...BASE_KEYWORDS, 'tech blog', 'final year project guide'],
    path: '/blog',
    breadcrumb: [{ name: 'Blog', path: '/blog' }],
  },
  portfolio: {
    title: `Portfolio | ${BRAND.name} — Academic & Industry Projects`,
    description:
      'Projonexa portfolio: 100+ delivered projects across engineering, AI, web, mobile, IoT, and startup domains. Trusted by 500+ students and innovators in India and globally.',
    keywords: [...BASE_KEYWORDS, 'project showcase', 'engineering portfolio'],
    path: '/portfolio',
    breadcrumb: [{ name: 'Portfolio', path: '/portfolio' }],
  },
  pricing: {
    title: `Pricing | ${BRAND.name} — Affordable Student Project Plans`,
    description:
      'Transparent, student-friendly pricing for mini projects, final year projects, and startup MVPs. Custom quotes aligned to your college deadline and scope.',
    keywords: [...BASE_KEYWORDS, 'project pricing India', 'affordable final year project'],
    path: '/pricing',
    breadcrumb: [{ name: 'Pricing', path: '/pricing' }],
  },
  careers: {
    title: `Careers | Join ${BRAND.name} Team`,
    description:
      'Explore roles at Projonexa — developers, designers, QA, mentors, interns, and more. Apply online to join our innovation team.',
    keywords: [...BASE_KEYWORDS, 'freelance developer India', 'projonexa careers'],
    path: '/careers',
    breadcrumb: [{ name: 'Careers', path: '/careers' }],
  },
  careersApply: {
    title: `Apply to Join ${BRAND.name}`,
    description:
      'Submit your application to join the Projonexa team. Share your role, skills, experience, and availability — we respond within a few business days.',
    keywords: [...BASE_KEYWORDS, 'projonexa apply', 'join projonexa team'],
    path: '/careers/apply',
    breadcrumb: [
      { name: 'Careers', path: '/careers' },
      { name: 'Apply', path: '/careers/apply' },
    ],
  },
  faq: {
    title: `FAQ | ${BRAND.name} — Projects, Pricing, Careers & Support`,
    description:
      'Projonexa FAQ: project types, deliverables, timelines, student pricing, viva prep, startup MVPs, careers, SPPU BUDDY, and how to contact us in India and globally.',
    keywords: [
      ...BASE_KEYWORDS,
      'final year project FAQ',
      'projonexa careers FAQ',
      'project deliverables India',
    ],
    path: '/faq',
    breadcrumb: [{ name: 'FAQ', path: '/faq' }],
    faqSchema: true,
  },
  contact: {
    title: `Contact ${BRAND.name} | Start Your Project — ${GEO.region}, ${GEO.country}`,
    description:
      'Contact Projonexa for final year projects, mini projects, AI/ML, web & mobile apps, IoT, and startup MVPs. Submit an inquiry — response within 24 hours across India and globally.',
    keywords: [...BASE_KEYWORDS, 'contact projonexa', 'project inquiry India'],
    path: '/contact',
    breadcrumb: [{ name: 'Contact', path: '/contact' }],
  },
}

/** Core Q&A pairs surfaced on homepage for AEO (Answer Engine Optimization) */
export const AEO_HOME_FAQ = [
  {
    question: 'What is Projonexa?',
    answer:
      'Projonexa is a technology-driven innovation platform based in Maharashtra, India that provides end-to-end project development for students, colleges, startups, and businesses — including final year projects, AI/ML systems, startup MVPs, IoT solutions, and custom software.',
  },
  {
    question: 'Who is Projonexa for?',
    answer:
      'Projonexa serves engineering and computer science students, college faculty, startups, freelancers, and businesses who need professional help building academic projects or production-ready software products.',
  },
  {
    question: 'What does Projonexa deliver with every project?',
    answer:
      'Every Projonexa project includes working source code, SRS and design documentation, project report, presentation slides (PPT), database setup, deployment support, demo guidance, and viva preparation — aligned to university evaluation standards.',
  },
  {
    question: 'Where is Projonexa located and who does it serve?',
    answer:
      'Projonexa is based in Maharashtra, India and serves clients across India and globally through remote collaboration.',
  },
  {
    question: 'How do I start a project with Projonexa?',
    answer:
      'Visit projonexa.com/contact, submit your project requirements, or email nisargalokhande@gmail.com. The team responds within 24 hours with scope, timeline, and next steps.',
  },
] as const
