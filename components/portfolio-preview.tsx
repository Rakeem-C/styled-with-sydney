'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { siteContent } from '@/lib/content'

export function PortfolioPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const featuredWorks = siteContent?.portfolio?.slice?.(0, 6) ?? []

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
            Recent work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-950 mb-4">
            Looks made to be remembered
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Browse polished styles, soft glam, color moments, and event-ready hair created for clients who want to feel confident from every angle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorks?.map?.((work, index) => (
            <motion.div
              key={work?.id ?? index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href="/gallery" className="block group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-[3/4] bg-gray-200">
                  <Image
                    src={work?.url ?? ''}
                    alt={work?.title ?? 'Portfolio image'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg mb-1">{work?.title ?? ''}</h3>
                    <p className="text-sm text-gray-200">{work?.description ?? ''}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )) ?? null}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center text-lg font-semibold text-rose-800 transition-colors hover:text-rose-950"
          >
            View Full Gallery
            <ArrowRight className="ml-2" size={18} />
          </Link>
          <div className="mt-6">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-rose-700 px-8 py-4 font-semibold text-white shadow-lg shadow-rose-950/10 transition hover:bg-rose-800"
            >
              Request a consultation
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
