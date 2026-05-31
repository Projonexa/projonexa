import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { BRAND } from '@/data/brand'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const fadeUp = (delay: number, reduced: boolean) =>
  reduced
    ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
      }

function HeroTagline({ reducedMotion }: { reducedMotion: boolean }) {
  const { prefix, bridge, suffix } = BRAND.taglineHero

  return (
    <motion.div
      {...fadeUp(0, reducedMotion)}
      className="mb-10 w-full max-w-2xl"
      aria-label={BRAND.tagline}
    >
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <span
          className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-brand-primary/70 sm:w-16"
          aria-hidden
        />
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-500 sm:text-xs">
          {BRAND.name}
        </p>
        <span
          className="h-px w-10 shrink-0 bg-gradient-to-l from-transparent to-brand-primary/70 sm:w-16"
          aria-hidden
        />
      </div>

      <div className="mt-5 flex flex-col items-center gap-1 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-1">
        <span className="text-base font-medium tracking-tight text-zinc-600 dark:text-zinc-400 sm:text-lg">
          {prefix}
        </span>
        <span className="relative px-1 text-2xl font-bold tracking-tight sm:text-[1.65rem]">
          <span className="text-gradient">{bridge}</span>
          <span
            className="pointer-events-none absolute -inset-x-3 -inset-y-1 rounded-full bg-brand-primary/10 blur-md dark:bg-brand-primary/15"
            aria-hidden
          />
        </span>
        <span className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-200 sm:text-lg">
          {suffix}
        </span>
      </div>

      <p className="sr-only">{BRAND.tagline}</p>
    </motion.div>
  )
}

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-16 sm:min-h-screen">
      <div className="container-wide relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[calc(100vh-4rem)] sm:px-6 sm:py-24 lg:px-8">
        <HeroTagline reducedMotion={reducedMotion} />

        <motion.h1
          {...fadeUp(0.08, reducedMotion)}
          className="max-w-5xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
        >
          Transform Your Ideas Into{' '}
          <span className="text-gradient">Real-World Innovation</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.16, reducedMotion)}
          className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl sm:leading-relaxed"
        >
          From academic projects to startup solutions, Projonexa helps students, innovators,
          startups, and businesses build impactful technology products.
        </motion.p>

        <motion.div
          {...fadeUp(0.22, reducedMotion)}
          className="mt-6 inline-flex max-w-xl flex-wrap items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-4 py-2.5 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur-md dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-zinc-300"
        >
          <span className="text-base leading-none" role="img" aria-label="India">
            🇮🇳
          </span>
          <span>Serving students &amp; clients across India</span>
          <span className="hidden text-zinc-300 sm:inline dark:text-zinc-600" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-primary" aria-hidden />
            Based in Maharashtra
          </span>
        </motion.div>

        <motion.div
          {...fadeUp(0.3, reducedMotion)}
          className="mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <Button
            to="/services"
            variant="primary"
            className="w-full px-8 py-3.5 text-base shadow-glow sm:w-auto"
          >
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            to="/contact"
            variant="outline"
            className="w-full border-zinc-300/80 bg-white/70 text-zinc-800 backdrop-blur-sm hover:border-brand-primary/40 hover:bg-brand-primary/5 hover:text-brand-mid dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-100 dark:hover:border-brand-primary/50 dark:hover:bg-brand-primary/10 dark:hover:text-brand-accent sm:w-auto"
          >
            Get Started
          </Button>
        </motion.div>

        {!reducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
            aria-hidden
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                Scroll
              </span>
              <motion.div
                className="h-10 w-px bg-gradient-to-b from-brand-primary/60 to-transparent"
                animate={{ scaleY: [1, 0.6, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
