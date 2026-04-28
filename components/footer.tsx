import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'
import { siteContent } from '@/lib/content'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent mb-4">
              {siteContent?.name ?? 'Sidney Kiyabu'}
            </h3>
            <p className="text-gray-400 mb-4">
              {siteContent?.tagline ?? 'Transforming Hair, Elevating Confidence'}
            </p>
            <div className="flex space-x-4">
              <a
                href={siteContent?.instagramUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={`mailto:${siteContent?.email ?? ''}`}
                className="text-gray-400 hover:text-rose-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-rose-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-rose-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-rose-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-rose-400 transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get In Touch</h4>
            <p className="text-gray-400 mb-2">
              Email: <a href={`mailto:${siteContent?.email ?? ''}`} className="hover:text-rose-400 transition-colors">{siteContent?.email ?? ''}</a>
            </p>
            <p className="text-gray-400">
              Instagram: <a href={siteContent?.instagramUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition-colors">{siteContent?.instagram ?? ''}</a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} {siteContent?.name ?? 'Sidney Kiyabu'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
