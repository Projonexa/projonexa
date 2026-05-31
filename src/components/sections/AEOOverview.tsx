import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { AEO_HOME_FAQ } from '@/data/seo'
import {
  AEO_DEFINITION,
  AEO_HIGHLIGHTS,
  AEO_SECTION,
} from '@/data/brand'

function FaqItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <article
      className={`glass overflow-hidden rounded-2xl transition-shadow duration-300 ${
        isOpen ? 'shadow-glow-sm ring-1 ring-brand-primary/20' : ''
      }`}
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={isOpen}
        aria-controls={`aeo-answer-${index}`}
        id={`aeo-q-${index}`}
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-xs font-bold tabular-nums text-brand-mid dark:text-brand-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="min-w-0 flex-1">
          <h3
            className="text-base font-semibold leading-snug text-zinc-900 dark:text-white sm:text-lg"
            itemProp="name"
          >
            {question}
          </h3>
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-brand-primary' : ''
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`aeo-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <div className="border-t border-black/[0.05] px-5 pb-5 pt-4 dark:border-white/[0.06] sm:px-6 sm:pb-6">
              <p
                className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base"
                itemProp="text"
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

/** Visible Q&A block optimized for search engines and AI answer systems (AEO) */
export function AEOOverview() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      className="section-padding section-frosted"
      aria-labelledby="aeo-overview-heading"
    >
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 xl:gap-20">
          {/* Left — overview */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {AEO_SECTION.eyebrow}
              </p>
            </div>

            <h2
              id="aeo-overview-heading"
              className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]"
            >
              {AEO_SECTION.title}
            </h2>

            <p className="mt-4 text-lg font-medium text-zinc-700 dark:text-zinc-300">
              {AEO_SECTION.lead}
            </p>

            <p
              id="aeo-definition"
              className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
            >
              {AEO_DEFINITION}
            </p>

            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {AEO_SECTION.summary}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {AEO_HIGHLIGHTS.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-black/[0.06] bg-white/40 px-4 py-3.5 backdrop-blur-sm dark:border-white/[0.08] dark:bg-black/35"
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
              Common questions
            </p>

            <div className="space-y-3">
              {AEO_HOME_FAQ.map((item, i) => (
                <FaqItem
                  key={item.question}
                  index={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-black/[0.06] pt-8 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Need more detail? Browse our full FAQ or reach out directly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/50 px-5 py-2.5 text-sm font-semibold text-zinc-800 backdrop-blur-sm transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-black/40 dark:text-zinc-100"
                >
                  FAQ
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-opacity hover:opacity-95"
                >
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
