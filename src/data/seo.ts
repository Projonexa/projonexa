import { BRAND } from './brand'

export interface PageSEO {
  title: string
  description: string
  keywords: string[]
  path: string
}

const BASE_KEYWORDS = [
  'final year projects',
  'engineering projects',
  'AI projects',
  'research projects',
  'startup MVP development',
  'software development',
  'project assistance',
  'academic projects',
  'Projonexa',
]

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description:
      'Transform your ideas into real-world innovation. Projonexa delivers final year projects, AI/ML solutions, startup MVPs, research assistance, and end-to-end software development.',
    keywords: BASE_KEYWORDS,
    path: '/',
  },
  about: {
    title: `About ${BRAND.name} | Innovation Platform`,
    description:
      'Learn about Projonexa — a technology-driven platform helping students, startups, and businesses turn ideas into impactful products with expert mentorship.',
    keywords: [...BASE_KEYWORDS, 'about projonexa', 'innovation platform'],
    path: '/about',
  },
  services: {
    title: `Services | ${BRAND.name} — Project Development`,
    description:
      'Explore Projonexa services: final year projects, AI/ML, web & mobile apps, IoT, research papers, startup MVPs, and custom software development.',
    keywords: [...BASE_KEYWORDS, 'project development services'],
    path: '/services',
  },
  projects: {
    title: `Projects | ${BRAND.name}`,
    description:
      'Browse successful academic and industry projects delivered by Projonexa across AI, web, mobile, IoT, and enterprise domains.',
    keywords: [...BASE_KEYWORDS, 'project portfolio'],
    path: '/projects',
  },
  research: {
    title: `Research | ${BRAND.name} — Paper Assistance`,
    description:
      'Research paper assistance, literature review, methodology design, and publication support from Projonexa research experts.',
    keywords: [...BASE_KEYWORDS, 'research paper help', 'IEEE paper'],
    path: '/research',
  },
  blog: {
    title: `Blog | ${BRAND.name} — Insights & Guides`,
    description:
      'Expert insights on final year projects, AI development, startup MVPs, research methodologies, and technology trends from Projonexa.',
    keywords: [...BASE_KEYWORDS, 'tech blog', 'project guides'],
    path: '/blog',
  },
  portfolio: {
    title: `Portfolio | ${BRAND.name}`,
    description:
      'View Projonexa portfolio showcasing 100+ delivered projects across engineering, AI, web, mobile, and startup solutions.',
    keywords: [...BASE_KEYWORDS, 'project showcase'],
    path: '/portfolio',
  },
  pricing: {
    title: `Pricing | ${BRAND.name} — Transparent Plans`,
    description:
      'Affordable project development pricing for students, startups, and businesses. Transparent packages for mini projects to enterprise solutions.',
    keywords: [...BASE_KEYWORDS, 'project pricing', 'affordable projects'],
    path: '/pricing',
  },
  careers: {
    title: `Careers | Join ${BRAND.name}`,
    description:
      'Join Projonexa growing network of 150+ freelancers and core team members. Build the future of innovation with us.',
    keywords: [...BASE_KEYWORDS, 'freelance developer', 'careers'],
    path: '/careers',
  },
  faq: {
    title: `FAQ | ${BRAND.name}`,
    description:
      'Frequently asked questions about Projonexa project development process, deliverables, timelines, pricing, and support.',
    keywords: [...BASE_KEYWORDS, 'project FAQ'],
    path: '/faq',
  },
  contact: {
    title: `Contact ${BRAND.name} — Get Started`,
    description:
      'Contact Projonexa to start your project. Reach our team for final year projects, MVPs, research assistance, and custom development.',
    keywords: [...BASE_KEYWORDS, 'contact projonexa'],
    path: '/contact',
  },
}
