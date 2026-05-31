import { Founder } from '@/components/sections/Founder'
import { ServiceArea } from '@/components/sections/ServiceArea'

const bandX = 'px-4 sm:px-6 lg:px-8'
const bandTop = 'pt-20 lg:pt-28'
const bandBottom = 'pb-20 lg:pb-28'

/**
 * Service Area + Founder — single vertical rhythm; no double padding at the seam.
 */
export function ServiceFounderSection() {
  return (
    <div className="service-founder-unified">
      <section
        className={`service-founder-unified__service section-alt ${bandX} ${bandTop} pb-0`}
        aria-labelledby="service-area-heading"
        itemScope
        itemType="https://schema.org/ProfessionalService"
      >
        <ServiceArea variant="embedded" />
      </section>

      <section
        className={`service-founder-unified__founder section-frosted ${bandX} ${bandBottom} overflow-hidden pt-10 lg:pt-12`}
        aria-labelledby="founder-heading"
        itemScope
        itemType="https://schema.org/Person"
      >
        <Founder variant="embedded" />
      </section>
    </div>
  )
}
