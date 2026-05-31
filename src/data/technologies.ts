export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'database'
  | 'ai'
  | 'iot'
  | 'cloud'
  | 'devops'
  | 'tools'

export interface TechItem {
  id: string
  name: string
  /** Simple Icons slug — https://simpleicons.org */
  slug: string
  category: TechCategory
  color: string
  /** Use dark logo variant in light mode (for white-brand icons) */
  lightModeSlug?: string
}

export const TECH_SECTION = {
  eyebrow: 'Technology',
  title: 'Built With Industry-Leading Stack',
  lead: 'Modern technologies across frontend, AI, cloud, IoT, and more — powering projects for students and clients worldwide.',
  body: 'We align every build with your syllabus, startup roadmap, or enterprise requirement — from React and Next.js to TensorFlow, AWS, and embedded systems — with documented delivery and mentor support.',
} as const

export const TECH_HIGHLIGHTS = [
  { label: 'Frontend & UI', accent: '#61DAFB' },
  { label: 'AI & Machine Learning', accent: '#FF6F00' },
  { label: 'Cloud & DevOps', accent: '#4285F4' },
  { label: 'IoT & Embedded', accent: '#00979D' },
  { label: 'Mobile', accent: '#02569B' },
  { label: 'Databases', accent: '#4169E1' },
] as const

export const TECH_CATEGORIES: { id: TechCategory; label: string; order: number }[] = [
  { id: 'frontend', label: 'Frontend & UI', order: 1 },
  { id: 'backend', label: 'Backend & APIs', order: 2 },
  { id: 'mobile', label: 'Mobile', order: 3 },
  { id: 'database', label: 'Databases', order: 4 },
  { id: 'ai', label: 'AI & Machine Learning', order: 5 },
  { id: 'iot', label: 'IoT & Embedded', order: 6 },
  { id: 'cloud', label: 'Cloud & Hosting', order: 7 },
  { id: 'devops', label: 'DevOps & CI/CD', order: 8 },
  { id: 'tools', label: 'Tools & Platforms', order: 9 },
]

/** Alphabetically sorted within each category */
export const TECHNOLOGIES: TechItem[] = [
  // Frontend
  { id: 'angular', name: 'Angular', slug: 'angular', category: 'frontend', color: 'DD0031' },
  { id: 'bootstrap', name: 'Bootstrap', slug: 'bootstrap', category: 'frontend', color: '7952B3' },
  { id: 'css3', name: 'CSS3', slug: 'css3', category: 'frontend', color: '1572B6' },
  { id: 'html5', name: 'HTML5', slug: 'html5', category: 'frontend', color: 'E34F26' },
  { id: 'javascript', name: 'JavaScript', slug: 'javascript', category: 'frontend', color: 'F7DF1E' },
  { id: 'nextjs', name: 'Next.js', slug: 'nextdotjs', category: 'frontend', color: '000000', lightModeSlug: 'nextdotjs' },
  { id: 'react', name: 'React', slug: 'react', category: 'frontend', color: '61DAFB' },
  { id: 'tailwind', name: 'Tailwind CSS', slug: 'tailwindcss', category: 'frontend', color: '06B6D4' },
  { id: 'typescript', name: 'TypeScript', slug: 'typescript', category: 'frontend', color: '3178C6' },
  { id: 'vite', name: 'Vite', slug: 'vite', category: 'frontend', color: '646CFF' },
  { id: 'vue', name: 'Vue.js', slug: 'vuedotjs', category: 'frontend', color: '4FC08D' },

  // Backend
  { id: 'dotnet', name: '.NET', slug: 'dotnet', category: 'backend', color: '512BD4' },
  { id: 'django', name: 'Django', slug: 'django', category: 'backend', color: '092E20' },
  { id: 'express', name: 'Express', slug: 'express', category: 'backend', color: '000000' },
  { id: 'flask', name: 'Flask', slug: 'flask', category: 'backend', color: '000000' },
  { id: 'go', name: 'Golang', slug: 'go', category: 'backend', color: '00ADD8' },
  { id: 'java', name: 'Java', slug: 'openjdk', category: 'backend', color: 'ED8B00' },
  { id: 'nodejs', name: 'Node.js', slug: 'nodedotjs', category: 'backend', color: '339933' },
  { id: 'php', name: 'PHP', slug: 'php', category: 'backend', color: '777BB4' },
  { id: 'spring', name: 'Spring', slug: 'spring', category: 'backend', color: '6DB33F' },

  // Mobile
  { id: 'android', name: 'Android', slug: 'android', category: 'mobile', color: '3DDC84' },
  { id: 'flutter', name: 'Flutter', slug: 'flutter', category: 'mobile', color: '02569B' },
  { id: 'kotlin', name: 'Kotlin', slug: 'kotlin', category: 'mobile', color: '7F52FF' },
  { id: 'react-native', name: 'React Native', slug: 'react', category: 'mobile', color: '61DAFB' },
  { id: 'swift', name: 'Swift', slug: 'swift', category: 'mobile', color: 'F05138' },

  // Database
  { id: 'firebase-db', name: 'Firebase', slug: 'firebase', category: 'database', color: 'FFCA28' },
  { id: 'mongodb', name: 'MongoDB', slug: 'mongodb', category: 'database', color: '47A248' },
  { id: 'mysql', name: 'MySQL', slug: 'mysql', category: 'database', color: '4479A1' },
  { id: 'postgresql', name: 'PostgreSQL', slug: 'postgresql', category: 'database', color: '4169E1' },
  { id: 'redis', name: 'Redis', slug: 'redis', category: 'database', color: 'DC382D' },
  { id: 'sqlite', name: 'SQLite', slug: 'sqlite', category: 'database', color: '003B57' },

  // AI & ML
  { id: 'jupyter', name: 'Jupyter', slug: 'jupyter', category: 'ai', color: 'F37626' },
  { id: 'opencv', name: 'OpenCV', slug: 'opencv', category: 'ai', color: '5C3EE8' },
  { id: 'openai', name: 'OpenAI', slug: 'openai', category: 'ai', color: '412991' },
  { id: 'pandas', name: 'Pandas', slug: 'pandas', category: 'ai', color: '150458' },
  { id: 'python', name: 'Python', slug: 'python', category: 'ai', color: '3776AB' },
  { id: 'pytorch', name: 'PyTorch', slug: 'pytorch', category: 'ai', color: 'EE4C2C' },
  { id: 'scikit', name: 'scikit-learn', slug: 'scikitlearn', category: 'ai', color: 'F7931E' },
  { id: 'tensorflow', name: 'TensorFlow', slug: 'tensorflow', category: 'ai', color: 'FF6F00' },

  // IoT
  { id: 'arduino', name: 'Arduino', slug: 'arduino', category: 'iot', color: '00979D' },
  { id: 'esp32', name: 'ESP32', slug: 'espressif', category: 'iot', color: 'E7352C' },
  { id: 'mqtt', name: 'MQTT', slug: 'eclipsemosquitto', category: 'iot', color: '660066' },
  { id: 'raspberry', name: 'Raspberry Pi', slug: 'raspberrypi', category: 'iot', color: 'A22846' },

  // Cloud
  { id: 'aws', name: 'AWS', slug: 'amazonaws', category: 'cloud', color: 'FF9900' },
  { id: 'azure', name: 'Azure', slug: 'microsoftazure', category: 'cloud', color: '0078D4' },
  { id: 'firebase-cloud', name: 'Firebase', slug: 'firebase', category: 'cloud', color: 'FFCA28' },
  { id: 'gcp', name: 'Google Cloud', slug: 'googlecloud', category: 'cloud', color: '4285F4' },
  { id: 'netlify', name: 'Netlify', slug: 'netlify', category: 'cloud', color: '00C7B7' },
  { id: 'vercel', name: 'Vercel', slug: 'vercel', category: 'cloud', color: '000000' },

  // DevOps
  { id: 'docker', name: 'Docker', slug: 'docker', category: 'devops', color: '2496ED' },
  { id: 'github', name: 'GitHub', slug: 'github', category: 'devops', color: '181717' },
  { id: 'gitlab', name: 'GitLab', slug: 'gitlab', category: 'devops', color: 'FC6D26' },
  { id: 'jenkins', name: 'Jenkins', slug: 'jenkins', category: 'devops', color: 'D24939' },
  { id: 'kubernetes', name: 'Kubernetes', slug: 'kubernetes', category: 'devops', color: '326CE5' },

  // Tools
  { id: 'blockchain', name: 'Blockchain', slug: 'ethereum', category: 'tools', color: '3C3C3D' },
  { id: 'figma', name: 'Figma', slug: 'figma', category: 'tools', color: 'F24E1E' },
  { id: 'framer', name: 'Framer Motion', slug: 'framer', category: 'tools', color: '0055FF' },
  { id: 'powerbi', name: 'Power BI', slug: 'powerbi', category: 'tools', color: 'F2C811' },
  { id: 'postman', name: 'Postman', slug: 'postman', category: 'tools', color: 'FF6C37' },
  { id: 'stripe', name: 'Stripe', slug: 'stripe', category: 'tools', color: '635BFF' },
  { id: 'dart', name: 'Dart', slug: 'dart', category: 'mobile', color: '0175C2' },
  { id: 'prisma', name: 'Prisma', slug: 'prisma', category: 'database', color: '2D3748' },
  { id: 'nginx', name: 'NGINX', slug: 'nginx', category: 'devops', color: '009639' },
  { id: 'jest', name: 'Jest', slug: 'jest', category: 'tools', color: 'C21325' },
  { id: 'cypress', name: 'Cypress', slug: 'cypress', category: 'tools', color: '69D3A7' },
  { id: 'testing-library', name: 'Testing Library', slug: 'testinglibrary', category: 'tools', color: 'E33332' },
  { id: 'sonarqube', name: 'SonarQube', slug: 'sonarqubecloud', category: 'devops', color: '4E9BCD' },
  { id: 'android-studio', name: 'Android Studio', slug: 'androidstudio', category: 'tools', color: '3DDC84' },
  { id: 'jira', name: 'Jira', slug: 'jira', category: 'tools', color: '0052CC' },
  { id: 'git', name: 'Git', slug: 'git', category: 'devops', color: 'F05032' },
]

/** Slugs for the interactive 3D icon cloud (Simple Icons) */
export const ICON_CLOUD_SLUGS = [
  'typescript',
  'javascript',
  'dart',
  'react',
  'flutter',
  'android',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'jira',
  'github',
  'gitlab',
  'androidstudio',
  'sonarqubecloud',
  'figma',
  'python',
  'tensorflow',
  'pytorch',
  'openai',
  'mongodb',
  'mysql',
  'redis',
  'kubernetes',
  'amazonaws',
  'googlecloud',
  'microsoftazure',
  'tailwindcss',
  'vite',
  'django',
  'kotlin',
  'swift',
  'postman',
] as const

const ICON_CLOUD_SLUG_SET = new Set<string>(ICON_CLOUD_SLUGS)

/** Panel slug → cloud slug when Simple Icons names differ */
const PANEL_SLUG_TO_CLOUD: Partial<Record<string, string>> = {
  'react-native': 'react',
  sonarqube: 'sonarqubecloud',
  'testing-library': 'testinglibrary',
  'firebase-db': 'firebase',
}

/** Slug used in the 3D icon cloud for a panel tech item, if present */
export function getIconCloudSlug(tech: TechItem): string | null {
  const mapped = PANEL_SLUG_TO_CLOUD[tech.id] ?? PANEL_SLUG_TO_CLOUD[tech.slug]
  if (mapped && ICON_CLOUD_SLUG_SET.has(mapped)) return mapped

  const candidates = [tech.slug, tech.lightModeSlug].filter(Boolean) as string[]
  for (const slug of candidates) {
    if (ICON_CLOUD_SLUG_SET.has(slug)) return slug
  }
  return null
}

export function getTechnologiesByCategory(category: TechCategory | 'all') {
  if (category === 'all') return TECHNOLOGIES
  return TECHNOLOGIES.filter((t) => t.category === category)
}

export function getLogoUrl(slug: string, color: string, dark = false) {
  const hex = color.replace('#', '')
  if (dark && (hex === '000000' || hex === 'FFFFFF' || hex === 'ffffff')) {
    return `https://cdn.simpleicons.org/${slug}/ffffff`
  }
  return `https://cdn.simpleicons.org/${slug}/${hex}`
}
