import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  MY_PROJECTS,
  PROJECTS_SECTION,
  projectPath,
  type MyProject,
} from '@/data/projects'

const easeSmooth = [0.22, 1, 0.36, 1] as const

function ProjectPreviewCard({ project, index }: { project: MyProject; index: number }) {
  const reducedMotion = useReducedMotion()
  const previewTech = project.techStack.slice(0, 4)
  const detailPath = projectPath(project.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: easeSmooth }}
      className="h-full"
    >
      <Link
        to={detailPath}
        className={`project-preview-card group relative flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-black/[0.08] bg-white/60 shadow-card backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:border-white/[0.1] dark:bg-black/45 dark:shadow-card-dark ${
          reducedMotion
            ? 'hover:border-brand-primary/30'
            : 'hover:-translate-y-2.5 hover:border-brand-primary/25 hover:shadow-[0_20px_48px_-16px_rgba(0,200,255,0.28)] dark:hover:shadow-[0_24px_56px_-18px_rgba(0,200,255,0.22)]'
        }`}
        aria-label={`View ${project.name} project page`}
      >
        <div className="relative aspect-[5/4] overflow-hidden bg-zinc-100 dark:bg-zinc-900/90 sm:aspect-[4/3]">
          <img
            src={project.thumbnailUrl}
            alt=""
            className={`h-full w-full object-cover object-top transition-transform duration-500 ${
              reducedMotion ? '' : 'group-hover:scale-105'
            }`}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

          <div
            className={`project-preview-open-badge absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 transition-opacity duration-300 ${
              reducedMotion ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
            }`}
            aria-hidden
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm">
              View project
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </div>

          <span
            className={`project-preview-arrow-fab absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/95 text-zinc-900 shadow-lg transition-[transform,opacity] duration-300 dark:bg-zinc-900/95 dark:text-white ${
              reducedMotion
                ? 'opacity-100'
                : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'
            }`}
            aria-hidden
          >
            <ArrowUpRight className="h-5 w-5 text-brand-primary dark:text-brand-accent" strokeWidth={2.5} />
          </span>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <div className="flex items-end gap-3">
              <img
                src={project.iconUrl}
                alt=""
                className="h-12 w-12 shrink-0 rounded-xl border border-white/20 bg-white shadow-md ring-2 ring-brand-primary/25 sm:h-14 sm:w-14"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-accent">
                  {project.category} · {project.platform}
                </p>
                <h3 className="truncate text-lg font-bold text-white sm:text-xl">{project.name}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              {project.status === 'live' ? 'Live' : 'In development'}
            </span>
            {project.updatedAt && (
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{project.updatedAt}</span>
            )}
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.tagline}
          </p>

          {project.stats && project.stats.length > 0 && (
            <dl className="mt-4 grid grid-cols-3 gap-2">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-black/[0.06] bg-white/50 px-2 py-2 text-center dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <dt className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </dt>
                  <dd className="mt-0.5 text-xs font-bold text-zinc-900 dark:text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {previewTech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-brand-primary/15 bg-brand-primary/[0.08] px-2 py-0.5 text-[10px] font-semibold text-brand-mid dark:text-brand-accent"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > previewTech.length && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                +{project.techStack.length - previewTech.length}
              </span>
            )}
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary transition-colors group-hover:text-brand-mid dark:text-brand-accent dark:group-hover:text-white">
            Open project page
            <ArrowUpRight
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                reducedMotion ? '' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

interface ProjectsGridProps {
  showSectionIntro?: boolean
}

export function ProjectsGrid({ showSectionIntro = true }: ProjectsGridProps) {
  const gridClass =
    MY_PROJECTS.length === 1
      ? 'mx-auto grid max-w-md gap-6 sm:max-w-lg'
      : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="container-wide">
      {showSectionIntro && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
            {PROJECTS_SECTION.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {PROJECTS_SECTION.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{PROJECTS_SECTION.lead}</p>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-500">
            {PROJECTS_SECTION.body}
          </p>
        </motion.div>
      )}

      {!showSectionIntro && (
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-400">
          Hover a card to preview — click to open the full project page.
        </p>
      )}

      <div className={gridClass}>
        {MY_PROJECTS.map((project, i) => (
          <ProjectPreviewCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {MY_PROJECTS.length === 0 && (
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Projects coming soon — check back for our latest work.
        </p>
      )}
    </div>
  )
}
