/** Fixed layout for the Why Projonexa flow canvas (viewBox coordinates) */
export const FLOW_VIEWBOX = { width: 960, height: 520 } as const

export const FLOW_HUB = { x: 480, y: 52 } as const

export const FLOW_PILLARS = [
  { x: 192, y: 148 },
  { x: 480, y: 148 },
  { x: 768, y: 148 },
] as const

const BENEFIT_XS = [128, 272, 416, 560, 704] as const
const ROW1_Y = 268
const ROW2_Y = 408

export const FLOW_BENEFITS = [
  ...BENEFIT_XS.map((x) => ({ x, y: ROW1_Y })),
  ...BENEFIT_XS.map((x) => ({ x, y: ROW2_Y })),
] as const

/** Single path for connector lines + traveling glow dot (snake through all nodes) */
export const FLOW_TRAVEL_PATH = [
  `M ${FLOW_HUB.x} ${FLOW_HUB.y + 28}`,
  `L ${FLOW_PILLARS[0].x} ${FLOW_PILLARS[0].y - 8}`,
  `L ${FLOW_PILLARS[1].x} ${FLOW_PILLARS[1].y - 8}`,
  `L ${FLOW_PILLARS[2].x} ${FLOW_PILLARS[2].y - 8}`,
  `L ${FLOW_BENEFITS[0].x} ${FLOW_BENEFITS[0].y - 8}`,
  ...FLOW_BENEFITS.slice(1, 5).map((p) => `L ${p.x} ${p.y - 8}`),
  `L ${FLOW_BENEFITS[9].x} ${FLOW_BENEFITS[9].y - 8}`,
  ...FLOW_BENEFITS.slice(5, 9)
    .reverse()
    .map((p) => `L ${p.x} ${p.y - 8}`),
].join(' ')

/** Branch paths from hub to pillars (visual tree) */
export const FLOW_BRANCH_PATHS = [
  `M ${FLOW_HUB.x} ${FLOW_HUB.y + 24} L ${FLOW_PILLARS[0].x} ${FLOW_PILLARS[0].y - 12}`,
  `M ${FLOW_HUB.x} ${FLOW_HUB.y + 24} L ${FLOW_PILLARS[1].x} ${FLOW_PILLARS[1].y - 12}`,
  `M ${FLOW_HUB.x} ${FLOW_HUB.y + 24} L ${FLOW_PILLARS[2].x} ${FLOW_PILLARS[2].y - 12}`,
  `M ${FLOW_PILLARS[1].x} ${FLOW_PILLARS[1].y + 36} L ${FLOW_BENEFITS[2].x} ${FLOW_BENEFITS[2].y - 12}`,
] as const

export function flowToPercent(x: number, y: number) {
  return {
    left: `${(x / FLOW_VIEWBOX.width) * 100}%`,
    top: `${(y / FLOW_VIEWBOX.height) * 100}%`,
  }
}
