import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NAV_LINKS } from '@/data/navigation'
import { useTheme } from '@/context/ThemeContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { isNavLinkActive } from '@/lib/navigation'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useBodyScrollLock(open)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <header className="site-header fixed top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-black/85">
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.slice(0, 7).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isNavLinkActive(location.pathname, link.path)
                  ? 'text-brand-primary'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-surface-hover"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Button to="/contact" variant="primary">
            Get Started
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-zinc-600 dark:text-zinc-400"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-zinc-900 dark:text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav-panel border-t border-black/5 bg-white dark:border-white/[0.06] dark:bg-black lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3.5 text-base font-medium ${
                    isNavLinkActive(location.pathname, link.path)
                      ? 'bg-brand-primary/10 text-brand-primary'
                      : 'text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button to="/contact" variant="primary" className="w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}
