import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STATS, STATS_SECTION } from '@/data/brand'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const COUNT_DURATION_MS = 3000
const HOLD_AFTER_COUNT_MS = 2000

const slideTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

const contentStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

const fadeUpItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

function StatSpotlight({
  index,
  start,
  paused,
  reducedMotion,
  onSequenceComplete,
}: {
  index: number
  start: boolean
  paused: boolean
  reducedMotion: boolean
  onSequenceComplete: () => void
}) {
  const stat = STATS[index]
  const [countDone, setCountDone] = useState(false)
  const holdTimerRef = useRef<number | null>(null)

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    setCountDone(false)
    clearHoldTimer()
  }, [index, clearHoldTimer])

  useEffect(() => () => clearHoldTimer(), [clearHoldTimer])

  const handleCountComplete = useCallback(() => {
    setCountDone(true)
  }, [])

  const countDuration = reducedMotion ? 0 : COUNT_DURATION_MS
  const count = useCountUp(stat.value, countDuration, start, handleCountComplete)

  useEffect(() => {
    if (!countDone || !start || paused) {
      clearHoldTimer()
      return
    }

    holdTimerRef.current = window.setTimeout(() => {
      onSequenceComplete()
    }, HOLD_AFTER_COUNT_MS)

    return clearHoldTimer
  }, [countDone, start, paused, onSequenceComplete, clearHoldTimer])

  return (
    <motion.div
      className="py-2 lg:py-4"
      variants={contentStagger}
      initial="initial"
      animate="animate"
    >
      <motion.p
        variants={fadeUpItem}
        className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary"
      >
        Impact
      </motion.p>

      <motion.p
        variants={fadeUpItem}
        className="mt-6 tabular-nums text-5xl font-bold leading-none tracking-tight text-gradient sm:text-6xl lg:text-7xl"
      >
        {count}
        <span>{stat.suffix}</span>
      </motion.p>

      <motion.h3
        variants={fadeUpItem}
        className="mt-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl"
      >
        {stat.label}
      </motion.h3>

      <motion.hr
        variants={fadeUpItem}
        className="mt-5 h-px border-0 bg-gradient-to-r from-brand-primary/60 via-brand-mid/40 to-transparent dark:from-brand-primary/50 dark:via-brand-mid/30"
      />

      <motion.p
        variants={fadeUpItem}
        className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
      >
        {stat.description}
      </motion.p>
    </motion.div>
  )
}

export function Stats() {
  const { ref, inView } = useInView()
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % STATS.length)
  }, [])

  const handleSequenceComplete = useCallback(() => {
    if (!inView || pausedRef.current) return
    advance()
  }, [inView, advance])

  const slideVariants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: 32, filter: 'blur(10px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: -28, filter: 'blur(8px)' },
      }

  return (
    <section ref={ref} className="section-padding section-frosted">
      <div className="container-wide">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-24">
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

            <h2 className="section-display-title mt-5">
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
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={slideTransition}
              >
                <StatSpotlight
                  index={activeIndex}
                  start={inView}
                  paused={paused}
                  reducedMotion={reducedMotion}
                  onSequenceComplete={handleSequenceComplete}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
