import { CONTACT_EMAIL } from '@/data/contact'

export const PROJECT_INQUIRY_EMAIL = CONTACT_EMAIL

export const INQUIRY_PATHS = {
  students: '/inquiry/students',
  corporate: '/inquiry/corporate',
} as const

export type InquiryAudience = keyof typeof INQUIRY_PATHS

export function studentInquiryPath() {
  return INQUIRY_PATHS.students
}

export function corporateInquiryPath() {
  return INQUIRY_PATHS.corporate
}

export const STUDENT_INQUIRY_SECTION = {
  eyebrow: 'Student project inquiry',
  title: 'Start your academic project',
  description:
    'Final year, mini, AI/ML, IoT, and more — tell us your college, deadline, and requirements.',
} as const

export const CORPORATE_INQUIRY_SECTION = {
  eyebrow: 'Corporate & startup inquiry',
  title: 'Build your product with Projonexa',
  description:
    'MVPs, custom software, web & mobile apps — share your business goals, timeline, and scope.',
} as const

export const INQUIRY_HUB = {
  eyebrow: 'Project inquiry',
  title: 'Choose your inquiry type',
  lead: 'Select the form that matches you — we respond within 24 hours with scope and next steps.',
  studentCard: {
    title: 'Student projects',
    description:
      'Final year & mini projects, AI/ML, web/mobile, IoT — with documentation, deployment, and viva support.',
    cta: 'Student inquiry form',
  },
  corporateCard: {
    title: 'Corporate & startups',
    description:
      'Startup MVPs, custom software, product builds, and enhancements for teams and businesses.',
    cta: 'Corporate inquiry form',
  },
} as const

export const INQUIRY_TIMELINE_OPTIONS = [
  { value: 'urgent-1-2w', label: 'Urgent — within 2 weeks' },
  { value: 'standard-3-6w', label: 'Standard — 3 to 6 weeks' },
  { value: 'extended-6-10w', label: 'Extended — 6 to 10 weeks' },
  { value: 'semester', label: 'Full semester timeline' },
  { value: 'flexible', label: 'Flexible / exploring options' },
] as const

export const INQUIRY_BUDGET_OPTIONS = [
  { value: 'under-15k', label: 'Under ₹15,000' },
  { value: '15k-30k', label: '₹15,000 – ₹30,000' },
  { value: '30k-60k', label: '₹30,000 – ₹60,000' },
  { value: '60k-plus', label: '₹60,000+' },
  { value: 'undecided', label: 'Not decided yet' },
] as const

export const STUDENT_PROJECT_TYPES = [
  { value: 'final-year', label: 'Final Year Project' },
  { value: 'mini', label: 'Mini Project' },
  { value: 'ai-ml', label: 'AI / ML Project' },
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile Application' },
  { value: 'iot', label: 'IoT / Embedded' },
  { value: 'research', label: 'Research / Seminar' },
  { value: 'other', label: 'Other' },
] as const

export const STUDENT_YEAR_OPTIONS = [
  { value: 'second', label: '2nd year' },
  { value: 'third', label: '3rd year' },
  { value: 'final', label: 'Final year (BE / B.Tech / BCA)' },
  { value: 'pg', label: 'Postgraduate (MCA / M.Tech / MSc)' },
  { value: 'other', label: 'Other' },
] as const

export const STUDENT_VIVA_SUPPORT_OPTIONS = [
  { value: 'full', label: 'Full — report, PPT, demo & viva prep' },
  { value: 'docs', label: 'Documentation & PPT only' },
  { value: 'code-only', label: 'Code & deployment only' },
  { value: 'unsure', label: 'Not sure yet' },
] as const

export const CORPORATE_INQUIRY_TYPES = [
  { value: 'startup-mvp', label: 'Startup MVP' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile Application' },
  { value: 'ai-ml', label: 'AI / ML Solution' },
  { value: 'custom-software', label: 'Custom Software' },
  { value: 'product-enhancement', label: 'Product Enhancement' },
  { value: 'consulting', label: 'Technical Consulting' },
  { value: 'other', label: 'Other' },
] as const

export const CORPORATE_TEAM_SIZE_OPTIONS = [
  { value: 'solo', label: 'Solo founder / individual' },
  { value: '2-10', label: '2 – 10 people' },
  { value: '11-50', label: '11 – 50 people' },
  { value: '50-plus', label: '50+ people' },
] as const

export const CORPORATE_ROLE_OPTIONS = [
  { value: 'founder', label: 'Founder / Co-founder' },
  { value: 'product', label: 'Product / Project Manager' },
  { value: 'engineering', label: 'Engineering Lead' },
  { value: 'business', label: 'Business / Operations' },
  { value: 'other', label: 'Other' },
] as const

export function labelForOption<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string | null | undefined,
): string {
  return options.find((o) => o.value === value)?.label ?? ''
}
