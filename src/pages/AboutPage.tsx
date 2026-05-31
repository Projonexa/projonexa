import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { VisionFounderSection } from '@/components/sections/VisionFounderSection'
import { Stats } from '@/components/sections/Stats'
import { CTA } from '@/components/sections/CTA'
import { PAGE_SEO } from '@/data/seo'
import { BRAND } from '@/data/brand'

export function AboutPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.about} />
      <PageHeader
        eyebrow="About"
        title={`About ${BRAND.name}`}
        description="A technology-driven innovation platform bridging the gap between ideas and execution for students, startups, and businesses."
      />
      <section className="section-padding">
        <div className="container-narrow prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {BRAND.name} is a technology-driven platform that helps students, developers, innovators,
            startups, and businesses transform ideas into real-world solutions.
          </p>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Many students have innovative project ideas but lack technical expertise, development
            resources, documentation support, time, or mentorship. Projonexa
            bridges this gap with complete end-to-end project development — from mini projects and
            final year submissions to AI/ML systems, startup MVPs, and enterprise software.
          </p>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our network of 150+ skilled freelancers and domain experts delivers industry-level
            quality with academic excellence, ensuring every client receives scalable architecture,
            professional documentation, and mentor support throughout their journey.
          </p>
        </div>
      </section>
      <div className="about-stats-before-purpose">
        <Stats />
      </div>
      <VisionFounderSection />
      <CTA />
    </>
  )
}
