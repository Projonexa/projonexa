import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { BRAND, FOUNDER } from '@/data/brand'
import { FOOTER_LINKS } from '@/data/navigation'
import { Logo } from '@/components/ui/Logo'

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="footer-column-title text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-white">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="site-footer relative z-10"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content={BRAND.name} />
      <meta itemProp="url" content={BRAND.url} />
      <link itemProp="sameAs" href={FOUNDER.linkedin} />

      <div className="container-wide section-padding !py-12 sm:!py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
          <div className="min-w-0 lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
              {BRAND.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              End-to-end project development for students, colleges, startups, and businesses —
              across India and globally.
            </p>
            <div className="mt-5 flex items-center gap-1">
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link rounded-lg p-2.5 text-zinc-500 dark:text-zinc-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={FOUNDER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link rounded-lg p-2.5 text-zinc-500 dark:text-zinc-400"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${FOUNDER.email}`}
                className="footer-social-link rounded-lg p-2.5 text-zinc-500 dark:text-zinc-400"
                aria-label="Email"
                itemProp="email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-10">
            <FooterColumn title="Company">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link text-sm text-zinc-600 dark:text-zinc-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Resources">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.resources.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link text-sm text-zinc-600 dark:text-zinc-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Contact">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link text-sm text-zinc-600 dark:text-zinc-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${FOUNDER.email}`}
                    className="footer-link inline-flex items-start gap-2 break-all text-sm text-zinc-600 dark:text-zinc-400"
                    itemProp="email"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary dark:text-brand-accent" aria-hidden />
                    {FOUNDER.email}
                  </a>
                </li>
                <li
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary dark:text-brand-accent"
                    aria-hidden
                  />
                  <span>
                    <span itemProp="addressRegion">Maharashtra</span>,{' '}
                    <span itemProp="addressCountry">India</span>
                  </span>
                </li>
              </ul>
            </FooterColumn>
          </div>
        </div>

        <div className="footer-divider mt-10 flex flex-col items-center justify-between gap-3 pt-8 text-center sm:mt-12 sm:flex-row sm:gap-4 sm:text-left">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Founded by {FOUNDER.name} · {FOUNDER.location}
          </p>
        </div>
      </div>

      <div className="footer-wordmark" aria-hidden>
        <p className="footer-wordmark-display" data-text={BRAND.name}>
          {BRAND.name}
        </p>
      </div>
    </footer>
  )
}
