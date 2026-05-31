import { type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  BadgeDollarSign,
  BookOpen,
  Boxes,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Rocket,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { WHY_BENEFIT_GROUPS, WHY_CHOOSE, WHY_PILLARS, WHY_SECTION } from '@/data/brand'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const WHY_ICONS: LucideIcon[] = [
  Layers,
  FileText,
  Users,
  BookOpen,
  Boxes,
  Zap,
  Rocket,
  GraduationCap,
  BadgeDollarSign,
  Globe,
]

const PILLAR_ICONS = [Code2, GraduationCap, Rocket] as const
const PILLAR_ACCENTS = ['#00c8ff', '#6c63ff', '#00e5a0'] as const

function BenefitStep({
  icon: Icon,
  title,
  hint,
  delay,
}: {
  icon: LucideIcon
  title: string
  hint: string
  delay: number
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay, ease: easeSmooth }}
      title={hint}
      className="why-tree-step group relative flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-brand-primary/15 hover:bg-white/50 dark:hover:bg-white/[0.04]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-primary/15 bg-brand-primary/10 text-brand-primary dark:border-brand-primary/25 dark:bg-brand-primary/15">
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0 text-xs font-semibold leading-snug text-zinc-800 dark:text-zinc-200 sm:text-[13px]">
        {title}
      </span>
    </motion.li>
  )
}

function PillarColumn({
  pillarIndex,
  inViewDelay,
}: {
  pillarIndex: number
  inViewDelay: number
}) {
  const pillar = WHY_PILLARS[pillarIndex]
  const PillarIcon = PILLAR_ICONS[pillarIndex]
  const accent = PILLAR_ACCENTS[pillarIndex]
  const benefitIndices = WHY_BENEFIT_GROUPS[pillarIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: inViewDelay, ease: easeSmooth }}
      className="why-tree-column relative flex flex-col"
      style={{ '--pillar-accent': accent } as CSSProperties}
    >
      <div
        className="why-tree-pillar relative z-[1] mx-auto flex w-full max-w-[220px] flex-col items-center rounded-xl border border-black/[0.06] bg-white/70 px-3 py-3 text-center backdrop-blur-md dark:border-white/[0.08] dark:bg-black/50"
        style={{ borderTopColor: accent, borderTopWidth: 2 }}
      >
        <span
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-glow-sm"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}
        >
          <PillarIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{pillar.label}</h3>
        <p className="mt-1 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {pillar.description}
        </p>
      </div>

      <div className="relative z-[1] mx-auto mt-4 flex w-full max-w-[220px] flex-1 flex-col">
        <ul className="flex flex-col gap-1.5">
          {benefitIndices.map((benefitIndex, i) => {
            const item = WHY_CHOOSE[benefitIndex]
            const Icon = WHY_ICONS[benefitIndex] ?? Layers
            return (
              <BenefitStep
                key={item.title}
                icon={Icon}
                title={item.title}
                hint={item.description}
                delay={inViewDelay + 0.08 + i * 0.04}
              />
            )
          })}
        </ul>
      </div>
    </motion.div>
  )
}

interface WhyChooseProps {
  variant?: 'section' | 'grouped'
  className?: string
}

export function WhyChoose({ variant = 'section', className }: WhyChooseProps) {
  const content = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-brand-primary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-secondary/10 blur-[90px]"
      />

      <div className="container-wide relative">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
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
                {WHY_SECTION.eyebrow}
              </p>
            </div>
            <h2
              id="why-projonexa-heading"
              className="section-display-title mt-5"
            >
              {WHY_SECTION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
            className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            {WHY_SECTION.lead}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: easeSmooth }}
          className="why-tree-panel relative mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-black/[0.07] bg-white/45 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-8"
        >
          <div className="why-tree-hub-row flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="why-tree-hub relative z-[2] flex flex-col items-center text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-primary/30 bg-white/80 shadow-glow-sm backdrop-blur-md dark:bg-black/55">
                <Sparkles className="h-6 w-6 text-brand-primary" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-primary">
                Start
              </span>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-3 md:gap-6">
            <PillarColumn pillarIndex={0} inViewDelay={0.12} />
            <PillarColumn pillarIndex={1} inViewDelay={0.18} />
            <PillarColumn pillarIndex={2} inViewDelay={0.24} />
          </div>
        </motion.div>
      </div>
    </>
  )

  if (variant === 'grouped') {
    return (
      <div
        className={className ? `relative ${className}` : 'relative'}
        aria-labelledby="why-projonexa-heading"
      >
        {content}
      </div>
    )
  }

  return (
    <section
      className={
        className
          ? `section-padding section-frosted overflow-hidden ${className}`
          : 'section-padding section-frosted overflow-hidden'
      }
      aria-labelledby="why-projonexa-heading"
    >
      {content}
    </section>
  )
}
