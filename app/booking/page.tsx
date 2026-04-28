import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BookingHero } from '@/components/booking-hero'
import { BookingForm } from '@/components/booking-form'
import { ContactForm } from '@/components/contact-form'

export const metadata = {
  title: 'Book Appointment - Sidney Kiyabu',
  description: 'Schedule your hair transformation with Sidney Kiyabu. Book a consultation for bridal styling, extensions, color, and more.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BookingHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <BookingForm />
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
