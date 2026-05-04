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
    <section ref={ref} className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
              The fastest next step
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-950 mb-6">
              Tell Sidney the date. She will help with the rest.
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Send the basics now: service, event date, and the look you have in mind. The form feeds the consultation workflow so Sidney can follow up by text or email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-rose-700 px-8 py-4 font-semibold text-white shadow-lg shadow-rose-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-rose-800"
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
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
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
