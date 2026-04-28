'use client'

import { Sparkles, Scissors, Palette, Paintbrush, Wind, Check } from 'lucide-react'
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

export function ServicesList() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {siteContent?.services?.map?.((service, index) => {
            const IconComponent = iconMap?.[service?.icon ?? 'Sparkles'] ?? Sparkles
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={service?.id ?? index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${isEven ? 'from-rose-50 to-pink-50' : 'from-pink-50 to-rose-50'} rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg">
                      <IconComponent className="text-white" size={40} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                      {service?.title ?? ''}
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {service?.description ?? ''}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service?.features?.map?.((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <Check className="text-rose-600 flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{feature ?? ''}</span>
                        </div>
                      )) ?? null}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          }) ?? null}
        </div>
      </div>
    </section>
  )
}
