import { CorporateProjectInquiryForm } from '@/components/inquiry/CorporateProjectInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { CORPORATE_INQUIRY_SECTION } from '@/data/projectInquiry'
import { PAGE_SEO } from '@/data/seo'

export function CorporateInquiryPage() {
  return (
    <InquiryStandaloneShell
      seo={PAGE_SEO.corporateInquiry}
      eyebrow={CORPORATE_INQUIRY_SECTION.eyebrow}
      title={CORPORATE_INQUIRY_SECTION.title}
      description={CORPORATE_INQUIRY_SECTION.description}
      backTo="/contact"
      backLabel="Back to contact"
    >
      <CorporateProjectInquiryForm />
    </InquiryStandaloneShell>
  )
}
