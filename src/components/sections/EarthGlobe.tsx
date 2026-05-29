import { motion } from 'framer-motion'
import { ORBIT_TECH_IDS, TECHNOLOGIES } from '@/data/technologies'
import { TechLogo } from '@/components/ui/TechLogo'

const ORBIT_ITEMS = ORBIT_TECH_IDS.map((id) => TECHNOLOGIES.find((t) => t.id === id)).filter(
  Boolean,
) as typeof TECHNOLOGIES

export function EarthGlobe() {
  const count = ORBIT_ITEMS.length

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-brand-primary/10 blur-[80px]" />
      <div className="absolute inset-[8%] rounded-full bg-brand-secondary/10 blur-[60px]" />

      <motion.div
        className="absolute inset-[10%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="h-full w-full rounded-full opacity-50 dark:opacity-40"
          style={{
            background: `
              radial-gradient(circle at 35% 35%, rgba(0,200,255,0.45) 0%, transparent 55%),
              radial-gradient(circle at 70% 60%, rgba(108,99,255,0.35) 0%, transparent 45%),
              linear-gradient(135deg, #0a1628 0%, #0a0f1c 40%, #1a1040 100%)
            `,
            boxShadow:
              'inset -24px -24px 48px rgba(0,0,0,0.55), inset 12px 12px 32px rgba(0,200,255,0.08), 0 0 80px rgba(0,200,255,0.15)',
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full rounded-full"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="95" stroke="rgba(0,200,255,0.18)" strokeWidth="0.6" />
          {[20, 40, 60, 80].map((ry) => (
            <ellipse
              key={ry}
              cx="100"
              cy="100"
              rx="95"
              ry={ry}
              stroke="rgba(0,200,255,0.1)"
              strokeWidth="0.4"
            />
          ))}
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="5"
              x2="100"
              y2="195"
              stroke="rgba(108,99,255,0.14)"
              strokeWidth="0.4"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-[2%] rounded-full border border-dashed border-brand-primary/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {ORBIT_ITEMS.map((tech, i) => {
          const angleRad = (i / count) * 2 * Math.PI - Math.PI / 2
          const radiusPct = 44
          const left = 50 + radiusPct * Math.cos(angleRad)
          const top = 50 + radiusPct * Math.sin(angleRad)
          const hex = tech.color.startsWith('#') ? tech.color : `#${tech.color}`

          return (
            <motion.div
              key={tech.id}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/95 shadow-lg backdrop-blur-sm dark:bg-zinc-900/95 sm:h-10 sm:w-10"
                style={{ boxShadow: `0 0 16px ${hex}44` }}
              >
                <TechLogo tech={tech} size="sm" />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border border-brand-primary/20 bg-brand-dark/85 px-5 py-2.5 text-center shadow-glow backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-primary sm:text-xs">
            Global Tech Stack
          </p>
        </div>
      </div>
    </div>
  )
}
