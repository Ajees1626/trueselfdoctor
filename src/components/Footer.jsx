import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

// cspell:ignore trueself PIXDOT
const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

const social = [
  { label: 'Facebook', href: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Instagram', href: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'WhatsApp', href: '#', icon: 'M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.54 4.1 1.57 5.89L0 24l6.45-1.69a11.78 11.78 0 0 0 5.58 1.42h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.14-3.36-8.41ZM12.04 21.7a9.82 9.82 0 0 1-5-1.37l-.36-.21-3.83 1 1.02-3.73-.24-.38a9.8 9.8 0 0 1-1.52-5.17c0-5.43 4.42-9.85 9.85-9.85 2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.95c0 5.43-4.42 9.86-9.76 9.86Zm5.4-7.38c-.3-.15-1.77-.87-2.05-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.23-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.45 1.08 2.86 1.22 3.06.15.2 2.1 3.2 5.07 4.49.71.3 1.26.48 1.69.61.71.22 1.36.19 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="bg-[#5C4A32] text-[var(--color-cream)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

          {/* Brand Info */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2.5">
              <img
                src="https://res.cloudinary.com/dagsqokgc/image/upload/q_auto/f_auto/v1777101448/logo2_result_c4ejrh.webp"
                alt="trueself logo"
                className="h-8 sm:h-9 w-auto object-contain"
                loading="lazy"
              />
              
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-sand)]/90 leading-relaxed">
              Compassionate psychotherapy for a healthier mind. Online and in-person sessions.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer Navigation">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-[var(--color-sand)]/90 hover:text-[var(--color-mint)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Social */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Connect
            </h3>

            <ul className="flex gap-3 sm:gap-4">
              {social.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-[var(--color-sand)]/90 hover:text-[var(--color-mint)] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={icon} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <address className="not-italic mt-3 sm:mt-4 text-xs sm:text-sm text-[var(--color-sand)]/90 space-y-1 break-all">
              <p>
                <a href="mailto:trueselfcounsellingservices@gmail.com" className="hover:text-[var(--color-mint)]">
                  trueselfcounsellingservices@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+15551234567" className="hover:text-[var(--color-mint)]">
                  +91 8778964644
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center text-xs sm:text-sm text-[var(--color-sand)]/80 space-y-1">
          <p>© {year} TRUESELF COUNSELLING. All rights reserved.</p>
          <p>Developed by <span className="font-medium text-[var(--color-sand)]/90">PIXDOT</span></p>
        </div>
      </div>
    </motion.footer>
  )
}