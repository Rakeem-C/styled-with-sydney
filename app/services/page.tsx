import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ServicesHero } from '@/components/services-hero'
import { ServicesList } from '@/components/services-list'
import { CallToAction } from '@/components/call-to-action'

export const metadata = {
  title: 'Services - Sidney Kiyabu Hairstylist',
  description: 'Explore professional hair services including bridal styling, extensions, makeup artistry, color treatments, and braiding by Sidney Kiyabu.',
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
