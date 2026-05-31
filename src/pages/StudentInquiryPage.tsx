import { StudentProjectInquiryForm } from '@/components/inquiry/StudentProjectInquiryForm'
import { InquiryStandaloneShell } from '@/components/inquiry/InquiryStandaloneShell'
import { STUDENT_INQUIRY_SECTION } from '@/data/projectInquiry'
import { PAGE_SEO } from '@/data/seo'

export function StudentInquiryPage() {
  return (
    <InquiryStandaloneShell
      seo={PAGE_SEO.studentInquiry}
      eyebrow={STUDENT_INQUIRY_SECTION.eyebrow}
      title={STUDENT_INQUIRY_SECTION.title}
      description={STUDENT_INQUIRY_SECTION.description}
      backTo="/contact"
      backLabel="Back to contact"
    >
      <StudentProjectInquiryForm />
    </InquiryStandaloneShell>
  )
}
