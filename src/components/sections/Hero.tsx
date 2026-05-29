import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { BRAND } from '@/data/brand'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,200,255,0.15),transparent)]" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-brand-secondary/20 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-brand-primary/15 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container-wide relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5 text-sm font-medium text-brand-primary"
        >
          <Sparkles className="h-4 w-4" />
          {BRAND.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Transform Your Ideas Into{' '}
          <span className="text-gradient">Real-World Innovation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl"
        >
          From academic projects to startup solutions, Projonexa helps students, innovators,
          researchers, and businesses build impactful technology products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/services" variant="primary">
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button to="/contact" variant="outline">
            Get Started
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {['100+ Projects', '150+ Experts', '10+ Domains', '500+ Students'].map((item) => (
            <div
              key={item}
              className="glass rounded-2xl px-4 py-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
