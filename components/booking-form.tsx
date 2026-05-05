'use client'

import { useEffect, useMemo, useState } from 'react'
import { Calendar, Clock, Mail, MessageSquare, Phone, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteContent } from '@/lib/content'

type BookingFormData = {
  name: string
  phone: string
  email: string
  preferredContactMethod: string
  serviceInterest: string
  desiredDate: string
  desiredTime: string
  eventType: string
  notes: string
}

type BookingAttribution = {
  sourcePage: string
  referrer: string
  utmSource: string
  utmCampaign: string
  utmMedium: string
  submittedAtClient: string
}

const initialFormData: BookingFormData = {
  name: '',
  phone: '',
  email: '',
  preferredContactMethod: 'text',
  serviceInterest: '',
  desiredDate: '',
  desiredTime: '',
  eventType: '',
  notes: '',
}

function normalizeServiceValue(value: string) {
  return value.trim().toLowerCase()
}

function isComplexService(value: string) {
  const normalized = normalizeServiceValue(value)
  return [
    'bridal hair styling',
    'hair extensions',
    'color specialist',
  ].includes(normalized)
}

function resolveCtaLabel(serviceInterest: string) {
  if (!serviceInterest) {
    return 'Request a Consultation'
  }

  return isComplexService(serviceInterest) ? 'Request a Consultation' : 'Check Availability'
}

function getAttribution(): BookingAttribution {
  if (typeof window === 'undefined') {
    return {
      sourcePage: '/booking',
      referrer: '',
      utmSource: '',
      utmCampaign: '',
      utmMedium: '',
      submittedAtClient: '',
    }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    sourcePage: window.location.pathname,
    referrer: document.referrer || '',
    utmSource: params.get('utm_source') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmMedium: params.get('utm_medium') || '',
    submittedAtClient: new Date().toISOString(),
  }
}

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  const ctaLabel = useMemo(() => resolveCtaLabel(formData.serviceInterest), [formData.serviceInterest])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const service = new URLSearchParams(window.location.search).get('service')
    if (!service) return

    setFormData((current) => ({
      ...current,
      serviceInterest: service,
    }))
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setValidationMessage('')
    setStatusMessage('')
    setSubmitStatus('idle')

    if (!formData.name.trim()) {
      setValidationMessage('Please add your name so Sidney knows who to follow up with.')
      return
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      setValidationMessage('Please add a phone number or email so Sidney can confirm your next step.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        ...formData,
        attribution: getAttribution(),
      }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setSubmitStatus('error')
        setStatusMessage(payload?.error || 'Something went wrong while sending your request. Please try again.')
        return
      }

      setSubmitStatus('success')
      setStatusMessage(
        payload?.message ||
          'Your request is in. Sidney will text or email you with the best next step based on your service and date.'
      )
      setFormData(initialFormData)
    } catch (error) {
      console.error('Styled by Sydney intake error:', error)
      setSubmitStatus('error')
      setStatusMessage('We could not send your request right now. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-lg bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ring-1 ring-stone-200"
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-700">
          Consultation request
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
          Tell Sidney what you&apos;re looking for
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Keep this simple. Start with your name and the best way to reach you, then add as much or as little
          detail as you have right now.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="booking-name" className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              id="booking-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="booking-phone" className="mb-2 block text-sm font-semibold text-slate-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="booking-email" className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="booking-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="booking-preferredContactMethod" className="mb-2 block text-sm font-semibold text-slate-700">
            Preferred Contact Method
          </label>
          <select
            id="booking-preferredContactMethod"
            name="preferredContactMethod"
            value={formData.preferredContactMethod}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] px-4 py-3 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="phone">Phone call</option>
          </select>
        </div>

        <div>
          <label htmlFor="booking-serviceInterest" className="mb-2 block text-sm font-semibold text-slate-700">
            Service Interest
          </label>
          <select
            id="booking-serviceInterest"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] px-4 py-3 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
          >
            <option value="">I&apos;m not sure yet</option>
            {siteContent.services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Bridal party / wedding package">Bridal party / wedding package</option>
            <option value="On-location styling">On-location styling</option>
            <option value="Another service">Another service</option>
          </select>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="booking-desiredDate" className="mb-2 block text-sm font-semibold text-slate-700">
              Desired Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="booking-desiredDate"
                name="desiredDate"
                type="date"
                value={formData.desiredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="booking-desiredTime" className="mb-2 block text-sm font-semibold text-slate-700">
              Desired Time
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="booking-desiredTime"
                name="desiredTime"
                type="time"
                value={formData.desiredTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="booking-eventType" className="mb-2 block text-sm font-semibold text-slate-700">
            Event Type
          </label>
          <input
            id="booking-eventType"
            name="eventType"
            type="text"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] px-4 py-3 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
            placeholder="Wedding, photoshoot, birthday, everyday glam, or another event"
          />
        </div>

        <div>
          <label htmlFor="booking-notes" className="mb-2 block text-sm font-semibold text-slate-700">
            Notes or Inspiration
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-slate-400" size={20} />
            <textarea
              id="booking-notes"
              name="notes"
              rows={5}
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-lg border border-stone-200 bg-[#fbf6ef] py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
              placeholder="Tell Sidney what kind of look you want, any inspiration, hair history, or questions you already have."
            />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Inspiration photo upload is the next site upgrade. For now, send your request and Sidney can ask for
            photos by text if they would help.
          </p>
        </div>

        {validationMessage ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {validationMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-rose-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending your request...' : ctaLabel}
        </button>

        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-800"
          >
            {statusMessage}
          </motion.div>
        ) : null}

        {submitStatus === 'error' ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm font-medium text-rose-700"
          >
            {statusMessage}
          </motion.div>
        ) : null}
      </form>
    </motion.div>
  )
}
