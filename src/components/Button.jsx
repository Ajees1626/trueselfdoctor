import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-gold-dark)]'

const variants = {
  primary:
    'bg-[var(--color-sage-dark)] text-white hover:bg-[#B8762F] shadow-sm hover:shadow-md px-6 py-3',
  secondary:
    'bg-[var(--color-gold-light)] text-[#5C4A32] hover:bg-[var(--color-gold)] hover:text-white border border-[var(--color-gold)] px-6 py-3',
  outline:
    'border-2 border-[var(--color-sage-dark)] text-[var(--color-sage-dark)] hover:bg-[var(--color-gold-light)] hover:border-[var(--color-gold)] px-6 py-3',
  ghost: 'text-[var(--color-sage-dark)] hover:bg-[var(--color-gold-light)] px-6 py-3',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const combinedClass = `${baseClasses} ${variants[variant] || variants.primary} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <motion.button
      type={type}
      className={combinedClass}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
