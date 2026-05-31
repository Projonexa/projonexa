import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { PROJECTS_SECTION } from '@/data/projects'
import { PAGE_SEO } from '@/data/seo'

export function ProjectsPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.projects} />
      <PageHeader
        eyebrow="Projects"
        title={PROJECTS_SECTION.title}
        description={PROJECTS_SECTION.lead}
      />
      <section className="section-padding">
        <ProjectsGrid showSectionIntro={false} />
      </section>
      <CTA />
    </>
  )
}
