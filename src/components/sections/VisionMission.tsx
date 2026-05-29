import { motion } from 'framer-motion'
import { Eye, Target } from 'lucide-react'
import { MISSION, VISION } from '@/data/brand'

export function VisionMission() {
  return (
    <section className="section-padding">
      <div className="container-wide grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-8 lg:p-10"
        >
          <Eye className="mb-4 h-8 w-8 text-brand-primary" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Our Vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{VISION}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 p-8 lg:p-10"
        >
          <Target className="mb-4 h-8 w-8 text-brand-secondary" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{MISSION}</p>
        </motion.div>
      </div>
    </section>
  )
}
