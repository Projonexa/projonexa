import { Founder } from '@/components/sections/Founder'
import { VisionMission } from '@/components/sections/VisionMission'

const insetX = 'px-4 sm:px-6 lg:px-8'

/** Purpose (Vision & Mission) + Founder on About — zero padding between bands */
export function VisionFounderSection() {
  return (
    <div className="vision-founder-unified">
      <section
        className="vision-founder-unified__purpose section-alt"
        aria-labelledby="vision-mission-heading"
      >
        <div className={`vision-founder-unified__purpose-inset ${insetX} pb-0 pt-20 lg:pt-28`}>
          <VisionMission variant="embedded" />
        </div>
      </section>

      <section
        className="vision-founder-unified__founder section-frosted overflow-hidden"
        aria-labelledby="founder-heading"
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className={`vision-founder-unified__founder-inset ${insetX} pb-20 pt-0 lg:pb-28`}>
          <Founder variant="embedded" />
        </div>
      </section>
    </div>
  )
}
