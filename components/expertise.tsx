'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { siteContent } from '@/lib/content'

export function Expertise() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Styled by Sidney offers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A focused menu of beauty services for clients who want their hair to feel intentional, flattering, and ready for the moment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {siteContent?.bio?.expertise?.map?.((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-3 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                <Check className="text-white" size={20} />
              </div>
              <span className="font-semibold text-gray-800">{skill ?? ''}</span>
            </motion.div>
          )) ?? null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-12 text-center"
        >
          <h3 className="font-serif text-3xl font-bold text-gray-900 mb-6">
            A smoother path to the final look
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            The experience is designed to make booking feel clear and comfortable. You share the occasion, inspiration, and hair goals, then Styled by Sidney helps shape the right service, prep, and finish so you can show up feeling confident.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
