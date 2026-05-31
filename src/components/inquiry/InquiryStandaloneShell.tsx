import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { ApplyPageBrand } from '@/components/careers/ApplyPageBrand'
import { SEO } from '@/components/seo/SEO'
import { useTheme } from '@/context/ThemeContext'
import type { PageSEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface InquiryStandaloneShellProps {
  seo: PageSEO
  eyebrow: string
  title: string
  description?: string
  badge?: string
  backTo: string
  backLabel: string
  children: ReactNode
}

export function InquiryStandaloneShell({
  seo,
  eyebrow,
  title,
  description,
  badge,
  backTo,
  backLabel,
  children,
}: InquiryStandaloneShellProps) {
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="careers-apply-standalone relative min-h-screen text-zinc-900 dark:text-zinc-100">
      <SEO seo={seo} />

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
        className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/80 text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:text-brand-accent sm:right-6 sm:top-6"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-14 sm:pb-12 sm:pt-14">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeSmooth }}
          className="mb-6 shrink-0 text-center sm:mb-8"
        >
          <ApplyPageBrand />
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-accent sm:mt-6 sm:text-xs">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:mt-3 sm:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
          {badge && (
            <p className="mx-auto mt-3 max-w-full break-words rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold text-brand-mid dark:text-brand-accent sm:mt-4 sm:px-4 sm:text-sm">
              {badge}
            </p>
          )}
        </motion.header>

        <main className="w-full min-w-0 flex-1">{children}</main>

        <footer className="mt-8 flex shrink-0 justify-center pb-1 sm:mt-10">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-brand-primary dark:text-zinc-400 dark:hover:text-brand-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel}
          </Link>
        </footer>
      </div>
    </div>
  )
}
