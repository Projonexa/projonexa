import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent'
import { CTA } from '@/components/sections/CTA'
import { SEO } from '@/components/seo/SEO'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/data/brand'
import { getProjectBySlug, projectPath } from '@/data/projects'
import { BASE_KEYWORDS, type PageSEO } from '@/data/seo'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
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
    <>
      <SEO seo={buildProjectSEO(project)} />

      <section className="relative overflow-hidden border-b border-black/5 dark:border-white/[0.06]">
        <div className="relative aspect-[21/8] max-h-[320px] min-h-[200px] w-full overflow-hidden bg-zinc-900 sm:aspect-[21/7] sm:max-h-[360px]">
          <img
            src={project.thumbnailUrl}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20" />
        </div>

        <div className="container-wide relative -mt-20 pb-10 sm:-mt-24 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeSmooth }}
          >
            <Link
              to="/projects"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-brand-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All projects
            </Link>

            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Link to="/projects" className="hover:text-brand-primary dark:hover:text-brand-accent">
                Projects
              </Link>
              <span aria-hidden>/</span>
              <span className="font-medium text-zinc-300">{project.name}</span>
            </nav>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4 sm:gap-5">
                <img
                  src={project.iconUrl}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-2xl border border-white/20 bg-white shadow-xl ring-2 ring-brand-primary/30 sm:h-24 sm:w-24"
                />
                <div className="min-w-0 pb-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent sm:text-xs">
                    {project.category} · {project.platform}
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mt-5 lg:text-5xl">
                    {project.name}
                  </h1>
                  <p className="mt-2 max-w-2xl text-base text-zinc-900 dark:text-zinc-100  sm:text-lg">{project.tagline}</p>
                </div>
              </div>

              {primaryLink && (
                <Button
                  href={primaryLink.url}
                  variant="primary"
                  className="w-full shrink-0 shadow-glow-sm sm:w-auto"
                >
                  {primaryLink.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding !pt-10">
        <ProjectDetailContent project={project} />
      </section>

      <CTA />
    </>
  )
}
