'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Camera, Calendar, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteContent } from '@/lib/content'

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden pb-10 pt-24">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-slate-950">
          <Image
            src="/hero-bg.png"
            alt="Sidney Kiyabu - Professional Hairstylist"
            fill
            className="object-cover opacity-65"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/35 to-black/75" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#fbf6ef] to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
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
            <p className="mb-5 text-sm md:text-base font-semibold uppercase tracking-[0.18em] text-amber-100">
              {siteContent?.hero?.eyebrow ?? ''}
            </p>
            <h1 className="mb-6 font-serif text-5xl font-bold text-white md:text-7xl lg:text-8xl">
              {siteContent?.hero?.headline ?? siteContent?.name ?? 'Styled by Sidney'}
            </h1>
            <p className="mb-8 text-2xl font-light text-amber-100 md:text-3xl">
              {siteContent?.tagline ?? 'Transforming Hair, Elevating Confidence'}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-white/90 md:text-xl"
          >
            {siteContent?.hero?.description ?? ''}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-rose-700 px-8 py-4 font-semibold text-white shadow-2xl shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:bg-rose-800"
            >
              <Calendar className="mr-2" size={20} />
              {siteContent?.hero?.primaryCta ?? 'Request a consultation'}
              <ArrowRight className="ml-2" size={20} />
            </Link>
            
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              <Camera className="mr-2" size={20} />
              {siteContent?.hero?.secondaryCta ?? 'View recent work'}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {siteContent?.hero?.proofPoints?.map?.((point) => (
              <span
                key={point}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                <Sparkles className="mr-2 text-amber-100" size={15} />
                {point}
              </span>
            )) ?? null}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 hidden w-[min(92vw,980px)] -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-medium text-white backdrop-blur-md sm:block">
        Not sure what to book? Start with a consultation and Sidney will guide the right next step.
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 transform"
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
