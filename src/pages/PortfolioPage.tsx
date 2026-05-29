import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { Stats } from '@/components/sections/Stats'
import { TechnologyShowcase } from '@/components/sections/TechnologyShowcase'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { CTA } from '@/components/sections/CTA'
import { PAGE_SEO } from '@/data/seo'

export function PortfolioPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.portfolio} />
      <PageHeader
        eyebrow="Portfolio"
        title="100+ Projects. Proven Excellence."
        description="A curated showcase of academic, research, and industry projects delivered with precision and passion."
      />
      <Stats />
      <section className="section-padding !pt-0">
        <ProjectsGrid />
      </section>
      <TechnologyShowcase />
      <CTA />
    </>
  )
}
