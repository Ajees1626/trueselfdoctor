import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

const social = [
  { label: 'Facebook', href: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Instagram', href: '#', icon: 'M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-2.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z' },
  { label: 'WhatsApp', href: '#', icon: 'M20.52 3.48A11.86 11.86 0 0012.08 0C5.57 0 .25 5.32.25 11.83c0 2.09.55 4.13 1.59 5.93L0 24l6.4-1.67a11.77 11.77 0 005.68 1.45h.01c6.51 0 11.83-5.32 11.83-11.83 0-3.16-1.23-6.13-3.4-8.47zM12.08 21.74c-1.79 0-3.54-.48-5.06-1.39l-.36-.21-3.8.99 1.01-3.7-.24-.38a9.7 9.7 0 01-1.48-5.2c0-5.4 4.39-9.79 9.79-9.79 2.61 0 5.06 1.02 6.9 2.87a9.69 9.69 0 012.87 6.9c0 5.4-4.39 9.79-9.79 9.79zm5.37-7.34c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.44a8.82 8.82 0 01-1.63-2.02c-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.17-.24-.58-.49-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.02c.15.2 2.06 3.14 4.99 4.4.7.3 1.25.48 1.68.62.71.22 1.36.19 1.87.12.57-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34z' },
]

export default function SideFloatingBar({ visible }) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleClose = () => setIsExpanded(false)
  const handleOpen = () => setIsExpanded(true)

  if (!visible) return null

  return (
    <>
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-6 z-50 flex items-center justify-between gap-3 sm:gap-6 max-w-lg sm:max-w-none sm:w-auto sm:flex-row-reverse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left: Social icons */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-[var(--color-stone)] px-3 py-2 sm:px-4 sm:py-3">
              {social.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-xl text-[var(--color-sage-dark)] hover:bg-[var(--color-gold-light)] transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Right: Consultation button + Close */}
            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 rounded-2xl bg-[var(--color-sage-dark)] text-white font-medium shadow-lg hover:bg-[#B8762F] transition-colors text-sm sm:text-base"
              >
                Consultation
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur shadow-lg border border-[var(--color-stone)] flex items-center justify-center text-[#5a5a5a] hover:bg-[var(--color-sand)]"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            onClick={handleOpen}
            className="fixed bottom-4 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--color-sage-dark)] text-white shadow-lg flex items-center justify-center hover:bg-[#B8762F] transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
