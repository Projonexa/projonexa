import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { FAQ_ITEMS } from '@/data/faq'
import { PAGE_SEO } from '@/data/seo'

function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-black/5 dark:border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-zinc-900 dark:text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <SEO seo={PAGE_SEO.faq} />
      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about working with Projonexa — process, deliverables, timelines, and support."
      />
      <section className="section-padding">
        <div className="container-narrow glass rounded-2xl px-6 sm:px-8">
          {FAQ_ITEMS.map((item, i) => (
            <FAQAccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
