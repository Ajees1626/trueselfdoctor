import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WelcomePopup from './components/WelcomePopup'
import SideFloatingBar from './components/SideFloatingBar'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Contact from './pages/Contact'

export default function App() {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowWelcomePopup(true), 10000)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    const t2 = setTimeout(() => setShowSideBar(true), 11000)
    return () => clearTimeout(t2)
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[#4A4A4A]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <WelcomePopup
        visible={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />
      <SideFloatingBar visible={showSideBar} />
    </BrowserRouter>
  )
}
