import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  CAREER_APPLICATION_EMAIL,
  CAREER_AVAILABILITY_OPTIONS,
  CAREER_EXPERIENCE_LEVELS,
  CAREER_ROLES,
} from '@/data/careers'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const inputClass =
  'w-full rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-brand-accent dark:focus:ring-brand-accent/20'

const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200'

interface CareerApplicationFormProps {
  initialRoleId?: string
  variant?: 'standalone' | 'embedded'
}

export function CareerApplicationForm({
  initialRoleId = 'open-application',
  variant = 'embedded',
}: CareerApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [roleId, setRoleId] = useState(initialRoleId)
  const isStandalone = variant === 'standalone'

  useEffect(() => {
    setRoleId(initialRoleId)
  }, [initialRoleId])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const role = CAREER_ROLES.find((r) => r.id === data.get('role'))?.title ?? 'Team Member'
    const experience =
      CAREER_EXPERIENCE_LEVELS.find((l) => l.value === data.get('experience'))?.label ?? ''
    const availability =
      CAREER_AVAILABILITY_OPTIONS.find((a) => a.value === data.get('availability'))?.label ?? ''
    const location = String(data.get('location') ?? '').trim()
    const portfolio = String(data.get('portfolio') ?? '').trim()
    const skills = String(data.get('skills') ?? '').trim()
    const motivation = String(data.get('motivation') ?? '').trim()

    const body = encodeURIComponent(
      [
        'Projonexa Team Application',
        '────────────────────────',
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Role: ${role}`,
        `Experience: ${experience}`,
        `Availability: ${availability}`,
        location ? `Location: ${location}` : null,
        portfolio ? `Portfolio / Links: ${portfolio}` : null,
        '',
        'Skills & tools:',
        skills,
        '',
        'Why join Projonexa:',
        motivation,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    const subject = encodeURIComponent(`Projonexa Team Application — ${role} — ${name}`)
    window.location.href = `mailto:${CAREER_APPLICATION_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const motionProps = isStandalone
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: easeSmooth } }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.45, ease: easeSmooth },
      }

  if (submitted) {
    return (
      <motion.div
        {...motionProps}
        className="careers-form-panel mx-auto flex max-w-2xl flex-col items-center rounded-3xl px-6 py-14 text-center sm:px-10"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
          Application ready to send
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Your email client should open with your details pre-filled. Send the message to complete
          your request to join the Projonexa team.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => setSubmitted(false)}
        >
          Submit another application
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      id="apply-form"
      {...motionProps}
      onSubmit={handleSubmit}
      className={`careers-form-panel mx-auto w-full rounded-3xl p-6 sm:p-8 lg:p-10 ${
        isStandalone ? 'max-w-2xl' : 'max-w-none'
      }`}
    >
      {!isStandalone && (
        <div className="mb-8 border-b border-black/[0.06] pb-6 dark:border-white/[0.08]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-accent">
            Application form
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Apply to join the team
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Fields marked with <span className="text-brand-primary dark:text-brand-accent">*</span>{' '}
            are required.
          </p>
        </div>
      )}

      {isStandalone && (
        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Fields marked with <span className="font-medium text-brand-primary dark:text-brand-accent">*</span>{' '}
          are required.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="career-name" className={labelClass}>
            Full name <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <input
            id="career-name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="career-email" className={labelClass}>
            Email <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <input
            id="career-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label htmlFor="career-phone" className={labelClass}>
            Phone / WhatsApp
          </label>
          <input
            id="career-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+91 …"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="career-role" className={labelClass}>
            Role you&apos;re applying for <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <select
            id="career-role"
            name="role"
            required
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className={inputClass}
          >
            {CAREER_ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="career-experience" className={labelClass}>
            Experience level <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <select
            id="career-experience"
            name="experience"
            required
            defaultValue="student"
            className={inputClass}
          >
            {CAREER_EXPERIENCE_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="career-availability" className={labelClass}>
            Availability <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <select
            id="career-availability"
            name="availability"
            required
            defaultValue="freelance"
            className={inputClass}
          >
            {CAREER_AVAILABILITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="career-location" className={labelClass}>
            City / Country
          </label>
          <input
            id="career-location"
            name="location"
            className={inputClass}
            placeholder="e.g. Pune, Maharashtra, India"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="career-portfolio" className={labelClass}>
            Portfolio, LinkedIn, GitHub, or resume link
          </label>
          <input
            id="career-portfolio"
            name="portfolio"
            type="url"
            className={inputClass}
            placeholder="https://linkedin.com/in/… or GitHub profile"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="career-skills" className={labelClass}>
            Skills & technologies <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <textarea
            id="career-skills"
            name="skills"
            required
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="e.g. React, Node.js, Figma, Python, testing, documentation…"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="career-motivation" className={labelClass}>
            Why do you want to join Projonexa?{' '}
            <span className="text-brand-primary dark:text-brand-accent">*</span>
          </label>
          <textarea
            id="career-motivation"
            name="motivation"
            required
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Tell us about your goals, what you can contribute, and the kind of work you're looking for…"
          />
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        By submitting, you agree to share this information with the Projonexa team for recruitment
        purposes only.
      </p>

      <div className={isStandalone ? 'mt-8 flex justify-center' : 'mt-6'}>
        <Button
          type="submit"
          variant="primary"
          className={`shadow-glow-sm ${isStandalone ? 'w-full sm:min-w-[240px]' : 'w-full sm:w-auto'}`}
        >
          <Send className="h-4 w-4" aria-hidden />
          Submit application
          <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
        </Button>
      </div>
    </motion.form>
  )
}
