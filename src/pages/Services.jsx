import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { services } from '../data/services'

export default function Services() {
  return (
    <main className="min-h-screen bg-[var(--color-ivory)]">

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
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#f7f2e8]/85 to-[#EAD1A3]/90 backdrop-blur-sm" />

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, i) => (
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
                  <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-[#EAD1A3] via-white to-[#F0E6D0] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                      <span className="text-2xl sm:text-3xl mb-3 sm:mb-4 block opacity-80">
                        {service.icon}
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
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}