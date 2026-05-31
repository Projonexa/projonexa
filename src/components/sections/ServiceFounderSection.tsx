import { Founder } from '@/components/sections/Founder'
import { ServiceArea } from '@/components/sections/ServiceArea'

/** Service Area + Founder on home — tight gap between adjacent bands */
export function ServiceFounderSection() {
  return (
    <>
      <ServiceArea variant="grouped" />
      <Founder variant="grouped" />
    </>
  )
}
