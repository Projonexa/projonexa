import { useCallback, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Parallax = { x: number; y: number }

interface HeroBackgroundProps {
  reducedMotion: boolean
  interactive: boolean
  onParallax?: (p: Parallax) => void
}

const spring = { stiffness: 120, damping: 28, mass: 0.4 }

export function HeroBackground({
  reducedMotion,
  interactive,
  onParallax,
}: HeroBackgroundProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)

  const spotlightX = useSpring(mouseX, spring)
  const spotlightY = useSpring(mouseY, spring)
  const orbX = useSpring(useTransform(parallaxX, (v) => v * 28), spring)
  const orbY = useSpring(useTransform(parallaxY, (v) => v * 28), spring)
  const orb2X = useSpring(useTransform(parallaxX, (v) => v * -20), spring)
  const orb2Y = useSpring(useTransform(parallaxY, (v) => v * -16), spring)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseX.set(x)
      mouseY.set(y)
      const px = x / rect.width - 0.5
      const py = y / rect.height - 0.5
      parallaxX.set(px)
      parallaxY.set(py)
      onParallax?.({ x: px, y: py })
    },
    [interactive, mouseX, mouseY, parallaxX, parallaxY, onParallax],
  )

  const handleMouseLeave = useCallback(() => {
    parallaxX.set(0)
    parallaxY.set(0)
    onParallax?.({ x: 0, y: 0 })
    if (!sectionRef.current) return
    const { width, height } = sectionRef.current.getBoundingClientRect()
    mouseX.set(width / 2)
    mouseY.set(height * 0.38)
  }, [mouseX, mouseY, parallaxX, parallaxY, onParallax])

  useEffect(() => {
    if (!sectionRef.current) return
    const { width, height } = sectionRef.current.getBoundingClientRect()
    mouseX.set(width / 2)
    mouseY.set(height * 0.38)
  }, [mouseX, mouseY])

  const showSpotlight = interactive && !reducedMotion

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0"
      onMouseMove={showSpotlight ? handleMouseMove : undefined}
      onMouseLeave={showSpotlight ? handleMouseLeave : undefined}
      aria-hidden
    >
      {/* Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/95 via-white to-white dark:from-black dark:via-black dark:to-black" />

      {/* Animated aurora blobs */}
      <div
        className={`absolute inset-0 overflow-hidden ${reducedMotion ? '' : 'hero-aurora-layer'}`}
      >
        <div className="hero-aurora-blob hero-aurora-blob-a absolute -left-[15%] top-[5%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.22)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,200,255,0.14)_0%,transparent_70%)]" />
        <div className="hero-aurora-blob hero-aurora-blob-b absolute -right-[10%] top-[15%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.18)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(108,99,255,0.1)_0%,transparent_70%)]" />
        <div className="hero-aurora-blob hero-aurora-blob-c absolute bottom-[5%] left-[20%] h-[45%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.14)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(61,139,255,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Parallax orbs */}
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[22%] h-[min(26rem,42vw)] w-[min(26rem,42vw)] rounded-full bg-brand-primary/12 blur-[100px] dark:bg-brand-primary/7"
        style={showSpotlight ? { x: orbX, y: orbY } : undefined}
      />
      <motion.div
        className="pointer-events-none absolute left-[4%] bottom-[18%] h-80 w-80 rounded-full bg-brand-secondary/14 blur-[90px] dark:bg-brand-secondary/7"
        style={showSpotlight ? { x: orb2X, y: orb2Y } : undefined}
      />

      {/* Cursor spotlight */}
      {showSpotlight && (
        <>
          <motion.div
            className="pointer-events-none absolute z-[1] h-[min(32rem,70vw)] w-[min(32rem,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 mix-blend-multiply dark:opacity-50 dark:mix-blend-screen"
            style={{
              left: spotlightX,
              top: spotlightY,
              background:
                'radial-gradient(circle, rgba(0, 200, 255, 0.2) 0%, rgba(61, 139, 255, 0.08) 40%, transparent 68%)',
            }}
          />
          <motion.div
            className="pointer-events-none absolute z-[1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full dark:opacity-80"
            style={{
              left: spotlightX,
              top: spotlightY,
              background:
                'radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, transparent 55%)',
            }}
          />
          <motion.div
            className="pointer-events-none absolute z-[2] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/30 bg-brand-primary/10 shadow-glow-sm backdrop-blur-sm dark:border-brand-primary/40 dark:bg-brand-primary/15"
            style={{ left: spotlightX, top: spotlightY }}
          />
        </>
      )}

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.32] dark:opacity-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 42%, black 15%, transparent 72%)',
        }}
      />
      <div
        className="absolute inset-0 hidden opacity-[0.22] dark:block"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 42%, black 15%, transparent 72%)',
        }}
      />

      {/* Floating accents */}
      {!reducedMotion && (
        <>
          <motion.span
            className="hero-float-a pointer-events-none absolute left-[12%] top-[32%] h-2 w-2 rounded-full bg-brand-primary/50 shadow-glow-sm"
            aria-hidden
          />
          <motion.span
            className="hero-float-b pointer-events-none absolute right-[18%] top-[42%] h-1.5 w-1.5 rounded-full bg-brand-secondary/60"
            aria-hidden
          />
          <motion.span
            className="hero-float-c pointer-events-none absolute right-[28%] bottom-[32%] h-2.5 w-2.5 rounded-full border border-brand-primary/25 bg-brand-primary/10"
            aria-hidden
          />
          <div className="hero-ring pointer-events-none absolute left-1/2 top-[48%] h-[min(520px,85vw)] w-[min(520px,85vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/[0.07] dark:border-brand-primary/[0.12]" />
          <div className="hero-ring hero-ring-delay pointer-events-none absolute left-1/2 top-[48%] h-[min(380px,65vw)] w-[min(380px,65vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-secondary/[0.06] dark:border-brand-secondary/[0.1]" />
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />
    </div>
  )
}
