'use client'

import Link from 'next/link'
import { Calendar } from 'lucide-react'

export function StickyConsultationCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-[#fbf6ef]/95 px-4 py-3 shadow-[0_-12px_30px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <Link
        href="/booking"
        className="flex w-full items-center justify-center rounded-full bg-rose-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-950/15"
      >
        <Calendar className="mr-2" size={18} />
        Request a consultation
      </Link>
    </div>
  )
}
