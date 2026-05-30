import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud'
import { ICON_CLOUD_SLUGS } from '@/data/technologies'
import { useTheme } from '@/context/ThemeContext'

const CLOUD_OPTIONS = {
  reverse: true,
  depth: 1,
  wheelZoom: false,
  imageScale: 2,
  activeCursor: 'pointer',
  animTiming: 'Smooth' as const,
  initial: [0.08, -0.08],
  clickToFront: 500,
  maxSpeed: 0.04,
  minSpeed: 0.012,
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
  freezeDecel: false,
  shape: 'sphere' as const,
  lock: null,
  dragControl: true,
}

export function TechIconCloud() {
  const { theme } = useTheme()
  const [icons, setIcons] = useState<ReactNode[]>([])
  const [ready, setReady] = useState(false)

  const bgHex = theme === 'dark' ? '#09090b' : '#f4f4f5'
  const fallbackHex = theme === 'dark' ? '#00c8ff' : '#18181b'

  useEffect(() => {
    let cancelled = false
    setReady(false)

    fetchSimpleIcons({ slugs: [...ICON_CLOUD_SLUGS] }).then((data) => {
      if (cancelled) return

      const rendered = Object.values(data.simpleIcons).map((icon) =>
        renderSimpleIcon({
          icon,
          size: 48,
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
  }, [bgHex, fallbackHex])

  const canvasClass = useMemo(
    () =>
      [
        'relative z-10 w-full max-w-[min(70vh,520px)] aspect-square',
        'cursor-grab active:cursor-grabbing',
        'transition-opacity duration-500',
        ready ? 'opacity-100' : 'opacity-0',
      ].join(' '),
    [ready],
  )

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[min(55vw,340px)] w-[min(55vw,340px)] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/15" />
      </div>

      {/* Soft globe backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(62vw,380px)] w-[min(62vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/10 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 shadow-[inset_0_0_80px_rgba(0,200,255,0.08)] dark:border-brand-primary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10"
      />

      <div
        className="relative flex flex-col items-center justify-center pt-6 sm:pt-8"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
      >
        {!ready && <CloudSkeleton />}

        <Cloud
          key={`${theme}-${ready}`}
          id="projonexa-tech-icon-cloud"
          options={CLOUD_OPTIONS}
          containerProps={{
            className: 'relative z-10 flex w-full items-center justify-center',
          }}
          canvasProps={{
            className: canvasClass,
            'aria-label': 'Interactive 3D technology stack — drag to rotate',
          }}
        >
          {icons}
        </Cloud>

        <p className="relative z-10 mt-4 text-center text-xs text-zinc-500 sm:text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/80">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
            Drag to explore · Hover for tooltips
          </span>
        </p>
      </div>
    </div>
  )
}

function CloudSkeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 flex items-center justify-center pt-6 sm:pt-8"
    >
      <div className="relative h-[min(70vh,520px)] w-[min(70vh,520px)] max-w-full">
        <div className="absolute inset-0 animate-pulse rounded-full border border-brand-primary/20 bg-zinc-200/50 dark:bg-zinc-800/30" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-brand-primary/25" />
        <div className="absolute inset-[32%] rounded-full border border-brand-primary/10" />
      </div>
    </div>
  )
}
