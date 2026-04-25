import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { getServiceBySlug } from '../data/services'
import Button from '../components/Button'

const contactDetails = {
  phone: '+91 8778964644',
  whatsappNumber: '918778964644', // digits only for wa.me
  email: 'trueselfcounsellingservices@gmail.com',
  address: '123 Peaceful Lane, Suite 100, Calm City, CC 12345',
}

const POPUP_STEPS = [
  { id: 'name', question: 'Your Name', type: 'text', placeholder: 'Full name' },
  { id: 'phone', question: 'Phone Number', type: 'tel', placeholder: 'e.g. +1 555 000 0000' },
  {
    id: 'sessionType',
    question: 'Preferred session type?',
    options: ['Online', 'In-person'],
  },
  { id: 'time', question: 'Preferred day/time?', type: 'text', placeholder: 'e.g. Weekday mornings' },
  { id: 'message', question: 'Brief message (optional)', type: 'text', placeholder: 'Any specific concern or note...' },
]

function buildWhatsAppMessage(serviceTitle, formData) {
  const lines = [
    `Hi, I'm interested in *${serviceTitle}*.`,
    '',
    `Name: ${formData.name || '-'}`,
    `Phone: ${formData.phone || '-'}`,
    `Session: ${formData.sessionType || '-'}`,
    `Preferred time: ${formData.time || '-'}`,
  ]
  if (formData.message?.trim()) {
    lines.push('', `Message: ${formData.message.trim()}`)
  }
  return lines.join('\n')
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupStep, setPopupStep] = useState(0)
  const [popupData, setPopupData] = useState({})

  if (!service) {
    return (
      <div className="min-h-screen pt-28 px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-sage-dark)]">Service not found</h1>
        <Button to="/services" className="mt-4">
          Back to Services
        </Button>
      </div>
    )
  }

  const openPopup = () => {
    setPopupStep(0)
    setPopupData({})
    setPopupOpen(true)
  }

  const closePopup = () => setPopupOpen(false)

  const currentStep = POPUP_STEPS[popupStep]
  const value = popupData[currentStep?.id] ?? ''
  const isFirst = popupStep === 0
  const isLast = popupStep === POPUP_STEPS.length - 1

  const updatePopup = (val) => {
    setPopupData((prev) => ({ ...prev, [currentStep.id]: val }))
  }

  const canProceed = () => {
    if (currentStep?.options) return true
    if (currentStep?.type === 'text' && currentStep.id === 'message') return true
    return String(value).trim().length > 0
  }

  const handlePopupNext = () => {
    if (isLast) {
      const text = buildWhatsAppMessage(service.title, popupData)
      const url = `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(text)}`
      window.open(url, '_blank', 'noopener,noreferrer')
      closePopup()
      return
    }
    setPopupStep((s) => s + 1)
  }

  const handlePopupBack = () => {
    if (!isFirst) setPopupStep((s) => s - 1)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="pt-24 sm:pt-28 pb-12 md:pb-16 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, var(--color-sand) 0%, var(--color-mint) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[var(--color-sage-dark)] hover:text-[#B8762F] mb-4 sm:mb-6 font-medium text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d3d3d]">{service.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content + Image */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-[#5a5a5a] leading-relaxed mb-8">{service.description}</p>

              <h2 className="text-xl font-semibold text-[var(--color-sage-dark)] mb-4">What we cover</h2>
              <ul className="space-y-2 mb-8">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[#5a5a5a]">
                    <span className="text-[var(--color-sage-dark)] mt-1">•</span>
                    {b}
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-[var(--color-sage-dark)] mb-4">Benefits</h2>
              <ul className="space-y-2">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[#5a5a5a]">
                    <span className="text-[var(--color-sage)]">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:w-2/5 space-y-6">
            <motion.div
              className="rounded-3xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </motion.div>

            <motion.div
              className="rounded-xl sm:rounded-2xl bg-[var(--color-cream)] border border-[var(--color-stone)] p-4 sm:p-6 w-full lg:w-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-[var(--color-sage-dark)] mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-[#5a5a5a]">
                <li><strong>Phone:</strong> {contactDetails.phone}</li>
                <li><strong>Email:</strong> {contactDetails.email}</li>
                <li><strong>Address:</strong> {contactDetails.address}</li>
              </ul>
              <div className="mt-4 flex flex-col gap-3">
                <Button variant="primary" className="w-full" onClick={openPopup}>
                  Book a Session
                </Button>
                <button
                  type="button"
                  onClick={openPopup}
                  className="w-full py-3 rounded-2xl border-2 border-[var(--color-sage-dark)] text-[var(--color-sage-dark)] font-medium hover:bg-[var(--color-gold-light)] transition-colors"
                >
                  Quick Chat
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <AnimatePresence>
        {popupOpen && (
          <>
            <motion.div
              role="presentation"
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="popup-title"
                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto pointer-events-auto mx-2 sm:mx-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 id="popup-title" className="text-xl font-semibold text-[#3d3d3d]">
                      {service.title}
                    </h2>
                    <button
                      type="button"
                      onClick={closePopup}
                      className="p-2 rounded-xl text-[#5a5a5a] hover:bg-[var(--color-sand)]"
                      aria-label="Close"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-2 flex gap-1">
                    {POPUP_STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i <= popupStep ? 'bg-[var(--color-sage-dark)]' : 'bg-[var(--color-stone)]'}`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={popupStep}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-sm sm:text-base font-medium text-[#3d3d3d] mb-3">
                        {currentStep.question}
                      </label>

                      {currentStep.options ? (
                        <div className="space-y-2">
                          {currentStep.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                updatePopup(opt)
                                if (!isLast) setTimeout(() => setPopupStep((s) => s + 1), 150)
                                else handlePopupNext()
                              }}
                              className={`w-full text-left px-4 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 transition-all text-sm sm:text-base ${
                                value === opt
                                  ? 'border-[var(--color-sage-dark)] bg-[var(--color-mint)] text-[var(--color-sage-dark)]'
                                  : 'border-[var(--color-stone)] hover:border-[var(--color-gold)] bg-white'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <>
                          <input
                            type={currentStep.type || 'text'}
                            value={value}
                            onChange={(e) => updatePopup(e.target.value)}
                            placeholder={currentStep.placeholder}
                            className="w-full px-4 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-[var(--color-stone)] focus:border-[var(--color-sage-dark)] focus:ring-0 outline-none text-base"
                          />
                          <div className="flex gap-3 mt-4">
                            {!isFirst && (
                              <button
                                type="button"
                                onClick={handlePopupBack}
                                className="flex-1 py-3 rounded-2xl border-2 border-[var(--color-sage-dark)] text-[var(--color-sage-dark)] font-medium"
                              >
                                Back
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={handlePopupNext}
                              disabled={!canProceed()}
                              className="flex-1 py-3 rounded-2xl bg-[var(--color-sage-dark)] text-white font-medium disabled:opacity-50"
                            >
                              {isLast ? 'Send on WhatsApp' : 'Next'}
                            </button>
                          </div>
                        </>
                      )}

                      {currentStep.options && (
                        <div className="flex gap-3 mt-4">
                          {!isFirst && (
                            <button
                              type="button"
                              onClick={handlePopupBack}
                              className="py-2 px-4 rounded-xl border border-[var(--color-stone)] text-[#5a5a5a]"
                            >
                              Back
                            </button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
