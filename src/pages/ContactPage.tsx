import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { FOUNDER } from '@/data/brand'
import { PAGE_SEO } from '@/data/seo'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const subject = data.get('subject') as string
    const message = data.get('message') as string
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:${FOUNDER.email}?subject=${encodeURIComponent(subject)}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <SEO seo={PAGE_SEO.contact} />
      <PageHeader
        eyebrow="Contact"
        title="Let's Build Your Next Project"
        description="Tell us about your idea, timeline, and requirements. Our team responds within 24 hours."
      />
      <section className="section-padding">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <Mail className="h-6 w-6 text-brand-primary" />
              <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">Email</h3>
              <a
                href={`mailto:${FOUNDER.email}`}
                className="mt-1 text-sm text-brand-primary hover:underline"
              >
                {FOUNDER.email}
              </a>
            </div>
            <div className="glass rounded-2xl p-6">
              <MapPin className="h-6 w-6 text-brand-primary" />
              <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">Location</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{FOUNDER.location}</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <Phone className="h-6 w-6 text-brand-primary" />
              <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">Response Time</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                We typically respond within 24 hours on business days.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="glass space-y-5 rounded-2xl p-8"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand-primary dark:border-white/[0.08] dark:bg-surface-card dark:text-zinc-100 dark:placeholder:text-zinc-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand-primary dark:border-white/[0.08] dark:bg-surface-card dark:text-zinc-100 dark:placeholder:text-zinc-500"
                placeholder="you@university.edu"
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                Project Type
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand-primary dark:border-white/[0.08] dark:bg-surface-card dark:text-zinc-100 dark:placeholder:text-zinc-500"
              >
                <option value="Final Year Project Inquiry">Final Year Project</option>
                <option value="Mini Project Inquiry">Mini Project</option>
                <option value="AI/ML Project Inquiry">AI / ML Project</option>
                <option value="Startup MVP Inquiry">Startup MVP</option>
                <option value="Custom Software Inquiry">Custom Software</option>
                <option value="Other Inquiry">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand-primary dark:border-white/[0.08] dark:bg-surface-card dark:text-zinc-100 dark:placeholder:text-zinc-500"
                placeholder="Describe your project idea, deadline, and requirements..."
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {submitted ? 'Opening Email Client...' : 'Send Inquiry'}
            </Button>
          </motion.form>
        </div>
      </section>
    </>
  )
}
