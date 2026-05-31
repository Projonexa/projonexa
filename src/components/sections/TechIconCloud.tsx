import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud'
import { ICON_CLOUD_SLUGS } from '@/data/technologies'
import { useTheme } from '@/context/ThemeContext'
import {
  CLOUD_INSTANCE_ID,
  getCloudTagDomId,
  getTagCanvasElementId,
  isCloudTagInDom,
} from '@/lib/techCloud'

const IDLE_SPEED: [number, number] = [0.045, -0.035]
const RAMP_DURATION_MS = 2800
const LEAVE_SETTLE_MS = 350
const TAG_FOCUS_MS = 520
const CLOUD_READY_POLL_MS = 80
const CLOUD_READY_MAX_MS = 6000

const CLOUD_OPTIONS = {
  reverse: true,
  depth: 1,
  wheelZoom: false,
  imageScale: 2,
  activeCursor: 'default',
  animTiming: 'Smooth' as const,
  initial: IDLE_SPEED,
  clickToFront: 400,
  outlineIncrease: 12,
  maxSpeed: 0.018,
  minSpeed: 0.006,
  decel: 0.88,
  offsetX: 0,
  offsetY: 0,
  shuffleTags: false,
  outlineMethod: 'outline' as const,
  outlineColour: '#00c8ff',
  outlineThickness: 2,
  outlineOffset: 1,
  textColour: '#ffffff',
  textHeight: 15,
  tooltip: 'native' as const,
  tooltipDelay: 200,
  freezeActive: false,
  freezeDecel: true,
  shape: 'sphere' as const,
  lock: null,
  dragControl: true,
  dragThreshold: 4,
  noSelect: true,
  frontSelect: false,
}

type TagCanvasApi = {
  SetSpeed: (id: string, speed: [number, number]) => void
  TagToFront?: (
    id: string,
    options: {
      id?: string | null
      index?: number | null
      text?: string | null
      time?: number
      active?: boolean
    },
  ) => void
  RotateTag?: (
    id: string,
    options: {
      id?: string | null
      index?: number | null
      text?: string | null
      lat?: number
      lng?: number
      time?: number
      active?: boolean
    },
  ) => void
}

function getTagCanvas(): TagCanvasApi | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as Window & { TagCanvas?: TagCanvasApi }).TagCanvas
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

interface StableCloudProps {
  icons: ReactNode[]
  cloudKey: string
}

const StableIconCloud = memo(function StableIconCloud({ icons, cloudKey }: StableCloudProps) {
  const canvasClass = useMemo(
    () =>
      'relative z-10 w-full aspect-square max-w-[min(100%,480px)] mx-auto opacity-100 lg:max-w-none lg:mx-0',
    [],
  )

  return (
    <Cloud
      key={cloudKey}
      id={CLOUD_INSTANCE_ID}
      options={CLOUD_OPTIONS}
      containerProps={{
        className: 'relative z-10 flex w-full items-center justify-center lg:justify-end',
      }}
      canvasProps={{
        className: canvasClass,
        'aria-label': 'Interactive 3D technology stack — drag to rotate',
      }}
    >
      {icons}
    </Cloud>
  )
})

interface TechIconCloudProps {
  variant?: 'default' | 'side'
  highlightSlug?: string | null
  highlightLabel?: string | null
}

export function TechIconCloud({
  variant = 'default',
  highlightSlug = null,
  highlightLabel = null,
}: TechIconCloudProps) {
  const { theme } = useTheme()
  const [icons, setIcons] = useState<ReactNode[]>([])
  const [ready, setReady] = useState(false)
  const [cloudStarted, setCloudStarted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isSide = variant === 'side'
  const isActive = Boolean(highlightSlug) || Boolean(highlightLabel) || isHovered

  const rampFrameRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<number | null>(null)
  const focusTimerRef = useRef<number | null>(null)
  const slugIndexMapRef = useRef<Map<string, number>>(new Map())
  const slugTitleMapRef = useRef<Map<string, string>>(new Map())
  const highlightSlugRef = useRef(highlightSlug)
  const highlightLabelRef = useRef(highlightLabel)
  const externalHighlightRef = useRef(false)

  const tagCanvasId = getTagCanvasElementId()
  highlightSlugRef.current = highlightSlug
  highlightLabelRef.current = highlightLabel

  const bgHex = theme === 'dark' ? '#09090b' : '#f4f4f5'
  const fallbackHex = theme === 'dark' ? '#00c8ff' : '#18181b'
  const cloudKey = `${theme}-${variant}`

  const cancelRamp = useCallback(() => {
    if (rampFrameRef.current != null) {
      cancelAnimationFrame(rampFrameRef.current)
      rampFrameRef.current = null
    }
  }, [])

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current != null) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }, [])

  const clearFocusTimer = useCallback(() => {
    if (focusTimerRef.current != null) {
      window.clearTimeout(focusTimerRef.current)
      focusTimerRef.current = null
    }
  }, [])

  const setCloudSpeed = useCallback(
    (speed: [number, number]) => {
      getTagCanvas()?.SetSpeed(tagCanvasId, speed)
    },
    [tagCanvasId],
  )

  const rampToIdleSpeed = useCallback(() => {
    cancelRamp()
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / RAMP_DURATION_MS)
      const eased = smoothstep(progress)

      setCloudSpeed([IDLE_SPEED[0] * eased, IDLE_SPEED[1] * eased])

      if (progress < 1) {
        rampFrameRef.current = requestAnimationFrame(tick)
      } else {
        rampFrameRef.current = null
        setCloudSpeed(IDLE_SPEED)
      }
    }

    rampFrameRef.current = requestAnimationFrame(tick)
  }, [cancelRamp, setCloudSpeed])

  const isCloudEngineReady = useCallback(() => {
    if (!document.getElementById(tagCanvasId)) return false
    const tc = getTagCanvas()
    if (!tc?.SetSpeed) return false
    try {
      tc.SetSpeed(tagCanvasId, [0, 0])
      return true
    } catch {
      return false
    }
  }, [tagCanvasId])

  const focusSlugInCloud = useCallback(
    (slug: string) => {
      if (!isCloudEngineReady() || !isCloudTagInDom(slug)) return false

      const tc = getTagCanvas()
      if (!tc) return false

      const tagDomId = getCloudTagDomId(slug)
      const title = slugTitleMapRef.current.get(slug)
      const index = slugIndexMapRef.current.get(slug)
      let moved = false

      try {
        if (tc.TagToFront) {
          tc.TagToFront(tagCanvasId, {
            id: tagDomId,
            text: title ?? undefined,
            time: TAG_FOCUS_MS,
            active: true,
          })
          moved = true
        }

        if (tc.RotateTag) {
          tc.RotateTag(tagCanvasId, {
            id: tagDomId,
            index: index ?? null,
            lat: 0,
            lng: 0,
            time: TAG_FOCUS_MS,
            active: true,
          })
          moved = true
        }

        return moved
      } catch {
        return false
      }
    },
    [tagCanvasId, isCloudEngineReady],
  )

  const scheduleFocus = useCallback(
    (slug: string) => {
      clearFocusTimer()

      const attempt = (triesLeft: number) => {
        const ok = focusSlugInCloud(slug)
        if (ok || triesLeft <= 0) return
        focusTimerRef.current = window.setTimeout(() => attempt(triesLeft - 1), 150)
      }

      focusTimerRef.current = window.setTimeout(() => attempt(24), 80)
    },
    [clearFocusTimer, focusSlugInCloud],
  )

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true)
    clearLeaveTimer()
    cancelRamp()
    setCloudSpeed([0, 0])
  }, [cancelRamp, clearLeaveTimer, setCloudSpeed])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    clearLeaveTimer()
    cancelRamp()
    setCloudSpeed([0, 0])

    leaveTimerRef.current = window.setTimeout(() => {
      if (!highlightSlugRef.current && !highlightLabelRef.current) {
        externalHighlightRef.current = false
        rampToIdleSpeed()
      }
      leaveTimerRef.current = null
    }, LEAVE_SETTLE_MS)
  }, [cancelRamp, clearLeaveTimer, rampToIdleSpeed, setCloudSpeed])

  useEffect(() => {
    let cancelled = false
    setReady(false)
    setCloudStarted(false)
    slugIndexMapRef.current = new Map()
    slugTitleMapRef.current = new Map()

    fetchSimpleIcons({ slugs: [...ICON_CLOUD_SLUGS] }).then((data) => {
      if (cancelled) return

      const rendered = ICON_CLOUD_SLUGS.flatMap((slug, index) => {
        const icon = data.simpleIcons[slug]
        if (!icon) return []

        slugIndexMapRef.current.set(slug, index)
        slugTitleMapRef.current.set(slug, icon.title)

        return [
          renderSimpleIcon({
            icon,
            size: isSide ? 44 : 48,
            bgHex,
            fallbackHex,
            minContrastRatio: 2.5,
            aProps: {
              id: getCloudTagDomId(slug),
              onClick: (e: MouseEvent) => e.preventDefault(),
              title: icon.title,
            },
          }),
        ]
      })

      setIcons(rendered)
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [bgHex, fallbackHex, isSide])

  useEffect(() => {
    if (!ready) return

    setCloudStarted(false)
    const startedAt = performance.now()

    const poll = () => {
      if (isCloudEngineReady()) {
        setCloudSpeed(IDLE_SPEED)
        setCloudStarted(true)
        return
      }

      if (performance.now() - startedAt < CLOUD_READY_MAX_MS) {
        window.setTimeout(poll, CLOUD_READY_POLL_MS)
      }
    }

    poll()

    return () => {
      setCloudStarted(false)
    }
  }, [ready, setCloudSpeed, cloudKey, isCloudEngineReady])

  useEffect(() => {
    if (!ready || !cloudStarted) return

    const hasPanelHover = Boolean(highlightSlug) || Boolean(highlightLabel)

    if (!hasPanelHover) {
      if (!isHovered && externalHighlightRef.current) {
        externalHighlightRef.current = false
        clearFocusTimer()
        rampToIdleSpeed()
      }
      return
    }

    externalHighlightRef.current = true
    clearLeaveTimer()
    cancelRamp()
    setCloudSpeed([0, 0])

    if (highlightSlug) {
      scheduleFocus(highlightSlug)
    }
  }, [
    highlightSlug,
    highlightLabel,
    ready,
    cloudStarted,
    isHovered,
    scheduleFocus,
    cancelRamp,
    clearLeaveTimer,
    clearFocusTimer,
    rampToIdleSpeed,
    setCloudSpeed,
  ])

  useEffect(
    () => () => {
      cancelRamp()
      clearLeaveTimer()
      clearFocusTimer()
    },
    [cancelRamp, clearLeaveTimer, clearFocusTimer],
  )

  const displayLabel =
    highlightLabel ?? (highlightSlug ? slugTitleMapRef.current.get(highlightSlug) : null)

  return (
    <div
      className={`tech-icon-cloud-root relative w-full ${isSide ? 'lg:min-h-[520px]' : 'max-w-3xl mx-auto'} ${isActive ? 'tech-cloud-active' : ''}`}
    >
      <div
        aria-hidden
        className="tech-cloud-ambient pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className={`rounded-full bg-brand-primary/10 blur-3xl transition-all duration-500 dark:bg-brand-primary/15 ${
            isSide ? 'h-[min(72vw,420px)] w-[min(72vw,420px)] lg:h-[420px] lg:w-[420px]' : 'h-[min(55vw,340px)] w-[min(55vw,340px)]'
          } ${isActive ? 'scale-105 opacity-100' : 'opacity-70'}`}
        />
      </div>

      <div
        aria-hidden
        className={`tech-cloud-glow-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 transition-all duration-500 dark:from-brand-primary/10 dark:to-brand-secondary/10 ${
          isSide
            ? 'h-[min(78vw,440px)] w-[min(78vw,440px)] lg:h-[460px] lg:w-[460px]'
            : 'h-[min(62vw,380px)] w-[min(62vw,380px)]'
        }`}
      />

      {displayLabel && (highlightSlug || highlightLabel) && (
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 lg:top-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-mid shadow-glow-sm backdrop-blur-md dark:border-brand-primary/40 dark:bg-black/70 dark:text-brand-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-primary" aria-hidden />
            {displayLabel}
          </span>
        </div>
      )}

      <div
        className={`relative flex items-center justify-center lg:justify-end lg:pr-2 ${
          isHovered ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {!ready && <CloudSkeleton variant={variant} />}

        <div
          className={`w-full transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        >
          {ready && icons.length > 0 && (
            <StableIconCloud icons={icons} cloudKey={cloudKey} />
          )}
        </div>
      </div>
    </div>
  )
}

function CloudSkeleton({ variant }: { variant: 'default' | 'side' }) {
  const isSide = variant === 'side'

  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end"
    >
      <div
        className={`relative max-w-full ${
          isSide ? 'h-[min(78vw,440px)] w-[min(78vw,440px)] lg:h-[460px] lg:w-[460px]' : 'h-[min(70vh,520px)] w-[min(70vh,520px)]'
        }`}
      >
        <div className="absolute inset-0 animate-pulse rounded-full border border-brand-primary/20 bg-zinc-200/50 dark:bg-surface-hover/50" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-brand-primary/25" />
        <div className="absolute inset-[32%] rounded-full border border-brand-primary/10" />
      </div>
    </div>
  )
}
