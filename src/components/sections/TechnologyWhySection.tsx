import { TechnologyShowcase } from '@/components/sections/TechnologyShowcase'
import { WhyChoose } from '@/components/sections/WhyChoose'

/** Technology + Why on home — one frosted band, normal gap between blocks */
export function TechnologyWhySection() {
  return (
    <section
      className="tech-why-band section-padding section-frosted overflow-hidden"
      aria-labelledby="tech-showcase-heading"
    >
      <TechnologyShowcase variant="grouped" />
      <WhyChoose variant="grouped" className="mt-12 lg:mt-16" />
    </section>
  )
}
