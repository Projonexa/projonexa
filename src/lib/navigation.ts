/** True when the current route matches a nav item (including nested paths). */
export function isNavLinkActive(pathname: string, path: string): boolean {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}
