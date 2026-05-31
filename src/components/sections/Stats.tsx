import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  GraduationCap,
  Layers3,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { STATS } from '@/data/brand'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STAT_META: { icon: LucideIcon; accent: string }[] = [
  { icon: FolderKanban, accent: '#00C8FF' },
  { icon: Users, accent: '#6C63FF' },
  { icon: Layers3, accent: '#3D8BFF' },
  { icon: GraduationCap, accent: '#67E8F9' },
]

const CYCLE_MS = 5500

function StatSpotlight({
  index,
  start,
  paused,
}: {
  index: number
  start: boolean
  paused: boolean
}) {
  const stat = STATS[index]
  const meta = STAT_META[index] ?? STAT_META[0]
  const Icon = meta.icon
  const count = useCountUp(stat.value, 1800, start)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!start || paused) return
    setProgress(0)
    const started = performance.now()
    let frame: number

    const tick = (now: number) => {
      const p = Math.min((now - started) / CYCLE_MS, 1)
      setProgress(p)
      if (p < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [index, start, paused])

  return (
    <div className="relative flex min-h-[280px] flex-col justify-between p-8 sm:min-h-[320px] sm:p-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 20% 0%, ${meta.accent}22, transparent 65%)`,
        }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow-sm"
          style={{
            background: `linear-gradient(135deg, ${meta.accent}35, ${meta.accent}12)`,
            boxShadow: `0 8px 32px -8px ${meta.accent}55`,
          }}
        >
          <Icon className="h-7 w-7" style={{ color: meta.accent }} strokeWidth={2} aria-hidden />
        </div>
        <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-mid dark:text-brand-accent">
          Impact
        </span>
      </div>

      <div className="relative mt-8">
        <p className="tabular-nums text-5xl font-bold leading-none tracking-tight text-gradient sm:text-6xl lg:text-7xl">
          {count}
          <span>{stat.suffix}</span>
        </p>
        <h3 className="mt-5 text-xl font-semibold text-zinc-900 dark:text-white sm:text-2xl">
          {stat.label}
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {stat.description}
        </p>
      </div>

      <div className="relative mt-8">
        <div className="h-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="mt-3 text-xs font-medium tabular-nums text-zinc-500 dark:text-zinc-500">
          {String(index + 1).padStart(2, '0')} / {String(STATS.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}

export function Stats() {
  const { ref, inView } = useInView()
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + STATS.length) % STATS.length)
  }, [])

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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          {/* Left — section story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="section-heading-panel max-w-xl text-left">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
                Impact
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Numbers That Define Our Growth
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Trusted by students, startups, and institutions across India and beyond.
              </p>
            </div>

            <nav
              className="mt-10 hidden flex-col gap-2 sm:flex"
              aria-label="Impact metrics"
            >
              {STATS.map((stat, i) => {
                const isActive = i === activeIndex
                const meta = STAT_META[i]
                const Icon = meta.icon
                return (
                  <button
                    key={stat.label}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`group flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-brand-primary/30 bg-white/60 shadow-glow-sm backdrop-blur-md dark:border-brand-primary/35 dark:bg-black/50'
                        : 'border-transparent bg-transparent hover:border-black/[0.06] hover:bg-white/40 dark:hover:border-white/[0.06] dark:hover:bg-black/30'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isActive ? 'bg-brand-gradient text-white' : 'bg-black/[0.04] dark:bg-white/[0.06]'
                      }`}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={isActive ? undefined : { color: meta.accent }}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-semibold ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}
                      >
                        {stat.label}
                      </p>
                      <p className="tabular-nums text-xs text-zinc-500">
                        {stat.value}
                        {stat.suffix}
                      </p>
                    </div>
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full transition-all ${
                        isActive ? 'scale-100 bg-brand-primary' : 'scale-75 bg-zinc-300 dark:bg-zinc-600'
                      }`}
                      aria-hidden
                    />
                  </button>
                )
              })}
            </nav>
          </motion.div>

          {/* Right — cycling spotlight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute inset-0 rounded-3xl bg-brand-gradient p-px">
              <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-white/40 backdrop-blur-xl dark:bg-black/40" />
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] shadow-card dark:border-white/[0.08] dark:shadow-card-dark">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StatSpotlight
                    index={activeIndex}
                    start={inView}
                    paused={paused || reducedMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {STATS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-8 bg-brand-gradient'
                        : 'w-2 bg-zinc-300 hover:bg-brand-primary/50 dark:bg-zinc-600'
                    }`}
                    aria-label={`Show metric ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 text-zinc-700 backdrop-blur-md transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-black/45 dark:text-zinc-300"
                  aria-label="Previous metric"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 text-zinc-700 backdrop-blur-md transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-black/45 dark:text-zinc-300"
                  aria-label="Next metric"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mobile metric picker */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:hidden">
              {STATS.map((stat, i) => (
                <button
                  key={stat.label}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    i === activeIndex
                      ? 'bg-brand-gradient text-white'
                      : 'bg-white/60 text-zinc-600 dark:bg-black/45 dark:text-zinc-400'
                  }`}
                >
                  {stat.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
