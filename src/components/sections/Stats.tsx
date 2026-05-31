import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STATS, STATS_SECTION } from '@/data/brand'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const CYCLE_MS = 5500

function StatSpotlight({ index, start }: { index: number; start: boolean }) {
  const stat = STATS[index]
  const count = useCountUp(stat.value, 1800, start)

  return (
    <div className="py-2 lg:py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
        Impact
      </p>

      <p className="mt-6 tabular-nums text-5xl font-bold leading-none tracking-tight text-gradient sm:text-6xl lg:text-7xl">
        {count}
        <span>{stat.suffix}</span>
      </p>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
        {stat.label}
      </h3>

      <hr className="mt-6 h-px border-0 bg-gradient-to-r from-brand-primary/60 via-brand-mid/40 to-transparent dark:from-brand-primary/50 dark:via-brand-mid/30" />

      <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
        {stat.description}
      </p>
    </div>
  )
}

export function Stats() {
  const { ref, inView } = useInView()
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % STATS.length)
  }, [])

  useEffect(() => {
    if (!inView || paused || reducedMotion) return
    const timer = window.setInterval(advance, CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [inView, paused, reducedMotion, advance])

  return (
    <section ref={ref} className="section-padding section-frosted">
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {STATS_SECTION.eyebrow}
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]">
              {STATS_SECTION.title}
            </h2>

            <p className="mt-5 text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
              {STATS_SECTION.lead}
            </p>

            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {STATS_SECTION.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pl-4 xl:pl-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <StatSpotlight index={activeIndex} start={inView} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
