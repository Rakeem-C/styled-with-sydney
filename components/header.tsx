'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Calendar, Menu, X } from 'lucide-react'
import { siteContent } from '@/lib/content'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 20)
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/booking', label: 'Consultation' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#fbf6ef]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={`font-serif text-2xl font-bold transition-colors ${isScrolled ? 'text-slate-950' : 'text-white'}`}>
              {siteContent?.name ?? 'Sidney Kiyabu'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks?.map?.((link) => (
              <Link
                key={link?.href ?? ''}
                href={link?.href ?? '#'}
                className={`font-medium transition-colors ${
                  isScrolled ? 'text-slate-700 hover:text-rose-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {link?.label ?? ''}
              </Link>
            )) ?? null}
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-rose-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-950/10 transition hover:bg-rose-800"
            >
              <Calendar className="mr-2" size={16} />
              Request
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-slate-800 hover:text-rose-700' : 'text-white hover:text-rose-100'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#fbf6ef]">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {navLinks?.map?.((link) => (
              <Link
                key={link?.href ?? ''}
                href={link?.href ?? '#'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-800 hover:text-rose-700 transition-colors font-medium"
              >
                {link?.label ?? ''}
              </Link>
            )) ?? null}
          </nav>
        </div>
      )}
    </header>
  )
}
