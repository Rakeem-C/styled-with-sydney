'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Phone, Send, User } from 'lucide-react'
import { motion } from 'framer-motion'

type ContactFormData = {
  name: string
  email: string
  phone: string
  preferredContactMethod: string
  subject: string
  message: string
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  preferredContactMethod: 'text',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          attribution: {
            sourcePage: typeof window === 'undefined' ? '/contact' : window.location.pathname,
            referrer: typeof document === 'undefined' ? '' : document.referrer || '',
            submittedAtClient: new Date().toISOString(),
          },
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setSubmitStatus('error')
        setStatusMessage(payload?.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitStatus('success')
      setStatusMessage(payload?.message || 'Your message is in. Sidney will follow up soon.')
      setFormData(initialFormData)
    } catch (error) {
      console.error('Contact submission error:', error)
      setSubmitStatus('error')
      setStatusMessage('We could not send your message right now. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-3xl bg-gradient-to-br from-pink-50 to-rose-50 p-8 shadow-lg"
    >
      <h2 className="mb-6 font-serif text-3xl font-bold text-gray-900">Contact for Consultation</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-gray-700">
            Your Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="contact-preferredContactMethod" className="mb-2 block text-sm font-semibold text-gray-700">
            Preferred Contact Method
          </label>
          <select
            id="contact-preferredContactMethod"
            name="preferredContactMethod"
            value={formData.preferredContactMethod}
            onChange={handleChange}
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="phone">Phone call</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-gray-700">
            Subject
          </label>
          <div className="relative">
            <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              placeholder="What's this about?"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-gray-700">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full resize-none rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              placeholder="Tell me about your hair goals..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-rose-600 hover:to-pink-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        <p className="text-center text-sm text-gray-600">
          After submitting, Sidney will receive your request inside Automation Nation and follow up from there.
        </p>

        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-green-500 bg-green-100 p-4 text-center font-semibold text-green-700"
          >
            {statusMessage}
          </motion.div>
        ) : null}

        {submitStatus === 'error' ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-red-500 bg-red-100 p-4 text-center font-semibold text-red-700"
          >
            {statusMessage}
          </motion.div>
        ) : null}
      </form>
    </motion.div>
  )
}
