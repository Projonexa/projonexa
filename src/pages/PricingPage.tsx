import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { PRICING_PLANS } from '@/data/pricing'
import { PAGE_SEO } from '@/data/seo'

export function PricingPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.pricing} />
      <PageHeader
        eyebrow="Pricing"
        title="Transparent Plans for Every Ambition"
        description="Student-friendly pricing with enterprise-grade deliverables. Every plan is customized to your scope — contact us for a detailed quote."
      />
      <section className="section-padding">
        <div className="container-wide grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col rounded-2xl p-6 ${
                plan.highlighted
                  ? 'border-2 border-brand-primary bg-brand-primary/5 shadow-glow'
                  : 'glass'
              }`}
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{plan.description}</p>
              <p className="mt-6">
                <span className="text-3xl font-bold text-gradient">{plan.price}</span>
                <span className="ml-1 text-sm text-zinc-500">/{plan.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/contact" variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full">
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
