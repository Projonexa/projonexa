import { motion } from 'framer-motion'
import { Code2, Palette, Search, Users } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import { PAGE_SEO } from '@/data/seo'

const ROLES = [
  {
    icon: Code2,
    title: 'Full-Stack Developer',
    description: 'Build web and mobile applications for academic and startup clients.',
  },
  {
    icon: Palette,
    title: 'UI/UX Designer',
    description: 'Create premium interfaces and design systems for client projects.',
  },
  {
    icon: Search,
    title: 'QA & Testing Engineer',
    description: 'Validate deliverables, test applications, and ensure production-ready quality.',
  },
  {
    icon: Users,
    title: 'Project Mentor',
    description: 'Guide students through architecture, documentation, and viva preparation.',
  },
]

export function CareersPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.careers} />
      <PageHeader
        eyebrow="Careers"
        title="Join the Innovation Network"
        description="Become part of Projonexa's growing community of 150+ freelancers and core team members shaping the future of project development."
      />
      <section className="section-padding">
        <div className="container-narrow mb-12 text-center">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            We are always looking for talented developers, designers, and mentors who
            share our passion for making innovation accessible. Work remotely, choose your projects,
            and grow with a fast-moving startup.
          </p>
        </div>
        <div className="container-wide grid gap-6 sm:grid-cols-2">
          {ROLES.map((role, i) => {
            const Icon = role.icon
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-8"
              >
                <Icon className="h-8 w-8 text-brand-primary" />
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{role.description}</p>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-12 text-center">
          <Button href="mailto:nisargalokhande@gmail.com?subject=Join Projonexa Network">
            Apply to Join
          </Button>
        </div>
      </section>
      <CTA />
    </>
  )
}
