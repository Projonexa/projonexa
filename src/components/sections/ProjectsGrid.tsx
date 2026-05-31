import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Layers,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  MY_PROJECTS,
  PROJECTS_SECTION,
  type DeploymentLink,
  type DeploymentLinkType,
  type MyProject,
} from '@/data/projects'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const deploymentIcons: Record<DeploymentLinkType, typeof Globe> = {
  'play-store': Smartphone,
  'app-store': Smartphone,
  web: Globe,
  github: Github,
  demo: ExternalLink,
}

function DeploymentButton({ link }: { link: DeploymentLink }) {
  const Icon = deploymentIcons[link.type]
  const isExternal = link.url.startsWith('http') || link.url.startsWith('mailto:')

  if (link.type === 'play-store' || link.type === 'app-store' || isExternal) {
    return (
      <Button
        href={link.url}
        variant={link.type === 'play-store' ? 'primary' : 'secondary'}
        className={link.type === 'play-store' ? 'shadow-glow-sm' : ''}
      >
        <Icon className="h-4 w-4" aria-hidden />
        {link.label}
        <ArrowUpRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
      </Button>
    )
  }

  return (
    <Button to={link.url} variant="secondary">
      <Icon className="h-4 w-4" aria-hidden />
      {link.label}
    </Button>
  )
}

function ProjectPreviewCard({
  project,
  index,
  onOpen,
}: {
  project: MyProject
  index: number
  onOpen: (id: string) => void
}) {
  const reducedMotion = useReducedMotion()
  const previewTech = project.techStack.slice(0, 4)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: easeSmooth }}
      className="h-full"
    >
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        className={`project-preview-card group relative flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-black/[0.08] bg-white/60 text-left shadow-card backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:border-white/[0.1] dark:bg-black/45 dark:shadow-card-dark ${
          reducedMotion
            ? 'hover:border-brand-primary/30'
            : 'hover:-translate-y-2.5 hover:border-brand-primary/25 hover:shadow-[0_20px_48px_-16px_rgba(0,200,255,0.28)] dark:hover:shadow-[0_24px_56px_-18px_rgba(0,200,255,0.22)]'
        }`}
        aria-label={`Open ${project.name} project details`}
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
              Open project
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
            View full details
            <ArrowUpRight
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                reducedMotion ? '' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
              aria-hidden
            />
          </span>
        </div>
      </button>
    </motion.div>
  )
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: MyProject
  onClose: () => void
}) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close project details"
        onClick={onClose}
      />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: easeSmooth }}
        className="project-modal-panel relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-black/[0.08] bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/[0.1] dark:bg-zinc-950/98 sm:max-h-[88vh] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0">
          <div className="relative aspect-[21/9] max-h-[220px] overflow-hidden bg-zinc-900 sm:max-h-[240px]">
            <img
              src={project.thumbnailUrl}
              alt=""
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="absolute bottom-4 left-5 right-14 flex items-end gap-3 sm:bottom-5">
              <img
                src={project.iconUrl}
                alt=""
                className="h-14 w-14 rounded-2xl border border-white/20 bg-white shadow-lg ring-2 ring-brand-primary/30"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-accent">
                  {project.category} · {project.platform}
                </p>
                <h2 id="project-modal-title" className="text-xl font-bold text-white sm:text-2xl">
                  {project.name}
                </h2>
                <p className="mt-0.5 text-sm text-zinc-300">{project.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              {project.status === 'live' ? 'Live on Google Play' : 'In development'}
            </span>
            {project.updatedAt && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Updated {project.updatedAt}</span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>

          {project.stats && (
            <dl className="mt-5 grid grid-cols-3 gap-3">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-black/[0.06] bg-zinc-50 px-3 py-2.5 text-center dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              <BookOpen className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
              Overview
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{project.overview}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.deploymentLinks.map((link) => (
              <DeploymentButton key={link.url} link={link} />
            ))}
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                <Sparkles className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
                What&apos;s inside
              </p>
              <ul className="space-y-2">
                {project.contentHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                <Layers className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
                Features
              </p>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.supportedBranches && project.supportedBranches.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                <GraduationCap className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
                Supported branches
              </p>
              <ul className="flex flex-wrap gap-2">
                {project.supportedBranches.map((branch) => (
                  <li key={branch}>
                    <span className="project-branch-chip inline-block rounded-full border border-black/[0.06] bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-brand-primary/10 dark:text-zinc-200">
                      {branch}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Tech stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-mid dark:text-brand-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.contactEmail && (
            <p className="mt-6 border-t border-black/[0.06] pt-5 text-sm text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400">
              Questions or feedback?{' '}
              <a
                href={`mailto:${project.contactEmail}`}
                className="font-medium text-brand-primary hover:underline dark:text-brand-accent"
              >
                {project.contactEmail}
              </a>
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

interface ProjectsGridProps {
  showSectionIntro?: boolean
}

export function ProjectsGrid({ showSectionIntro = true }: ProjectsGridProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = MY_PROJECTS.find((p) => p.id === openId) ?? null

  const handleClose = useCallback(() => setOpenId(null), [])

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
          Hover a card to preview — click to open full project details.
        </p>
      )}

      <div className={gridClass}>
        {MY_PROJECTS.map((project, i) => (
          <ProjectPreviewCard
            key={project.id}
            project={project}
            index={i}
            onOpen={setOpenId}
          />
        ))}
      </div>

      {MY_PROJECTS.length === 0 && (
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Projects coming soon — check back for our latest work.
        </p>
      )}

      <AnimatePresence>
        {openProject && <ProjectDetailModal project={openProject} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  )
}
