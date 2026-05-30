import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud'
import { ICON_CLOUD_SLUGS } from '@/data/technologies'
import { useTheme } from '@/context/ThemeContext'

const CANVAS_ID = 'projonexa-tech-icon-cloud'
const IDLE_SPEED: [number, number] = [0.045, -0.035]
const RAMP_DURATION_MS = 2800
const LEAVE_SETTLE_MS = 350

const CLOUD_OPTIONS = {
  reverse: true,
  depth: 1,
  wheelZoom: false,
  imageScale: 2,
  activeCursor: 'grab',
  animTiming: 'Smooth' as const,
  initial: IDLE_SPEED,
  clickToFront: 500,
  maxSpeed: 0.018,
  minSpeed: 0.006,
  decel: 0.88,
  offsetX: 0,
  offsetY: 0,
  shuffleTags: true,
  outlineMethod: 'colour' as const,
  outlineColour: 'rgba(0, 200, 255, 0.35)',
  outlineThickness: 2,
  textColour: '#ffffff',
  textHeight: 15,
  tooltip: 'native' as const,
  freezeActive: false,
  freezeDecel: true,
  shape: 'sphere' as const,
  lock: null,
  dragControl: true,
  dragThreshold: 3,
}

type TagCanvasApi = {
  SetSpeed: (id: string, speed: [number, number]) => void
}

function getTagCanvas(): TagCanvasApi | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as Window & { TagCanvas?: TagCanvasApi }).TagCanvas
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

interface TechIconCloudProps {
  variant?: 'default' | 'side'
}

export function TechIconCloud({ variant = 'default' }: TechIconCloudProps) {
  const { theme } = useTheme()
  const [icons, setIcons] = useState<ReactNode[]>([])
  const [ready, setReady] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isSide = variant === 'side'

  const rampFrameRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<number | null>(null)

  const bgHex = theme === 'dark' ? '#09090b' : '#f4f4f5'
  const fallbackHex = theme === 'dark' ? '#00c8ff' : '#18181b'

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

      setCloudSpeed([
        IDLE_SPEED[0] * eased,
        IDLE_SPEED[1] * eased,
      ])

      if (progress < 1) {
        rampFrameRef.current = requestAnimationFrame(tick)
      } else {
        rampFrameRef.current = null
        setCloudSpeed(IDLE_SPEED)
      }
    }

    rampFrameRef.current = requestAnimationFrame(tick)
  }, [cancelRamp, setCloudSpeed])

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
      rampToIdleSpeed()
      leaveTimerRef.current = null
    }, LEAVE_SETTLE_MS)
  }, [cancelRamp, clearLeaveTimer, rampToIdleSpeed, setCloudSpeed])

  useEffect(() => {
    let cancelled = false
    setReady(false)

    fetchSimpleIcons({ slugs: [...ICON_CLOUD_SLUGS] }).then((data) => {
      if (cancelled) return

      const rendered = Object.values(data.simpleIcons).map((icon) =>
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
      )

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
  }, [ready, setCloudSpeed, theme, variant])

  useEffect(
    () => () => {
      cancelRamp()
      clearLeaveTimer()
    },
    [cancelRamp, clearLeaveTimer],
  )

  const canvasClass = useMemo(
    () =>
      [
        'relative z-10 w-full aspect-square transition-opacity duration-500',
        isHovered ? 'cursor-grabbing' : 'cursor-grab',
        isSide ? 'max-w-[min(100%,480px)] mx-auto lg:max-w-none lg:mx-0' : 'max-w-[min(70vh,520px)] mx-auto',
        ready ? 'opacity-100' : 'opacity-0',
      ].join(' '),
    [ready, isSide, isHovered],
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
          } ${isHovered ? 'opacity-100' : 'opacity-70'}`}
        />
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 shadow-[inset_0_0_80px_rgba(0,200,255,0.08)] transition-all duration-500 dark:from-brand-primary/10 dark:to-brand-secondary/10 ${
          isSide
            ? 'h-[min(78vw,440px)] w-[min(78vw,440px)] lg:h-[460px] lg:w-[460px]'
            : 'h-[min(62vw,380px)] w-[min(62vw,380px)]'
        } ${isHovered ? 'border-brand-primary/30 dark:border-brand-primary/35' : 'border-brand-primary/10 dark:border-brand-primary/20'}`}
      />

      <div
        className="relative flex flex-col items-center justify-center lg:items-end lg:pr-2"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {!ready && <CloudSkeleton variant={variant} />}

        <Cloud
          key={`${theme}-${ready}-${variant}`}
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

        <p className="relative z-10 mt-4 w-full text-center text-xs text-zinc-500 sm:text-sm lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/80">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full bg-brand-primary transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'animate-pulse opacity-80'
              }`}
            />
            {isHovered ? 'Drag to explore · Release to resume spin' : 'Hover to pause · Drag to rotate'}
          </span>
        </p>
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
        <div className="absolute inset-0 animate-pulse rounded-full border border-brand-primary/20 bg-zinc-200/50 dark:bg-zinc-800/30" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-brand-primary/25" />
        <div className="absolute inset-[32%] rounded-full border border-brand-primary/10" />
      </div>
    </div>
  )
}
