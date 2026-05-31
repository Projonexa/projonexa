import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BadgeDollarSign,
  BookOpen,
  Boxes,
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
import { useFlowPaths, type FlowEdge } from '@/hooks/useFlowPaths'
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

const PILLAR_ACCENTS = ['#00c8ff', '#6c63ff', '#00e5a0'] as const

const CARD_FLOW_START = 6

function buildFlowEdges(): FlowEdge[] {
  const edges: FlowEdge[] = [
    { from: 0, to: 1, fromAnchor: 'bottom', toAnchor: 'top' },
    { from: 1, to: 2, fromAnchor: 'bottom', toAnchor: 'top' },
    { from: 1, to: 3, fromAnchor: 'bottom', toAnchor: 'top' },
    { from: 1, to: 4, fromAnchor: 'bottom', toAnchor: 'top' },
    { from: 2, to: 5, fromAnchor: 'bottom', toAnchor: 'top' },
    { from: 3, to: 5, fromAnchor: 'bottom', toAnchor: 'top' },
    { from: 4, to: 5, fromAnchor: 'bottom', toAnchor: 'top' },
    { from: 5, to: CARD_FLOW_START, fromAnchor: 'bottom', toAnchor: 'top' },
  ]

  for (let i = CARD_FLOW_START; i < CARD_FLOW_START + WHY_CHOOSE.length - 1; i++) {
    const indexInRow = i - CARD_FLOW_START
    const endOfRow = indexInRow % 3 === 2
    edges.push({
      from: i,
      to: i + 1,
      fromAnchor: endOfRow ? 'bottom' : 'center',
      toAnchor: endOfRow ? 'top' : 'center',
    })
  }

  return edges
}

const FLOW_EDGES = buildFlowEdges()

export function WhyChoose() {
  const reducedMotion = useReducedMotion()
  const flowRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = flowRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const headerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const pillarRefs = [
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
  ]
  const junctionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el
  }

  const getNodes = useCallback(
    () => [
      headerRef.current,
      hubRef.current,
      pillarRefs[0].current,
      pillarRefs[1].current,
      pillarRefs[2].current,
      junctionRef.current,
      ...cardRefs.current.slice(0, WHY_CHOOSE.length),
    ],
    [],
  )

  const paths = useFlowPaths(flowRef, getNodes, FLOW_EDGES, inView)

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

      <div ref={flowRef} className="why-flow-root container-wide relative">
        <WhyFlowLines paths={paths} animate={inView} reducedMotion={reducedMotion} />

        <div className="relative z-[1]">
          <div
            ref={headerRef}
            className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: easeSmooth }}
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.06, ease: easeSmooth }}
              className="max-w-xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300 lg:pb-1"
            >
              {WHY_SECTION.lead}
            </motion.p>
          </div>

          <motion.div
            ref={hubRef}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: easeSmooth }}
            className="why-flow-hub relative z-[2] mx-auto mt-12 flex max-w-md flex-col items-center text-center"
          >
            <div className="why-flow-hub-ring relative flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/35 bg-white/70 shadow-glow-sm backdrop-blur-xl dark:border-brand-primary/40 dark:bg-black/55 sm:h-[4.5rem] sm:w-[4.5rem]">
              <Sparkles className="h-7 w-7 text-brand-primary" strokeWidth={1.5} aria-hidden />
              <span className="why-flow-hub-pulse pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-primary">
              Your project journey
            </p>
            <p className="mt-1 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
              One connected path from strategy to delivery
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.14, ease: easeSmooth }}
            className="relative z-[2] mt-10 grid gap-4 sm:grid-cols-3"
          >
            {WHY_PILLARS.map((pillar, i) => (
              <li
                key={pillar.label}
                ref={pillarRefs[i]}
                className="why-pillar-card why-flow-node group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white/50 p-5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-6"
              >
                <span className="why-flow-port pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2" aria-hidden />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 80% 70% at 50% 0%, ${PILLAR_ACCENTS[i]}22, transparent 72%)`,
                  }}
                />
                <span
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold tabular-nums text-white shadow-glow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${PILLAR_ACCENTS[i]}, ${PILLAR_ACCENTS[i]}99)`,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="relative mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                  {pillar.label}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {pillar.description}
                </p>
              </li>
            ))}
          </motion.ul>

          <div
            ref={junctionRef}
            className="why-flow-junction relative z-[2] mx-auto mt-8 flex h-3 w-3 items-center justify-center"
            aria-hidden
          >
            <span className="why-flow-junction-core h-2.5 w-2.5 rounded-full" />
          </div>

          <div className="relative z-[2] mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? Layers
              const flowIndex = CARD_FLOW_START + i
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.04, 0.28),
                    ease: easeSmooth,
                  }}
                  className="why-choose-card group relative"
                  data-flow-index={flowIndex}
                >
                  <div
                    ref={setCardRef(i)}
                    className="why-flow-node relative flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white/55 p-5 backdrop-blur-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-black/45 sm:p-6"
                  >
                  <span className="why-flow-port pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2" aria-hidden />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/0 via-transparent to-brand-secondary/0 opacity-0 transition-opacity duration-300 group-hover:from-brand-primary/[0.06] group-hover:to-brand-secondary/[0.05] group-hover:opacity-100"
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-primary/15 bg-brand-primary/10 text-brand-primary transition-transform duration-300 group-hover:scale-105 dark:border-brand-primary/25 dark:bg-brand-primary/15">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </div>
                      <span className="text-[10px] font-semibold tabular-nums text-zinc-400 dark:text-zinc-500">
                        {String(flowIndex - CARD_FLOW_START + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="relative mt-4 text-base font-semibold leading-snug text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
