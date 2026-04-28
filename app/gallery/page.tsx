import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { GalleryHero } from '@/components/gallery-hero'
import { GalleryGrid } from '@/components/gallery-grid'
import { CallToAction } from '@/components/call-to-action'

export const metadata = {
  title: 'Gallery - Sidney Kiyabu Portfolio',
  description: 'Browse stunning hair transformations by Sidney Kiyabu. View bridal styles, color work, extensions, and more.',
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <GalleryHero />
        <GalleryGrid />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
