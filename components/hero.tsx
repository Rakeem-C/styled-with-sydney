'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Instagram, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteContent } from '@/lib/content'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-gray-900">
          <Image
            src="/hero-bg.png"
            alt="Sidney Kiyabu - Professional Hairstylist"
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
              {siteContent?.name ?? 'Sidney Kiyabu'}
            </h1>
            <p className="text-2xl md:text-3xl text-rose-300 font-light mb-8">
              {siteContent?.tagline ?? 'Transforming Hair, Elevating Confidence'}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto"
          >
            Specializing in bridal styling, extensions, makeup artistry, color transformations, and creative braiding
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-rose-500/50 transform hover:-translate-y-1 hover:scale-105"
            >
              <Calendar className="mr-2" size={20} />
              Contact for Consultation
              <ArrowRight className="ml-2" size={20} />
            </Link>
            
            <a
              href={siteContent?.instagramUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              <Instagram className="mr-2" size={20} />
              Follow on Instagram
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
