import { useCallback, useEffect, useRef } from 'react'
import { useMotionValue } from 'framer-motion'

export function useHeroCursor(enabled: boolean) {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const isActive = useMotionValue(0)

  const centerCursor = useCallback(() => {
    const el = sectionRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    mouseX.set(width / 2)
    mouseY.set(height * 0.42)
    parallaxX.set(0)
    parallaxY.set(0)
    isActive.set(0)
  }, [mouseX, mouseY, parallaxX, parallaxY, isActive])

  useEffect(() => {
    centerCursor()
    const onResize = () => centerCursor()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [centerCursor])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enabled || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseX.set(x)
      mouseY.set(y)
      parallaxX.set(x / rect.width - 0.5)
      parallaxY.set(y / rect.height - 0.5)
      isActive.set(1)
    },
    [enabled, mouseX, mouseY, parallaxX, parallaxY, isActive],
  )

  const handleMouseLeave = useCallback(() => {
    centerCursor()
  }, [centerCursor])

  return {
    sectionRef,
    mouseX,
    mouseY,
    parallaxX,
    parallaxY,
    isActive,
    handleMouseMove,
    handleMouseLeave,
  }
}
