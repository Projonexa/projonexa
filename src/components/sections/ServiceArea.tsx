import {
  GEO,
  SERVICE_AREA_CLIENTS,
  SERVICE_AREA_DELIVERY,
  SERVICE_AREA_REGIONS,
  SERVICE_AREA_SECTION,
} from '@/data/brand'
import {
  Building2,
  Globe2,
  GraduationCap,
  MapPinned,
  Radio,
  Rocket,
  Users
} from 'lucide-react'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const CLIENT_ICONS = [Rocket, Globe2, GraduationCap, Building2] as const

function AreaCard({
  icon: Icon,
  title,
  children,
  delay = 0,
  className = '',
}: {
  icon: typeof Globe2
  title: string
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: easeSmooth }}
      className={`service-area-card flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white/50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-7 ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/25 bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/15">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">{title}</h3>
      <div className="mt-3 flex flex-1 flex-col text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </motion.article>
  )
}

interface ServiceAreaProps {
  /** Home: content only inside ServiceFounderSection shell */
  variant?: 'section' | 'embedded'
}

/** Geographic service area — supports local SEO (GEO) */
export function ServiceArea({ variant = 'section' }: ServiceAreaProps) {
  const content = (
    <>
      <meta itemProp="name" content="Projonexa" />
      <meta itemProp="areaServed" content={GEO.serviceRadius} />
      <meta itemProp="addressRegion" content={GEO.region} />
      <meta itemProp="addressCountry" content={GEO.country} />

      <div className="container-wide">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {SERVICE_AREA_SECTION.eyebrow}
              </p>
            </div>
            <h2
              id="service-area-heading"
              className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]"
            >
              {SERVICE_AREA_SECTION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
            className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            {SERVICE_AREA_SECTION.lead}
          </motion.p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-10">
          {SERVICE_AREA_DELIVERY.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.05, ease: easeSmooth }}
              className="flex gap-3 rounded-xl border border-black/[0.06] bg-white/60 px-4 py-3.5 backdrop-blur-md dark:border-white/[0.07] dark:bg-white/[0.04] sm:px-5 sm:py-4"
            >
              <Radio
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary"
                strokeWidth={2}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[13px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8">
          <AreaCard icon={MapPinned} title="Regions we serve" delay={0.08}>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              End-to-end project delivery at national and international scale.
            </p>
            <ul className="flex flex-col gap-4">
              {SERVICE_AREA_REGIONS.map((region) => (
                <li
                  key={region.label}
                  className="rounded-xl border border-black/[0.06] bg-white/55 px-4 py-3.5 dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <span className="inline-flex rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-primary">
                    {region.label}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {region.description}
                  </p>
                </li>
              ))}
            </ul>
          </AreaCard>

          <AreaCard icon={Users} title="Who we work with" delay={0.12}>
            <ul className="flex flex-col gap-3">
              {SERVICE_AREA_CLIENTS.map((client, i) => {
                const ClientIcon = CLIENT_ICONS[i] ?? Users
                return (
                  <li key={client.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white/70 text-brand-primary dark:border-white/[0.08] dark:bg-black/50">
                      <ClientIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {client.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-zinc-500 dark:text-zinc-500">
                        {client.detail}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </AreaCard>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2, ease: easeSmooth }}
          className="mt-6 flex items-start gap-2 text-center text-xs text-zinc-500 dark:text-zinc-500 sm:items-center sm:justify-center sm:text-sm"
        >
        </motion.p>
      </div>
    </>
  )

  if (variant === 'embedded') {
    return content
  }

  return (
    <section
      className="section-padding section-alt"
      aria-labelledby="service-area-heading"
      itemScope
      itemType="https://schema.org/ProfessionalService"
    >
      {content}
    </section>
  )
}
