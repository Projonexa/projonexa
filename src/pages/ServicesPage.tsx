import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTA } from '@/components/sections/CTA'
import { PAGE_SEO } from '@/data/seo'

export function ServicesPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.services} />
      <PageHeader
        eyebrow="Services"
        title="Complete Project Development Services"
        description="From academic submissions to startup MVPs — every service includes expert mentorship, professional documentation, and production-ready deliverables."
      />
      <ServicesGrid />
      <CTA />
    </>
  )
}
