import { Link } from 'react-router-dom'

export function ApplyPageBrand() {
  return (
    <Link
      to="/"
      className="group flex flex-col items-center gap-3 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
      aria-label="Projonexa home"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-16">
        <span className="text-xl font-extrabold text-white sm:text-2xl">P</span>
      </span>
      <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
        Projo<span className="text-gradient">nexa</span>
      </span>
    </Link>
  )
}
