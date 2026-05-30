import { TechLogo } from '@/components/ui/TechLogo'
import { TECH_CATEGORIES, TECHNOLOGIES, type TechItem } from '@/data/technologies'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function TechStackPanel() {
  const grouped = useMemo(() => {
    return [...TECH_CATEGORIES]
      .sort((a, b) => a.order - b.order)
      .map((category) => ({
        ...category,
        items: TECHNOLOGIES.filter((t) => t.category === category.id),
      }))
      .filter((group) => group.items.length > 0)
  }, [])

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="mb-5 shrink-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
          Our tech stack
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {TECHNOLOGIES.length}+ tools and frameworks we use to ship production-grade projects for
          students, colleges, and clients.
        </p>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-950/80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950/80"
        />

        <div className="tech-stack-scroll max-h-[min(72vh,680px)] space-y-6 overflow-y-auto pr-1 pb-2 mt-2 lg:max-h-[min(78vh,720px)]">
          {grouped.map((group, groupIndex) => (
            <motion.section
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
            >
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {group.label}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-brand-primary/30 to-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                {group.items.map((tech, index) => (
                  <TechStackTile key={tech.id} tech={tech} index={index} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  )
}

function TechStackTile({ tech, index }: { tech: TechItem; index: number }) {
  const glowColor = tech.color.startsWith('#') ? tech.color : `#${tech.color}`

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: (index % 6) * 0.04, duration: 0.35 }}
      whileHover={{ y: -3 }}
      className="group relative"
    >
      <div
        className="relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-black/5 bg-white/80 px-2.5 py-2.5 backdrop-blur-sm transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/70 group-hover:border-brand-primary/25 group-hover:shadow-glow sm:gap-3 sm:px-3 sm:py-3"
        title={tech.name}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 0% 50%, ${glowColor}18 0%, transparent 65%)`,
          }}
        />

        <div
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/5 bg-zinc-50 transition-all duration-300 group-hover:scale-105 dark:border-white/10 dark:bg-zinc-800/80 sm:h-10 sm:w-10"
          style={{ boxShadow: `0 2px 16px -4px ${glowColor}33` }}
        >
          <TechLogo tech={tech} size="sm" className="sm:h-7 sm:w-7" />
        </div>

        <span className="relative min-w-0 truncate text-xs font-semibold text-zinc-800 transition-colors group-hover:text-brand-primary dark:text-zinc-100 sm:text-sm">
          {tech.name}
        </span>

        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
          style={{ backgroundColor: glowColor }}
        />
      </div>
    </motion.article>
  )
}
