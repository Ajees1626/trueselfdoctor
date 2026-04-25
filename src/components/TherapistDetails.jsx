import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { therapists } from '../data/therapists'

// cspell:ignore specialisation
const AUTOPLAY_MS = 7000

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TherapistDetails() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % therapists.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [])

  const goNext = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % therapists.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + therapists.length) % therapists.length)
  }

  const therapist = therapists[index]

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={therapist.id}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_40px_80px_-20px_rgba(198,133,50,0.25)] border border-[#E8DCC6]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Image Section */}
              <div className="relative h-[360px] sm:h-[440px] md:h-full md:min-h-[430px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C68532] to-[#E6B566] flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-bold text-white/90 tracking-tight">
                    {getInitials(therapist.name)}
                  </span>
                </div>

                {therapist.image && (
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="absolute inset-0 w-full h-full object-cover object-top md:object-[center_20%] transition duration-700 hover:scale-105"
                    loading="lazy"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}

                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 bg-gradient-to-br from-white to-[#faf7f1]">
                <div className="border-l-4 border-[#C68532] pl-4 sm:pl-6">

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight mb-2">
                    {therapist.name}
                  </h3>

                  <p className="text-xs sm:text-sm uppercase tracking-widest text-[#C68532] font-medium mb-5 sm:mb-6">
                    {therapist.qualification}
                  </p>

                  <div className="space-y-4 sm:space-y-5 text-gray-600">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                        Experience
                      </p>
                      <p className="text-base sm:text-lg font-medium text-gray-800">
                        {therapist.experience}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Specialization</p>
                      <p className="text-sm sm:text-base leading-relaxed">
                        {therapist.specialisation}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </motion.article>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-8 sm:mt-10">

          {/* Dots */}
          <div className="flex gap-3 justify-center sm:justify-start w-full sm:w-auto order-2 sm:order-1">
            {therapists.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === index
                    ? 'w-8 h-2 bg-[#C68532]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-[#D9A75C]'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3 sm:gap-4 justify-center sm:justify-end w-full sm:w-auto order-1 sm:order-2">
            <button
              onClick={goPrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#E8DCC6] bg-white shadow-md hover:bg-[#f5efe5] transition flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-[#C68532]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C68532] text-white shadow-md hover:bg-[#B8762F] transition flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}