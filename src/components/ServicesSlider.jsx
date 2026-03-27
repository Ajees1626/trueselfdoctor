import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { services } from '../data/services'
import Button from './Button'

const AUTOPLAY_MS = 5000

export default function ServicesSlider() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % services.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [])

  const goNext = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % services.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + services.length) % services.length)
  }

  const item = services[index]

  return (
    <div className="relative max-w-5xl mx-auto">
  
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 80 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl sm:rounded-[2rem] bg-[#ffffff] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] border border-[#edf1ef]"
        >
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 p-5 sm:p-6 md:p-8 lg:p-12 items-center">
  
            {/* LEFT CONTENT */}
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#EAD1A3] text-[#C68532] text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-sm">
                {item.icon}
              </div>
  
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1f2933] mb-3 sm:mb-4">
                {item.title}
              </h3>
  
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {item.shortSummary}
              </p>
  
              <Link
                to={`/services/${item.slug}`}
                className="inline-flex items-center gap-2 text-[#C68532] font-medium hover:gap-3 transition-all"
              >
                Learn More
                <span>→</span>
              </Link>
            </div>
  
            {/* RIGHT VISUAL AREA */}
            <div className="hidden md:flex justify-center">
              <div className="w-72 h-72 rounded-[2rem] overflow-hidden border border-[#EDE4D4] bg-[#f8f6f2] shadow-[0_20px_45px_-20px_rgba(198,133,50,0.25)]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-7xl text-[#C68532]/40">
                      {item.icon}
                    </div>
                  </div>
                )}
              </div>
            </div>
  
          </div>
        </motion.div>
      </AnimatePresence>
  
      {/* Bottom Controls */}
      <div className="flex items-center justify-between mt-6 sm:mt-8 md:mt-10 gap-4">
  
        {/* Dots */}
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {services.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`transition-all duration-300 rounded-full min-w-[8px] min-h-[8px] ${
                i === index
                  ? 'w-6 sm:w-8 h-2 bg-[#C68532]'
                  : 'w-2 h-2 bg-[#cfd8d4] hover:bg-[#8fb3a8]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
  
        {/* Arrows */}
        <div className="flex gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={goPrev}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-[#e5ece9] hover:bg-[#f2f7f5] transition flex items-center justify-center touch-manipulation"
          >
            <svg className="w-5 h-5 text-[#C68532]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
  
          <button
            type="button"
            onClick={goNext}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C68532] text-white shadow-md hover:bg-[#B8762F] transition flex items-center justify-center touch-manipulation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
