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
            Portfolio Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through stunning hair transformations and see the artistry behind each unique style. 
            Every creation tells a story of confidence and beauty.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
