import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BadgeDollarSign,
  BookOpen,
  Boxes,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Rocket,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { WhyFlowLines } from '@/components/sections/WhyFlowLines'
import { WHY_CHOOSE, WHY_PILLARS, WHY_SECTION } from '@/data/brand'
import {
  FLOW_HUB,
  FLOW_PILLARS,
  flowToPercent,
  getBenefitPosition,
} from '@/data/whyFlowLayout'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const WHY_ICONS: LucideIcon[] = [
  Layers,
  FileText,
  Users,
  BookOpen,
  Boxes,
  Zap,
  Rocket,
  GraduationCap,
  BadgeDollarSign,
  Globe,
]

const PILLAR_ICONS = [Code2, GraduationCap, Rocket] as const
const PILLAR_ACCENTS = ['#00c8ff', '#6c63ff', '#00e5a0'] as const

function FlowNode({
  icon: Icon,
  label,
  hint,
  accent,
  pos,
  visible,
  delay = 0,
}: {
  icon: LucideIcon
  label: string
  hint?: string
  accent?: string
  pos: { x: number; y: number }
  visible: boolean
  delay?: number
}) {
  const { left, top } = flowToPercent(pos.x, pos.y)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay, ease: easeSmooth }}
      title={hint}
      className="why-flow-node absolute z-[2] flex w-[4.75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center sm:w-[5.5rem]"
      style={{ left, top }}
    >
      <div
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-primary/20 bg-white/80 shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-105 dark:border-brand-primary/30 dark:bg-black/60 sm:h-10 sm:w-10"
        style={
          accent
            ? { boxShadow: `0 0 18px -4px ${accent}55` }
            : undefined
        }
      >
        <Icon
          className="h-4 w-4 text-brand-primary sm:h-[18px] sm:w-[18px]"
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="why-flow-port pointer-events-none absolute -top-0.5 left-1/2 -translate-x-1/2" aria-hidden />
      </div>
      <span className="line-clamp-2 text-[10px] font-semibold leading-tight text-zinc-800 dark:text-zinc-200 sm:text-[11px]">
        {label}
      </span>
    </motion.div>
  )
}

export function WhyChoose() {
  const reducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="section-padding section-frosted overflow-hidden"
      aria-labelledby="why-projonexa-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-brand-primary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-secondary/10 blur-[90px]"
      />

      <div className="container-wide relative">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-brand-primary to-transparent"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {WHY_SECTION.eyebrow}
              </p>
            </div>
            <h2
              id="why-projonexa-heading"
              className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.65rem]"
            >
              {WHY_SECTION.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
            className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            {WHY_SECTION.lead}
          </motion.p>
        </div>

        <motion.div
          ref={canvasRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: easeSmooth }}
          className="why-flow-canvas relative mx-auto mt-12 w-full max-w-5xl"
        >
          <div className="why-flow-canvas-inner relative aspect-[960/520] w-full overflow-hidden rounded-2xl border border-black/[0.07] bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/35">
            <WhyFlowLines animate={inView} reducedMotion={reducedMotion} />

            <div className="absolute inset-0 z-[1]">
              <FlowNode
                icon={Sparkles}
                label="Start"
                hint="Your project journey begins here"
                pos={FLOW_HUB}
                visible={inView}
                delay={0.12}
              />

              {WHY_PILLARS.map((pillar, i) => (
                <FlowNode
                  key={pillar.label}
                  icon={PILLAR_ICONS[i]}
                  label={pillar.label}
                  hint={pillar.description}
                  accent={PILLAR_ACCENTS[i]}
                  pos={FLOW_PILLARS[i]}
                  visible={inView}
                  delay={0.18 + i * 0.05}
                />
              ))}

              {WHY_CHOOSE.map((item, i) => {
                const Icon = WHY_ICONS[i] ?? Layers
                const pos = getBenefitPosition(i)
                return (
                  <FlowNode
                    key={item.title}
                    icon={Icon}
                    label={item.title}
                    hint={item.description}
                    pos={pos}
                    visible={inView}
                    delay={0.32 + i * 0.03}
                  />
                )
              })}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
            Three pillars from Start · Each column flows to your deliverables · Hover for details
          </p>

          <ul className="sr-only">
            {WHY_PILLARS.map((p) => (
              <li key={p.label}>
                {p.label}: {p.description}
              </li>
            ))}
            {WHY_CHOOSE.map((item) => (
              <li key={item.title}>
                {item.title}: {item.description}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
