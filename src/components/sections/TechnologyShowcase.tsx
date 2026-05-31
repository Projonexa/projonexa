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
        className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]"
      >
        {TECH_SECTION.title}
      </h2>

      <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
        {TECH_SECTION.lead}
      </p>
    </motion.div>
  )
}

export function TechnologyShowcase() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null)
  const highlightSlug = hoveredTech ? getIconCloudSlug(hoveredTech) : null

  return (
    <section
      className="section-padding section-frosted overflow-hidden"
      aria-labelledby="tech-showcase-heading"
    >
      <div className="container-wide">
        <div className="lg:hidden">
          <TechnologyHeading className="mb-10 max-w-xl" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 xl:gap-16">
          <div className="flex min-w-0 flex-col gap-8 lg:gap-10">
            <TechnologyHeading className="hidden max-w-xl lg:block" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: easeSmooth }}
              className="w-full min-w-0"
            >
              <TechStackPanel onTechHover={setHoveredTech} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeSmooth }}
            className="flex w-full min-w-0 items-center justify-center lg:sticky lg:top-28 lg:min-h-[520px]"
          >
            <TechIconCloud variant="side" highlightSlug={highlightSlug} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
