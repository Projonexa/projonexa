import { FOUNDER, FOUNDER_SECTION } from '@/data/brand'
import { Github, Linkedin, Mail } from 'lucide-react'

import founderPhoto from '@/assets/img/nisargalokhande.png'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface FounderProps {
  variant?: 'section' | 'embedded'
}

export function Founder({ variant = 'section' }: FounderProps) {
  const storyParagraphs = FOUNDER.story.split('\n\n').filter(Boolean)

  const content = (
    <>
      <meta itemProp="name" content={FOUNDER.name} />
      <meta itemProp="jobTitle" content={FOUNDER.role} />
      <link itemProp="image" href={founderPhoto} />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-brand-primary/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-brand-secondary/10 blur-[100px]"
      />

      <div className="container-wide relative mt-8">
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
          className={`founder-panel relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white/55 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-8 lg:p-10 ${
            variant === 'embedded' ? 'mt-6 lg:mt-8' : 'mt-8 lg:mt-10'
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.04] via-transparent to-brand-secondary/[0.05]"
          />

          <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:gap-12">
            <div className="mx-auto w-full max-w-[260px] lg:mx-0 lg:max-w-none">
              <div className="founder-photo-ring relative rounded-2xl p-[3px]">
                <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={founderPhoto}
                    alt={`Portrait of ${FOUNDER.name}, ${FOUNDER.role} of Projonexa`}
                    width={520}
                    height={650}
                    className="aspect-[4/5] h-auto w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                  />
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="border-b border-black/[0.06] pb-6 dark:border-white/[0.08]">
                <h3
                  className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-[1.65rem]"
                  itemProp="name"
                >
                  {FOUNDER.name}
                </h3>
                <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-brand-primary">
                  {FOUNDER.role}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {storyParagraphs.map((p, index) => {
                  const isIntro = index === 0
                  const isMission = p.startsWith('Our mission')

                  if (isMission) {
                    return (
                      <p
                        key={p}
                        className="founder-mission-callout rounded-xl border border-brand-primary/15 bg-brand-primary/[0.06] px-4 py-3.5 text-sm font-medium leading-relaxed text-zinc-800 dark:border-brand-primary/25 dark:bg-brand-primary/10 dark:text-zinc-200 sm:text-[15px]"
                      >
                        {p}
                      </p>
                    )
                  }

                  return (
                    <p
                      key={p.slice(0, 40)}
                      className={
                        isIntro
                          ? 'text-base font-medium leading-relaxed text-zinc-800 dark:text-zinc-200 sm:text-[17px]'
                          : 'text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px] sm:leading-[1.7]'
                      }
                    >
                      {p}
                    </p>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-black/[0.06] pt-8 dark:border-white/[0.08]">
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
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )

  if (variant === 'embedded') {
    return content
  }

  return (
    <section
      className="section-padding section-frosted overflow-hidden"
      aria-labelledby="founder-heading"
      itemScope
      itemType="https://schema.org/Person"
    >
      {content}
    </section>
  )
}
