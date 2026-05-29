import { motion } from 'framer-motion'
import { WHY_CHOOSE } from '@/data/brand'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function WhyChoose() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Why Projonexa"
          title="The Premium Choice for Project Excellence"
          description="We combine technical depth, academic rigor, and startup velocity in every engagement."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {WHY_CHOOSE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 5) * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
