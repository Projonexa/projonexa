import { motion } from 'framer-motion'
import type { FlowPath } from '@/hooks/useFlowPaths'

interface WhyFlowLinesProps {
  paths: FlowPath[]
  animate: boolean
  reducedMotion: boolean
}

export function WhyFlowLines({ paths, animate, reducedMotion }: WhyFlowLinesProps) {
  if (paths.length === 0) return null

  return (
    <svg
      aria-hidden
      className="why-flow-svg pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="why-flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00c8ff" />
          <stop offset="50%" stopColor="#6c63ff" />
          <stop offset="100%" stopColor="#00e5a0" />
        </linearGradient>
        <filter id="why-flow-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((path, i) => (
        <g key={path.id}>
          <path
            d={path.d}
            fill="none"
            className="why-flow-path-dim"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <motion.path
            d={path.d}
            fill="none"
            stroke="url(#why-flow-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#why-flow-glow)"
            initial={
              reducedMotion || !animate
                ? { pathLength: 1, opacity: 0.85 }
                : { pathLength: 0, opacity: 0 }
            }
            animate={
              animate
                ? { pathLength: 1, opacity: 0.95 }
                : reducedMotion
                  ? { pathLength: 1, opacity: 0.85 }
                  : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 0.9, delay: 0.08 + i * 0.04, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.35, delay: 0.08 + i * 0.04 },
            }}
          />
        </g>
      ))}
    </svg>
  )
}
