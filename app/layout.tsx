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
  title: 'Styled by Sidney | Bridal Hair, Color, Extensions, and Event Styling',
  description: 'Book a consultation with Styled by Sidney for bridal hair, event styling, color transformations, extensions, makeup artistry, and polished photo-ready finishes.',
  keywords: ['Styled by Sidney', 'Sidney Kiyabu', 'bridal hair', 'hair extensions', 'makeup artist', 'color specialist', 'event hairstylist'],
  authors: [{ name: 'Sidney Kiyabu' }],
  openGraph: {
    title: 'Styled by Sidney - Bridal Hair, Color, Extensions, and Event Styling',
    description: 'Elevated hair for weddings, events, and confidence-first transformations.',
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
