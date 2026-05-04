'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Scissors, Palette, Paintbrush, Wind } from 'lucide-react'
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
    <section ref={ref} className="bg-[#fbf6ef] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
            Start with your service
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-950 mb-4">
            Choose the closest fit. Sidney can refine it from there.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
                <Link href={`/booking?service=${encodeURIComponent(service?.title ?? '')}`} className="block group">
                  <div className="h-full rounded-lg border border-stone-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-700 text-white transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="text-white" size={32} />
                    </div>
                    <h3 className="mb-3 mt-6 font-serif text-2xl font-bold text-slate-950 transition-colors group-hover:text-rose-800">
                      {service?.title ?? ''}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service?.description?.substring?.(0, 150) ?? ''}...
                    </p>
                    <span className="mt-5 inline-flex items-center text-sm font-semibold text-rose-800">
                      Start with this service
                      <ArrowRight className="ml-2" size={16} />
                    </span>
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
            className="inline-flex items-center text-rose-800 font-semibold hover:text-rose-950 transition-colors"
          >
            View All Services
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
