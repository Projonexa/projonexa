export const CONTACT_SECTION = {
  eyebrow: 'Contact',
  title: "Let's Build Your Next Project",
  lead: 'Share your idea, deadline, and requirements — we respond within 24 hours with clear next steps.',
} as const

export const CONTACT_EMAIL = 'nisargalokhande@gmail.com'

export const CONTACT_PROJECT_TYPES = [
  { value: 'Final Year Project Inquiry', label: 'Final Year Project' },
  { value: 'Mini Project Inquiry', label: 'Mini Project' },
  { value: 'AI/ML Project Inquiry', label: 'AI / ML Project' },
  { value: 'Web or Mobile App Inquiry', label: 'Web or Mobile App' },
  { value: 'IoT Project Inquiry', label: 'IoT / Embedded' },
  { value: 'Startup MVP Inquiry', label: 'Startup MVP' },
  { value: 'Custom Software Inquiry', label: 'Custom Software' },
  { value: 'Documentation Inquiry', label: 'Documentation Only' },
  { value: 'Other Inquiry', label: 'Other' },
] as const

export const CONTACT_TIMELINE_OPTIONS = [
  { value: 'urgent-1-2w', label: 'Urgent — within 2 weeks' },
  { value: 'standard-3-6w', label: 'Standard — 3 to 6 weeks' },
  { value: 'extended-6-10w', label: 'Extended — 6 to 10 weeks' },
  { value: 'flexible', label: 'Flexible / exploring options' },
] as const

export const CONTACT_INFO_CARDS: {
  id: 'email' | 'location' | 'response'
  title: string
  detail: string
  description: string
  href?: string
}[] = [
  {
    id: 'email',
    title: 'Email us',
    detail: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    description: 'Best for detailed project briefs and file references.',
  },
  {
    id: 'location',
    title: 'Based in',
    detail: 'Maharashtra, India',
    description: 'Serving students and clients across India and globally.',
  },
  {
    id: 'response',
    title: 'Response time',
    detail: 'Within 24 hours',
    description: 'On business days for project and partnership inquiries.',
  },
]

export const CONTACT_FORM_HINTS = [
  'Your branch, year, and college deadline',
  'Tech stack or features you have in mind',
  'Whether you need viva or documentation support',
  'Budget range if you already have one',
] as const

export const CONTACT_QUICK_LINKS = [
  { label: 'View pricing', path: '/pricing' },
  { label: 'Browse FAQ', path: '/faq' },
  { label: 'Explore services', path: '/services' },
  { label: 'Join our team', path: '/careers/apply' },
] as const
