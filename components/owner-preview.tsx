'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { siteContent } from '@/lib/content'

export function OwnerPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={siteContent?.bio?.image ?? '/about-styled-by-sidney.png'}
              alt={`${siteContent?.ownerName ?? 'Sidney'} portrait`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            Meet the owner
          </p>
          <h2 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
            Hair that feels personal, polished, and true to you.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-gray-700">
            <p>{siteContent?.bio?.description ?? ''}</p>
            <p>{siteContent?.bio?.extendedDescription ?? ''}</p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800"
            >
              Read Sidney's story
              <ArrowRight className="ml-2" size={18} />
            </Link>
            <a
              href={siteContent?.instagramUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-rose-200 px-7 py-3 font-semibold text-rose-700 transition-all duration-300 hover:border-rose-400 hover:bg-rose-50"
            >
              <Instagram className="mr-2" size={18} />
              See latest work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
