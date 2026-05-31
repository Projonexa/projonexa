import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent'
import { CTA } from '@/components/sections/CTA'
import { SEO } from '@/components/seo/SEO'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/data/brand'
import { getProjectBySlug, projectPath } from '@/data/projects'
import { BASE_KEYWORDS, type PageSEO } from '@/data/seo'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

const easeSmooth = [0.22, 1, 0.36, 1] as const

function buildProjectSEO(project: NonNullable<ReturnType<typeof getProjectBySlug>>): PageSEO {
  return {
    title: `${project.name} | Projects | ${BRAND.name}`,
    description: project.description,
    keywords: [...BASE_KEYWORDS, project.name, project.category, ...project.techStack],
    path: projectPath(project.id),
    breadcrumb: [
      { name: 'Projects', path: '/projects' },
      { name: project.name, path: projectPath(project.id) },
    ],
  }
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const primaryLink =
    project.deploymentLinks.find((l) => l.type === 'play-store') ?? project.deploymentLinks[0]

  return (
    <div className="project-detail-page">
      <SEO seo={buildProjectSEO(project)} />

      <section className="relative border-b border-black/[0.06] bg-zinc-50/90 pt-20 backdrop-blur-sm dark:border-white/[0.06] dark:bg-zinc-950/80 sm:pt-24 md:pt-28">
        <div className="container-wide px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="project-detail-hero-card relative overflow-hidden rounded-2xl p-5 sm:rounded-3xl sm:p-8 lg:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.04] via-transparent to-brand-secondary/[0.05]"
            />

            <div className="relative">
              <Link
                to="/projects"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-zinc-100/80 px-3.5 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-primary/25 hover:bg-brand-primary/10 hover:text-brand-mid dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:text-brand-accent"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All projects
              </Link>

              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
              >
                <Link
                  to="/projects"
                  className="font-medium transition-colors hover:text-brand-primary dark:hover:text-brand-accent"
                >
                  Projects
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
                <span className="font-semibold text-zinc-900 dark:text-white">{project.name}</span>
              </nav>

              <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-12 xl:grid-cols-[minmax(0,1.1fr)_360px]">
                <div className="min-w-0">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
                    <div className="project-detail-app-icon-ring mx-auto shrink-0 rounded-[1.35rem] p-[3px] sm:mx-0">
                      <img
                        src={project.iconUrl}
                        alt=""
                        className="h-20 w-20 rounded-[calc(1.35rem-3px)] border border-white/30 bg-white object-cover shadow-md sm:h-24 sm:w-24"
                      />
                    </div>

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                          {project.status === 'live' ? 'Live on Google Play' : 'In development'}
                        </span>
                        <span className="project-detail-meta-pill rounded-full px-3 py-1 text-xs font-semibold">
                          {project.category}
                        </span>
                        <span className="project-detail-meta-pill rounded-full px-3 py-1 text-xs font-semibold">
                          {project.platform}
                        </span>
                      </div>

                      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                        {project.name}
                      </h1>
                      <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
                        {project.tagline}
                      </p>
                      {project.updatedAt && (
                        <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Last updated {project.updatedAt}
                        </p>
                      )}
                    </div>
                  </div>

                  {primaryLink && (
                    <div className="mt-8 flex justify-center sm:justify-start">
                      <Button
                        href={primaryLink.url}
                        variant="primary"
                        className="w-full shadow-glow-sm sm:w-auto"
                      >
                        {primaryLink.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="project-detail-thumbnail-column mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-none lg:justify-self-end">
                  <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 lg:text-left">
                    App preview
                  </p>
                  <div className="project-detail-device-frame relative mx-auto w-full max-w-[300px] lg:mx-0">
                    <div className="project-detail-device-bezel overflow-hidden rounded-[2rem] p-2 sm:p-2.5">
                      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.5rem] bg-zinc-900">
                        <img
                          src={project.thumbnailUrl}
                          alt={`${project.name} app screenshot`}
                          className="h-full w-full object-cover object-top"
                          loading="eager"
                          decoding="async"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-transparent"
                        />
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.25rem] bg-brand-primary/15 blur-2xl dark:bg-brand-primary/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding border-b border-black/[0.04] bg-zinc-50/60 dark:border-white/[0.04] dark:bg-transparent">
        <ProjectDetailContent project={project} />
      </section>

      <CTA />
    </div>
  )
}
