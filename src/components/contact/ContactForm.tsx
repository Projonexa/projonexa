import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Send } from 'lucide-react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import { Button } from '@/components/ui/Button'
import {
  CONTACT_EMAIL,
  CONTACT_PROJECT_TYPES,
  CONTACT_TIMELINE_OPTIONS,
} from '@/data/contact'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const inputClass =
  'careers-form-input w-full min-w-0 rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/[0.12] dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-brand-accent dark:focus:ring-brand-accent/20'

const labelClass = 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [projectType, setProjectType] = useState<string>(CONTACT_PROJECT_TYPES[0].value)
  const [timeline, setTimeline] = useState<string>(CONTACT_TIMELINE_OPTIONS[2].value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const subject = String(data.get('subject') ?? '').trim()
    const timelineLabel =
      CONTACT_TIMELINE_OPTIONS.find((t) => t.value === data.get('timeline'))?.label ?? ''
    const message = String(data.get('message') ?? '').trim()

    const body = encodeURIComponent(
      [
        'Projonexa Project Inquiry',
        '────────────────────────',
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Project type: ${subject}`,
        `Timeline: ${timelineLabel}`,
        '',
        'Project details:',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: easeSmooth }}
        className="contact-form-panel flex flex-col items-center rounded-3xl px-6 py-14 text-center sm:px-10"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Inquiry ready to send
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Your email app should open with your message pre-filled. Send it to complete your project
          inquiry — we&apos;ll get back to you soon.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full sm:w-auto"
          onClick={() => setSubmitted(false)}
        >
          Send another inquiry
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      onSubmit={handleSubmit}
      className="contact-form-panel w-full rounded-3xl p-5 sm:p-8 lg:p-10"
    >
      <div className="mb-6 border-b border-black/[0.06] pb-6 dark:border-white/[0.08] sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
          Project inquiry
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
          Tell us about your project
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Fields marked with{' '}
          <span className="font-semibold text-brand-primary dark:text-brand-accent">*</span> are
          required.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full name <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your full name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="contact-email" className={labelClass}>
              Email <span className="text-brand-primary dark:text-brand-accent">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="you@email.com"
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="contact-phone" className={labelClass}>
              Phone / WhatsApp
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="+91 …"
            />
          </div>
        </div>

        <FormSelectField
          id="contact-subject"
          name="subject"
          required
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          label={
            <>
              Project type <span className="text-brand-primary dark:text-brand-accent">*</span>
            </>
          }
        >
          {CONTACT_PROJECT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </FormSelectField>

        <FormSelectField
          id="contact-timeline"
          name="timeline"
          required
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          label={
            <>
              Expected timeline <span className="text-brand-primary dark:text-brand-accent">*</span>
            </>
          }
        >
          {CONTACT_TIMELINE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FormSelectField>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Project details <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Describe your idea, features, college deadline, and any documentation or viva support you need…"
          />
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        By submitting, you agree to share this information with Projonexa for project consultation
        purposes only.
      </p>

      <Button type="submit" variant="primary" className="mt-6 w-full shadow-glow-sm sm:w-auto">
        <Send className="h-4 w-4" aria-hidden />
        Send inquiry
        <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
      </Button>
    </motion.form>
  )
}
