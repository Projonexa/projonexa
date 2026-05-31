/** Passed as `id` to react-icon-cloud — real TagCanvas id is `canvas-${CLOUD_INSTANCE_ID}` */
export const CLOUD_INSTANCE_ID = 'projonexa-tech-icon-cloud'

export function getTagCanvasElementId() {
  return `canvas-${CLOUD_INSTANCE_ID}`
}

export function getCloudTagDomId(slug: string) {
  return `cloud-tag-${slug}`
}

export function isCloudTagInDom(slug: string) {
  if (typeof document === 'undefined') return false
  return Boolean(document.getElementById(getCloudTagDomId(slug)))
}
