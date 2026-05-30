import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechIconCloud } from '@/components/sections/TechIconCloud'
import { TechStackPanel } from '@/components/sections/TechStackPanel'

export function TechnologyShowcase() {
  return (
    <section
      className="relative overflow-hidden section-padding bg-zinc-50 dark:bg-zinc-950/50"
      aria-labelledby="tech-showcase-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,200,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeading
          eyebrow="Technology"
          title="Built With Industry-Leading Stack"
          description="Modern technologies across frontend, AI, cloud, IoT, and more — powering projects for students and clients worldwide."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* Left: tech logos & stack */}
          <div className="order-1 lg:sticky lg:top-24 lg:min-h-[520px]">
            <TechStackPanel />
          </div>

          {/* Right: rotating icon cloud */}
          <div className="order-2 lg:sticky lg:top-24">
            <TechIconCloud variant="side" />
          </div>
        </div>

        {/* <p className="mt-12 text-center text-sm text-zinc-500">
          Logos provided via{' '}
          <a
            href="https://simpleicons.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline"
          >
            Simple Icons
          </a>
          . Custom stacks available for every college syllabus and project requirement.
        </p> */}
      </div>
    </section>
  )
}
