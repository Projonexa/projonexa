import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ArrowRight, Check } from 'lucide-react'
import { getServiceAccent, SERVICES, SERVICES_SECTION } from '@/data/services'
import { Button } from '@/components/ui/Button'

interface ServicesGridProps {
  limit?: number
  showViewAll?: boolean
}

const easeSmooth = [0.22, 1, 0.36, 1] as const

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

        <span
          className="pointer-events-none absolute -right-1 -top-3 select-none text-[4.5rem] font-bold leading-none tabular-nums text-black/[0.04] dark:text-white/[0.05]"
          aria-hidden
        >
          {indexLabel}
        </span>

        <div
          className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${accent}28` }}
          aria-hidden
        />

        <div className="relative flex flex-col p-5 sm:p-6">
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
              <span
                className="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold tabular-nums tracking-widest"
                style={{ color: accent, backgroundColor: `${accent}18` }}
              >
                {indexLabel}
              </span>
              <h3 className="mt-2 text-base font-semibold leading-snug text-zinc-900 transition-colors duration-300 group-hover:text-brand-mid dark:text-white dark:group-hover:text-brand-accent sm:text-lg">
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

function ServiceCardSlide({
  service,
  index,
  isLast,
  reducedMotion,
}: {
  service: (typeof SERVICES)[number]
  index: number
  isLast: boolean
  reducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4, margin: '0px 0px -14% 0px' })
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (inView) setOpened(true)
  }, [inView])

  const hidden = reducedMotion
    ? { opacity: 0, y: 12 }
    : { opacity: 0, x: 48, scale: 0.97, filter: 'blur(10px)' }
  const visible = reducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }

  return (
    <div
      ref={ref}
      id={`service-card-${index}`}
      data-service-index={index}
      data-in-view={inView ? 'true' : 'false'}
      className="services-snap-item relative scroll-mt-28"
    >
      <motion.div
        initial={hidden}
        animate={opened ? visible : hidden}
        transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: easeSmooth }}
        className="w-full origin-top"
      >
        <ServiceCard service={service} index={index} />
      </motion.div>

      {!isLast && (
        <div className="flex justify-center py-8 lg:py-10" aria-hidden>
          <div className="h-12 w-px bg-gradient-to-b from-brand-primary/55 via-brand-mid/35 to-transparent" />
        </div>
      )}
    </div>
  )
}

function ServicesVerticalStack({ items }: { items: typeof SERVICES }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = stackRef.current
    if (!root) return

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-service-index]'),
    )
    if (cards.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!best?.target) return
        const idx = Number((best.target as HTMLElement).dataset.serviceIndex)
        if (!Number.isNaN(idx)) setActiveIndex(idx)
      },
      { threshold: [0.2, 0.35, 0.5, 0.65, 0.8], rootMargin: '-18% 0px -28% 0px' },
    )

    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items.length])

  const scrollToCard = useCallback((index: number) => {
    document.getElementById(`service-card-${index}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <div ref={stackRef} className="relative w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
          Scroll — each service card opens as the next one appears below
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium tabular-nums text-zinc-500">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
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

      <div className="flex flex-col gap-0">
        {items.map((service, i) => (
          <ServiceCardSlide
            key={service.id}
            service={service}
            index={i}
            isLast={i === items.length - 1}
            reducedMotion={reducedMotion}
          />
        ))}
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
