import { motion } from 'framer-motion'
import { FEATURED_PROJECTS } from '@/data/projects'

export function ProjectsGrid() {
  return (
    <div className="container-wide grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {FEATURED_PROJECTS.map((project, i) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="glass flex flex-col rounded-2xl p-6"
        >
          {project.highlight && (
            <span className="mb-3 w-fit rounded-full bg-brand-primary/15 px-3 py-1 text-xs font-semibold text-brand-primary">
              {project.highlight}
            </span>
          )}
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {project.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium dark:bg-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  )
}
