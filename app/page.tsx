import { Hero } from '@/components/hero'
import { FeaturedServices } from '@/components/featured-services'
import { OwnerPreview } from '@/components/owner-preview'
import { PortfolioPreview } from '@/components/portfolio-preview'
import { ClientExperience } from '@/components/client-experience'
import { CallToAction } from '@/components/call-to-action'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StickyConsultationCta } from '@/components/sticky-consultation-cta'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedServices />
        <OwnerPreview />
        <PortfolioPreview />
        <ClientExperience />
        <CallToAction />
      </main>
      <Footer />
      <StickyConsultationCta />
    </div>
  )
}
