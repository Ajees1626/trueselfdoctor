import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const WHATSAPP_HREF = 'https://wa.me/919962042989'
const INSTAGRAM_HREF = 'https://www.instagram.com/trueself.counsellingservices/?hl=en'
const FACEBOOK_HREF = 'https://www.facebook.com/profile.php?id=61559857479588'

const DELAY_MS = 15000
const popupTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
const popupIn = { opacity: 0, scale: 0.72, y: 10 }
const popupShow = { opacity: 1, scale: 1, y: 0 }

const iconSize = 'w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]'

function FacebookIcon({ className = iconSize }) {
  return (
    <svg className={`${className} rounded-full`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.42 12.78h2.16l.34-2.64h-2.5V8.64c0-.76.21-1.28 1.3-1.28h1.4V5.2A18.3 18.3 0 0 0 13.7 5c-2.06 0-3.47 1.26-3.47 3.56v1.58H8.2v2.64h2.03V19h3.19v-6.22z"
      />
    </svg>
  )
}

function InstagramIcon({ className = iconSize, gradientId = 'ig-grad' }) {
  return (
    <svg className={`${className} rounded-[22%]`} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9ce34" />
          <stop offset="35%" stopColor="#ee2a7b" />
          <stop offset="100%" stopColor="#8134af" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="#E1306C" />
      <rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} />
      <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.35" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.35" cy="7.65" r="1.1" fill="#fff" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className={`${iconSize} rounded-full`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#fff"
        d="M12.02 6.2a5.78 5.78 0 0 0-5.8 5.76c0 1.02.27 2.01.78 2.88L6.2 17.8l3.04-.8a5.74 5.74 0 0 0 2.78.71h.01a5.78 5.78 0 0 0 5.79-5.75 5.76 5.76 0 0 0-5.8-5.76z"
      />
      <path
        fill="#25D366"
        d="M15.48 13.98c-.15-.08-.93-.46-1.07-.51-.15-.06-.25-.08-.36.08-.11.16-.42.51-.51.62-.1.11-.19.12-.35.04-.16-.08-.68-.25-1.3-.8-.48-.43-.8-.96-.9-1.12-.09-.17-.01-.25.07-.33.07-.08.16-.19.24-.29.08-.1.1-.16.16-.27.05-.11.03-.2-.02-.28-.04-.08-.36-.87-.49-1.19-.13-.32-.27-.27-.36-.28h-.31c-.11 0-.28.04-.43.2-.14.16-.56.55-.56 1.33 0 .79.57 1.54.65 1.65.08.11 1.13 1.72 2.74 2.41.38.16.68.26.91.34.39.12.74.1 1.02.06.31-.04.93-.39 1.06-.76.13-.37.13-.69.09-.76-.04-.06-.15-.1-.31-.18z"
      />
    </svg>
  )
}

function WhatsAppFabGlyph() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#fff"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.79 14.09c-.24.68-1.49 1.3-2.07 1.38-.53.07-1.2.1-1.94-.12-.45-.14-.97-.32-1.66-.62-2.76-1.19-4.55-3.98-4.69-4.16-.14-.19-1.12-1.49-1.12-2.84 0-1.35.71-2.01.96-2.29.22-.24.58-.37.77-.37h.52c.17 0 .4.01.61.47.22.49.74 1.81.8 1.94.07.13.11.28.02.45-.08.17-.13.28-.25.43l-.41.49c-.13.16-.27.33-.12.64.15.32.69 1.13 1.48 1.83 1.02.9 1.87 1.18 2.14 1.31.27.13.43.11.59-.07.15-.17.66-.77.84-1.03.17-.26.35-.22.59-.13.24.08 1.52.72 1.78.85.26.13.43.2.5.31.06.11.06.64-.18 1.32z"
      />
    </svg>
  )
}

function Chevron({ direction, light = false }) {
  return (
    <svg
      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${light ? 'text-[#d4c9bc] opacity-70' : 'text-[#9a9086]'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.2}
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  )
}

const barClass =
  'bg-[#FFFFFF] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col items-center'
const iconBtn =
  'flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg hover:bg-[#f5f5f5] transition-colors touch-manipulation'
const chevronBtn =
  'hidden md:flex items-center justify-center w-9 h-8 sm:w-10 sm:h-9 hover:bg-[#f5f5f5] transition-colors touch-manipulation cursor-pointer'
const peekBtn =
  'hidden md:flex fixed z-[45] md:top-1/2 md:-translate-y-1/2 bg-[#FFFFFF]/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)] w-8 h-11 items-center justify-center touch-manipulation cursor-pointer'

const desktopPos = 'hidden md:block fixed z-40 md:top-1/2 md:-translate-y-1/2'

export default function SocialFloatIcons() {
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const leftManualRef = useRef(false)
  const rightManualRef = useRef(false)

  useEffect(() => {
    let intervalId
    const startTimer = setTimeout(() => {
      if (!rightManualRef.current) setShowRight(true)
      if (!leftManualRef.current) setShowLeft(true)
      intervalId = setInterval(() => {
        const isDesktop = window.matchMedia('(min-width: 768px)').matches
        if (!leftManualRef.current && isDesktop) {
          setShowLeft((prev) => !prev)
        }
      }, DELAY_MS)
    }, DELAY_MS)

    return () => {
      clearTimeout(startTimer)
      clearInterval(intervalId)
    }
  }, [])

  const openLeft = (e) => {
    e.stopPropagation()
    leftManualRef.current = true
    setShowLeft(true)
  }

  const closeLeft = (e) => {
    e.stopPropagation()
    leftManualRef.current = true
    setShowLeft(false)
  }

  const openRight = (e) => {
    e.stopPropagation()
    rightManualRef.current = true
    setShowRight(true)
  }

  const closeRight = (e) => {
    e.stopPropagation()
    rightManualRef.current = true
    setShowRight(false)
  }

  return (
    <>
      {!showLeft && (
        <button
          type="button"
          onClick={openLeft}
          className={`${peekBtn} left-0 rounded-r-xl`}
          aria-label="Open social links"
        >
          <Chevron direction="right" />
        </button>
      )}

      {/* Mobile: Facebook + Instagram, no arrows */}
      <AnimatePresence>
        {showLeft && (
          <motion.div
            key="left-mobile"
            className="md:hidden fixed left-2 bottom-5 z-50 flex flex-col gap-1.5"
            initial={popupIn}
            animate={popupShow}
            exit={popupIn}
            transition={popupTransition}
          >
            <a
              href={FACEBOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full shadow-md overflow-hidden touch-manipulation"
            >
              <FacebookIcon className="w-8 h-8" />
            </a>
            <a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-[22%] shadow-md overflow-hidden touch-manipulation"
            >
              <InstagramIcon className="w-8 h-8" gradientId="ig-grad-mobile" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop left bar with arrows */}
      <AnimatePresence>
        {showLeft && (
          <motion.div
            key="left-social"
            className={`${desktopPos} left-0`}
            initial={popupIn}
            animate={popupShow}
            exit={popupIn}
            transition={popupTransition}
          >
            <div className={`${barClass} rounded-r-xl`}>
              <div className="flex flex-col items-center px-1 pt-2 pb-1 gap-0.5">
                <a
                  href={FACEBOOK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={iconBtn}
                >
                  <FacebookIcon />
                </a>
                <a
                  href={INSTAGRAM_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={iconBtn}
                >
                  <InstagramIcon gradientId="ig-grad-desktop" />
                </a>
              </div>
              <div className="hidden md:block w-6 border-t border-[#eee6dc]" />
              <button
                type="button"
                onClick={closeLeft}
                className={chevronBtn}
                aria-label="Close social links"
              >
                <Chevron direction="left" light />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showRight && (
        <button
          type="button"
          onClick={openRight}
          className={`${peekBtn} right-0 rounded-l-xl`}
          aria-label="Open WhatsApp"
        >
          <Chevron direction="left" />
        </button>
      )}

      {/* Mobile: WhatsApp round button + red badge */}
      <AnimatePresence>
        {showRight && (
          <motion.a
            key="right-mobile"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="md:hidden fixed right-3 bottom-5 z-50 w-12 h-12 rounded-full bg-[#25D366] shadow-[0_6px_18px_rgba(37,211,102,0.45)] touch-manipulation"
            initial={popupIn}
            animate={popupShow}
            exit={popupIn}
            transition={popupTransition}
          >
            <span className="relative flex items-center justify-center w-full h-full">
              <WhatsAppFabGlyph />
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#e53935] text-white text-[10px] font-bold leading-none flex items-center justify-center shadow-sm">
                1
              </span>
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Desktop right bar with arrows */}
      <AnimatePresence>
        {showRight && (
          <motion.div
            key="right-social"
            className={`${desktopPos} right-0`}
            initial={popupIn}
            animate={popupShow}
            exit={popupIn}
            transition={popupTransition}
          >
            <div className={`${barClass} rounded-l-xl`}>
              <div className="flex flex-col items-center px-1 pt-2 pb-1">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={iconBtn}
                >
                  <WhatsAppIcon />
                </a>
              </div>
              <div className="hidden md:block w-6 border-t border-[#eee6dc]" />
              <button
                type="button"
                onClick={closeRight}
                className={chevronBtn}
                aria-label="Close WhatsApp"
              >
                <Chevron direction="right" light />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
