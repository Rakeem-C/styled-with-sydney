'use client'

import { motion } from 'framer-motion'

const nextSteps = [
  'Sidney receives your request.',
  'You get a quick confirmation by text or email.',
  "If your service is straightforward, you'll get a booking link.",
  "If it's bridal, extensions, color correction, or a bigger transformation, Sidney may ask a few quick questions first.",
  "You'll know the best next step before committing.",
]

export function ConsultationNextSteps() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="space-y-6"
    >
      <div className="rounded-lg bg-slate-950 px-8 py-9 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">What Happens Next</p>
        <h2 className="mt-3 font-serif text-3xl font-bold">A faster path from inquiry to the right next step</h2>
        <ul className="mt-6 space-y-4 text-base leading-7 text-slate-200">
          {nextSteps.map((step) => (
            <li key={step} className="flex gap-3">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-200" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-8 py-8 text-slate-800 shadow-[0_18px_48px_rgba(180,138,70,0.12)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-700">Plan Early</p>
        <p className="mt-3 text-lg leading-8">
          Wedding and event dates can fill quickly. Send your date first so Sidney can confirm availability before
          you plan around a look.
        </p>
      </div>
    </motion.aside>
  )
}
