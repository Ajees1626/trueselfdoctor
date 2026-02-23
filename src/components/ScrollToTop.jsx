import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LifeLine } from 'react-loading-indicators'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    window.scrollTo(0, 0)

    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [pathname])

  return loading ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <LifeLine
        color="#cca331"
        size="small"
        text="trueself"
        textColor="#5a5a5a"
      />
    </div>
  ) : null
}
