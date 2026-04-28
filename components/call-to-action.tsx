'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function CallToAction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to talk through the look?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Send a few details about your date, service, and inspiration. Sidney can help you understand the best next step before you commit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Calendar className="mr-2" size={20} />
                Request a consultation
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/cta-hero.png"
                alt="Sidney Kiyabu hairstyling showcase"
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
