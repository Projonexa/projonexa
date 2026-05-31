import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Users } from 'lucide-react'
import { CareerApplicationForm } from '@/components/careers/CareerApplicationForm'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { CAREER_ROLES, CAREERS_SECTION } from '@/data/careers'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function CareersPage() {
  const [selectedRoleId, setSelectedRoleId] = useState('open-application')

  const scrollToApply = useCallback((roleId?: string) => {
    if (roleId) setSelectedRoleId(roleId)
    requestAnimationFrame(() => {
      document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <>
      <SEO seo={PAGE_SEO.careers} />
      <PageHeader
        eyebrow={CAREERS_SECTION.eyebrow}
        title={CAREERS_SECTION.title}
        description={CAREERS_SECTION.lead}
      />

      <section className="section-padding border-b border-black/[0.04] bg-zinc-50/50 dark:border-white/[0.04] dark:bg-transparent">
        <div className="container-wide">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
          >
            {CAREERS_SECTION.intro}
          </motion.p>

          <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="primary"
              className="shadow-glow-sm"
              onClick={() => scrollToApply('open-application')}
            >
              <Users className="h-4 w-4" aria-hidden />
              Apply to Join Projonexa
              <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
            </Button>
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 sm:text-left">
              Open to all backgrounds — students, freelancers & professionals
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {CAREER_ROLES.map((role, i) => {
              const Icon = role.icon
              const isSelected = selectedRoleId === role.id
              return (
                <motion.article
                  key={role.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-16px' }}
                  transition={{ duration: 0.4, delay: (i % 5) * 0.04, ease: easeSmooth }}
                  className={`careers-role-card group flex h-full flex-col rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
                    isSelected
                      ? 'border-brand-primary/40 bg-brand-primary/[0.06] shadow-[0_12px_32px_-16px_rgba(0,200,255,0.35)] dark:border-brand-primary/35'
                      : 'border-black/[0.08] bg-white/70 hover:border-brand-primary/25 hover:shadow-md dark:border-white/[0.09] dark:bg-black/40 dark:hover:border-brand-primary/20'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                      isSelected
                        ? 'border-brand-primary/30 bg-brand-primary/15 text-brand-primary'
                        : 'border-black/[0.06] bg-zinc-100 text-brand-primary group-hover:border-brand-primary/20 group-hover:bg-brand-primary/10 dark:border-white/[0.08] dark:bg-white/[0.05]'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-zinc-900 dark:text-white">
                    {role.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {role.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToApply(role.id)}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary transition-colors hover:text-brand-mid dark:text-brand-accent dark:hover:text-white"
                  >
                    Apply for this role
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding scroll-mt-28">
        <div className="container-wide">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
                How it works
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Become a Projonexa member
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                Fill out the application with your role, skills, and availability. We&apos;ll review
                your profile and get back to you if there&apos;s a match with current projects or
                team needs.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                {[
                  'Remote-friendly — work from anywhere in India or globally',
                  'Flexible engagement — freelance, part-time, internship, or full-time',
                  'Real projects — academic, startup, and product work',
                  'Growth-focused — mentorship and portfolio-building opportunities',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <CareerApplicationForm
              selectedRoleId={selectedRoleId}
              onRoleChange={setSelectedRoleId}
            />
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
