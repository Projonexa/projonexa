import { SEO } from '@/components/seo/SEO'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { AEOOverview } from '@/components/sections/AEOOverview'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TechnologyWhySection } from '@/components/sections/TechnologyWhySection'
import { ServiceFounderSection } from '@/components/sections/ServiceFounderSection'
import { VisionMission } from '@/components/sections/VisionMission'
import { CTA } from '@/components/sections/CTA'
import { PAGE_SEO } from '@/data/seo'

export function HomePage() {
  return (
    <>
      <SEO seo={PAGE_SEO.home} />
      <Hero />
      <Stats />
      <AEOOverview />
      <ServicesGrid limit={6} showViewAll />
      <TechnologyWhySection />
      <ServiceFounderSection />
      <VisionMission />
      <CTA />
    </>
  )
}
