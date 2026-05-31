import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { FAQCategoryNav, FAQSection } from '@/components/sections/FAQSection'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/data/brand'
import { FAQ_CATEGORIES, FAQ_SECTION } from '@/data/faq'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function FAQPage() {
  const [openId, setOpenId] = useState<string | null>('getting-started-0')
  const [activeCategory, setActiveCategory] = useState<string | null>(FAQ_CATEGORIES[0]?.id ?? null)

  return (
    <>
      <SEO seo={PAGE_SEO.faq} />
      <PageHeader
        eyebrow={FAQ_SECTION.eyebrow}
        title={FAQ_SECTION.title}
        description={FAQ_SECTION.lead}
      />

      <section
        className="section-padding border-b border-black/[0.04] bg-zinc-50/50 dark:border-white/[0.04] dark:bg-transparent"
        aria-labelledby="faq-page-heading"
      >
        <h2 id="faq-page-heading" className="sr-only">
          Projonexa frequently asked questions
        </h2>

        <div className="container-wide" itemScope itemType="https://schema.org/FAQPage">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="mx-auto mb-10 max-w-3xl"
          >
            <FAQCategoryNav
              categories={FAQ_CATEGORIES}
              activeId={activeCategory}
              onSelect={setActiveCategory}
            />
          </motion.div>

          <div className="mx-auto flex max-w-4xl flex-col gap-10 sm:gap-12 lg:gap-14">
            {FAQ_CATEGORIES.map((category, index) => (
              <FAQSection
                key={category.id}
                category={category}
                categoryIndex={index}
                openId={openId}
                onToggle={setOpenId}
              />
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="faq-help-panel relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-black/[0.07] p-5 sm:mt-14 sm:rounded-3xl sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.06] via-transparent to-brand-secondary/[0.06]"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-primary">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                    Still have questions?
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Tell us about your project, deadline, or career interest — we&apos;ll reply with
                    clear next steps.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:shrink-0 sm:items-end">
                <Button to="/contact" variant="primary" className="w-full shadow-glow-sm sm:w-auto">
                  Contact us
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {BRAND.email}
                </a>
                <Link
                  to="/careers/apply"
                  className="text-center text-xs font-medium text-zinc-500 hover:text-brand-primary dark:text-zinc-400 dark:hover:text-brand-accent sm:text-right"
                >
                  Applying to join the team? Go to application form →
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <CTA />
    </>
  )
}
