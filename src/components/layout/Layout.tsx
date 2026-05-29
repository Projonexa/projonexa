import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-brand-dark dark:text-zinc-100">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
