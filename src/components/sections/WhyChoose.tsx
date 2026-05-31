import { motion } from 'framer-motion'
import {
  BadgeDollarSign,
  BookOpen,
  Boxes,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Rocket,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { WHY_CHOOSE, WHY_PILLARS, WHY_SECTION } from '@/data/brand'

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

const PILLAR_ACCENTS = ['#00c8ff', '#6c63ff', '#00e5a0'] as const

export function WhyChoose() {
  return (
    <section
      className="section-padding section-frosted overflow-hidden"
      aria-labelledby="why-projonexa-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-brand-primary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-secondary/10 blur-[90px]"
      />

      <div className="container-wide relative">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: easeSmooth }}
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
              className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]"
            >
              {WHY_SECTION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.06, ease: easeSmooth }}
            className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300 lg:pb-1"
          >
            {WHY_SECTION.lead}
          </motion.p>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeSmooth }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {WHY_PILLARS.map((pillar, i) => (
            <li
              key={pillar.label}
              className="why-pillar-card group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white/50 p-5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 80% 70% at 0% 0%, ${PILLAR_ACCENTS[i]}18, transparent 70%)`,
                }}
              />
              <span
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold tabular-nums text-white shadow-glow-sm"
                style={{ background: `linear-gradient(135deg, ${PILLAR_ACCENTS[i]}, ${PILLAR_ACCENTS[i]}99)` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="relative mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                {pillar.label}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {pillar.description}
              </p>
            </li>
          ))}
        </motion.ul>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = WHY_ICONS[i] ?? Layers
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i * 0.04, 0.28),
                  ease: easeSmooth,
                }}
                className="why-choose-card group relative"
              >
                <div className="relative flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white/55 p-5 backdrop-blur-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-black/45 sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/0 via-transparent to-brand-secondary/0 opacity-0 transition-opacity duration-300 group-hover:from-brand-primary/[0.06] group-hover:to-brand-secondary/[0.05] group-hover:opacity-100"
                  />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/15 bg-brand-primary/10 text-brand-primary transition-transform duration-300 group-hover:scale-105 dark:border-brand-primary/25 dark:bg-brand-primary/15">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="relative mt-4 text-base font-semibold leading-snug text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                  <span
                    aria-hidden
                    className="relative mt-4 block h-px w-8 bg-gradient-to-r from-brand-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
