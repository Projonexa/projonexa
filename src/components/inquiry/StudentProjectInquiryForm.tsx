import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Send } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import {
  inquiryInputClass,
  inquiryLabelClass,
  InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import { Button } from '@/components/ui/Button'
import {
  INQUIRY_BUDGET_OPTIONS,
  INQUIRY_TIMELINE_OPTIONS,
  labelForOption,
  PROJECT_INQUIRY_EMAIL,
  STUDENT_PROJECT_TYPES,
  STUDENT_VIVA_SUPPORT_OPTIONS,
  STUDENT_YEAR_OPTIONS,
} from '@/data/projectInquiry'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function StudentProjectInquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [projectType, setProjectType] = useState<string>(STUDENT_PROJECT_TYPES[0].value)
  const [year, setYear] = useState<string>(STUDENT_YEAR_OPTIONS[2].value)
  const [timeline, setTimeline] = useState<string>(INQUIRY_TIMELINE_OPTIONS[2].value)
  const [vivaSupport, setVivaSupport] = useState<string>(STUDENT_VIVA_SUPPORT_OPTIONS[0].value)
  const [budget, setBudget] = useState<string>(INQUIRY_BUDGET_OPTIONS[4].value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const college = String(data.get('college') ?? '').trim()
    const branch = String(data.get('branch') ?? '').trim()
    const techStack = String(data.get('techStack') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()

    const body = encodeURIComponent(
      [
        'Projonexa — Student Project Inquiry',
        '────────────────────────',
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone / WhatsApp: ${phone}` : null,
        `College / University: ${college}`,
        `Branch / Degree: ${branch}`,
        `Year: ${labelForOption(STUDENT_YEAR_OPTIONS, String(data.get('year') ?? ''))}`,
        `Project type: ${labelForOption(STUDENT_PROJECT_TYPES, String(data.get('projectType') ?? ''))}`,
        `Timeline: ${labelForOption(INQUIRY_TIMELINE_OPTIONS, String(data.get('timeline') ?? ''))}`,
        `Documentation & viva: ${labelForOption(STUDENT_VIVA_SUPPORT_OPTIONS, String(data.get('vivaSupport') ?? ''))}`,
        `Budget: ${labelForOption(INQUIRY_BUDGET_OPTIONS, String(data.get('budget') ?? ''))}`,
        techStack ? `Preferred tech stack: ${techStack}` : null,
        '',
        'Project idea & requirements:',
        description,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    const subject = encodeURIComponent(
      `Student Project Inquiry — ${labelForOption(STUDENT_PROJECT_TYPES, String(data.get('projectType') ?? ''))} — ${name}`,
    )
    window.location.href = `mailto:${PROJECT_INQUIRY_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className="careers-form-panel mx-auto flex w-full max-w-2xl flex-col items-center rounded-2xl px-5 py-12 text-center sm:rounded-3xl sm:px-10 sm:py-14"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Inquiry ready to send
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Your email client should open with your details pre-filled. Send the message to complete
          your student project inquiry.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
          onClick={() => setSubmitted(false)}
        >
          Submit another inquiry
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      id="student-inquiry-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      onSubmit={handleSubmit}
      className="careers-form-panel mx-auto w-full min-w-0 max-w-2xl rounded-2xl p-5 sm:rounded-3xl sm:p-8"
    >
      <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mb-6">
        Fields marked with <InquiryRequired /> are required.
      </p>

      <div className="flex flex-col gap-5">
        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="student-name" className={inquiryLabelClass}>
            Full name <InquiryRequired />
          </label>
          <input
            id="student-name"
            name="name"
            required
            autoComplete="name"
            className={inquiryInputClass}
            placeholder="Your full name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="careers-form-field min-w-0">
            <label htmlFor="student-email" className={inquiryLabelClass}>
              Email <InquiryRequired />
            </label>
            <input
              id="student-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inquiryInputClass}
              placeholder="you@email.com"
            />
          </div>
          <div className="careers-form-field min-w-0">
            <label htmlFor="student-phone" className={inquiryLabelClass}>
              Phone / WhatsApp <InquiryRequired />
            </label>
            <input
              id="student-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inquiryInputClass}
              placeholder="+91 …"
            />
          </div>
        </div>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="student-college" className={inquiryLabelClass}>
            College / University <InquiryRequired />
          </label>
          <input
            id="student-college"
            name="college"
            required
            className={inquiryInputClass}
            placeholder="e.g. SPPU affiliated college name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="careers-form-field min-w-0">
            <label htmlFor="student-branch" className={inquiryLabelClass}>
              Branch / Degree <InquiryRequired />
            </label>
            <input
              id="student-branch"
              name="branch"
              required
              className={inquiryInputClass}
              placeholder="e.g. Computer Engineering"
            />
          </div>
          <FormSelectField
            id="student-year"
            name="year"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label={
              <>
                Year of study <InquiryRequired />
              </>
            }
          >
            {STUDENT_YEAR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>
        </div>

        <FormSelectField
          id="student-project-type"
          name="projectType"
          required
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          label={
            <>
              Project type <InquiryRequired />
            </>
          }
        >
          {STUDENT_PROJECT_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FormSelectField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormSelectField
            id="student-timeline"
            name="timeline"
            required
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            label={
              <>
                Submission deadline / timeline <InquiryRequired />
              </>
            }
          >
            {INQUIRY_TIMELINE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>

          <FormSelectField
            id="student-viva"
            name="vivaSupport"
            required
            value={vivaSupport}
            onChange={(e) => setVivaSupport(e.target.value)}
            label={
              <>
                Documentation & viva support <InquiryRequired />
              </>
            }
          >
            {STUDENT_VIVA_SUPPORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormSelectField>
        </div>

        <FormSelectField
          id="student-budget"
          name="budget"
          required
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          label="Estimated budget"
        >
          {INQUIRY_BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FormSelectField>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="student-tech" className={inquiryLabelClass}>
            Preferred tech stack (optional)
          </label>
          <input
            id="student-tech"
            name="techStack"
            className={inquiryInputClass}
            placeholder="e.g. React, Python, Flutter, Arduino…"
          />
        </div>

        <div className="careers-form-field w-full min-w-0">
          <label htmlFor="student-description" className={inquiryLabelClass}>
            Project idea & requirements <InquiryRequired />
          </label>
          <textarea
            id="student-description"
            name="description"
            required
            rows={5}
            className={`${inquiryInputClass} resize-none`}
            placeholder="Describe your topic, features, college guidelines, and any reference links…"
          />
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-6">
        By submitting, you agree to share this information with Projonexa for project consultation
        purposes only.
      </p>

      <div className="mt-6 sm:mt-8">
        <Button type="submit" variant="primary" className="w-full shadow-glow-sm sm:min-w-[260px]">
          <Send className="h-4 w-4" aria-hidden />
          Submit student inquiry
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </Button>
      </div>
    </motion.form>
  )
}
