import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  /** Frosted glass panel — use on sections where ambient background shows through */
  frosted?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  frosted = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-14 max-w-3xl ${alignClass} ${frosted ? 'section-heading-panel' : ''}`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
    </motion.div>
  )
}
