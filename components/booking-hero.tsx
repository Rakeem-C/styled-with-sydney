'use client'

import { motion } from 'framer-motion'

export function BookingHero() {
  return (
    <section className="bg-[#fbf6ef] pb-12 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
            Start here
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-950 mb-6">
            Request a Consultation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tell Sidney about your event, inspiration, timing, and hair goals. She can help you choose the right service path and next step.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
