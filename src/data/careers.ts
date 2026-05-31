import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  Briefcase,
  Code2,
  GraduationCap,
  Palette,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react'

export const CAREERS_SECTION = {
  eyebrow: 'Careers',
  title: 'Join the Projonexa Team',
  lead: 'Students, freelancers, and professionals — apply in any role that fits you, or send an open application.',
  intro:
    'We welcome developers, designers, mentors, interns, and specialists who want to build real products with a fast-moving innovation team. Remote-friendly, project-based, and open to talent across India and globally.',
} as const

export interface CareerRole {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'full-stack-developer',
    title: 'Full-Stack Developer',
    description: 'Web & mobile apps for academic and startup clients.',
    icon: Code2,
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Interfaces, design systems, and client-ready visuals.',
    icon: Palette,
  },
  {
    id: 'mobile-developer',
    title: 'Mobile Developer',
    description: 'Android & cross-platform apps with polished UX.',
    icon: Smartphone,
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    description: 'Models, pipelines, and intelligent product features.',
    icon: Brain,
  },
  {
    id: 'qa-engineer',
    title: 'QA & Testing',
    description: 'Test plans, automation, and production-ready quality.',
    icon: Search,
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Deploy, monitor, and scale client deliverables.',
    icon: Server,
  },
  {
    id: 'project-mentor',
    title: 'Project Mentor',
    description: 'Guide students on architecture, docs, and viva prep.',
    icon: Users,
  },
  {
    id: 'technical-writer',
    title: 'Technical Writer',
    description: 'SRS, reports, manuals, and documentation packs.',
    icon: Briefcase,
  },
  {
    id: 'student-intern',
    title: 'Student Intern',
    description: 'Learn by contributing to live projects with mentorship.',
    icon: GraduationCap,
  },
  {
    id: 'open-application',
    title: 'Open Application',
    description: 'Your skills don’t match a label? Apply anyway — we’ll find a fit.',
    icon: Sparkles,
  },
]

export const CAREER_EXPERIENCE_LEVELS = [
  { value: 'student', label: 'Student / Fresher' },
  { value: '0-1', label: '0–1 years' },
  { value: '1-3', label: '1–3 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '5+', label: '5+ years' },
] as const

export const CAREER_AVAILABILITY_OPTIONS = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'freelance', label: 'Freelance / Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'weekends', label: 'Weekends only' },
] as const

export const CAREER_APPLICATION_EMAIL = 'nisargalokhande@gmail.com'
