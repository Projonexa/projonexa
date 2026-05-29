import { motion } from 'framer-motion'
import { BookOpen, FileSearch, PenLine, Send } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { PAGE_SEO } from '@/data/seo'

const RESEARCH_SERVICES = [
  {
    icon: FileSearch,
    title: 'Topic Selection & Literature Review',
    description:
      'Identify high-impact research gaps with comprehensive literature surveys and citation management.',
  },
  {
    icon: PenLine,
    title: 'Methodology & Implementation',
    description:
      'Design rigorous methodologies with reproducible experiments, datasets, and statistical analysis.',
  },
  {
    icon: BookOpen,
    title: 'Paper Writing & Formatting',
    description:
      'IEEE, Springer, and Scopus-ready manuscripts with proper structure, figures, and references.',
  },
  {
    icon: Send,
    title: 'Submission & Publication Support',
    description:
      'Journal selection, cover letters, reviewer response drafting, and plagiarism verification.',
  },
]

export function ResearchPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.research} />
      <PageHeader
        eyebrow="Research"
        title="Research Paper Assistance & Academic Publishing"
        description="End-to-end research support for students and scholars — from ideation to publication-ready papers."
      />
      <section className="section-padding">
        <div className="container-wide grid gap-6 sm:grid-cols-2">
          {RESEARCH_SERVICES.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-8"
              >
                <Icon className="h-8 w-8 text-brand-primary" />
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-12 text-center">
          <Button to="/contact">Discuss Your Research</Button>
        </div>
      </section>
      <CTA />
    </>
  )
}
