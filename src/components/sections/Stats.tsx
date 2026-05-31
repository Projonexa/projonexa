import { motion } from 'framer-motion'
import { STATS } from '@/data/brand'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { SectionHeading } from '@/components/ui/SectionHeading'

function StatItem({
  value,
  suffix,
  label,
  start,
}: {
  value: number
  suffix: string
  label: string
  start: boolean
}) {
  const count = useCountUp(value, 2000, start)

  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-gradient sm:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</p>
    </div>
  )
}

export function Stats() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section-padding section-frosted">
      <div className="container-wide">
        <SectionHeading
          frosted
          eyebrow="Impact"
          title="Numbers That Define Our Growth"
          description="Trusted by students, startups, and institutions across India and beyond."
        />
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <StatItem {...stat} start={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
