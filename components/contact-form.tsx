'use client'

import { useState } from 'react'
import { User, Mail, MessageSquare, Send, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteContent } from '@/lib/content'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Save to database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response?.ok) {
        setSubmitStatus('success')
        
        // Open Gmail compose in new tab
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteContent?.email ?? '')}&su=${encodeURIComponent(`${formData?.subject ?? 'Inquiry from website'} - From: ${formData?.name ?? ''}`)}&body=${encodeURIComponent(
          `Name: ${formData?.name ?? ''}\nEmail: ${formData?.email ?? ''}\n\nMessage:\n${formData?.message ?? ''}`
        )}`
        
        window?.open?.(gmailUrl, '_blank')
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name ?? '']: e?.target?.value ?? ''
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 shadow-lg"
    >
      <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
        Contact for Consultation
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="contact-name"
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
          <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData?.email ?? ''}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">
            Subject
          </label>
          <div className="relative">
            <Send className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="contact-subject"
              name="subject"
              value={formData?.subject ?? ''}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
              placeholder="What's this about?"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              id="contact-message"
              name="message"
              value={formData?.message ?? ''}
              onChange={handleChange}
              required
              rows={6}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none bg-white"
              placeholder="Tell me about your hair goals..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Send className="mr-2" size={20} />
              Send Message
              <ExternalLink className="ml-2" size={16} />
            </>
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          This will save your message and open Gmail to send directly
        </p>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 border-2 border-green-500 rounded-xl text-green-700 text-center font-semibold"
          >
            ✅ Message saved! Gmail should open in a new tab.
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 text-center font-semibold"
          >
            ❌ Something went wrong. Please try again.
          </motion.div>
        )}
      </form>

      {/* Alternative Contact */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-3">
          Or email me directly at:
        </p>
        <a
          href={`mailto:${siteContent?.email ?? ''}`}
          className="block text-center text-rose-600 font-semibold hover:text-rose-700 transition-colors"
        >
          {siteContent?.email ?? ''}
        </a>
      </div>
    </motion.div>
  )
}
