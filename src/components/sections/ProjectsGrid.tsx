import { motion } from 'framer-motion'
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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
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

function ProjectCard({ project, index }: { project: MyProject; index: number }) {
  const primaryDeploy =
    project.deploymentLinks.find((l) => l.type === 'play-store' || l.type === 'web') ??
    project.deploymentLinks[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: easeSmooth }}
      className="project-card group relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white/55 shadow-card backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 dark:shadow-card-dark"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.05] via-transparent to-brand-secondary/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="relative border-b border-black/[0.06] dark:border-white/[0.06] lg:border-b-0 lg:border-r">
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900/80 sm:aspect-[16/9]">
            <img
              src={project.thumbnailUrl}
              alt={`${project.name} app screenshot`}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 sm:bottom-5 sm:left-5">
              <img
                src={project.iconUrl}
                alt=""
                className="h-14 w-14 shrink-0 rounded-2xl border border-white/20 bg-white shadow-lg ring-2 ring-brand-primary/30 sm:h-16 sm:w-16"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0 pb-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                  {project.category} · {project.platform}
                </p>
                <h3 className="truncate text-xl font-bold text-white sm:text-2xl">{project.name}</h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-zinc-200">{project.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              {project.status === 'live' ? 'Live on Google Play' : 'In development'}
            </span>
            {project.updatedAt && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Updated {project.updatedAt}</span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[0.95rem]">
            {project.description}
          </p>

          {project.stats && project.stats.length > 0 && (
            <dl className="mt-5 grid grid-cols-3 gap-3">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-black/[0.06] bg-white/50 px-3 py-2.5 text-center dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
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
        </div>
      </div>

      <div className="relative border-t border-black/[0.06] px-6 py-6 dark:border-white/[0.06] sm:px-8 sm:py-7">
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
              What&apos;s inside
            </p>
            <ul className="space-y-2">
              {project.contentHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {project.supportedBranches && project.supportedBranches.length > 0 && (
            <div>
              <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                <GraduationCap className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
                Supported branches
              </p>
              <ul className="flex flex-wrap gap-2">
                {project.supportedBranches.map((branch) => (
                  <li key={branch}>
                    <span className="project-branch-chip inline-block rounded-full border border-black/[0.06] bg-white/60 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-brand-primary/10 dark:text-zinc-200 sm:text-xs">
                      {branch}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              <Layers className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
              Features & tech stack
            </p>
            <ul className="mb-4 space-y-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-mid dark:text-brand-accent sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.contactEmail && (
          <p className="mt-6 border-t border-black/[0.05] pt-5 text-sm text-zinc-600 dark:border-white/[0.06] dark:text-zinc-400">
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

      {primaryDeploy && (
        <a
          href={primaryDeploy.url}
          className="sr-only"
          target="_blank"
          rel="noopener noreferrer"
        >
          View {project.name} deployment
        </a>
      )}
    </motion.article>
  )
}

interface ProjectsGridProps {
  showSectionIntro?: boolean
}

export function ProjectsGrid({ showSectionIntro = true }: ProjectsGridProps) {
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

      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:gap-12">
        {MY_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
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
