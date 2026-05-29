import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { PAGE_SEO } from '@/data/seo'

export function ProjectsPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.projects} />
      <PageHeader
        eyebrow="Projects"
        title="Innovation Delivered Across Domains"
        description="Explore representative projects showcasing our expertise in AI, web, mobile, IoT, government innovation, and startup solutions."
      />
      <section className="section-padding">
        <ProjectsGrid />
      </section>
      <CTA />
    </>
  )
}
