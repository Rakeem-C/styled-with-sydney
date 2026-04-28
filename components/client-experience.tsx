'use client'

import { Camera, MessageCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { siteContent } from '@/lib/content'

const icons = [MessageCircle, Camera, Sparkles]

export function ClientExperience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="bg-gradient-to-b from-rose-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            Why clients book
          </p>
          <h2 className="mb-5 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
            A beauty experience built around trust.
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Before real testimonials are added, the site should still communicate what clients can expect: clear communication, thoughtful prep, and styling that holds up for the moment they care about.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {siteContent?.clientExperience?.map?.((item, index) => {
            const Icon = icons[index] ?? Sparkles

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="h-full rounded-2xl border border-rose-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <Icon size={24} />
                </div>
                <h3 className="mb-3 font-serif text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            )
          }) ?? null}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {siteContent?.trustSignals?.map?.((signal) => (
            <span
              key={signal}
              className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
            >
              {signal}
            </span>
          )) ?? null}
        </motion.div>
      </div>
    </section>
  )
}
