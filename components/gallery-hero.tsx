'use client'

import { motion } from 'framer-motion'

export function GalleryHero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find your inspiration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore finished looks, color moments, bridal styles, and glam details to help you picture what Sidney can create for your own appointment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
