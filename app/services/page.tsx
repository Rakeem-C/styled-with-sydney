import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ServicesHero } from '@/components/services-hero'
import { ServicesList } from '@/components/services-list'
import { CallToAction } from '@/components/call-to-action'

export const metadata = {
  title: 'Services - Styled by Sidney',
  description: 'Explore bridal styling, event hair, color, extensions, makeup artistry, and braiding services from Styled by Sidney.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ServicesHero />
        <ServicesList />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
