import { useCallback, useEffect, useState, type RefObject } from 'react'

export type FlowPoint = { x: number; y: number }

export type FlowPath = {
  id: string
  d: string
}

export type FlowEdge = {
  from: number
  to: number
  fromAnchor?: 'top' | 'center' | 'bottom'
  toAnchor?: 'top' | 'center' | 'bottom'
}

function getAnchor(el: HTMLElement, container: DOMRect, anchor: 'top' | 'center' | 'bottom') {
  const r = el.getBoundingClientRect()
  const x = r.left + r.width / 2 - container.left
  const y =
    anchor === 'top'
      ? r.top - container.top
      : anchor === 'bottom'
        ? r.bottom - container.top
        : r.top + r.height / 2 - container.top
  return { x, y }
}

function buildCurve(from: FlowPoint, to: FlowPoint, bend = 0.45) {
  const dy = to.y - from.y
  const offset = Math.max(Math.abs(dy) * bend, 28)
  const c1y = from.y + offset
  const c2y = to.y - offset
  return `M ${from.x} ${from.y} C ${from.x} ${c1y}, ${to.x} ${c2y}, ${to.x} ${to.y}`
}

export function useFlowPaths(
  containerRef: RefObject<HTMLElement | null>,
  getNodes: () => (HTMLElement | null)[],
  edges: FlowEdge[],
  enabled: boolean,
) {
  const [paths, setPaths] = useState<FlowPath[]>([])

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const cr = container.getBoundingClientRect()
    const nodes = getNodes()
    const next: FlowPath[] = []

    for (const edge of edges) {
      const fromEl = nodes[edge.from]
      const toEl = nodes[edge.to]
      if (!fromEl || !toEl) continue

      const from = getAnchor(fromEl, cr, edge.fromAnchor ?? 'bottom')
      const to = getAnchor(toEl, cr, edge.toAnchor ?? 'top')
      next.push({
        id: `${edge.from}-${edge.to}`,
        d: buildCurve(from, to),
      })
    }

    setPaths(next)
  }, [containerRef, getNodes, edges])

  useEffect(() => {
    if (!enabled) {
      setPaths([])
      return
    }

    const raf = requestAnimationFrame(measure)
    const container = containerRef.current
    const settleTimers = [120, 400, 900, 1600].map((ms) =>
      window.setTimeout(measure, ms),
    )

    if (!container) {
      return () => {
        cancelAnimationFrame(raf)
        settleTimers.forEach(window.clearTimeout)
      }
    }

    const ro = new ResizeObserver(() => measure())
    ro.observe(container)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      settleTimers.forEach(window.clearTimeout)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [enabled, measure, containerRef])

  return paths
}
