import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container-narrow relative overflow-hidden rounded-2xl bg-brand-gradient px-5 py-12 text-center shadow-glow sm:rounded-3xl sm:px-12 sm:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <h2 className="relative text-pretty text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Ready to Build Something Extraordinary?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/90">
          Join hundreds of students and innovators who trust Projonexa to turn their ideas into
          reality. Your next breakthrough starts with a conversation.
        </p>
        <div className="relative mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Button to="/contact" variant="secondary" className="w-full !bg-white !text-brand-dark sm:w-auto">
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            to="/pricing"
            variant="outline"
            className="w-full !border-white/40 !text-white hover:!bg-white/10 sm:w-auto"
          >
            View Pricing
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
