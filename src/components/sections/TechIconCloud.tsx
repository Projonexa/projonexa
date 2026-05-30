import { useTheme } from '@/context/ThemeContext'
import { ICON_CLOUD_SLUGS } from '@/data/technologies'
import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud'

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

interface TechIconCloudProps {
  variant?: 'default' | 'side'
}

export function TechIconCloud({ variant = 'default' }: TechIconCloudProps) {
  const { theme } = useTheme()
  const [icons, setIcons] = useState<ReactNode[]>([])
  const [ready, setReady] = useState(false)
  const isSide = variant === 'side'

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

  const canvasClass = useMemo(
    () =>
      [
        'relative z-10 w-full aspect-square cursor-grab active:cursor-grabbing transition-opacity duration-500',
        isSide ? 'max-w-[min(100%,480px)] mx-auto lg:max-w-none lg:mx-0' : 'max-w-[min(70vh,520px)] mx-auto',
        ready ? 'opacity-100' : 'opacity-0',
      ].join(' '),
    [ready, isSide],
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
          className={`rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/15 ${
            isSide ? 'h-[min(72vw,420px)] w-[min(72vw,420px)] lg:h-[420px] lg:w-[420px]' : 'h-[min(55vw,340px)] w-[min(55vw,340px)]'
          }`}
        />
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/10 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 shadow-[inset_0_0_80px_rgba(0,200,255,0.08)] dark:border-brand-primary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 ${
          isSide
            ? 'h-[min(78vw,440px)] w-[min(78vw,440px)] lg:h-[460px] lg:w-[460px]'
            : 'h-[min(62vw,380px)] w-[min(62vw,380px)]'
        }`}
      />

      <div className="relative flex flex-col items-center justify-center lg:items-end lg:pr-2">
        {!ready && <CloudSkeleton variant={variant} />}

        <Cloud
          key={`${theme}-${ready}-${variant}`}
          id="projonexa-tech-icon-cloud"
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

        {/* <p className="relative z-10 mt-4 w-full text-center text-xs text-zinc-500 sm:text-sm lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/80">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-primary" />
            Drag to explore · Hover for tooltips
          </span>
        </p> */}
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
