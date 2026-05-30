import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  Layers3,
  Smartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { TechLogo } from '@/components/ui/TechLogo'
import {
  TECH_CATEGORIES,
  TECHNOLOGIES,
  type TechCategory,
  type TechItem,
} from '@/data/technologies'

const CATEGORY_META: Record<
  TechCategory,
  { icon: LucideIcon; tagline: string; accent: string }
> = {
  frontend: { icon: Code2, tagline: 'Interfaces users love', accent: '#61DAFB' },
  backend: { icon: Layers3, tagline: 'APIs built to scale', accent: '#339933' },
  mobile: { icon: Smartphone, tagline: 'Native & cross-platform', accent: '#02569B' },
  database: { icon: Database, tagline: 'Reliable data layers', accent: '#4169E1' },
  ai: { icon: Brain, tagline: 'Intelligent systems & ML', accent: '#FF6F00' },
  iot: { icon: Cpu, tagline: 'Connected hardware', accent: '#00979D' },
  cloud: { icon: Cloud, tagline: 'Deploy anywhere', accent: '#4285F4' },
  devops: { icon: Layers3, tagline: 'Ship with confidence', accent: '#326CE5' },
  tools: { icon: Wrench, tagline: 'Design, test & deliver', accent: '#F24E1E' },
}

const AUTO_CYCLE_MS = 6000
const MARQUEE_SPEED_LEFT = 100
const MARQUEE_SPEED_RIGHT = 115

export function TechStackPanel() {
  const grouped = useMemo(
    () =>
      [...TECH_CATEGORIES]
        .sort((a, b) => a.order - b.order)
        .map((category) => ({
          ...category,
          meta: CATEGORY_META[category.id],
          items: TECHNOLOGIES.filter((t) => t.category === category.id),
        }))
        .filter((group) => group.items.length > 0),
    [],
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [cycleKey, setCycleKey] = useState(0)

  const active = grouped[activeIndex]
  const hoveredTech = hoveredId
    ? TECHNOLOGIES.find((t) => t.id === hoveredId)
    : null

  const selectCategory = useCallback((index: number) => {
    setActiveIndex(index)
    setCycleKey((k) => k + 1)
    setHoveredId(null)
  }, [])

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % grouped.length)
    setCycleKey((k) => k + 1)
    setHoveredId(null)
  }, [grouped.length])

  useEffect(() => {
    if (paused || grouped.length <= 1) return
    const timer = window.setInterval(advance, AUTO_CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [paused, advance, grouped.length])

  const marqueeRowA = useMemo(() => [...TECHNOLOGIES, ...TECHNOLOGIES], [])
  const marqueeRowB = useMemo(
    () => [...TECHNOLOGIES].reverse().concat([...TECHNOLOGIES].reverse()),
    [],
  )

  return (
    <div
      className="tech-stack-premium relative overflow-hidden rounded-3xl shadow-[0_20px_60px_-24px_rgba(0,200,255,0.2)] dark:shadow-[0_20px_60px_-24px_rgba(0,200,255,0.12)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false)
        setHoveredId(null)
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-brand-gradient p-px">
        <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-zinc-50 dark:bg-zinc-950" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-brand-primary/15 blur-[70px]"
      />

      <div className="relative z-10 flex flex-col p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
            Tools we ship with
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Curated stack for projects that need to look and perform premium.
          </p>
        </div>

        {/* Compact spotlight */}
        <div className="relative mb-4 overflow-hidden rounded-2xl border border-black/[0.06] bg-white/70 backdrop-blur-md dark:border-white/[0.08] dark:bg-zinc-900/45">
          <motion.div
            aria-hidden
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 15% 0%, ${active.meta.accent}20, transparent 72%)`,
            }}
          />

          <div className="relative border-b border-black/[0.04] px-3.5 py-3 dark:border-white/[0.06] sm:px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredTech ? hoveredTech.id : active.id}
                initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                {hoveredTech ? (
                  <>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-zinc-800">
                      <TechLogo tech={hoveredTech} size="sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                        {hoveredTech.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {TECH_CATEGORIES.find((c) => c.id === hoveredTech.category)?.label}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${active.meta.accent}28, ${active.meta.accent}08)`,
                        boxShadow: `0 4px 20px -6px ${active.meta.accent}44`,
                      }}
                    >
                      <active.meta.icon
                        className="h-4 w-4"
                        style={{ color: active.meta.accent }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                        Spotlight
                      </p>
                      <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                        {active.label}
                      </p>
                      <p className="truncate text-xs text-zinc-500">{active.meta.tagline}</p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800">
              <div
                key={cycleKey}
                className={`tech-spotlight-progress h-full origin-left rounded-full bg-brand-gradient ${paused ? 'is-paused' : ''}`}
                style={{ animationDuration: `${AUTO_CYCLE_MS}ms` }}
              />
            </div>
          </div>

          <div className="overflow-x-auto px-3.5 py-2.5 sm:px-4">
            <div className="flex min-w-max gap-1.5">
              {grouped.map((group, i) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => selectCategory(i)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {group.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 sm:gap-2"
              >
                {active.items.map((tech, index) => (
                  <CompactTechTile
                    key={tech.id}
                    tech={tech}
                    index={index}
                    isHovered={hoveredId === tech.id}
                    onHover={setHoveredId}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slow dual marquee */}
        <div className="relative overflow-hidden rounded-2xl border border-black/[0.05] bg-zinc-900/[0.02] py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-950"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-950"
          />

          <div className="space-y-2">
            <MarqueeRow items={marqueeRowA} direction="left" speed={MARQUEE_SPEED_LEFT} />
            <MarqueeRow items={marqueeRowB} direction="right" speed={MARQUEE_SPEED_RIGHT} />
          </div>
        </div>
      </div>
    </div>
  )
}

function CompactTechTile({
  tech,
  index,
  isHovered,
  onHover,
}: {
  tech: TechItem
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
}) {
  const glow = tech.color.startsWith('#') ? tech.color : `#${tech.color}`

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.025, duration: 0.28 }}
      onMouseEnter={() => onHover(tech.id)}
      onFocus={() => onHover(tech.id)}
      onMouseLeave={() => onHover(null)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      title={tech.name}
      className="group relative outline-none"
    >
      <div
        className={`flex min-h-[52px] flex-col items-center justify-center rounded-lg border px-1 py-1.5 transition-all duration-300 ${
          isHovered
            ? 'scale-[1.04] border-brand-primary/35 bg-white shadow-glow dark:bg-zinc-900'
            : 'border-transparent bg-white/50 dark:bg-zinc-900/35'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 20%, ${glow}20, transparent 75%)`,
          }}
        />
        <TechLogo tech={tech} size="sm" className="relative h-5 w-5 sm:h-6 sm:w-6" />
        <span className="relative mt-1 max-w-full truncate text-[9px] font-medium text-zinc-600 group-hover:text-brand-primary dark:text-zinc-400 sm:text-[10px]">
          {tech.name}
        </span>
      </div>
    </motion.article>
  )
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: TechItem[]
  direction: 'left' | 'right'
  speed: number
}) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`tech-marquee flex shrink-0 items-center gap-2.5 ${
          direction === 'left' ? 'tech-marquee-left' : 'tech-marquee-right'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech.id}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-black/[0.06] bg-white/90 px-2.5 py-1 dark:border-white/[0.08] dark:bg-zinc-900/90"
          >
            <TechLogo tech={tech} size="sm" className="h-4 w-4" />
            <span className="whitespace-nowrap text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
