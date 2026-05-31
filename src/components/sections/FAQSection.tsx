import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import type { FAQCategory } from '@/data/faq'

const easeSmooth = [0.22, 1, 0.36, 1] as const

function FAQAccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <article
      className={`faq-accordion-item overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? 'border-brand-primary/30 bg-brand-primary/[0.05] shadow-[0_8px_28px_-16px_rgba(0,200,255,0.25)] dark:border-brand-primary/25 dark:bg-brand-primary/[0.08]'
          : 'border-black/[0.07] bg-white/60 hover:border-brand-primary/20 dark:border-white/[0.08] dark:bg-black/35 dark:hover:border-brand-primary/15'
      }`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <h3 className="sr-only">{question}</h3>
      <button
        type="button"
        id={`${id}-button`}
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-5"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
      >
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
            isOpen
              ? 'border-brand-primary/30 bg-brand-primary/15 text-brand-primary'
              : 'border-black/[0.06] bg-zinc-100 text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-zinc-400'
          }`}
          aria-hidden
        >
          <HelpCircle className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1 pt-0.5">
          <span
            className="block text-sm font-semibold leading-snug text-zinc-900 dark:text-white sm:text-[0.95rem]"
            itemProp="name"
          >
            {question}
          </span>
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-brand-primary transition-transform duration-300 dark:text-brand-accent ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeSmooth }}
            className="overflow-hidden"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <p
              className="border-t border-black/[0.05] px-4 pb-4 pt-3 text-sm leading-relaxed text-zinc-600 dark:border-white/[0.06] dark:text-zinc-300 sm:px-5 sm:pb-5 sm:pl-[4.25rem]"
              itemProp="text"
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

interface FAQSectionProps {
  category: FAQCategory
  categoryIndex: number
  openId: string | null
  onToggle: (id: string | null) => void
}

export function FAQSection({ category, categoryIndex, openId, onToggle }: FAQSectionProps) {
  return (
    <motion.section
      id={`faq-${category.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: categoryIndex * 0.04, ease: easeSmooth }}
      className="scroll-mt-header"
      aria-labelledby={`faq-${category.id}-heading`}
    >
      <div className="mb-5 flex flex-col gap-2 sm:mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
          {String(categoryIndex + 1).padStart(2, '0')}
        </p>
        <h2
          id={`faq-${category.id}-heading`}
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl"
        >
          {category.title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {category.description}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {category.items.map((item, itemIndex) => {
          const itemId = `${category.id}-${itemIndex}`
          return (
            <FAQAccordionItem
              key={itemId}
              id={itemId}
              question={item.question}
              answer={item.answer}
              isOpen={openId === itemId}
              onToggle={() => onToggle(openId === itemId ? null : itemId)}
            />
          )
        })}
      </div>
    </motion.section>
  )
}

interface FAQCategoryNavProps {
  categories: FAQCategory[]
  activeId: string | null
  onSelect: (id: string) => void
}

export function FAQCategoryNav({ categories, activeId, onSelect }: FAQCategoryNavProps) {
  return (
    <nav
      aria-label="FAQ categories"
      className="faq-category-nav -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none sm:flex-wrap sm:justify-center"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => {
            onSelect(category.id)
            document.getElementById(`faq-${category.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
            activeId === category.id
              ? 'border-brand-primary/40 bg-brand-primary/15 text-brand-mid dark:text-brand-accent'
              : 'border-black/[0.08] bg-white/70 text-zinc-600 hover:border-brand-primary/25 hover:text-brand-primary dark:border-white/[0.1] dark:bg-black/40 dark:text-zinc-300 dark:hover:text-brand-accent'
          }`}
        >
          {category.title}
        </button>
      ))}
    </nav>
  )
}
