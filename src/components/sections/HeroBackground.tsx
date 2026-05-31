import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface HeroBackgroundProps {
  reducedMotion: boolean
  showCursor: boolean
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
  isActive: MotionValue<number>
}

const spring = { stiffness: 90, damping: 22, mass: 0.35 }

export function HeroBackground({
  reducedMotion,
  showCursor,
  mouseX,
  mouseY,
  parallaxX,
  parallaxY,
  isActive,
}: HeroBackgroundProps) {
  const spotlightX = useSpring(mouseX, spring)
  const spotlightY = useSpring(mouseY, spring)
  const orbX = useSpring(useTransform(parallaxX, (v) => v * 36), spring)
  const orbY = useSpring(useTransform(parallaxY, (v) => v * 36), spring)
  const orb2X = useSpring(useTransform(parallaxX, (v) => v * -28), spring)
  const orb2Y = useSpring(useTransform(parallaxY, (v) => v * -22), spring)
  const spotlightOpacity = useSpring(
    useTransform(isActive, (v) => (showCursor ? 0.55 + v * 0.4 : 0.5)),
    spring,
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {/* Rich base fill */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 via-white to-violet-50/60 dark:from-[#030712] dark:via-black dark:to-[#0a0614]" />
      <div className="hero-mesh absolute inset-0" />

      {/* Static color washes — always visible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(0,200,255,0.35),transparent_60%)] dark:bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(0,200,255,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_30%,rgba(108,99,255,0.22),transparent_55%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_100%_30%,rgba(108,99,255,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_0%_80%,rgba(61,139,255,0.2),transparent_50%)] dark:bg-[radial-gradient(ellipse_60%_45%_at_0%_80%,rgba(61,139,255,0.12),transparent_50%)]" />

      {/* Animated aurora */}
      <div className={`absolute inset-0 overflow-hidden ${reducedMotion ? 'opacity-90' : ''}`}>
        <div className="hero-aurora-blob hero-aurora-blob-a absolute -left-[12%] top-[0%] h-[58%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.45)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(0,200,255,0.28)_0%,transparent_68%)]" />
        <div className="hero-aurora-blob hero-aurora-blob-b absolute -right-[8%] top-[10%] h-[52%] w-[52%] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.38)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(108,99,255,0.22)_0%,transparent_68%)]" />
        <div className="hero-aurora-blob hero-aurora-blob-c absolute bottom-[0%] left-[15%] h-[48%] w-[48%] rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.32)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(61,139,255,0.18)_0%,transparent_68%)]" />
      </div>

      {/* Large blurred orbs — parallax on cursor */}
      <motion.div
        className="absolute right-[5%] top-[18%] h-[min(30rem,48vw)] w-[min(30rem,48vw)] rounded-full bg-brand-primary/25 blur-[90px] dark:bg-brand-primary/18"
        style={showCursor ? { x: orbX, y: orbY } : undefined}
      />
      <motion.div
        className="absolute left-[0%] bottom-[12%] h-96 w-96 rounded-full bg-brand-secondary/28 blur-[80px] dark:bg-brand-secondary/16"
        style={showCursor ? { x: orb2X, y: orb2Y } : undefined}
      />

      {/* Cursor glow — always rendered; brightens on move */}
      {showCursor && (
        <>
          <motion.div
            className="absolute z-[2] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: spotlightX,
              top: spotlightY,
              opacity: spotlightOpacity,
              background:
                'radial-gradient(circle, rgba(0, 200, 255, 0.45) 0%, rgba(61, 139, 255, 0.2) 35%, transparent 65%)',
            }}
          />
          <motion.div
            className="absolute z-[3] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: spotlightX,
              top: spotlightY,
              opacity: spotlightOpacity,
              background:
                'radial-gradient(circle, rgba(108, 99, 255, 0.35) 0%, transparent 60%)',
            }}
          />
          <motion.div
            className="absolute z-[4] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary shadow-[0_0_24px_6px_rgba(0,200,255,0.55)] ring-2 ring-brand-primary/40 ring-offset-2 ring-offset-transparent dark:shadow-[0_0_32px_8px_rgba(0,200,255,0.45)]"
            style={{ left: spotlightX, top: spotlightY }}
          />
        </>
      )}

      {/* Grid + dots */}
      <div className="hero-grid absolute inset-0 opacity-50 dark:opacity-35" />
      <div className="hero-dots absolute inset-0 opacity-40 dark:opacity-25" />

      {/* Rings & accents */}
      {!reducedMotion && (
        <>
          <div className="hero-ring absolute left-1/2 top-[46%] h-[min(540px,88vw)] w-[min(540px,88vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-primary/15 dark:border-brand-primary/25" />
          <div className="hero-ring hero-ring-delay absolute left-1/2 top-[46%] h-[min(400px,68vw)] w-[min(400px,68vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-secondary/12 dark:border-brand-secondary/20" />
          <span className="hero-float-a absolute left-[10%] top-[30%] h-2.5 w-2.5 rounded-full bg-brand-primary shadow-glow-sm" />
          <span className="hero-float-b absolute right-[14%] top-[38%] h-2 w-2 rounded-full bg-brand-secondary/80" />
          <span className="hero-float-c absolute right-[22%] bottom-[28%] h-3 w-3 rounded-full border-2 border-brand-primary/30 bg-brand-primary/15" />
        </>
      )}

      {/* Edge beams */}
      <div className="hero-beam hero-beam-a absolute -left-1/4 top-1/4 h-px w-[150%] rotate-[-12deg] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
      <div className="hero-beam hero-beam-b absolute -right-1/4 bottom-1/3 h-px w-[150%] rotate-[8deg] bg-gradient-to-r from-transparent via-brand-secondary/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-black dark:via-black/90" />
    </div>
  )
}
