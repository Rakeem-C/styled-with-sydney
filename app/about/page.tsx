import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about-hero'
import { Expertise } from '@/components/expertise'
import { CallToAction } from '@/components/call-to-action'

export const metadata = {
  title: 'About Sidney Kiyabu - Professional Hairstylist',
  description: 'Learn about Sidney Kiyabu, a passionate hairstylist specializing in bridal styling, extensions, makeup, color, and braiding.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutHero />
        <Expertise />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
