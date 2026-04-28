import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://styled-with-sydney.vercel.app'),
  title: 'Sidney Kiyabu - Professional Hairstylist | Bridal, Color, Extensions',
  description: 'Transform your hair with Sidney Kiyabu. Specializing in bridal styling, hair extensions, makeup artistry, color services, and braiding. Book your consultation today.',
  keywords: ['hairstylist', 'bridal hair', 'hair extensions', 'makeup artist', 'color specialist', 'braids', 'Sidney Kiyabu'],
  authors: [{ name: 'Sidney Kiyabu' }],
  openGraph: {
    title: 'Sidney Kiyabu - Professional Hairstylist',
    description: 'Transforming Hair, Elevating Confidence. Specializing in bridal styling, extensions, makeup, and color.',
    images: ['/og-image.png'],
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
