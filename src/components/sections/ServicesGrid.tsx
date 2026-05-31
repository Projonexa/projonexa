import { motion } from 'framer-motion'
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
  compact,
}: {
  service: (typeof SERVICES)[number]
  index: number
  compact: boolean
}) {
  const Icon = service.icon
  const accent = getServiceAccent(index)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.45, delay: (index % (compact ? 2 : 3)) * 0.07, ease: easeSmooth }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col"
    >
      <div className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-shadow duration-300 group-hover:shadow-glow-sm sm:p-6">
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `${accent}30` }}
          aria-hidden
        />

        <div className="relative mb-4 flex items-start justify-between gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-glow-sm"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
            }}
          >
            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
          </div>
          <span className="text-[10px] font-bold tabular-nums tracking-wider text-zinc-400 dark:text-zinc-500">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="relative text-base font-semibold leading-snug text-zinc-900 transition-colors duration-300 group-hover:text-brand-mid dark:text-white dark:group-hover:text-brand-accent sm:text-lg">
          {service.title}
        </h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {service.description}
        </p>

        <ul className="relative mt-4 space-y-2 border-t border-black/[0.06] pt-4 dark:border-white/[0.06]">
          {service.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400"
            >
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                style={{ color: accent }}
                aria-hidden
              />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

function ServicesIntro({ showViewAll }: { showViewAll: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: easeSmooth }}
      className="max-w-xl lg:sticky lg:top-28"
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
        <div className="mt-8 hidden lg:block">
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
              <ServiceCard key={service.id} service={service} index={i} compact={false} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 xl:gap-20">
          <ServicesIntro showViewAll={showViewAll} />

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: easeSmooth }}
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {items.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} compact />
              ))}
            </div>

            {showViewAll && (
              <div className="mt-8 text-center lg:hidden">
                <Button to="/services" variant="primary" className="w-full shadow-glow-sm sm:w-auto">
                  View All Services
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
