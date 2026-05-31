import { BRAND } from '@/data/brand'

type BrandWordmarkVariant = 'subtle' | 'on-gradient'

interface BrandWordmarkProps {
  variant?: BrandWordmarkVariant
  className?: string
}

export function BrandWordmark({ variant = 'subtle', className = '' }: BrandWordmarkProps) {
  return (
    <div
      className={`brand-wordmark brand-wordmark--${variant} ${className}`.trim()}
      aria-hidden
    >
      <p className="brand-wordmark-display" data-text={BRAND.name}>
        {BRAND.name}
      </p>
    </div>
  )
}
