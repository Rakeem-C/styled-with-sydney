'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteContent } from '@/lib/content'

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response?.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name ?? '']: e?.target?.value ?? ''
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg"
    >
      <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
        Schedule Appointment
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="booking-name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="booking-name"
              name="name"
              value={formData?.name ?? ''}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
              placeholder="Enter your name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="booking-email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              id="booking-email"
              name="email"
              value={formData?.email ?? ''}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="booking-phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              id="booking-phone"
              name="phone"
              value={formData?.phone ?? ''}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="booking-service" className="block text-sm font-semibold text-gray-700 mb-2">
            Service *
          </label>
          <select
            id="booking-service"
            name="service"
            value={formData?.service ?? ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
          >
            <option value="">Select a service</option>
            {siteContent?.services?.map?.((service) => (
              <option key={service?.id ?? ''} value={service?.title ?? ''}>
                {service?.title ?? ''}
              </option>
            )) ?? null}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="booking-date" className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              id="booking-date"
              name="date"
              value={formData?.date ?? ''}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label htmlFor="booking-time" className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Time *
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="time"
              id="booking-time"
              name="time"
              value={formData?.time ?? ''}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="booking-message" className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              id="booking-message"
              name="message"
              value={formData?.message ?? ''}
              onChange={handleChange}
              rows={4}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none bg-white"
              placeholder="Any special requests or questions?"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Book Appointment'}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 border-2 border-green-500 rounded-xl text-green-700 text-center font-semibold"
          >
            🎉 Booking request submitted successfully! I'll contact you soon.
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 text-center font-semibold"
          >
            ❌ Something went wrong. Please try again or contact directly.
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
