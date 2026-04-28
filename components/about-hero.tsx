'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { siteContent } from '@/lib/content'

export function AboutHero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {siteContent?.bio?.title ?? 'About Sidney'}
            </h1>
            <p className="text-2xl text-rose-600 font-semibold mb-6">
              {siteContent?.bio?.subtitle ?? 'Your Hair Transformation Expert'}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {siteContent?.bio?.description ?? ''}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {siteContent?.bio?.extendedDescription ?? ''}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={siteContent?.bio?.image ?? ''}
                alt={siteContent?.name ?? 'Sidney Kiyabu'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
