import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { TechIconCloud } from '@/components/sections/TechIconCloud'
import { TechStackPanel } from '@/components/sections/TechStackPanel'
import {
  TECH_CATEGORIES,
  TECH_HIGHLIGHTS,
  TECH_SECTION,
  TECHNOLOGIES,
} from '@/data/technologies'

const easeSmooth = [0.22, 1, 0.36, 1] as const

function TechnologyIntro({ className = '' }: { className?: string }) {
  const techCount = TECHNOLOGIES.length
  const domainCount = TECH_CATEGORIES.length

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

      <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
        {TECH_SECTION.lead}
      </p>

      <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {TECH_SECTION.body}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-2xl border border-black/[0.06] bg-white/55 px-4 py-3 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/45">
          <p className="text-2xl font-bold tabular-nums text-zinc-900 dark:text-white">
            {techCount}+
          </p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
            Technologies
          </p>
        </div>
        <div className="rounded-2xl border border-black/[0.06] bg-white/55 px-4 py-3 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/45">
          <p className="text-2xl font-bold tabular-nums text-zinc-900 dark:text-white">
            {domainCount}
          </p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
            Domains
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          <Layers className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
          Core domains
        </p>
        <ul className="flex flex-wrap gap-2">
          {TECH_HIGHLIGHTS.map((item) => (
            <li key={item.label}>
              <span
                className="inline-flex rounded-full border border-black/[0.06] bg-white/50 px-3 py-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-white/[0.08] dark:bg-black/40 dark:text-zinc-300"
                style={{ boxShadow: `0 0 0 1px ${item.accent}18` }}
              >
                <span
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden
                />
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        Explore categories below or drag the 3D icon cloud to preview our stack in motion.
      </p>
    </motion.div>
  )
}

export function TechnologyShowcase() {
  return (
    <section
      className="section-padding section-frosted overflow-hidden"
      aria-labelledby="tech-showcase-heading"
    >
      <div className="container-wide">
        <div className="lg:hidden">
          <TechnologyIntro className="mb-12 max-w-xl" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 xl:gap-20">
          <TechnologyIntro className="sticky top-28 hidden max-w-xl lg:block" />

          <div className="grid w-full min-w-0 gap-10 lg:gap-10 xl:grid-cols-2 xl:items-start xl:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: easeSmooth }}
            >
              <TechStackPanel />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.08, ease: easeSmooth }}
            >
              <TechIconCloud variant="side" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
