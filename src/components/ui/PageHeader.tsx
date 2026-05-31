import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  description: string
  eyebrow?: string
}

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <section className="page-header-band relative overflow-hidden">
      <div className="container-narrow relative px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-primary"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-pretty text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
