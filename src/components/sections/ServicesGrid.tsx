import { useCallback, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ArrowRight, Check } from 'lucide-react'
import { getServiceAccent, SERVICES, SERVICES_SECTION } from '@/data/services'
import { Button } from '@/components/ui/Button'

interface ServicesGridProps {
  limit?: number
  showViewAll?: boolean
}

const easeSmooth = [0.22, 1, 0.36, 1] as const
const SCROLL_VH_PER_CARD = 52
const PEEK_Y = 18
const STACK_SCALE_STEP = 0.024
const POP_Y = 130
const POP_X = 110

function getDeckState(progress: number, index: number, total: number) {
  const activeFloat = Math.min(progress * total, total - 1 + 0.998)
  const activeIndex = Math.min(Math.floor(activeFloat), total - 1)
  const popT = activeIndex === total - 1 ? 0 : activeFloat - activeIndex

  if (index < activeIndex) {
    const dir = index % 2 === 0 ? 1 : -1
    return { phase: 'popped' as const, popT: 1, dir, stackDepth: 0 }
  }
  if (index === activeIndex) {
    const dir = index % 2 === 0 ? 1 : -1
    return { phase: 'popping' as const, popT, dir, stackDepth: 0 }
  }
  return {
    phase: 'stacked' as const,
    popT,
    dir: index % 2 === 0 ? 1 : -1,
    stackDepth: index - activeIndex,
  }
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const Icon = service.icon
  const accent = getServiceAccent(index)
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <article className="group relative flex w-full flex-col">
      <div
        className="absolute inset-0 rounded-[1.25rem] opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent}55, transparent 45%, ${accent}33)`,
        }}
        aria-hidden
      />

      <div className="relative flex flex-col overflow-hidden rounded-[1.2rem] border border-black/[0.07] bg-white/55 shadow-card backdrop-blur-xl transition-all duration-300 group-hover:border-brand-primary/25 group-hover:shadow-glow-sm dark:border-white/[0.09] dark:bg-black/45 dark:shadow-card-dark">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80 transition-opacity group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute right-4 top-4 flex flex-col items-end sm:right-5 sm:top-5"
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            Service
          </span>
          <span
            className="mt-0.5 text-4xl font-bold leading-none tabular-nums tracking-tight sm:text-[2.75rem]"
            style={{ color: `${accent}4d` }}
          >
            {indexLabel}
          </span>
        </div>

        <div
          className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${accent}28` }}
          aria-hidden
        />

        <div className="relative flex flex-col p-5 pr-16 sm:p-6 sm:pr-20">
          <div className="mb-4 flex items-start gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-black/[0.06] transition-transform duration-300 group-hover:scale-105 dark:ring-white/[0.08]"
              style={{
                background: `linear-gradient(145deg, ${accent}40, ${accent}12)`,
                boxShadow: `0 8px 28px -10px ${accent}88`,
              }}
            >
              <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={2} aria-hidden />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-base font-semibold leading-snug text-zinc-900 transition-colors duration-300 group-hover:text-brand-mid dark:text-white dark:group-hover:text-brand-accent sm:text-lg">
                {service.title}
              </h3>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[0.95rem]">
            {service.description}
          </p>

          <div className="mt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              What&apos;s included
            </p>
            <ul className="flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <li key={d}>
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-black/[0.06] bg-white/60 px-2.5 py-1.5 text-[11px] font-medium leading-tight text-zinc-600 backdrop-blur-sm transition-colors duration-300 group-hover:border-brand-primary/15 group-hover:bg-white/80 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-zinc-300 dark:group-hover:border-brand-primary/20 sm:text-xs">
                    <Check className="h-3 w-3 shrink-0" style={{ color: accent }} aria-hidden />
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

function ServiceDeckCard({
  service,
  index,
  total,
  scrollProgress,
  reducedMotion,
}: {
  service: (typeof SERVICES)[number]
  index: number
  total: number
  scrollProgress: MotionValue<number>
  reducedMotion: boolean
}) {
  const y = useTransform(scrollProgress, (p) => {
    const { phase, popT, stackDepth } = getDeckState(p, index, total)
    if (phase === 'popped') return -POP_Y
    if (phase === 'popping') return -popT * POP_Y
    const baseY = PEEK_Y * stackDepth
    return baseY - popT * PEEK_Y
  })

  const x = useTransform(scrollProgress, (p) => {
    const { phase, popT, dir } = getDeckState(p, index, total)
    if (phase === 'popped') return dir * POP_X
    if (phase === 'popping') return dir * popT * POP_X
    return 0
  })

  const scale = useTransform(scrollProgress, (p) => {
    const { phase, popT, stackDepth } = getDeckState(p, index, total)
    if (phase === 'popping') return 1 + popT * 0.05
    if (phase === 'popped') return 1.04
    const base = 1 - STACK_SCALE_STEP * stackDepth
    return base + popT * STACK_SCALE_STEP
  })

  const opacity = useTransform(scrollProgress, (p) => {
    const { phase, popT, stackDepth } = getDeckState(p, index, total)
    if (phase === 'popped') return 0
    if (phase === 'popping') return Math.max(0, 1 - popT * 1.15)
    return Math.max(0.5, 1 - stackDepth * 0.09)
  })

  const rotate = useTransform(scrollProgress, (p) => {
    const { phase, popT, dir } = getDeckState(p, index, total)
    if (phase === 'popping') return dir * popT * 2.5
    if (phase === 'popped') return dir * 4
    return 0
  })

  const filter = useTransform(scrollProgress, (p) => {
    const { phase, stackDepth, popT } = getDeckState(p, index, total)
    if (phase === 'popped' || phase === 'popping') {
      const blur = phase === 'popping' ? popT * 6 : 8
      return `blur(${blur}px)`
    }
    if (stackDepth > 2) return `blur(${Math.min(2, (stackDepth - 2) * 0.6)}px)`
    return 'blur(0px)'
  })

  const zIndex = useTransform(scrollProgress, (p) => {
    const { phase, stackDepth } = getDeckState(p, index, total)
    if (phase === 'popped') return 0
    return total - stackDepth + 10
  })

  if (reducedMotion) {
    return (
      <ReducedDeckCard
        service={service}
        index={index}
        total={total}
        scrollProgress={scrollProgress}
      />
    )
  }

  const pointerEvents = useTransform(scrollProgress, (p) => {
    const { phase, stackDepth } = getDeckState(p, index, total)
    return phase !== 'popped' && stackDepth === 0 ? 'auto' : 'none'
  })

  return (
    <motion.div
      className="absolute left-0 right-0 top-0 w-full origin-top will-change-transform"
      style={{ y, x, scale, opacity, rotateZ: rotate, filter, zIndex, pointerEvents }}
    >
      <ServiceCard service={service} index={index} />
    </motion.div>
  )
}

function ReducedDeckCard({
  service,
  index,
  total,
  scrollProgress,
}: {
  service: (typeof SERVICES)[number]
  index: number
  total: number
  scrollProgress: MotionValue<number>
}) {
  const opacity = useTransform(scrollProgress, (p) => {
    const active = Math.min(Math.floor(p * total), total - 1)
    return index === active ? 1 : index > active ? 0.72 : 0
  })

  const y = useTransform(scrollProgress, (p) => {
    const active = Math.min(Math.floor(p * total), total - 1)
    if (index < active) return -24
    if (index === active) return 0
    return (index - active) * PEEK_Y
  })

  const zIndex = useTransform(scrollProgress, (p) => {
    const active = Math.min(Math.floor(p * total), total - 1)
    if (index < active) return 0
    return total - (index - active) + 10
  })

  return (
    <motion.div
      className="absolute left-0 right-0 top-0 w-full"
      style={{ y, opacity, zIndex }}
    >
      <ServiceCard service={service} index={index} />
    </motion.div>
  )
}

function ServicesVerticalStack({ items }: { items: typeof SERVICES }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const total = items.length
  const peekStackHeight = Math.min(total - 1, 5) * PEEK_Y

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const idx = Math.min(Math.floor(p * total), total - 1)
    setActiveIndex(idx)
  })

  const scrollToCard = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el) return
      const segment = el.offsetHeight / total
      const top = el.offsetTop + segment * index + 8
      window.scrollTo({ top, behavior: 'smooth' })
    },
    [total],
  )

  return (
    <div className="relative w-full">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-sm text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
          Scroll down — top card pops off to reveal the next in the stack
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium tabular-nums text-zinc-500">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToCard(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-7 bg-brand-gradient'
                    : 'w-2 bg-zinc-300 hover:bg-brand-primary/50 dark:bg-zinc-600'
                }`}
                aria-label={`Jump to service ${i + 1}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="services-deck-scroll relative"
        style={{ height: `${total * SCROLL_VH_PER_CARD}vh` }}
      >
        <div className="sticky top-28">
          <div
            className="services-deck-stage relative mx-auto w-full max-w-xl lg:max-w-none"
            style={{
              minHeight: `calc(420px + ${peekStackHeight}px)`,
            }}
          >
            {items.map((service, i) => (
              <ServiceDeckCard
                key={service.id}
                service={service}
                index={i}
                total={total}
                scrollProgress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ServicesIntro({ showViewAll, className = '' }: { showViewAll: boolean; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: easeSmooth }}
      className={className}
    >
      <div className="flex items-center gap-3">
        <span
          className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
          aria-hidden
        />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {SERVICES_SECTION.eyebrow}
        </p>
      </div>

      <h2 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]">
        {SERVICES_SECTION.title}
      </h2>

      <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
        {SERVICES_SECTION.lead}
      </p>

      <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {SERVICES_SECTION.body}
      </p>

      {showViewAll && (
        <div className="mt-8">
          <Button to="/services" variant="primary" className="shadow-glow-sm">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export function ServicesGrid({ limit, showViewAll = false }: ServicesGridProps) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES
  const isHomePreview = Boolean(limit)

  if (!isHomePreview) {
    return (
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {SERVICES_SECTION.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {SERVICES_SECTION.title}
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {SERVICES_SECTION.lead}
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-24px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: easeSmooth }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <ServiceCard service={service} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="lg:hidden">
          <ServicesIntro showViewAll={false} className="mb-10 max-w-xl" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
          <ServicesIntro
            showViewAll={showViewAll}
            className="sticky top-28 hidden max-w-xl lg:block"
          />

          <div className="w-full min-w-0">
            <ServicesVerticalStack items={items} />

            {showViewAll && (
              <div className="mt-10 text-center lg:hidden">
                <Button to="/services" variant="primary" className="w-full shadow-glow-sm sm:w-auto">
                  View All Services
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
