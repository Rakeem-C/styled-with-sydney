'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X } from 'lucide-react'
import { siteContent } from '@/lib/content'

export function GalleryGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [filter, setFilter] = useState('all')

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'color', label: 'Color' },
    { id: 'styling', label: 'Styling' },
    { id: 'makeup', label: 'Makeup' },
  ]

  const filteredPortfolio = filter === 'all' 
    ? siteContent?.portfolio ?? []
    : siteContent?.portfolio?.filter?.((item) => item?.category === filter) ?? []

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories?.map?.((category) => (
            <button
              key={category?.id ?? ''}
              onClick={() => setFilter(category?.id ?? 'all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === category?.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category?.label ?? ''}
            </button>
          )) ?? null}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio?.map?.((work, index) => (
            <motion.div
              key={work?.id ?? index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              layout
            >
              <button
                onClick={() => setSelectedImage(work)}
                className="block group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full"
              >
                <div className="relative aspect-[3/4] bg-gray-200">
                  <Image
                    src={work?.url ?? ''}
                    alt={work?.title ?? 'Portfolio image'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg mb-1">{work?.title ?? ''}</h3>
                    <p className="text-sm text-gray-200">{work?.description ?? ''}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          )) ?? null}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e?.stopPropagation?.()
                  setSelectedImage(null)
                }}
                className="absolute top-4 right-4 text-white hover:text-rose-400 transition-colors"
                aria-label="Close"
              >
                <X size={32} />
              </button>
              
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-5xl w-full aspect-[3/4] cursor-auto"
                onClick={(e) => e?.stopPropagation?.()}
              >
                <Image
                  src={selectedImage?.url ?? ''}
                  alt={selectedImage?.title ?? 'Portfolio image'}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedImage?.title ?? ''}</h3>
                  <p className="text-gray-200">{selectedImage?.description ?? ''}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
