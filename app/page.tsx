import { Hero } from '@/components/hero'
import { FeaturedServices } from '@/components/featured-services'
import { PortfolioPreview } from '@/components/portfolio-preview'
import { CallToAction } from '@/components/call-to-action'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedServices />
        <PortfolioPreview />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
