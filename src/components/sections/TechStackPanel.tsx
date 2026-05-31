import { TechLogo } from '@/components/ui/TechLogo'
import {
  TECH_CATEGORIES,
  TECHNOLOGIES,
  type TechCategory,
  type TechItem,
} from '@/data/technologies'
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
import { useCallback, useEffect, useMemo, useState } from 'react'

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

const AUTO_CYCLE_MS = 6500
const MARQUEE_SPEED_LEFT = 280
const MARQUEE_SPEED_RIGHT = 320

interface TechStackPanelProps {
  onTechHover?: (tech: TechItem | null) => void
}

export function TechStackPanel({ onTechHover }: TechStackPanelProps) {
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
  const [cyclePaused, setCyclePaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const active = grouped[activeIndex]
  const hoveredTech = hoveredId
    ? TECHNOLOGIES.find((t) => t.id === hoveredId)
    : null

  const emitHover = useCallback(
    (id: string | null) => {
      setHoveredId(id)
      if (!onTechHover) return
      const tech = id ? TECHNOLOGIES.find((t) => t.id === id) ?? null : null
      onTechHover(tech)
    },
    [onTechHover],
  )

  const selectCategory = useCallback((index: number) => {
    setActiveIndex(index)
    emitHover(null)
  }, [emitHover])

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % grouped.length)
    emitHover(null)
  }, [grouped.length, emitHover])

  useEffect(() => {
    if (cyclePaused || grouped.length <= 1) return
    const timer = window.setInterval(advance, AUTO_CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [cyclePaused, advance, grouped.length])

  const marqueeRowA = useMemo(() => [...TECHNOLOGIES, ...TECHNOLOGIES], [])
  const marqueeRowB = useMemo(
    () => [...TECHNOLOGIES].reverse().concat([...TECHNOLOGIES].reverse()),
    [],
  )

  return (
    <div
      className="tech-stack-premium relative overflow-hidden rounded-3xl shadow-[0_20px_60px_-24px_rgba(0,200,255,0.2)] dark:shadow-[0_20px_60px_-24px_rgba(0,200,255,0.12)]"
      onMouseLeave={(e) => {
        const next = e.relatedTarget as Node | null
        if (next && e.currentTarget.contains(next)) return
        emitHover(null)
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-brand-gradient p-px">
        <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-white/45 backdrop-blur-xl dark:bg-black/40" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-brand-primary/15 blur-[70px]"
      />

      <div className="relative z-10 flex flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary">
              Interactive stack
            </p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
              Browse by domain
            </h3>
          </div>
          <span className="rounded-full border border-black/[0.06] bg-white/50 px-3 py-1 text-[11px] font-medium tabular-nums text-zinc-600 backdrop-blur-sm dark:border-white/[0.08] dark:bg-black/40 dark:text-zinc-400">
            {grouped.length} domains
          </span>
        </div>

        {/* Compact spotlight — pause domain auto-cycle only here, not the marquee */}
        <div
          className="relative mb-4 overflow-hidden rounded-2xl border border-black/[0.06] bg-white/50 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/45"
          onMouseEnter={() => setCyclePaused(true)}
          onMouseLeave={(e) => {
            const next = e.relatedTarget as Node | null
            if (next && e.currentTarget.contains(next)) return
            setCyclePaused(false)
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              aria-hidden
              key={active.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 75% 60% at 18% 0%, ${active.meta.accent}24, transparent 74%)`,
              }}
            />
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              key={`sweep-${active.id}`}
              aria-hidden
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '120%', opacity: [0, 0.35, 0] }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-white/10"
            />
          </AnimatePresence>

          <div className="relative z-[2] border-b border-black/[0.04] px-3.5 py-3 dark:border-white/[0.06] sm:px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredTech ? hoveredTech.id : active.id}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                {hoveredTech ? (
                  <>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-surface-hover">
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
          </div>

          <div className="relative z-[2] overflow-x-auto px-3.5 py-2.5 sm:px-4">
            <div className="relative flex min-w-max gap-1.5">
              {grouped.map((group, i) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => selectCategory(i)}
                  className={`relative rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-300 ${
                    i === activeIndex
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {i === activeIndex && (
                    <motion.span
                      layoutId="spotlight-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-black/[0.06] dark:bg-surface-hover dark:ring-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">
                    {group.label.length > 14 ? group.label.split(' ')[0] : group.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className="relative z-[2] px-3.5 pb-3.5 sm:px-4 sm:pb-4"
            onMouseLeave={(e) => {
              const next = e.relatedTarget as Node | null
              if (next && e.currentTarget.contains(next)) return
              emitHover(null)
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 sm:gap-2"
              >
                {active.items.map((tech, index) => (
                  <CompactTechTile
                    key={tech.id}
                    tech={tech}
                    index={index}
                    isHovered={hoveredId === tech.id}
                    onHover={emitHover}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slow dual marquee */}
        <div className="relative overflow-hidden rounded-2xl border border-black/[0.05] bg-white/35 py-2.5 backdrop-blur-md dark:border-white/[0.06] dark:bg-black/35">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-zinc-50 to-transparent dark:from-black"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-zinc-50 to-transparent dark:from-black"
          />

          <div className="space-y-2">
            <MarqueeRow
              items={marqueeRowA}
              direction="left"
              speed={MARQUEE_SPEED_LEFT}
              onHover={emitHover}
            />
            <MarqueeRow
              items={marqueeRowB}
              direction="right"
              speed={MARQUEE_SPEED_RIGHT}
              onHover={emitHover}
            />
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
      tabIndex={0}
      title={tech.name}
      className="group relative outline-none"
    >
      <div
        className={`flex min-h-[52px] flex-col items-center justify-center rounded-lg border px-1 py-1.5 transition-all duration-300 ${
          isHovered
            ? 'scale-[1.04] border-brand-primary/35 bg-white/70 shadow-glow backdrop-blur-md dark:bg-black/50'
            : 'border-transparent bg-white/40 backdrop-blur-sm dark:bg-black/30'
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
  onHover,
}: {
  items: TechItem[]
  direction: 'left' | 'right'
  speed: number
  onHover?: (id: string | null) => void
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
            onMouseEnter={() => onHover?.(tech.id)}
            className="flex shrink-0 cursor-default items-center gap-2 rounded-full border border-black/[0.06] bg-white/55 px-2.5 py-1 backdrop-blur-md transition-colors duration-300 hover:border-brand-primary/30 hover:bg-white/80 dark:border-white/[0.08] dark:bg-black/45 dark:hover:border-brand-primary/35"
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
