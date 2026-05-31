import { Founder } from '@/components/sections/Founder'
import { ServiceArea } from '@/components/sections/ServiceArea'

const insetX = 'px-4 sm:px-6 lg:px-8'

/**
 * Service Area + Founder — one continuous band; zero padding between them.
 */
export function ServiceFounderSection() {
  return (
    <div className="service-founder-unified">
      <section
        className="service-founder-unified__service section-alt"
        aria-labelledby="service-area-heading"
        itemScope
        itemType="https://schema.org/ProfessionalService"
      >
        <div className={`service-founder-unified__service-inset ${insetX} pb-0 pt-20 lg:pt-28`}>
          <ServiceArea variant="embedded" />
        </div>
      </section>

      <section
        className="service-founder-unified__founder section-frosted overflow-hidden"
        aria-labelledby="founder-heading"
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className={`service-founder-unified__founder-inset ${insetX} pb-20 pt-0 lg:pb-28`}>
          <Founder variant="embedded" />
        </div>
      </section>
    </div>
  )
}
