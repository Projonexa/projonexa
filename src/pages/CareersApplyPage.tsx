import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { ApplyPageBrand } from '@/components/careers/ApplyPageBrand'
import { CareerApplicationForm } from '@/components/careers/CareerApplicationForm'
import { SEO } from '@/components/seo/SEO'
import { useTheme } from '@/context/ThemeContext'
import { BRAND } from '@/data/brand'
import { CAREERS_APPLY_SECTION, getCareerRoleById, resolveCareerRoleId } from '@/data/careers'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function CareersApplyPage() {
  const [searchParams] = useSearchParams()
  const roleParam = searchParams.get('role')
  const roleId = resolveCareerRoleId(roleParam)
  const role = getCareerRoleById(roleId)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="careers-apply-standalone relative min-h-screen text-zinc-900 dark:text-zinc-100">
      <SEO
        seo={{
          ...PAGE_SEO.careersApply,
          title: role?.title
            ? `Apply — ${role.title} | ${BRAND.name}`
            : PAGE_SEO.careersApply.title,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.06] via-transparent to-brand-secondary/[0.08] dark:from-brand-primary/[0.08] dark:to-brand-secondary/[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[100px] dark:bg-brand-primary/15"
      />

      <button
        type="button"
        onClick={toggleTheme}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/80 text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:text-brand-accent sm:right-6 sm:top-6"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-10 sm:px-6 sm:py-14">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeSmooth }}
          className="mb-8 text-center sm:mb-10"
        >
          <ApplyPageBrand />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-brand-accent">
            {CAREERS_APPLY_SECTION.eyebrow}
          </p>
          <h1 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
            {CAREERS_APPLY_SECTION.title}
          </h1>
          {role && role.id !== 'open-application' && (
            <p className="mx-auto mt-4 inline-flex max-w-full items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1.5 text-sm font-semibold text-brand-mid dark:text-brand-accent">
              Role: {role.title}
            </p>
          )}
        </motion.header>

        <main className="flex flex-1 flex-col justify-center">
          <CareerApplicationForm initialRoleId={roleId} variant="standalone" />
        </main>

        <footer className="mt-10 flex justify-center pb-2 sm:mt-12">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-brand-primary dark:text-zinc-400 dark:hover:text-brand-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to careers
          </Link>
        </footer>
      </div>
    </div>
  )
}
