import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react'
import { NAV_LINKS } from '@/data/navigation'
import { useTheme } from '@/context/ThemeContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { isNavLinkActive } from '@/lib/navigation'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

function ThemeToggleButton({
  theme,
  onToggle,
  className = '',
}: {
  theme: string
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`site-header-icon-btn flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="h-[1.15rem] w-[1.15rem]" /> : <Moon className="h-[1.15rem] w-[1.15rem]" />}
    </button>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useBodyScrollLock(open)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    let ticking = false

    const updateScrolled = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setScrolled(scrollTop > 8)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateScrolled)
      }
    }

    updateScrolled()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const header = (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <header
        className={`site-header-shell ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-menu-open' : ''}`}
      >
        <div className="container-wide flex h-[4.25rem] shrink-0 items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Logo className="shrink-0" />

          <nav
            className="site-header-nav hidden items-center gap-0.5 rounded-full p-1 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(location.pathname, link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`site-header-nav-link px-3.5 py-2 text-[13px] font-semibold tracking-tight ${
                    active
                      ? 'is-active'
                      : 'text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
            <Button to="/contact" variant="primary" className="px-5 py-2.5 text-[13px] shadow-glow-sm">
              Get Started
              <ArrowRight className="h-3.5 w-3.5 opacity-90" aria-hidden />
            </Button>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`site-header-icon-btn flex h-10 w-10 items-center justify-center rounded-full ${
                open ? 'text-brand-primary dark:text-brand-accent' : 'text-zinc-800 dark:text-white'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mobile-nav-panel lg:hidden"
            >
              <nav
                className="flex flex-col gap-2 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                aria-label="Mobile navigation"
              >
                <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                  Menu
                </p>
                {NAV_LINKS.map((link) => {
                  const active = isNavLinkActive(location.pathname, link.path)
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`mobile-nav-link flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold ${
                        active
                          ? 'is-active'
                          : 'text-zinc-700 hover:border-black/[0.06] hover:bg-zinc-100/80 dark:text-zinc-200 dark:hover:border-white/[0.08] dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      {link.label}
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 transition-opacity ${
                          active ? 'opacity-100' : 'opacity-35'
                        }`}
                        aria-hidden
                      />
                    </Link>
                  )
                })}
                <div className="mt-2 border-t border-black/[0.06] pt-4 dark:border-white/[0.08]">
                  <Button to="/contact" variant="primary" className="w-full shadow-glow-sm">
                    Get Started
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )

  if (!mounted) {
    return null
  }

  return createPortal(header, document.body)
}
