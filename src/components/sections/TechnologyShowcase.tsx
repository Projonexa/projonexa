import { useState } from 'react'
import { motion } from 'framer-motion'
import { TechIconCloud } from '@/components/sections/TechIconCloud'
import { TechStackPanel } from '@/components/sections/TechStackPanel'
import { getIconCloudSlug, TECH_SECTION, type TechItem } from '@/data/technologies'

const easeSmooth = [0.22, 1, 0.36, 1] as const

function TechnologyHeading({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: easeSmooth }}
      className={className}
    >
      <div className="flex items-center gap-3">
        <span
          className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
          aria-hidden
        />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {TECH_SECTION.eyebrow}
        </p>
      </div>

      <h2
        id="tech-showcase-heading"
        className="section-display-title mt-5"
      >
        {TECH_SECTION.title}
      </h2>

      <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
        {TECH_SECTION.lead}
      </p>
    </motion.div>
  )
}

interface TechnologyShowcaseProps {
  /** Home: nested inside TechnologyWhySection — no extra section shell */
  variant?: 'section' | 'grouped'
}

export function TechnologyShowcase({ variant = 'section' }: TechnologyShowcaseProps) {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null)
  const highlightSlug = hoveredTech ? getIconCloudSlug(hoveredTech) : null

  const content = (
    <div className="container-wide">
      <TechnologyHeading className="mb-8 max-w-3xl sm:mb-10 lg:mb-12" />

      <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-12 xl:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: easeSmooth }}
          className="min-w-0 w-full"
        >
          <TechStackPanel onTechHover={setHoveredTech} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: easeSmooth }}
          className="flex w-full min-w-0 items-center justify-center lg:sticky lg:top-28 lg:justify-center"
        >
          <div className="w-full max-w-[min(100%,480px)] lg:max-w-[460px]">
            <TechIconCloud
              variant="side"
              highlightSlug={highlightSlug}
              highlightLabel={hoveredTech?.name ?? null}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )

  if (variant === 'grouped') {
    return content
  }

  return (
    <section
      className="section-padding section-frosted overflow-hidden"
      aria-labelledby="tech-showcase-heading"
    >
      {content}
    </section>
  )
}
