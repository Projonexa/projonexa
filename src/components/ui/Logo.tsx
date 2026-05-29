import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Projonexa Home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
        <span className="text-sm font-extrabold text-white">P</span>
      </span>
      <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
        Projo<span className="text-gradient">nexa</span>
      </span>
    </Link>
  )
}
