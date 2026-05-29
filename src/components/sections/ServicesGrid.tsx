import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SERVICES } from '@/data/services'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

interface ServicesGridProps {
  limit?: number
  showViewAll?: boolean
}

export function ServicesGrid({ limit, showViewAll = false }: ServicesGridProps) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES

  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Services"
          title="End-to-End Project Development"
          description="From mini projects to startup MVPs — comprehensive solutions tailored to your goals."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group glass flex flex-col rounded-2xl p-6 transition-shadow hover:shadow-glow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
        {showViewAll && (
          <div className="mt-12 text-center">
            <Button to="/services" variant="secondary">
              View All Services
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
