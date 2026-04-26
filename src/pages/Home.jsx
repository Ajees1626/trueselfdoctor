import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Button from '../components/Button'
import FAQAccordion from '../components/FAQAccordion'
import ServicesSlider from '../components/ServicesSlider'
import TherapistDetails from '../components/TherapistDetails'
import AnimatedCounter from '../components/AnimatedCounter'
import { testimonials } from '../data/testimonials'
import { faqItems } from '../data/faq'

const highlights = [
  'This is a Space to Reflect',
  '9+ Years Experience',
  'A Space to Process',
  'A Space to Return to Your True Self',
]

const stats = [
  { value: 700, suffix: '+', label: 'Clients Helped' },
  { value: 9, suffix: '+', label: 'Years Experience' },
  { value: 7000, suffix: '+', label: 'Sessions Conducted' },
  { value: 98, suffix: '%', label: 'Positive Feedback' },
]

const aboutParagraphs = [
  'Founded in 2023, Trueself is an online therapy platform built on the belief that meaningful healing requires both professional depth and human warmth. While we are a young platform, our work is grounded in years of clinical experience, ethical practice, and a growing community of clients who trust us with their stories.',
  'We are a collective of qualified, women therapists committed to creating safe, thoughtful, and non-judgmental therapeutic spaces. Our platform serves individuals, couples, and families across different life stages and identities because emotional wellbeing is not limited by gender, age, or background.',
  'At Trueself, therapy is not rushed, surface-level, or formulaic. We take a relational, insight-oriented, and evidence-based approach to help clients navigate anxiety, relationship challenges, life transitions, burnout, self-esteem struggles, trauma, and personal growth.',
  'Being an online platform which takes up sessions in English, Tamil, Malayalam, Kannada, Hindi, Gujarati, it allows us to make therapy accessible, flexible, and consistent while maintaining the depth and quality of in-person therapeutic work.',
  'In just three years, Trueself has grown into a trusted mental health space because of one simple principle: We honour every story with care, confidentiality, and integrity.',
]

export default function Home() {
  const [aboutSlideIndex, setAboutSlideIndex] = useState(0)
  const [testimonialSlideIndex, setTestimonialSlideIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setAboutSlideIndex((i) => (i + 1) % aboutParagraphs.length)
    }, 15000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const maxSlide = Math.max(0, testimonials.length - 3)
    const slideCount = maxSlide + 1
    const t = setInterval(() => {
      setTestimonialSlideIndex((i) => (slideCount <= 1 ? 0 : (i + 1) % slideCount))
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.section
        className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24"
        style={{
          background:
            "linear-gradient(135deg, #fbf8f3 0%, #f7f2e8 40%, #F0E6D0 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Soft Premium Blur Background */}
        <motion.div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-[#EAD1A3] opacity-30 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-[380px] h-[380px] bg-[#F0E6D0] opacity-30 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        <div className="relative grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* LEFT CONTENT */}
          <div>
            <motion.span
              className="inline-block text-sm tracking-[0.2em] uppercase text-[#C68532] font-medium mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Licensed Psychotherapist
            </motion.span>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#1f2933] mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Gentle Guidance Toward
              <span className="block text-[#C68532]">
                Emotional Healing & Growth
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-[#5a5a5a] leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Supporting individuals, couples, and families through evidence-based
              psychotherapy in a confidential and compassionate environment.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-6 mb-10 text-sm text-[#4b5563]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C68532] rounded-full" />
                9+ Years Experience
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C68532] rounded-full" />
                100% Confidential
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C68532] rounded-full" />
                Certified & Licensed
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <Link
                to="/contact"
                className="inline-flex justify-center px-6 sm:px-8 py-3 rounded-full bg-[#C68532] text-white font-medium shadow-lg hover:bg-[#B8762F] transition duration-300 text-center"
              >
                Book a Consultation
              </Link>
              <Link
                to="/services"
                className="text-[#C68532] font-medium hover:underline underline-offset-4 text-center sm:text-left"
              >
                Explore Services →
              </Link>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="absolute -top-6 -right-6 w-full h-full rounded-[2rem] border border-white/50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.div
              className="relative rounded-xl sm:rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] w-full max-w-sm sm:max-w-md mx-auto md:mx-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img
                src="https://res.cloudinary.com/dagsqokgc/image/upload/q_auto/f_auto/v1777182274/IMG_6011.JPG_result_zdkoaz.webp"
                alt="Professional psychotherapist"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us */}
      <section className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f9f8f6] overflow-hidden">
  
  {/* Soft background accent */}
  <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#EAD1A3] rounded-full blur-3xl opacity-40" />

  <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">

    {/* IMAGE SIDE */}
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Elegant frame */}
      <div className="absolute -top-2 -left-2 sm:-top-6 sm:-left-6 w-full h-full border border-[#C68532] rounded-xl sm:rounded-[2rem]" />

      <div className="relative rounded-xl sm:rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] w-full max-w-sm sm:max-w-md mx-auto md:mx-0 aspect-[3/4] sm:aspect-[4/5] min-h-[320px] sm:min-h-[400px]">
        <img
          src="https://res.cloudinary.com/dagsqokgc/image/upload/q_auto/f_auto/v1777182274/IMG_6011.JPG_result_zdkoaz.webp"
          alt="Professional Psychotherapist"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Experience Card */}
      <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-8 bg-white shadow-xl rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-center">
        <p className="text-xl sm:text-2xl font-semibold text-[#C68532]">
          <AnimatedCounter end={9} suffix="+" duration={1.2} />
        </p>
        <p className="text-sm text-gray-500">Years Experience</p>
      </div>
    </motion.div>

    {/* CONTENT SIDE */}
    <div>
      <span className="text-sm tracking-[0.2em] uppercase text-[#C68532] font-medium">
        About the Practice
      </span>

      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1f2933] mt-4 mb-6 leading-snug"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Creating a Safe Space for
        <span className="block text-[#C68532]">
          Emotional Healing & Growth
        </span>
      </motion.h2>

      {/* Paragraph slider - auto + manual dots */}
      <div className="relative min-h-[180px] sm:min-h-[200px] mb-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={aboutSlideIndex}
            className="text-lg text-[#555] leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.95 }}
          >
            {aboutParagraphs[aboutSlideIndex]}
          </motion.p>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-6">
          {aboutParagraphs.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAboutSlideIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === aboutSlideIndex
                  ? 'w-8 h-2.5 bg-[#C68532]'
                  : 'w-2.5 h-2.5 bg-[#C68532]/40 hover:bg-[#C68532]/60'
              }`}
              aria-label={`Go to paragraph ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {highlights.map((text, i) => (
          <motion.div
            key={text}
            className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EAD1A3] text-[#C68532] font-semibold">
              ✓
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* Animated counters */}
      <section className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f4f7f5] overflow-hidden">

{/* Soft background blur accents */}
<div className="absolute top-0 left-0 w-80 h-80 bg-[#F0E6D0] rounded-full blur-3xl opacity-40" />
<div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EDE4D4] rounded-full blur-3xl opacity-40" />

<div className="relative max-w-7xl mx-auto">

  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <span className="text-sm tracking-[0.25em] uppercase text-[#C68532] font-medium">
      Trusted By Many
    </span>

    <h2 className="text-4xl md:text-5xl font-semibold text-[#1f2933] mt-4">
      Making a Meaningful
      <span className="block text-[#C68532]">
        Difference in Lives
      </span>
    </h2>
  </motion.div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">

    {stats.map(({ value, suffix, label }, i) => (
      <motion.div
        key={label}
        className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border border-gray-100 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] transition duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
      >
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#C68532] mb-2 sm:mb-3">
          <AnimatedCounter end={value} suffix={suffix} />
        </div>

        <div className="w-10 h-[2px] bg-[#EAD1A3] mx-auto mb-4" />

        <p className="text-sm text-gray-600 tracking-wide uppercase">
          {label}
        </p>
      </motion.div>
    ))}

  </div>
</div>
</section>

      {/* Services slider */}
      <section className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f8f9f7] overflow-hidden">

{/* Soft background accents */}
<div className="absolute top-0 right-0 w-80 h-80 bg-[#F0E6D0] rounded-full blur-3xl opacity-40" />
<div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EDE4D4] rounded-full blur-3xl opacity-40" />

<div className="relative max-w-6xl mx-auto text-center mb-16">

  <motion.span
    className="text-sm tracking-[0.25em] uppercase text-[#C68532] font-medium"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    Therapeutic Services
  </motion.span>

  <motion.h2
    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1f2933] mt-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.05 }}
  >
    Personalized Care for
    <span className="block text-[#C68532]">
      Emotional Well-Being
    </span>
  </motion.h2>

  <motion.p
    className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
  >
    Evidence-based therapy approaches designed to support your mental health,
    strengthen resilience, and foster lasting personal growth.
  </motion.p>
</div>

{/* Slider */}
<div className="relative">
  <ServicesSlider />
</div>

</section>

      {/* Therapist Details */}
      <section className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #faf8f5 0%, #f5f0e8 100%)' }}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#EAD1A3] rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EDE4D4] rounded-full blur-3xl opacity-40" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm tracking-[0.25em] uppercase text-[#C68532] font-medium">
              Our Team
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1f2933] mt-4">
              Therapist Details
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm sm:text-base">
              Meet our qualified therapists dedicated to your wellbeing.
            </p>
          </motion.div>
          <TherapistDetails />
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f6f7f5] overflow-hidden">

{/* Soft Background Accents */}
<div className="absolute top-0 left-0 w-80 h-80 bg-[#F0E6D0] rounded-full blur-3xl opacity-40" />
<div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EDE4D4] rounded-full blur-3xl opacity-40" />

<div className="relative max-w-7xl mx-auto">

  {/* Section Header */}
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <span className="text-sm tracking-[0.25em] uppercase text-[#C68532] font-medium">
      Client Testimonials
    </span>

    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1f2933] mt-4">
      Trusted by Individuals &
      <span className="block text-[#C68532]">
        Families Seeking Healing
      </span>
    </h2>
  </motion.div>

  {/* Testimonial Slider - 3 columns, auto + manual */}
  {(() => {
    const maxSlide = Math.max(0, testimonials.length - 3)
    const start = Math.min(testimonialSlideIndex, maxSlide)
    const visible = [0, 1, 2].map((d) => testimonials[start + d]).filter(Boolean)
    return (
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="wait">
            {visible.map((t, idx) => (
              <motion.div
                key={`${testimonialSlideIndex}-${t.id}`}
                className="relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-[#EDE4D4] min-h-[200px] sm:min-h-[260px] flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div className="absolute -top-4 left-6 text-6xl text-[#F0E6D0] font-serif">"</div>
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10 flex-1">
                  {t.text}
                </p>
                <div className="w-10 h-[2px] bg-[#EAD1A3] mb-3" />
                <p className="font-medium text-[#1f2933]">{t.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => setTestimonialSlideIndex((i) => (i <= 0 ? maxSlide : i - 1))}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EDE4D4] shadow-sm flex items-center justify-center text-[#C68532] hover:bg-[#F0E6D0] transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: maxSlide + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTestimonialSlideIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === testimonialSlideIndex
                    ? 'w-8 h-2.5 bg-[#C68532]'
                    : 'w-2.5 h-2.5 bg-[#C68532]/40 hover:bg-[#C68532]/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setTestimonialSlideIndex((i) => (i >= maxSlide ? 0 : i + 1))}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C68532] text-white shadow-sm flex items-center justify-center hover:bg-[#B8762F] transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    )
  })()}

</div>
</section>

      {/* FAQ */}
      <section className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f7f8f6] overflow-hidden">

{/* Soft Background Accents */}
<div className="absolute top-0 left-0 w-80 h-80 bg-[#F0E6D0] rounded-full blur-3xl opacity-40" />
<div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EDE4D4] rounded-full blur-3xl opacity-40" />

<div className="relative max-w-4xl mx-auto">

  {/* Section Header */}
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <span className="text-sm tracking-[0.25em] uppercase text-[#C68532] font-medium">
      Support & Information
    </span>

    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1f2933] mt-4">
      Frequently Asked
      <span className="block text-[#C68532]">
        Questions
      </span>
    </h2>

    <p className="text-sm sm:text-base text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
      Clear answers to help you feel confident and informed before beginning your therapy journey.
    </p>
  </motion.div>

  {/* Accordion */}
  <FAQAccordion items={faqItems} />

  {/* Optional CTA */}
  <div className="text-center mt-16">
    <p className="text-gray-600 mb-4">
      Still have questions or need guidance?
    </p>
    <a
      href="/contact"
      className="inline-block px-8 py-3 rounded-full bg-[#C68532] text-white font-medium shadow-md hover:bg-[#B8762F] transition duration-300"
    >
      Contact  
    </a>
  </div>

</div>
</section>
    </div>
  )
}
