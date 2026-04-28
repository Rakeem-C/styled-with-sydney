import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about-hero'
import { Expertise } from '@/components/expertise'
import { CallToAction } from '@/components/call-to-action'

export const metadata = {
  title: 'About Sidney Kiyabu - Styled by Sidney',
  description: 'Meet Sidney Kiyabu, the stylist behind Styled by Sidney, specializing in bridal styling, event hair, color, extensions, makeup, and braiding.',
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
