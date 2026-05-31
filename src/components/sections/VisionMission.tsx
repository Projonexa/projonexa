import { motion } from 'framer-motion'
import { Eye, Target } from 'lucide-react'
import { MISSION, VISION, VISION_MISSION_SECTION } from '@/data/brand'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const PILLARS = [
  {
    key: 'vision',
    data: VISION,
    icon: Eye,
    accent: 'primary' as const,
    delay: 0,
  },
  {
    key: 'mission',
    data: MISSION,
    icon: Target,
    accent: 'secondary' as const,
    delay: 0.1,
  },
] as const

function VisionMissionCard({
  title,
  statement,
  icon: Icon,
  accent,
  delay,
}: {
  title: string
  statement: string
  icon: typeof Eye
  accent: 'primary' | 'secondary'
  delay: number
}) {
  const isPrimary = accent === 'primary'

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: easeSmooth }}
      className={`vision-mission-card group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 sm:p-8 lg:p-9 ${
        isPrimary
          ? 'border-brand-primary/20 bg-white/55 dark:border-brand-primary/25 dark:bg-black/40'
          : 'border-brand-secondary/20 bg-white/55 dark:border-brand-secondary/25 dark:bg-black/40'
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-80 ${
          isPrimary
            ? 'bg-gradient-to-br from-brand-primary/[0.08] via-transparent to-brand-secondary/[0.04]'
            : 'bg-gradient-to-br from-brand-secondary/[0.08] via-transparent to-brand-primary/[0.04]'
        }`}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border backdrop-blur-md ${
              isPrimary
                ? 'border-brand-primary/30 bg-brand-primary/10 text-brand-primary'
                : 'border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary dark:text-brand-accent'
            }`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <span
            className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
              isPrimary ? 'text-brand-primary' : 'text-brand-secondary dark:text-brand-accent'
            }`}
          >
            {isPrimary ? 'Vision' : 'Mission'}
          </span>
        </div>

        <h3 className="mt-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
          {title}
        </h3>

        <p className="mt-4 flex-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px] sm:leading-[1.7]">
          {statement}
        </p>

        <div
          aria-hidden
          className={`mt-8 h-1 w-16 rounded-full ${
            isPrimary
              ? 'bg-gradient-to-r from-brand-primary to-brand-primary/20'
              : 'bg-gradient-to-r from-brand-secondary to-brand-secondary/20'
          }`}
        />
      </div>
    </motion.article>
  )
}

interface VisionMissionProps {
  variant?: 'section' | 'embedded'
}

export function VisionMission({ variant = 'section' }: VisionMissionProps) {
  const content = (
    <div className="container-wide">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {VISION_MISSION_SECTION.eyebrow}
              </p>
            </div>
            <h2
              id="vision-mission-heading"
              className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]"
            >
              {VISION_MISSION_SECTION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
            className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            {VISION_MISSION_SECTION.lead}
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-8">
          {PILLARS.map(({ data, icon, accent, delay }) => (
            <VisionMissionCard
              key={data.title}
              title={data.title}
              statement={data.statement}
              icon={icon}
              accent={accent}
              delay={delay}
            />
          ))}
        </div>
      </div>
  )

  if (variant === 'embedded') {
    return content
  }

  return (
    <section
      className="section-padding section-alt overflow-hidden"
      aria-labelledby="vision-mission-heading"
    >
      {content}
    </section>
  )
}
