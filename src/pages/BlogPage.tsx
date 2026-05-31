import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { BLOG_POSTS } from '@/data/blog'
import { PAGE_SEO } from '@/data/seo'

export function BlogPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.blog} />
      <PageHeader
        eyebrow="Blog"
        title="Insights, Guides & Innovation Stories"
        description="Expert perspectives on project development, AI trends, engineering best practices, and startup building."
      />
      <section className="section-padding">
        <div className="container-wide grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group glass flex flex-col rounded-2xl p-6 transition-shadow hover:shadow-glow"
            >
              <span className="w-fit rounded-full bg-brand-primary/15 px-3 py-1 text-xs font-semibold text-brand-primary">
                {post.category}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-brand-primary dark:text-white">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
