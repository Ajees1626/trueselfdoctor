// cspell:ignore Trueself trueself
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Helmet } from 'react-helmet'
import Button from '../components/Button'
import ContactWellnessPoll from '../components/ContactWellnessPoll'
import SEO from '../components/SEO'

const PROFESSION_OPTIONS = [
  'Student',
  'IT / Software Professional',
  'Healthcare Professional (Doctor / Nurse)',
  'Teacher / Educator',
  'Business / Self-Employed',
  'Corporate Professional',
  'Engineer',
  'Lawyer / Legal Professional',
  'Government Employee',
  'Homemaker',
  'Artist / Creative Professional',
  'Media / Journalist',
  'Finance / Banking',
  'Sales & Marketing',
  'Hospitality / Service Industry',
  'Retired',
  'Unemployed / Between Jobs',
  'Prefer not to say',
  'Other',
]

const LANGUAGE_OPTIONS = [
  'English',
  'Tamil',
  'Malayalam',
  'Kannada',
  'Hindi',
  'Gujarati',
]

const STEPS = [
  { id: 'name', question: 'Full name', type: 'text', placeholder: 'Your full name' },
  { id: 'age', question: 'Age', type: 'text', placeholder: 'e.g. 28' },
  { id: 'phone', question: 'Phone number', type: 'tel', placeholder: 'e.g. +91 9876543210' },
  { id: 'location', question: 'Location', type: 'text', placeholder: 'City / State' },
  {
    id: 'profession',
    question: 'Profession',
    type: 'select',
    placeholder: 'Select your profession',
    options: PROFESSION_OPTIONS,
  },
  { id: 'concerns', question: 'Concerns to be addressed', type: 'text', placeholder: 'Briefly describe what you would like to work on' },
  { id: 'referral', question: 'Referral name, if any', type: 'text', placeholder: 'Optional' },
  {
    id: 'languages',
    question: 'Languages preferred',
    type: 'select',
    placeholder: 'Select preferred language',
    options: LANGUAGE_OPTIONS,
  },
]

const DIRECT_CONTACT = {
  email: 'trueselfcounsellingservices@gmail.com',
  phoneDisplay: '+91 8667344083',
  phoneTel: '+918667344083',
  whatsappHref: 'https://wa.me/918667344083',
}

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

/** Hero background — warm, calm (Unsplash). Same family as Wellness page; swap URL to use your own asset. */
const HERO_BG_IMAGE =
  'https://res.cloudinary.com/dagsqokgc/image/upload/q_auto/f_auto/v1778582785/33_result_y3au1p.webp'

export default function Contact() {
  const WEB3FORMS_ACCESS_KEY = 'c8aea697-74f4-4ec4-97fd-350e2fcf4704'
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const isFirst = step === 0

  const update = (value) => {
    setFormData((prev) => ({ ...prev, [current.id]: value }))
  }

  const value = formData[current?.id] ?? ''

  const canNext = () => {
    if (current.id === 'referral') return true
    if (current.type === 'select') return String(value).trim().length > 0
    if (current.type === 'text' || current.type === 'email' || current.type === 'tel') return value.trim().length > 0
    return true
  }

  const handleNext = () => {
    if (isLast) {
      void submitForm()
      return
    }
    setStep((s) => s + 1)
  }

  const handleBack = () => {
    if (isFirst) return
    setStep((s) => s - 1)
  }

  const submitForm = async () => {
    try {
      setIsSubmitting(true)
      setSubmitError('')

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New Contact Form Submission - TRUESELF COUNSELLING',
        from_name: formData.name || 'Website Visitor',
        name: formData.name || '',
        age: formData.age || '',
        phone: formData.phone || '',
        location: formData.location || '',
        profession: formData.profession || '',
        concerns: formData.concerns || '',
        referral: formData.referral || '',
        languages: formData.languages || '',
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
      <div className="min-h-screen">
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
    <div className="min-h-screen">
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
      {/* Hero */}
      <section
        className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 text-center overflow-hidden"
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

      {/* Multi-step form */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="mb-4 sm:mb-6 flex gap-1.5 sm:gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-[var(--color-sage-dark)]' : 'bg-[var(--color-stone)]'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl sm:rounded-3xl bg-[var(--color-cream)] border border-[var(--color-stone)] p-4 sm:p-6 md:p-8"
            >
              <label className="block text-base sm:text-lg font-medium text-[#3d3d3d] mb-3 sm:mb-4">
                {current.question}
              </label>

              {current.type === 'select' ? (
                <div className="space-y-4">
                  <select
                    value={value}
                    onChange={(e) => update(e.target.value)}
                    aria-label={current.question}
                    className="w-full px-4 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-[var(--color-stone)] focus:border-[var(--color-sage-dark)] focus:ring-0 outline-none transition-colors text-base bg-white"
                  >
                    <option value="" disabled>
                      {current.placeholder || 'Select an option'}
                    </option>
                    {current.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-3">
                    {!isFirst && (
                      <Button variant="outline" onClick={handleBack} className="flex-1">
                        Back
                      </Button>
                    )}
                    <Button onClick={handleNext} className="flex-1" disabled={!canNext() || isSubmitting}>
                      {isLast ? (isSubmitting ? 'Sending...' : 'Submit') : 'Next'}
                    </Button>
                  </div>
                  {submitError && <p className="text-sm text-red-600">{submitError}</p>}
                </div>
              ) : current.options ? (
                <div className="space-y-3">
                  {current.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        update(opt)
                        if (!isLast) setTimeout(() => setStep((s) => s + 1), 200)
                        else setSubmitted(true)
                      }}
                      className={`w-full text-left px-4 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 transition-all text-sm sm:text-base ${
                        value === opt
                          ? 'border-[var(--color-sage-dark)] bg-[var(--color-mint)] text-[var(--color-sage-dark)]'
                          : 'border-[var(--color-stone)] hover:border-[var(--color-sage)] bg-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type={current.type || 'text'}
                    value={value}
                    onChange={(e) => update(e.target.value)}
                    placeholder={current.placeholder}
                    className="w-full px-4 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-[var(--color-stone)] focus:border-[var(--color-sage-dark)] focus:ring-0 outline-none transition-colors text-base"
                  />
                  <div className="flex gap-3">
                    {!isFirst && (
                      <Button variant="outline" onClick={handleBack} className="flex-1">
                        Back
                      </Button>
                    )}
                    <Button onClick={handleNext} className="flex-1" disabled={!canNext() || isSubmitting}>
                      {isLast ? (isSubmitting ? 'Sending...' : 'Submit') : 'Next'}
                    </Button>
                  </div>
                  {submitError && <p className="text-sm text-red-600">{submitError}</p>}
                </div>
              )}

              {current.type !== 'select' && current.options && (
                <div className="flex gap-3 mt-6">
                  {!isFirst && (
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
