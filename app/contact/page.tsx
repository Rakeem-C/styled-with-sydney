import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import { StickyConsultationCta } from '@/components/sticky-consultation-cta'

export const metadata = {
  title: 'Contact Styled by Sidney',
  description: 'Send Styled by Sidney a consultation request or question and have it flow into the Automation Nation intake system.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fbf6ef]">
      <Header />
      <main className="pt-32">
        <section className="mx-auto max-w-4xl px-4 pb-12 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
            Let&apos;s talk
          </p>
          <h1 className="font-serif text-5xl font-bold text-slate-950 md:text-6xl">
            Send Sidney your details
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Use this form for questions, quick details, or a consultation request. Your message will be saved in
            Automation Nation under the Styled by Sydney account.
          </p>
        </section>

        <div className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </main>
      <Footer />
      <StickyConsultationCta />
    </div>
  )
}
