import { motion } from 'framer-motion'
import type { TechItem } from '@/data/technologies'
import { TECH_CATEGORIES } from '@/data/technologies'
import { TechLogo } from '@/components/ui/TechLogo'

interface TechCardProps {
  tech: TechItem
  index: number
}

function categoryLabel(category: TechItem['category']) {
  return TECH_CATEGORIES.find((c) => c.id === category)?.label ?? category
}

export function TechCard({ tech, index }: TechCardProps) {
  const glowColor = tech.color.startsWith('#') ? tech.color : `#${tech.color}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: (index % 12) * 0.03, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/80 p-5 backdrop-blur-sm transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/60"
        style={{
          ['--glow' as string]: glowColor,
        }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}22 0%, transparent 70%)`,
          }}
        />

        {/* Shine sweep on hover */}
        <div className="pointer-events-none absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:animate-none group-hover:translate-x-[200%]" />

        <div className="relative flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-black/5 bg-zinc-50 transition-all duration-300 group-hover:border-brand-primary/30 group-hover:shadow-glow dark:border-white/10 dark:bg-zinc-800/80"
            style={{
              boxShadow: `0 4px 24px -4px ${glowColor}33`,
            }}
          >
            <TechLogo
              tech={tech}
              size="md"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 transition-colors group-hover:text-brand-primary dark:text-white">
              {tech.name}
            </h4>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              {categoryLabel(tech.category)}
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-3/4"
          style={{ backgroundColor: glowColor }}
        />
      </div>
    </motion.article>
  )
}
