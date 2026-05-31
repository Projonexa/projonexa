import { motion } from 'framer-motion'
import {
  FLOW_BRANCH_PATHS,
  FLOW_TRAVEL_PATH,
  FLOW_VIEWBOX,
} from '@/data/whyFlowLayout'

interface WhyFlowLinesProps {
  animate: boolean
  reducedMotion: boolean
}

export function WhyFlowLines({ animate, reducedMotion }: WhyFlowLinesProps) {
  const showDot = animate && !reducedMotion

  return (
    <svg
      aria-hidden
      className="why-flow-svg absolute inset-0 h-full w-full"
      viewBox={`0 0 ${FLOW_VIEWBOX.width} ${FLOW_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="why-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00c8ff" />
          <stop offset="50%" stopColor="#6c63ff" />
          <stop offset="100%" stopColor="#00c8ff" />
        </linearGradient>
        <radialGradient id="why-flow-dot-glow">
          <stop offset="0%" stopColor="#00c8ff" stopOpacity="1" />
          <stop offset="45%" stopColor="#6c63ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#00c8ff" stopOpacity="0" />
        </radialGradient>
        <filter id="why-flow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={48}
        y={32}
        width={FLOW_VIEWBOX.width - 96}
        height={FLOW_VIEWBOX.height - 64}
        rx={20}
        className="why-flow-frame"
        fill="none"
      />

      {FLOW_BRANCH_PATHS.map((d, i) => (
        <g key={`branch-${i}`}>
          <path d={d} fill="none" className="why-flow-path-dim" strokeWidth="2.5" strokeLinecap="round" />
          <motion.path
            d={d}
            fill="none"
            stroke="url(#why-flow-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#why-flow-glow)"
            initial={reducedMotion || !animate ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
            animate={
              animate ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 0.6, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, delay: 0.05 + i * 0.06 },
            }}
          />
        </g>
      ))}

      <g>
        <path
          d={FLOW_TRAVEL_PATH}
          fill="none"
          className="why-flow-path-dim"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d={FLOW_TRAVEL_PATH}
          fill="none"
          stroke="url(#why-flow-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#why-flow-glow)"
          initial={reducedMotion || !animate ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.4, delay: 0.2 },
          }}
        />
      </g>

      {showDot && (
        <g filter="url(#why-flow-glow)">
          <circle r="10" fill="url(#why-flow-dot-glow)" opacity="0.45">
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              path={FLOW_TRAVEL_PATH}
              calcMode="linear"
            />
          </circle>
          <circle r="4" fill="#00c8ff">
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              path={FLOW_TRAVEL_PATH}
              calcMode="linear"
            />
          </circle>
        </g>
      )}
    </svg>
  )
}
