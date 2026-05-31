import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { CAREER_ROLES, CAREERS_SECTION, careersApplyPath } from '@/data/careers'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function CareersPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.careers} />
      <PageHeader
        eyebrow={CAREERS_SECTION.eyebrow}
        title={CAREERS_SECTION.title}
        description={CAREERS_SECTION.lead}
      />

      <section className="section-padding">
        <div className="container-wide">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
          >
            {CAREERS_SECTION.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06, ease: easeSmooth }}
            className="mb-10 flex justify-center px-1 sm:mb-12"
          >
            <Button to={careersApplyPath()} variant="primary" className="w-full max-w-md shadow-glow-sm sm:w-auto">
              Apply to Join Projonexa
              <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
            </Button>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {CAREER_ROLES.map((role, i) => {
              const Icon = role.icon
              return (
                <motion.article
                  key={role.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-16px' }}
                  transition={{ duration: 0.4, delay: (i % 5) * 0.04, ease: easeSmooth }}
                  className="careers-role-card group flex h-full flex-col rounded-2xl border border-black/[0.08] bg-white/70 p-4 transition-all duration-300 hover:border-brand-primary/25 hover:shadow-md dark:border-white/[0.09] dark:bg-black/40 dark:hover:border-brand-primary/20 sm:p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-100 text-brand-primary transition-colors group-hover:border-brand-primary/20 group-hover:bg-brand-primary/10 dark:border-white/[0.08] dark:bg-white/[0.05]">
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-zinc-900 dark:text-white">
                    {role.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {role.description}
                  </p>
                  <Link
                    to={careersApplyPath(role.id)}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary transition-colors hover:text-brand-mid dark:text-brand-accent dark:hover:text-white"
                  >
                    Apply for this role
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 flex justify-center border-t border-black/[0.06] pt-12 dark:border-white/[0.08]"
          >
            <Button to={careersApplyPath()} variant="primary" className="shadow-glow-sm">
              Apply to Join Projonexa
              <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
            </Button>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  )
}
