import { Founder } from '@/components/sections/Founder'
import { ServiceArea } from '@/components/sections/ServiceArea'

/** Service Area + Founder on home — controlled gap between alt and frosted bands */
export function ServiceFounderSection() {
  return (
    <div className="service-founder-band">
      <section
        className="service-founder-band__service section-padding section-alt"
        aria-labelledby="service-area-heading"
        itemScope
        itemType="https://schema.org/ProfessionalService"
      >
        <ServiceArea variant="embedded" />
      </section>

      <section
        className="service-founder-band__founder section-padding section-frosted overflow-hidden"
        aria-labelledby="founder-heading"
        itemScope
        itemType="https://schema.org/Person"
      >
        <Founder variant="embedded" />
      </section>
    </div>
  )
}
