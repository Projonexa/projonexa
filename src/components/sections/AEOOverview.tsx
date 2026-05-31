import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AEO_HOME_FAQ } from '@/data/seo'
import { AEO_DEFINITION } from '@/data/brand'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Visible Q&A block optimized for search engines and AI answer systems (AEO) */
export function AEOOverview() {
  return (
    <section
      className="section-padding section-surface"
      aria-labelledby="aeo-overview-heading"
    >
      <div className="container-wide">
        <SectionHeading
          eyebrow="About Projonexa"
          title="What Is Projonexa?"
          description="Clear answers for students, clients, colleges, and search engines."
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-4xl text-center text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
          id="aeo-definition"
        >
          {AEO_DEFINITION}
        </motion.p>

        <div className="mx-auto max-w-4xl space-y-6">
          {AEO_HOME_FAQ.map((item, i) => (
            <motion.article
              key={item.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 sm:p-8"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3
                className="text-lg font-semibold text-zinc-900 dark:text-white"
                itemProp="name"
                id={`aeo-q-${i}`}
              >
                {item.question}
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p
                  className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base"
                  itemProp="text"
                >
                  {item.answer}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-500">
          More questions? Visit our{' '}
          <Link to="/faq" className="font-medium text-brand-primary hover:underline">
            FAQ page
          </Link>{' '}
          or{' '}
          <Link to="/contact" className="font-medium text-brand-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
