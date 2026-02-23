import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function FAQAccordion({ items }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className="rounded-xl sm:rounded-2xl border border-[var(--color-stone)] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between text-left px-4 sm:px-6 py-3.5 sm:py-4 font-medium text-sm sm:text-base text-[#3d3d3d] hover:bg-[var(--color-cream)] transition-colors gap-3"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
            >
              <span className="pr-2 sm:pr-4">{item.question}</span>
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[var(--color-mint)] text-[var(--color-sage-dark)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 sm:px-6 pb-4 pt-0 text-sm sm:text-base text-[#5a5a5a] leading-relaxed border-t border-[var(--color-stone)]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
