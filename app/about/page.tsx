import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about-hero'
import { Expertise } from '@/components/expertise'
import { CallToAction } from '@/components/call-to-action'

export const metadata = {
  title: 'About Styled by Sidney',
  description: 'Learn about the Styled by Sidney experience for bridal styling, event hair, color, extensions, makeup, braids, and polished photo-ready finishes.',
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
