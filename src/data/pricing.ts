export interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'mini',
    name: 'Mini Project',
    description: 'Perfect for semester submissions and quick prototypes.',
    price: 'Custom',
    period: 'per project',
    features: [
      'Working prototype',
      'Project report',
      'Presentation slides',
      '1 revision round',
      'Email support',
    ],
    cta: 'Get Quote',
  },
  {
    id: 'academic',
    name: 'Academic Pro',
    description: 'Complete final year and engineering project package.',
    price: 'Custom',
    period: 'per project',
    features: [
      'Full source code',
      'SRS & design documents',
      'Testing & deployment',
      'PPT & demo video',
      'Viva preparation',
      'Mentor sessions',
      '3 revision rounds',
    ],
    highlighted: true,
    cta: 'Get Started',
  },
  {
    id: 'startup',
    name: 'Startup MVP',
    description: 'Investor-ready product for founders and innovators.',
    price: 'Custom',
    period: 'per engagement',
    features: [
      'MVP development',
      'Scalable architecture',
      'Admin dashboard',
      'Cloud deployment',
      'Analytics integration',
      'Post-launch roadmap',
      'Priority support',
    ],
    cta: 'Build Your MVP',
  },
]
