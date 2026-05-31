import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { SiteAmbientBackground } from './SiteAmbientBackground'
import { useSiteCursor } from '@/hooks/useSiteCursor'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Layout() {
  const { pathname } = useLocation()
  const reducedMotion = useReducedMotion()
  const showCursor = !reducedMotion

  const {
    mouseX,
    mouseY,
    parallaxX,
    parallaxY,
    isActive,
    handleMouseMove,
    handleMouseLeave,
  } = useSiteCursor(showCursor)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div
      className="relative min-h-screen overflow-x-clip text-zinc-900 dark:text-zinc-100"
      onMouseMove={showCursor ? handleMouseMove : undefined}
      onMouseLeave={showCursor ? handleMouseLeave : undefined}
    >
      <SiteAmbientBackground
        reducedMotion={reducedMotion}
        showCursor={showCursor}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        isActive={isActive}
      />

      <Header />
      <main id="main-content" className="relative z-10" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
