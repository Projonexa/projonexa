export const inquiryInputClass =
  'careers-form-input w-full min-w-0 rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/[0.12] dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-brand-accent dark:focus:ring-brand-accent/20'

export const inquiryLabelClass = 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200'

export function InquiryRequired() {
  return <span className="text-brand-primary dark:text-brand-accent">*</span>
}
