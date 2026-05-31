import { motion } from 'framer-motion'
import {
  FolderKanban,
  GraduationCap,
  Layers3,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { STATS } from '@/data/brand'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { SectionHeading } from '@/components/ui/SectionHeading'

const STAT_ICONS: LucideIcon[] = [FolderKanban, Users, Layers3, GraduationCap]

function StatCard({
  value,
  suffix,
  label,
  description,
  icon: Icon,
  start,
  index,
}: {
  value: number
  suffix: string
  label: string
  description: string
  icon: LucideIcon
  start: boolean
  index: number
}) {
  const count = useCountUp(value, 2000, start)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-glow-sm sm:p-7"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-primary/10 blur-2xl transition-opacity duration-300 group-hover:bg-brand-primary/15"
        aria-hidden
      />

      <div className="relative mb-5 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow-sm">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        </div>
        <span className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-mid dark:text-brand-accent">
          Impact
        </span>
      </div>

      <p className="tabular-nums text-4xl font-bold leading-none tracking-tight text-gradient sm:text-[2.65rem]">
        {count}
        <span>{suffix}</span>
      </p>

      <h3 className="mt-4 text-base font-semibold leading-snug text-zinc-900 dark:text-white">
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </motion.article>
  )
}

export function Stats() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section-padding section-frosted">
      <div className="container-wide">
        <SectionHeading
          frosted
          eyebrow="Impact"
          title="Numbers That Define Our Growth"
          description="Trusted by students, startups, and institutions across India and beyond."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              icon={STAT_ICONS[i] ?? FolderKanban}
              start={inView}
              index={i}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-500"
        >
          Growing with every project, partnership, and student we support across India.
        </motion.p>
      </div>
    </section>
  )
}
