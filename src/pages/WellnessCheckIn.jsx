// cspell:ignore Trueself trueself personalised
import { Helmet } from 'react-helmet'
import { motion } from 'motion/react'
import ContactWellnessPoll from '../components/ContactWellnessPoll'
import SEO from '../components/SEO'

const wellnessJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Assessment | TRUESELF COUNSELLING',
    url: 'https://trueselfcounsellingservices.com/wellness-check-in',
    description:
      'Free emotional self-reflection assessment to understand your patterns. Not a diagnosis—guided questions to help you consider next steps.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://trueselfcounsellingservices.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Free Assessment',
        item: 'https://trueselfcounsellingservices.com/wellness-check-in',
      },
    ],
  },
]

/** Calm, reflective hero — soft nature light (Unsplash). */
const HERO_BG_IMAGE =
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1920&h=1080&fit=crop&q=80'

export default function WellnessCheckIn() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Assessment | Guided Emotional Self-Reflection - TRUESELF COUNSELLING</title>
        <link rel="icon" href="/logotop.webp" />
        <link rel="shortcut icon" href="/logotop.webp" />
        <link rel="apple-touch-icon" href="/logotop.webp" />
      </Helmet>
      <SEO
        title="Free Assessment | Guided Emotional Self-Reflection - TRUESELF COUNSELLING"
        description="Take our free assessment: rate how often you have felt overwhelmed, stressed, or disconnected. Not a diagnosis—a guided reflection to help you consider next steps."
        keywords="free assessment, wellness check-in, emotional self-assessment, mental health reflection, therapy readiness, stress check, TRUESELF COUNSELLING"
        path="/wellness-check-in"
        jsonLd={wellnessJsonLd}
      />

      <section
        className="relative pt-24 sm:pt-28 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('${HERO_BG_IMAGE}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Blend site palette over photo so text stays readable */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--color-ivory)]/92 via-[var(--color-sky)]/78 to-[var(--color-mint)]/88 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d3d3d] mb-3 sm:mb-4 px-2 text-pretty drop-shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Free Assessment
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-[#5a5a5a] max-w-2xl mx-auto px-2 text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            A gentle self-reflection tool designed to help you understand where you are emotionally.
          </motion.p>
        </div>
      </section>

      <section className="pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 bg-[var(--color-sand)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm sm:text-base text-[#5a5a5a] text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2 text-pretty leading-relaxed">
            Answer honestly — there are no right or wrong responses. When you finish, you will receive a personalised
            reflection based on your answers, along with gentle guidance on what may feel helpful next.
          </p>
          <ContactWellnessPoll hideIntro />
        </div>
      </section>
    </div>
  )
}
