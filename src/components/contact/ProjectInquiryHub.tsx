import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  corporateInquiryPath,
  INQUIRY_HUB,
  studentInquiryPath,
} from '@/data/projectInquiry'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const cards = [
  {
    id: 'student' as const,
    icon: GraduationCap,
    title: INQUIRY_HUB.studentCard.title,
    description: INQUIRY_HUB.studentCard.description,
    cta: INQUIRY_HUB.studentCard.cta,
    to: studentInquiryPath(),
    accent: 'from-brand-primary/15 to-brand-secondary/10',
  },
  {
    id: 'corporate' as const,
    icon: Briefcase,
    title: INQUIRY_HUB.corporateCard.title,
    description: INQUIRY_HUB.corporateCard.description,
    cta: INQUIRY_HUB.corporateCard.cta,
    to: corporateInquiryPath(),
    accent: 'from-brand-secondary/15 to-brand-primary/10',
  },
]

export function ProjectInquiryHub() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      className="contact-form-panel w-full rounded-3xl p-5 sm:p-8 lg:p-10"
    >
      <div className="mb-8 border-b border-black/[0.06] pb-6 dark:border-white/[0.08]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
          {INQUIRY_HUB.eyebrow}
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
          {INQUIRY_HUB.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {INQUIRY_HUB.lead}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: easeSmooth }}
              className="inquiry-hub-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white/60 p-5 transition-all duration-300 hover:border-brand-primary/25 hover:shadow-[0_16px_40px_-20px_rgba(0,200,255,0.28)] dark:border-white/[0.1] dark:bg-black/35 dark:hover:border-brand-primary/20 sm:p-6"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${card.accent}`}
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/15">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="relative mt-4 text-lg font-bold text-zinc-900 dark:text-white">
                {card.title}
              </h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {card.description}
              </p>
              <div className="relative mt-6">
                <Button to={card.to} variant="primary" className="w-full shadow-glow-sm">
                  {card.cta}
                  <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
                </Button>
              </div>
            </motion.article>
          )
        })}
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-8">
        Prefer email?{' '}
        <Link
          to={studentInquiryPath()}
          className="font-semibold text-brand-primary hover:underline dark:text-brand-accent"
        >
          Student form
        </Link>
        {' · '}
        <Link
          to={corporateInquiryPath()}
          className="font-semibold text-brand-primary hover:underline dark:text-brand-accent"
        >
          Corporate form
        </Link>
      </p>
    </motion.div>
  )
}
