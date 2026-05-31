export type DeploymentLinkType = 'play-store' | 'app-store' | 'web' | 'github' | 'demo'

export interface DeploymentLink {
  label: string
  url: string
  type: DeploymentLinkType
}

export interface MyProject {
  id: string
  name: string
  tagline: string
  description: string
  overview: string
  category: string
  platform: string
  status: 'live' | 'in-development'
  iconUrl: string
  thumbnailUrl: string
  techStack: string[]
  features: string[]
  contentHighlights: string[]
  supportedBranches?: string[]
  deploymentLinks: DeploymentLink[]
  stats?: { label: string; value: string }[]
  contactEmail?: string
  updatedAt?: string
}

export const PROJECTS_SECTION = {
  eyebrow: 'My Projects',
  title: 'Products Built for Real Users',
  lead: 'Live apps and platforms we have designed, built, and shipped — starting with tools that help SPPU students learn smarter.',
  body: 'Each project includes a clear overview, tech stack, feature set, and live deployment links where available.',
} as const

export const MY_PROJECTS: MyProject[] = [
  {
    id: 'sppu-buddy',
    name: 'SPPU BUDDY',
    tagline: 'Your complete SPPU study companion — notes, PYQs, syllabus & tools in one app.',
    description:
      'A free Android education app for Savitribai Phule Pune University (SPPU) students — from First Year Engineering through Final Year BE across major branches.',
    overview:
      'SPPU BUDDY helps SPPU students prepare for exams and stay on top of coursework with unit-wise notes, previous-year question papers (PYQs), full syllabus coverage from FE to BE, and handy academic tools. Built with a clean interface, dark mode for late-night reading, and an SGPA converter — it is continuously updated to make learning easier for thousands of SPPU learners.',
    category: 'Education',
    platform: 'Android',
    status: 'live',
    iconUrl:
      'https://play-lh.googleusercontent.com/of2gZbbEmBSFeXvVn1hRpcWuvO9JJ-m-P8OyIPNCmq82WlIR9-7n0sQw2pm1Z6C0K_s=w240-h480',
    thumbnailUrl:
      'https://play-lh.googleusercontent.com/0kFfQGDf2jf0JO-KJjeC1w2V0Pd_65qMOKjF0s5YafGiH4Kb1gEvpBddJXtp4hohAu4p=w1052-h592',
    techStack: ['React Native', 'Firebase', 'Android', 'Google Play', 'AI Chatbot'],
    contentHighlights: [
      'Unit-wise notes',
      'PYQs from previous exams',
      'Syllabus from First Year (FE) to Final Year (BE)',
      'Useful tools to support your study journey',
    ],
    supportedBranches: [
      'First Year Engineering (Common)',
      'Computer Engineering',
      'IT',
      'E&TC',
      'Mechanical',
      'Civil',
      'Electrical',
      'AI & DS',
      'Robotics & Automation',
    ],
    features: [
      'Free to use',
      'Clean interface with minimal ads',
      'Dark mode for late-night reading',
      'SGPA converter for easy grade calculations',
      'AI bot for SPPU-related questions (syllabus, exams, results)',
    ],
    deploymentLinks: [
      {
        label: 'Get on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.caygnus.sppubuddy',
        type: 'play-store',
      },
      {
        label: 'Contact & feedback',
        url: 'mailto:nisargalokhande@gmail.com',
        type: 'web',
      },
    ],
    stats: [
      { label: 'Downloads', value: '1K+' },
      { label: 'Category', value: 'Education' },
      { label: 'Audience', value: 'SPPU students' },
    ],
    contactEmail: 'nisargalokhande@gmail.com',
    updatedAt: 'Jan 2026',
  },
]

/** @deprecated Use MY_PROJECTS — kept for any legacy imports */
export type Project = MyProject
export const FEATURED_PROJECTS = MY_PROJECTS
