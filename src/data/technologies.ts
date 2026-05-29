export interface TechItem {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'cloud' | 'devops'
  color: string
}

export const TECHNOLOGIES: TechItem[] = [
  { name: 'React', category: 'frontend', color: '#61DAFB' },
  { name: 'Next.js', category: 'frontend', color: '#FFFFFF' },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38BDF8' },
  { name: 'Node.js', category: 'backend', color: '#339933' },
  { name: 'Golang', category: 'backend', color: '#00ADD8' },
  { name: 'Express', category: 'backend', color: '#FFFFFF' },
  { name: 'PostgreSQL', category: 'database', color: '#4169E1' },
  { name: 'MongoDB', category: 'database', color: '#47A248' },
  { name: 'Firebase', category: 'database', color: '#FFCA28' },
  { name: 'OpenAI', category: 'ai', color: '#10A37F' },
  { name: 'Python', category: 'ai', color: '#3776AB' },
  { name: 'TensorFlow', category: 'ai', color: '#FF6F00' },
  { name: 'AWS', category: 'cloud', color: '#FF9900' },
  { name: 'Firebase', category: 'cloud', color: '#FFCA28' },
  { name: 'Vercel', category: 'cloud', color: '#FFFFFF' },
  { name: 'Docker', category: 'devops', color: '#2496ED' },
  { name: 'GitHub', category: 'devops', color: '#FFFFFF' },
]

export const TECH_CATEGORIES = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'devops', label: 'DevOps' },
] as const
