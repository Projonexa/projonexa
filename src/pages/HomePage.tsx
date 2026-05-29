import { SEO } from '@/components/seo/SEO'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TechnologyShowcase } from '@/components/sections/TechnologyShowcase'
import { WhyChoose } from '@/components/sections/WhyChoose'
import { Founder } from '@/components/sections/Founder'
import { VisionMission } from '@/components/sections/VisionMission'
import { CTA } from '@/components/sections/CTA'
import { PAGE_SEO } from '@/data/seo'

export function HomePage() {
  return (
    <>
      <SEO seo={PAGE_SEO.home} />
      <Hero />
      <Stats />
      <ServicesGrid limit={6} showViewAll />
      <TechnologyShowcase />
      <WhyChoose />
      <Founder />
      <VisionMission />
      <CTA />
    </>
  )
}
