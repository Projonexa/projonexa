import { motion } from 'framer-motion'
import { TECHNOLOGIES, TECH_CATEGORIES } from '@/data/technologies'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function TechnologyShowcase() {
  return (
    <section className="section-padding bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Technology"
          title="Built With Industry-Leading Stack"
          description="We leverage modern, battle-tested technologies to deliver scalable, maintainable solutions."
        />
        {TECH_CATEGORIES.map((cat) => {
          const items = TECHNOLOGIES.filter((t) => t.category === cat.id)
          return (
            <div key={cat.id} className="mb-10 last:mb-0">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((tech, i) => (
                  <motion.div
                    key={`${cat.id}-${tech.name}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group cursor-default rounded-xl border border-black/5 bg-white px-5 py-3 shadow-sm transition-all hover:border-brand-primary/40 hover:shadow-glow dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{ backgroundColor: tech.color === '#FFFFFF' ? '#3d8bff' : tech.color }}
                      >
                        {tech.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-brand-primary">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
