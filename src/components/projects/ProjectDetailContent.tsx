import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  BookOpen,
  Check,
  GraduationCap,
  Layers,
  Mail,
  Sparkles,
} from 'lucide-react'
import { ProjectDeploymentButtons } from '@/components/projects/ProjectDeploymentButtons'
import type { MyProject } from '@/data/projects'

const easeSmooth = [0.22, 1, 0.36, 1] as const

function DetailSection({
  id,
  title,
  icon: Icon,
  children,
  delay = 0,
}: {
  id: string
  title: string
  icon: typeof BookOpen
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.45, delay, ease: easeSmooth }}
      className="project-detail-section rounded-2xl border border-black/[0.07] bg-white/55 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-8"
    >
      <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
        <Icon className="h-4 w-4 text-brand-primary" aria-hidden />
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

export function ProjectDetailContent({ project }: { project: MyProject }) {
  return (
    <div className="container-wide">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:gap-8 lg:items-start">
          <div className="flex flex-col gap-6">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="project-detail-section rounded-2xl border border-black/[0.07] bg-white/55 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  {project.status === 'live' ? 'Live on Google Play' : 'In development'}
                </span>
                <span className="rounded-full border border-black/[0.06] bg-white/60 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-zinc-300">
                  {project.category}
                </span>
                <span className="rounded-full border border-black/[0.06] bg-white/60 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-zinc-300">
                  {project.platform}
                </span>
                {project.updatedAt && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Updated {project.updatedAt}
                  </span>
                )}
              </div>

              <p className="mt-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.description}
              </p>
            </motion.section>

            <DetailSection id="overview" title="Overview" icon={BookOpen} delay={0.05}>
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.overview}
              </p>
            </DetailSection>

            <DetailSection id="whats-inside" title="What's inside" icon={Sparkles} delay={0.08}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.contentHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-black/[0.05] bg-white/40 px-4 py-3 text-sm text-zinc-700 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-zinc-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection id="features" title="Features" icon={Layers} delay={0.1}>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </DetailSection>

            {project.supportedBranches && project.supportedBranches.length > 0 && (
              <DetailSection
                id="branches"
                title="Supported branches"
                icon={GraduationCap}
                delay={0.12}
              >
                <ul className="flex flex-wrap gap-2">
                  {project.supportedBranches.map((branch) => (
                    <li key={branch}>
                      <span className="project-branch-chip inline-block rounded-full border border-black/[0.06] bg-white/60 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-brand-primary/10 dark:text-zinc-200">
                        {branch}
                      </span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06, ease: easeSmooth }}
              className="project-detail-section rounded-2xl border border-black/[0.07] bg-white/55 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Live deployment
              </h2>
              <ProjectDeploymentButtons links={project.deploymentLinks} />
            </motion.section>

            {project.stats && project.stats.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: easeSmooth }}
                className="project-detail-section rounded-2xl border border-black/[0.07] bg-white/55 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40"
              >
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  At a glance
                </h2>
                <dl className="space-y-3">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between gap-4 border-b border-black/[0.05] pb-3 last:border-0 last:pb-0 dark:border-white/[0.06]"
                    >
                      <dt className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</dt>
                      <dd className="text-sm font-bold text-zinc-900 dark:text-white">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.section>
            )}

            <motion.section
              id="tech-stack"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14, ease: easeSmooth }}
              className="project-detail-section rounded-2xl border border-black/[0.07] bg-white/55 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Tech stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-mid dark:text-brand-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            {project.contactEmail && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: easeSmooth }}
                className="project-detail-section rounded-2xl border border-black/[0.07] bg-white/55 p-6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/40"
              >
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  <Mail className="h-4 w-4 text-brand-primary" aria-hidden />
                  Feedback
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Questions or suggestions about {project.name}?
                </p>
                <a
                  href={`mailto:${project.contactEmail}`}
                  className="mt-3 inline-block text-sm font-semibold text-brand-primary hover:underline dark:text-brand-accent"
                >
                  {project.contactEmail}
                </a>
              </motion.section>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
