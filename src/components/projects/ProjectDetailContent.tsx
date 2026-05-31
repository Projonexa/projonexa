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

function SectionTitle({ icon: Icon, title }: { icon: typeof BookOpen; title: string }) {
  return (
    <h2 className="mb-5 flex items-center gap-2.5 border-b border-black/[0.06] pb-4 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/15">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      {title}
    </h2>
  )
}

function DetailPanel({
  id,
  title,
  icon,
  children,
  delay = 0,
  accent = false,
}: {
  id: string
  title: string
  icon: typeof BookOpen
  children: ReactNode
  delay?: number
  accent?: boolean
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.45, delay, ease: easeSmooth }}
      className={`project-detail-panel relative overflow-hidden rounded-2xl p-6 sm:p-8 ${
        accent ? 'project-detail-panel-accent' : ''
      }`}
    >
      <SectionTitle icon={icon} title={title} />
      {children}
    </motion.section>
  )
}

export function ProjectDetailContent({ project }: { project: MyProject }) {
  return (
    <div className="container-wide">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:items-start lg:gap-10">
          <div className="flex flex-col gap-8">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="project-detail-panel relative overflow-hidden rounded-2xl p-6 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-brand-accent">
                About this project
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-[1.05rem]">
                {project.description}
              </p>
            </motion.section>

            <DetailPanel id="overview" title="Overview" icon={BookOpen} delay={0.05}>
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:leading-7">
                {project.overview}
              </p>
            </DetailPanel>

            <DetailPanel id="whats-inside" title="What's inside" icon={Sparkles} delay={0.08}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.contentHighlights.map((item) => (
                  <li
                    key={item}
                    className="project-detail-highlight flex items-start gap-2.5 rounded-xl px-4 py-3.5 text-sm leading-relaxed text-zinc-800 dark:text-zinc-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailPanel>

            <DetailPanel id="features" title="Features" icon={Layers} delay={0.1}>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-transparent px-1 py-1 text-sm leading-relaxed text-zinc-700 transition-colors hover:border-black/[0.04] hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:border-white/[0.06] dark:hover:bg-white/[0.03]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-secondary/15 text-brand-secondary">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </DetailPanel>

            {project.supportedBranches && project.supportedBranches.length > 0 && (
              <DetailPanel
                id="branches"
                title="Supported branches"
                icon={GraduationCap}
                delay={0.12}
              >
                <ul className="flex flex-wrap gap-2">
                  {project.supportedBranches.map((branch) => (
                    <li key={branch}>
                      <span className="project-detail-branch-chip inline-block rounded-full px-3 py-1.5 text-xs font-medium">
                        {branch}
                      </span>
                    </li>
                  ))}
                </ul>
              </DetailPanel>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06, ease: easeSmooth }}
              className="project-detail-panel project-detail-panel-accent relative overflow-hidden rounded-2xl p-6"
            >
              <SectionTitle icon={Sparkles} title="Live deployment" />
              <ProjectDeploymentButtons links={project.deploymentLinks} />
            </motion.section>

            {project.stats && project.stats.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1, ease: easeSmooth }}
                className="project-detail-panel relative overflow-hidden rounded-2xl p-6"
              >
                <SectionTitle icon={Layers} title="At a glance" />
                <dl className="grid gap-2">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="project-detail-stat-tile flex items-center justify-between gap-4 rounded-xl px-4 py-3"
                    >
                      <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {stat.label}
                      </dt>
                      <dd className="text-sm font-bold text-zinc-900 dark:text-white">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.section>
            )}

            <motion.section
              id="tech-stack"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14, ease: easeSmooth }}
              className="project-detail-panel relative overflow-hidden rounded-2xl p-6"
            >
              <SectionTitle icon={Layers} title="Tech stack" />
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="project-detail-tech-pill rounded-full px-3 py-1.5 text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            {project.contactEmail && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.16, ease: easeSmooth }}
                className="project-detail-panel relative overflow-hidden rounded-2xl p-6"
              >
                <SectionTitle icon={Mail} title="Feedback" />
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Questions or suggestions about {project.name}?
                </p>
                <a
                  href={`mailto:${project.contactEmail}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-mid dark:text-brand-accent dark:hover:text-white"
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
