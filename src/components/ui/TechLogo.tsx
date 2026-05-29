import { useTheme } from '@/context/ThemeContext'
import { getLogoUrl, type TechItem } from '@/data/technologies'

interface TechLogoProps {
  tech: TechItem
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
}

export function TechLogo({ tech, size = 'md', className = '' }: TechLogoProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const needsLightLogo = ['000000', '092E20', '003B57', '150458', '412991', '660066'].includes(
    tech.color,
  )
  const src = getLogoUrl(tech.slug, tech.color, isDark && needsLightLogo)

  return (
    <img
      src={src}
      alt={`${tech.name} logo`}
      width={44}
      height={44}
      loading="lazy"
      decoding="async"
      className={`${sizeMap[size]} object-contain transition-transform duration-300 ${className}`}
      onError={(e) => {
        const target = e.currentTarget
        target.src = getLogoUrl(tech.slug, '3d8bff', false)
      }}
    />
  )
}
