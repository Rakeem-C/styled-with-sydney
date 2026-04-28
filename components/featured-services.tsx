'use client'

import Link from 'next/link'
import { Sparkles, Scissors, Palette, Paintbrush, Wind } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { siteContent } from '@/lib/content'

const iconMap: Record<string, any> = {
  Sparkles,
  Scissors,
  Palette,
  Paintbrush,
  Wind,
}

export function FeaturedServices() {
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
            Signature services for your best hair moments
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From wedding mornings to color refreshes, Sidney helps clients choose the look, finish, and prep that fit the occasion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent?.services?.slice?.(0, 5)?.map?.((service, index) => {
            const IconComponent = iconMap?.[service?.icon ?? 'Sparkles'] ?? Sparkles
            
            return (
              <motion.div
                key={service?.id ?? index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href="/services" className="block group">
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-white" size={32} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                      {service?.title ?? ''}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service?.description?.substring?.(0, 150) ?? ''}...
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          }) ?? null}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700 transition-colors"
          >
            View All Services
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
