import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { CareerApplicationForm } from '@/components/careers/CareerApplicationForm'
import { SEO } from '@/components/seo/SEO'
import { CAREERS_APPLY_SECTION, getCareerRoleById, resolveCareerRoleId } from '@/data/careers'
import { BRAND } from '@/data/brand'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function CareersApplyPage() {
  const [searchParams] = useSearchParams()
  const roleParam = searchParams.get('role')
  const roleId = resolveCareerRoleId(roleParam)
  const role = getCareerRoleById(roleId)

  return (
    <div className="careers-apply-page min-h-[80vh]">
      <SEO
        seo={{
          ...PAGE_SEO.careersApply,
          title: role?.title
            ? `Apply — ${role.title} | ${BRAND.name}`
            : PAGE_SEO.careersApply.title,
        }}
      />

      <section className="relative border-b border-black/[0.06] bg-zinc-50/80 pt-24 backdrop-blur-sm dark:border-white/[0.06] dark:bg-zinc-950/90 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-primary/[0.04] via-transparent to-transparent"
        />
        <div className="container-narrow relative px-4 pb-8 sm:px-6 sm:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeSmooth }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-brand-primary/25 hover:bg-brand-primary/10 hover:text-brand-mid dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:text-brand-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to careers
            </Link>

            <nav
              aria-label="Breadcrumb"
              className="mt-5 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
            >
              <Link
                to="/careers"
                className="font-medium transition-colors hover:text-brand-primary dark:hover:text-brand-accent"
              >
                Careers
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
              <span className="font-semibold text-zinc-900 dark:text-white">Apply</span>
            </nav>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-accent">
              {CAREERS_APPLY_SECTION.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {CAREERS_APPLY_SECTION.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {CAREERS_APPLY_SECTION.lead}
            </p>
            {role && role.id !== 'open-application' && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1.5 text-sm font-semibold text-brand-mid dark:text-brand-accent">
                Applying for: {role.title}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="section-padding !pt-8 sm:!pt-10">
        <div className="container-narrow px-4 sm:px-6">
          <CareerApplicationForm initialRoleId={roleId} variant="standalone" />
        </div>
      </section>
    </div>
  )
}
