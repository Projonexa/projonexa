import { motion } from 'framer-motion'
import { Award, Github, Linkedin, Mail } from 'lucide-react'
import { ACHIEVEMENTS, FOUNDER } from '@/data/brand'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function Founder() {
  const storyParagraphs = FOUNDER.story.split('\n\n')

  return (
    <section className="section-padding section-surface">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Founder"
          title="Meet the Vision Behind Projonexa"
          description="Student entrepreneur, software engineer, and innovation leader."
        />
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 lg:p-10"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-gradient text-3xl font-bold text-white shadow-glow">
              NL
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{FOUNDER.name}</h3>
            <p className="mt-1 text-brand-primary">{FOUNDER.title}</p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {storyParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
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

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Achievements</h3>
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass flex items-start gap-4 rounded-2xl p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">{a.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{a.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
