import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { FOUNDER, FOUNDER_SECTION } from '@/data/brand'
import { Button } from '@/components/ui/Button'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function Founder() {
  const storyParagraphs = FOUNDER.story.split('\n\n')

  return (
    <section
      className="section-padding section-frosted"
      aria-labelledby="founder-heading"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content={FOUNDER.name} />
      <meta itemProp="jobTitle" content={FOUNDER.role} />

      <div className="container-wide">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {FOUNDER_SECTION.eyebrow}
              </p>
            </div>
            <h2
              id="founder-heading"
              className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]"
            >
              {FOUNDER_SECTION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
            className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            {FOUNDER_SECTION.lead}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: easeSmooth }}
          className="founder-panel mx-auto mt-10 max-w-3xl rounded-3xl border border-black/[0.07] bg-white/50 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-10 lg:mt-12"
        >
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
            <div
              className="mb-6 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-3xl font-bold text-white shadow-glow sm:mb-0"
              aria-hidden
            >
              NL
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {FOUNDER.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-primary">{FOUNDER.role}</p>
              <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 sm:justify-start">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-primary" aria-hidden />
                {FOUNDER.location}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-black/[0.06] pt-8 text-sm leading-relaxed text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400 sm:text-[15px] sm:leading-relaxed">
            {storyParagraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button href={FOUNDER.linkedin} variant="outline">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            <Button href={FOUNDER.github} variant="ghost">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button href={`mailto:${FOUNDER.email}`} variant="ghost">
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
