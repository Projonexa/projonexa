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

const CANVAS_ID = 'projonexa-tech-icon-cloud'
const IDLE_SPEED: [number, number] = [0.045, -0.035]
const RAMP_DURATION_MS = 2800
const LEAVE_SETTLE_MS = 350
const TAG_TO_FRONT_MS = 420

const CLOUD_OPTIONS = {
  reverse: true,
  depth: 1,
  wheelZoom: false,
  imageScale: 2,
  activeCursor: 'default',
  animTiming: 'Smooth' as const,
  initial: IDLE_SPEED,
  clickToFront: false,
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
  tooltipDelay: 400,
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
      text?: string | null
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
      id={CANVAS_ID}
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
  /** Simple Icons slug from the left panel — brings matching tag to front */
  highlightSlug?: string | null
}

export function TechIconCloud({ variant = 'default', highlightSlug = null }: TechIconCloudProps) {
  const { theme } = useTheme()
  const [icons, setIcons] = useState<ReactNode[]>([])
  const [ready, setReady] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isSide = variant === 'side'

  const rampFrameRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<number | null>(null)
  const slugTitleMapRef = useRef<Map<string, string>>(new Map())
  const highlightSlugRef = useRef(highlightSlug)
  const externalHighlightRef = useRef(false)

  highlightSlugRef.current = highlightSlug

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

  const setCloudSpeed = useCallback((speed: [number, number]) => {
    getTagCanvas()?.SetSpeed(CANVAS_ID, speed)
  }, [])

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

  const bringSlugToFront = useCallback(
    (slug: string) => {
      const title = slugTitleMapRef.current.get(slug)
      if (!title) return

      const tc = getTagCanvas()
      if (!tc?.TagToFront) return

      try {
        tc.TagToFront(CANVAS_ID, {
          text: title,
          time: TAG_TO_FRONT_MS,
          active: true,
        })
      } catch {
        /* TagCanvas not ready */
      }
    },
    [],
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
      if (!highlightSlugRef.current) {
        externalHighlightRef.current = false
        rampToIdleSpeed()
      }
      leaveTimerRef.current = null
    }, LEAVE_SETTLE_MS)
  }, [cancelRamp, clearLeaveTimer, rampToIdleSpeed, setCloudSpeed])

  useEffect(() => {
    let cancelled = false
    setReady(false)
    slugTitleMapRef.current = new Map()

    fetchSimpleIcons({ slugs: [...ICON_CLOUD_SLUGS] }).then((data) => {
      if (cancelled) return

      const rendered = ICON_CLOUD_SLUGS.flatMap((slug) => {
        const icon = data.simpleIcons[slug]
        if (!icon) return []

        slugTitleMapRef.current.set(slug, icon.title)

        return [
          renderSimpleIcon({
            icon,
            size: isSide ? 44 : 48,
            bgHex,
            fallbackHex,
            minContrastRatio: 2.5,
            aProps: {
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

    const bootTimer = window.setTimeout(() => {
      setCloudSpeed(IDLE_SPEED)
    }, 500)

    return () => window.clearTimeout(bootTimer)
  }, [ready, setCloudSpeed, cloudKey])

  useEffect(() => {
    if (!ready) return

    if (!highlightSlug) {
      if (!isHovered && externalHighlightRef.current) {
        externalHighlightRef.current = false
        rampToIdleSpeed()
      }
      return
    }

    externalHighlightRef.current = true
    clearLeaveTimer()
    cancelRamp()
    setCloudSpeed([0, 0])
    bringSlugToFront(highlightSlug)
  }, [
    highlightSlug,
    ready,
    isHovered,
    bringSlugToFront,
    cancelRamp,
    clearLeaveTimer,
    rampToIdleSpeed,
    setCloudSpeed,
  ])

  useEffect(
    () => () => {
      cancelRamp()
      clearLeaveTimer()
    },
    [cancelRamp, clearLeaveTimer],
  )

  return (
    <div
      className={`relative w-full ${isSide ? 'lg:min-h-[520px]' : 'max-w-3xl mx-auto'}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className={`rounded-full bg-brand-primary/10 blur-3xl transition-opacity duration-500 dark:bg-brand-primary/15 ${
            isSide ? 'h-[min(72vw,420px)] w-[min(72vw,420px)] lg:h-[420px] lg:w-[420px]' : 'h-[min(55vw,340px)] w-[min(55vw,340px)]'
          } ${highlightSlug || isHovered ? 'opacity-100' : 'opacity-70'}`}
        />
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 shadow-[inset_0_0_80px_rgba(0,200,255,0.08)] transition-all duration-500 dark:from-brand-primary/10 dark:to-brand-secondary/10 ${
          isSide
            ? 'h-[min(78vw,440px)] w-[min(78vw,440px)] lg:h-[460px] lg:w-[460px]'
            : 'h-[min(62vw,380px)] w-[min(62vw,380px)]'
        } ${highlightSlug || isHovered ? 'border-brand-primary/30 dark:border-brand-primary/35' : 'border-brand-primary/10 dark:border-brand-primary/20'}`}
      />

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
