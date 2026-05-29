import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  description: string
  eyebrow?: string
}

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-zinc-50 pt-32 pb-16 dark:border-white/5 dark:bg-brand-dark">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,200,255,0.12)_0%,_transparent_60%)]" />
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
          className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
