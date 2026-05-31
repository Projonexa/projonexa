/** Fixed layout for the Why Projonexa flow canvas (viewBox coordinates) */
export const FLOW_VIEWBOX = { width: 960, height: 520 } as const

export const FLOW_HUB = { x: 480, y: 52 } as const

export const FLOW_PILLARS = [
  { x: 192, y: 148 },
  { x: 480, y: 148 },
  { x: 768, y: 148 },
] as const

/** Benefit indices grouped under each pillar (Technical · Academic · Startup) */
export const FLOW_BENEFIT_GROUPS: readonly [readonly number[], readonly number[], readonly number[]] = [
  [0, 1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
] as const

const COLUMN_X = [FLOW_PILLARS[0].x, FLOW_PILLARS[1].x, FLOW_PILLARS[2].x] as const
const BENEFIT_ROW_START = 248
const BENEFIT_ROW_GAP = 56

function anchorBelow(x: number, y: number, offset = 28) {
  return { x, y: y + offset }
}

function anchorAbove(x: number, y: number, offset = 12) {
  return { x, y: y - offset }
}

/** Position for each WHY_CHOOSE item by pillar column */
export function getBenefitPosition(benefitIndex: number) {
  for (let g = 0; g < FLOW_BENEFIT_GROUPS.length; g++) {
    const slot = FLOW_BENEFIT_GROUPS[g].indexOf(benefitIndex)
    if (slot >= 0) {
      return {
        x: COLUMN_X[g],
        y: BENEFIT_ROW_START + slot * BENEFIT_ROW_GAP,
      }
    }
  }
  return { x: COLUMN_X[1], y: BENEFIT_ROW_START }
}

/** Exactly 3 lines: Start → Technical Depth · Academic Rigor · Startup Velocity */
export const FLOW_HUB_TO_PILLAR_PATHS = FLOW_PILLARS.map((pillar) => {
  const from = anchorBelow(FLOW_HUB.x, FLOW_HUB.y, 24)
  const to = anchorAbove(pillar.x, pillar.y)
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
})

function buildPillarToBenefitPaths() {
  const paths: string[] = []

  FLOW_BENEFIT_GROUPS.forEach((indices, pillarIndex) => {
    const pillar = FLOW_PILLARS[pillarIndex]
    const pillarBottom = anchorBelow(pillar.x, pillar.y, 26)

    indices.forEach((benefitIndex, slot) => {
      const pos = getBenefitPosition(benefitIndex)
      const benefitTop = anchorAbove(pos.x, pos.y)

      if (slot === 0) {
        paths.push(`M ${pillarBottom.x} ${pillarBottom.y} L ${benefitTop.x} ${benefitTop.y}`)
      } else {
        const prev = getBenefitPosition(indices[slot - 1])
        const prevBottom = anchorBelow(prev.x, prev.y, 22)
        paths.push(`M ${prevBottom.x} ${prevBottom.y} L ${benefitTop.x} ${benefitTop.y}`)
      }
    })
  })

  return paths
}

export const FLOW_PILLAR_TO_BENEFIT_PATHS = buildPillarToBenefitPaths()

/** All visible connector lines (no duplicates) */
export const FLOW_CONNECTOR_PATHS = [
  ...FLOW_HUB_TO_PILLAR_PATHS,
  ...FLOW_PILLAR_TO_BENEFIT_PATHS,
] as const

/** Path for the traveling glow dot: hub → pillars → each column top to bottom */
export function buildFlowDotPath() {
  const parts: string[] = []
  const hub = anchorBelow(FLOW_HUB.x, FLOW_HUB.y, 24)

  parts.push(`M ${hub.x} ${hub.y}`)

  for (let p = 0; p < FLOW_PILLARS.length; p++) {
    const pillar = FLOW_PILLARS[p]
    const pillarTop = anchorAbove(pillar.x, pillar.y)
    parts.push(`L ${pillarTop.x} ${pillarTop.y}`)

    const indices = FLOW_BENEFIT_GROUPS[p]
    for (let s = 0; s < indices.length; s++) {
      const pos = getBenefitPosition(indices[s])
      const top = anchorAbove(pos.x, pos.y)
      parts.push(`L ${top.x} ${top.y}`)
      if (s < indices.length - 1) {
        const next = getBenefitPosition(indices[s + 1])
        const nextTop = anchorAbove(next.x, next.y)
        const bottom = anchorBelow(pos.x, pos.y, 22)
        parts.push(`L ${bottom.x} ${bottom.y} L ${nextTop.x} ${nextTop.y}`)
      }
    }
  }

  return parts.join(' ')
}

export const FLOW_DOT_PATH = buildFlowDotPath()

export function flowToPercent(x: number, y: number) {
  return {
    left: `${(x / FLOW_VIEWBOX.width) * 100}%`,
    top: `${(y / FLOW_VIEWBOX.height) * 100}%`,
  }
}
