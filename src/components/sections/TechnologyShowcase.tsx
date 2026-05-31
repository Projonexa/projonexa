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
      className="section-padding section-frosted section-frosted-merge-b overflow-hidden"
      aria-labelledby="tech-showcase-heading"
    >
      <div className="container-wide">
        <div className="lg:hidden">
          <TechnologyHeading className="mb-10 max-w-xl" />
        </div>

        {/* Height follows the left column only; cloud is out of flow on lg (avoids empty band under cloud) */}
        <div className="relative">
          <div className="flex min-w-0 flex-col gap-8 lg:max-w-[58%] lg:gap-10 xl:max-w-[56%]">
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
            className="mt-12 flex w-full min-w-0 items-center justify-center lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[40%] lg:justify-end xl:w-[42%]"
          >
            <div className="lg:sticky lg:top-28">
              <TechIconCloud
                variant="side"
                highlightSlug={highlightSlug}
                highlightLabel={hoveredTech?.name ?? null}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
