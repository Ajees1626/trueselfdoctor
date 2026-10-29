// cspell:ignore Trueself trueself
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Helmet } from 'react-helmet'
import { services } from '../data/services'
import SEO from '../components/SEO'

const servicesJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://trueselfcounselling.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://trueselfcounselling.com/services' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Therapy Services - TRUESELF COUNSELLING',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://trueselfcounselling.com/services/${s.slug}`,
      name: s.title,
    })),
  },
]

export default function Services() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* cspell:ignore logotop */}
      <Helmet>
        <title>Therapy Services | Individual, Couples, Family & Online Counselling - TRUESELF COUNSELLING</title>
        <link rel="icon" href="/logotop.webp" />
        <link rel="shortcut icon" href="/logotop.webp" />
        <link rel="apple-touch-icon" href="/logotop.webp" />
      </Helmet>
      <SEO
        title="Therapy Services | Individual, Couples, Family & Online Counselling - TRUESELF COUNSELLING"
        description="Explore our online therapy services: individual therapy, couples counselling, family therapy, therapy for women and adolescent counselling. Confidential, evidence-based and led by qualified women therapists."
        keywords="therapy services, individual therapy, couples therapy, family therapy, therapy for women, adolescent therapy, online counselling India, mental health services"
        path="/services"
        jsonLd={servicesJsonLd}
      />

      {/* Premium Hero */}
      <section
        className="relative py-20 sm:py-24 md:py-32 lg:py-36 px-4 sm:px-6 flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&h=900&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#EAD1A3]/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-[#3d3528] mb-4 sm:mb-6">
            Personalized Therapy Services
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#5a5248] leading-relaxed px-2 sm:px-0">
            Confidential, evidence-based psychotherapy designed to help you
            regain clarity, balance, and emotional resilience.
          </p>
        </motion.div>
      </section>

      {/* Premium Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* SEO content block - intro */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#3d3528] mb-3">
              Compassionate, Evidence-Based Online Therapy
            </h2>
            <p className="text-sm sm:text-base text-[#5a5248] leading-relaxed">
              At TRUESELF COUNSELLING, every service is led by qualified women psychotherapists with
              years of clinical experience. Whether you need help with anxiety, low mood,
              relationships, parenting, trauma or life transitions, our online sessions adapt to
              your schedule and your preferred language including English, Tamil, Malayalam,
              Kannada, Hindi and Gujarati.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, i) => {
              const ServiceIcon = service.icon

              return (
                <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block rounded-3xl overflow-hidden relative bg-white/60 backdrop-blur-lg border border-white/40 shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-[#EAD1A3] via-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden">

                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 md:p-8">
                      <span className="mb-3 sm:mb-4 block opacity-80 text-[#C68532]">
                        <ServiceIcon className="text-2xl sm:text-3xl" aria-hidden="true" />
                      </span>

                      <h3 className="text-xl sm:text-2xl font-semibold text-[#3d3528] mb-2 sm:mb-3 tracking-tight">
                        {service.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#5a5a5a] leading-relaxed mb-4">
                        {service.shortSummary}
                      </p>

                      <span className="inline-flex items-center text-sm font-medium text-[#C68532] group-hover:translate-x-1 transition-transform duration-300">
                        Explore Service →
                      </span>
                    </div>

                  </div>
                </Link>
              </motion.article>
              )
            })}
          </div>

        </div>
      </section>

    </main>
  )
}