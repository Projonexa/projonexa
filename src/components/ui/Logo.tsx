import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`} aria-label="Projonexa Home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-glow transition-transform duration-300 group-hover:scale-[1.03] sm:h-9 sm:w-9">
        <span
          className="pointer-events-none absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <span className="relative text-sm font-extrabold text-white">P</span>
      </span>
      <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
        Projo<span className="text-gradient">nexa</span>
      </span>
    </Link>
  )
}
