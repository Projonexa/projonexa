import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TECH_CATEGORIES,
  TECHNOLOGIES,
  getTechnologiesByCategory,
  type TechCategory,
} from '@/data/technologies'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechIconCloud } from '@/components/sections/TechIconCloud'
import { TechCard } from '@/components/sections/TechCard'

type Filter = TechCategory | 'all'

export function TechnologyShowcase() {
  const [active, setActive] = useState<Filter>('all')

  const filtered = useMemo(() => getTechnologiesByCategory(active), [active])

  const sortedCategories = useMemo(
    () => [...TECH_CATEGORIES].sort((a, b) => a.order - b.order),
    [],
  )

  return (
    <section
      className="relative overflow-hidden section-padding bg-zinc-50 dark:bg-zinc-950/50"
      aria-labelledby="tech-showcase-heading"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,200,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeading
          eyebrow="Technology"
          title="Built With Industry-Leading Stack"
          description="70+ modern technologies — from frontend and AI to cloud and IoT — powering projects for students and clients worldwide."
        />

        {/* Interactive 3D icon cloud */}
        <div className="relative mx-auto mb-12 sm:mb-16">
          <TechIconCloud />
        </div>

        {/* Stats strip */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Technologies', value: `${TECHNOLOGIES.length}` },
            { label: 'Categories', value: `${TECH_CATEGORIES.length}` },
            { label: 'Domains', value: '10+' },
            { label: 'Global Reach', value: 'India & Worldwide' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl px-4 py-3 text-center"
            >
              <p className="text-lg font-bold text-gradient">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <FilterChip
            label="All"
            active={active === 'all'}
            onClick={() => setActive('all')}
            count={TECHNOLOGIES.length}
          />
          {sortedCategories.map((cat) => {
            const count = TECHNOLOGIES.filter((t) => t.category === cat.id).length
            return (
              <FilterChip
                key={cat.id}
                label={cat.label}
                active={active === cat.id}
                onClick={() => setActive(cat.id)}
                count={count}
              />
            )
          })}
        </div>

        {/* Tech grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {filtered.map((tech, i) => (
              <TechCard key={tech.id} tech={tech} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 text-center text-sm text-zinc-500">
          Logos provided via{' '}
          <a
            href="https://simpleicons.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline"
          >
            Simple Icons
          </a>
          . Custom stacks available for every college syllabus and project requirement.
        </p>
      </div>
    </section>
  )
}

function FilterChip({
  label,
  active,
  onClick,
  count,
}: {
  label: string
  active: boolean
  onClick: () => void
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
        active
          ? 'bg-brand-gradient text-white shadow-glow'
          : 'border border-black/10 bg-white text-zinc-600 hover:border-brand-primary/40 hover:text-brand-primary dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400'
      }`}
    >
      {label}
      <span
        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
          active ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'
        }`}
      >
        {count}
      </span>
    </button>
  )
}
