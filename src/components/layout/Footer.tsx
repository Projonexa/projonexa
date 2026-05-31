import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { BRAND, FOUNDER } from '@/data/brand'
import { FOOTER_LINKS } from '@/data/navigation'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <h3 className="footer-column-title text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="site-footer-premium relative z-10"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content={BRAND.name} />
      <meta itemProp="url" content={BRAND.url} />
      <link itemProp="sameAs" href={FOUNDER.linkedin} />

      <div className="container-wide section-padding !pb-0 !pt-12 sm:!pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-5">
            <div className="footer-brand-panel rounded-2xl p-6 sm:rounded-3xl sm:p-8">
              <Logo />
              <p className="mt-5 text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
                {BRAND.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                End-to-end project development for students, colleges, startups, and businesses —
                across India and globally.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/contact" variant="primary" className="px-5 py-2.5 text-xs shadow-glow-sm sm:text-sm">
                  Start a project
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Button>
                <Button to="/services" variant="outline" className="px-5 py-2.5 text-xs sm:text-sm">
                  Our services
                </Button>
              </div>
              <div className="mt-6 flex gap-2.5">
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 dark:text-zinc-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-[1.15rem] w-[1.15rem]" />
                </a>
                <a
                  href={FOUNDER.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 dark:text-zinc-400"
                  aria-label="GitHub"
                >
                  <Github className="h-[1.15rem] w-[1.15rem]" />
                </a>
                <a
                  href={`mailto:${FOUNDER.email}`}
                  className="footer-social-btn flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 dark:text-zinc-400"
                  aria-label="Email"
                  itemProp="email"
                >
                  <Mail className="h-[1.15rem] w-[1.15rem]" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:gap-6 xl:gap-10">
            <FooterColumn title="Company">
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Resources">
              <ul className="space-y-3">
                {FOOTER_LINKS.resources.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Support">
              <ul className="space-y-3">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 space-y-3">
                <li>
                  <a
                    href={`mailto:${FOUNDER.email}`}
                    className="footer-contact-chip flex items-start gap-3 rounded-xl p-3.5 break-all"
                    itemProp="email"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                      <Mail className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                        Email
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {FOUNDER.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div
                    className="footer-contact-chip flex items-center gap-3 rounded-xl p-3.5"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                        Location
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        <span itemProp="addressRegion">Maharashtra</span>,{' '}
                        <span itemProp="addressCountry">India</span>
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
            </FooterColumn>
          </div>
        </div>

        <div className="footer-bottom-bar -mx-4 mt-10 flex flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:mx-0 sm:mt-12 sm:flex-row sm:rounded-2xl sm:px-6 sm:py-5 sm:text-left">
          <p className="text-xs text-zinc-500 dark:text-zinc-500 sm:text-sm">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-500 sm:justify-end sm:text-sm">
            <span>Founded by {FOUNDER.name}</span>
            <span className="hidden text-zinc-300 sm:inline dark:text-zinc-600" aria-hidden>
              ·
            </span>
            <span>{FOUNDER.location}</span>
          </p>
        </div>

        <div className="h-6 sm:h-8" aria-hidden />
      </div>
    </footer>
  )
}
