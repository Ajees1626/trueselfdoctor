import { motion, AnimatePresence } from 'motion/react'

const DEFAULT_POSTER = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop'
const DEFAULT_SUMMARY = 'Compassionate psychotherapy for a healthier mind. Book a session or quick chat with us—we\'re here to support your emotional wellbeing.'

export default function WelcomePopup({ visible, onClose, poster = DEFAULT_POSTER, summary = DEFAULT_SUMMARY }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            role="presentation"
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="welcome-popup-title"
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-[#5a5a5a] hover:bg-white"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="aspect-[5/6] sm:aspect-[4/5] overflow-hidden">
                  <img
                    src={poster}
                    alt="Welcome"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h2 id="welcome-popup-title" className="text-lg font-semibold text-[#3d3d3d] mb-2">
                    Welcome to Mindful Therapy
                  </h2>
                  <p className="text-sm text-[#5a5a5a] leading-relaxed">
                    {summary}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
