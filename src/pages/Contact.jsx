import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Button from '../components/Button'
import ContactWellnessPoll from '../components/ContactWellnessPoll'

const STEPS = [
  { id: 'name', question: 'Full name', type: 'text', placeholder: 'Your full name' },
  { id: 'age', question: 'Age', type: 'text', placeholder: 'e.g. 28' },
  { id: 'phone', question: 'Phone number', type: 'tel', placeholder: 'e.g. +91 9876543210' },
  { id: 'location', question: 'Location', type: 'text', placeholder: 'City / State' },
  { id: 'profession', question: 'Profession', type: 'text', placeholder: 'Your profession' },
  { id: 'concerns', question: 'Concerns to be addressed', type: 'text', placeholder: 'Briefly describe what you would like to work on' },
  { id: 'referral', question: 'Referral name, if any', type: 'text', placeholder: 'Optional' },
  { id: 'languages', question: 'Languages preferred', type: 'text', placeholder: 'e.g. English, Tamil, Hindi' },
]

const contactInfo = {
  phone: '+91 8778964644',
  email: 'trueselfcounsellingservices@gmail.com',
  address: '123 Peaceful Lane, Suite 100, Calm City, CC 12345',
  hours: 'Mon–Fri 9:00 AM – 6:00 PM, Sat 10:00 AM – 2:00 PM',
}

export default function Contact() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const isFirst = step === 0

  const update = (value) => {
    setFormData((prev) => ({ ...prev, [current.id]: value }))
  }

  const value = formData[current?.id] ?? ''

  const canNext = () => {
    if (current.id === 'referral') return true
    if (current.type === 'text' || current.type === 'email' || current.type === 'tel') return value.trim().length > 0
    return true
  }

  const handleNext = () => {
    if (isLast) {
      setSubmitted(true)
      return
    }
    setStep((s) => s + 1)
  }

  const handleBack = () => {
    if (isFirst) return
    setStep((s) => s - 1)
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <section
          className="pt-28 pb-16 px-4 sm:px-6"
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
        <ContactDetailsSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 text-center"
        style={{
          background: 'linear-gradient(135deg, var(--color-ivory) 0%, var(--color-sky) 50%, var(--color-mint) 100%)',
        }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d3d3d] mb-3 sm:mb-4 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Book Now
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-[#5a5a5a] max-w-xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Share a few details so we can get in touch and schedule your session.
        </motion.p>
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

              {current.options ? (
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
                    <Button onClick={handleNext} className="flex-1" disabled={!canNext()}>
                      {isLast ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}

              {current.options && (
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

      <ContactDetailsSection />
    </div>
  )
}

function ContactDetailsSection() {
  return (
    <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-[var(--color-sand)]">
      <div className="max-w-6xl mx-auto">
        <ContactWellnessPoll />
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-sage-dark)] mb-6 sm:mb-8 text-center">
          Contact Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 border border-[var(--color-stone)]">
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[#5a5a5a]">
              <li><strong>Phone:</strong> {contactInfo.phone}</li>
              <li><strong>Email:</strong> {contactInfo.email}</li>
              <li><strong>Address:</strong> {contactInfo.address}</li>
              <li><strong>Working Hours:</strong> {contactInfo.hours}</li>
            </ul>
          </div>
          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--color-stone)] bg-white min-h-[200px] sm:min-h-[250px]">
            <iframe
              title="Office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133376689!2d-73.987845684286!3d40.748440979326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
              width="100%"
              height="250"
              className="w-full min-h-[200px] sm:min-h-[250px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
