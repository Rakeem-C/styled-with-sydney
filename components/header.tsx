'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
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
    { href: '/booking', label: 'Book Now' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent">
              {siteContent?.name ?? 'Sidney Kiyabu'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks?.map?.((link) => (
              <Link
                key={link?.href ?? ''}
                href={link?.href ?? '#'}
                className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
              >
                {link?.label ?? ''}
              </Link>
            )) ?? null}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-rose-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {navLinks?.map?.((link) => (
              <Link
                key={link?.href ?? ''}
                href={link?.href ?? '#'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
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
