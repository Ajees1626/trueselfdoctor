// cspell:ignore Trueself trueself replyto
import { useState } from 'react'
import { motion } from 'motion/react'
import { Helmet } from 'react-helmet'
import Button from '../components/Button'
import ContactWellnessPoll from '../components/ContactWellnessPoll'
import SEO from '../components/SEO'

const contactJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact TRUESELF COUNSELLING',
    url: 'https://trueselfcounselling.com/contact',
    description:
      'Book an online therapy session with TRUESELF COUNSELLING. Reach us by phone, email, or fill out our short intake form.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://trueselfcounselling.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://trueselfcounselling.com/contact' },
    ],
  },
]

const HERO_BG_IMAGE =
  'https://res.cloudinary.com/dagsqokgc/image/upload/q_auto/f_auto/v1778582785/33_result_y3au1p.webp'

const INITIAL_FORM = {
  name: '',
  age: '',
  location: '',
  email: '',
  phone: '',
}

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-stone)] bg-[#FFFFFF] text-sm text-[#4A4A4A] placeholder:text-[#b7aea3] outline-none transition-all duration-200 ease-out hover:border-[#e0d6c8] focus:border-[var(--color-sage-dark)] focus:ring-2 focus:ring-[var(--color-sage-dark)]/15'

const labelClass = 'block text-xs font-medium tracking-wide text-[#6b6158] mb-1.5'

export default function Contact() {
  const WEB3FORMS_ACCESS_KEY = 'c8aea697-74f4-4ec4-97fd-350e2fcf4704'
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      setSubmitError('')

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New Contact Form Submission - TRUESELF COUNSELLING',
        from_name: formData.name || 'Website Visitor',
        name: formData.name.trim(),
        age: formData.age.trim(),
        location: formData.location.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        replyto: formData.email.trim(),
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        setSubmitError('Unable to send right now. Please try again.')
      }
    } catch {
      setSubmitError('Network issue. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFFFFF]">
        <SEO
          title="Thank You | TRUESELF COUNSELLING"
          description="Your message has been received. Our team will reach out within 1–2 business days to schedule your therapy session."
          path="/contact"
          noIndex
        />
        <section className="pt-28 pb-10 sm:pb-12 px-4 sm:px-6 bg-[var(--color-sand)]">
          <div className="max-w-6xl mx-auto">
            <ContactWellnessPoll />
          </div>
        </section>

        <section
          className="pb-16 px-4 sm:px-6"
          style={{
            background: 'linear-gradient(135deg, var(--color-sand) 0%, var(--color-mint) 100%)',
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-white p-8 md:p-12 shadow-lg border border-[var(--color-stone)]"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--color-mint)] flex items-center justify-center mx-auto mb-6 text-3xl">
                ✓
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-sage-dark)] mb-4">
                Thank You
              </h1>
              <p className="text-[#5a5a5a] mb-8">
                Your responses have been received. We'll be in touch within 1–2 business days to schedule your session.
              </p>
              <Button to="/">Return Home</Button>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* cspell:ignore logotop */}
      <Helmet>
        <title>Book a Therapy Session | Contact TRUESELF COUNSELLING</title>
        <link rel="icon" href="/logotop.webp" />
        <link rel="shortcut icon" href="/logotop.webp" />
        <link rel="apple-touch-icon" href="/logotop.webp" />
      </Helmet>
      <SEO
        title="Book a Therapy Session | Contact TRUESELF COUNSELLING"
        description="Book an online therapy session with TRUESELF COUNSELLING. Confidential intake form, phone, email and WhatsApp support. Sessions in English, Tamil, Malayalam, Kannada, Hindi and Gujarati."
        keywords="book therapy session, contact therapist, online counselling appointment, mental health booking, psychotherapy India, TRUESELF COUNSELLING contact"
        path="/contact"
        jsonLd={contactJsonLd}
      />
      <section
        className="relative pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('${HERO_BG_IMAGE}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--color-ivory)]/92 via-[var(--color-sky)]/78 to-[var(--color-mint)]/88 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d3d3d] mb-3 sm:mb-4 px-2 drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Book Now
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-[#5a5a5a] max-w-xl mx-auto px-2 text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Share a few details so we can get in touch and schedule your session.
          </motion.p>
        </div>
      </section>

      <section className="py-8 sm:py-10 px-4 sm:px-6 bg-[#FFFFFF]">
        <div className="max-w-lg mx-auto">
          <motion.form
            onSubmit={submitForm}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-[#FFFFFF] border border-[var(--color-stone)] shadow-[0_6px_24px_rgba(92,74,50,0.06)] p-5 sm:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={update('name')}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-age" className={labelClass}>
                  Age
                </label>
                <input
                  id="contact-age"
                  type="number"
                  name="age"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={update('age')}
                  placeholder="e.g. 28"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-location" className={labelClass}>
                  Location
                </label>
                <input
                  id="contact-location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={update('location')}
                  placeholder="City / State"
                  required
                  autoComplete="address-level2"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={update('phone')}
                  placeholder="e.g. +91 9876543210"
                  required
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              {submitError && (
                <p className="sm:col-span-2 text-xs text-red-600">{submitError}</p>
              )}

              <div className="sm:col-span-2 pt-0.5">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? undefined : { y: -1 }}
                  whileTap={isSubmitting ? undefined : { y: 0 }}
                  className="w-full rounded-xl bg-[var(--color-sage-dark)] text-white text-sm font-semibold px-5 py-2.5 shadow-sm transition-all duration-200 hover:bg-[#B8762F] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-gold-dark)] disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
