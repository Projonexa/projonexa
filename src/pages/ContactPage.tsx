import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
} from 'lucide-react'
import { ProjectInquiryHub } from '@/components/contact/ProjectInquiryHub'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import {
  CONTACT_EMAIL,
  CONTACT_FORM_HINTS,
  CONTACT_INFO_CARDS,
  CONTACT_QUICK_LINKS,
  CONTACT_SECTION,
} from '@/data/contact'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const INFO_ICONS = {
  email: Mail,
  location: MapPin,
  response: Clock,
} as const

export function ContactPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.contact} />
      <PageHeader
        eyebrow={CONTACT_SECTION.eyebrow}
        title={CONTACT_SECTION.title}
        description={CONTACT_SECTION.lead}
      />

      <section className="section-padding border-b border-black/[0.04] bg-zinc-50/50 dark:border-white/[0.04] dark:bg-transparent">
        <div className="container-wide">
          <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="lg:sticky lg:top-28"
            >
              <div className="contact-sidebar-panel relative overflow-hidden rounded-2xl border border-black/[0.07] p-5 sm:rounded-3xl sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.05] via-transparent to-brand-secondary/[0.06]"
                />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
                    Get in touch
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
                    We&apos;re here to help
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Whether you&apos;re a student with a submission deadline or a startup planning
                    an MVP — share context upfront so we can respond with the right scope and
                    timeline.
                  </p>

                  <div className="mt-8 space-y-4">
                    {CONTACT_INFO_CARDS.map((card) => {
                      const Icon = INFO_ICONS[card.id]
                      const inner = (
                        <>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                              {card.title}
                            </p>
                            <p className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-white">
                              {card.detail}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {card.description}
                            </p>
                          </div>
                        </>
                      )

                      return card.href ? (
                        <a
                          key={card.id}
                          href={card.href}
                          className="contact-info-card flex gap-3 rounded-2xl border border-black/[0.06] bg-white/50 p-4 transition-colors hover:border-brand-primary/25 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-brand-primary/20"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div
                          key={card.id}
                          className="contact-info-card flex gap-3 rounded-2xl border border-black/[0.06] bg-white/50 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
                        >
                          {inner}
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8 rounded-2xl border border-black/[0.06] bg-white/40 p-4 dark:border-white/[0.08] dark:bg-black/30">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                      <MessageSquare className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
                      Include in your message
                    </p>
                    <ul className="mt-3 space-y-2">
                      {CONTACT_FORM_HINTS.map((hint) => (
                        <li
                          key={hint}
                          className="flex items-start gap-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-sm"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary"
                            aria-hidden
                          />
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {CONTACT_QUICK_LINKS.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="rounded-full border border-black/[0.08] bg-white/60 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:text-brand-accent"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <Button
                    href={`mailto:${CONTACT_EMAIL}`}
                    variant="secondary"
                    className="mt-8 w-full"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    Email directly
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                  </Button>
                </div>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
              className="min-w-0"
            >
              <ProjectInquiryHub />
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
