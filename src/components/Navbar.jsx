import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Button from './Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <motion.header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-ivory)]/95 shadow-md backdrop-blur border-b border-[var(--color-stone)]'
          : 'bg-transparent'
      }`}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav
        className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2"
        aria-label="Primary Navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90"
          aria-label="Go to homepage - Mindful Therapy"
        >
          <img
            src="/image/logo1.png"
            alt=""
            className={`h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-300 ${scrolled ? 'hidden' : 'block'}`}
          />
          <img
            src="/image/logo1.png"
            alt=""
            className={`h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-300 ${scrolled ? 'block' : 'hidden'}`}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--color-sage-dark)]'
                      : 'text-[#5a5a5a] hover:text-[var(--color-sage-dark)]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
          <li>
            <Button to="/contact" variant="primary">
              Book a Session
            </Button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button to="/contact" variant="primary" className="!py-2 !px-4 text-sm">
            Book
          </Button>

          <button
            type="button"
            className="p-2 rounded-xl text-[#5a5a5a] hover:bg-[var(--color-sand)]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden border-t border-[var(--color-stone)] bg-[var(--color-ivory)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="px-3 sm:px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block py-3.5 sm:py-3 px-4 rounded-xl font-medium text-base ${
                        isActive
                          ? 'text-[var(--color-sage-dark)] bg-[var(--color-mint)]'
                          : 'text-[#5a5a5a] hover:bg-[var(--color-sand)]'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}