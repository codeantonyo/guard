import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { ThemeProvider } from './theme/ThemeProvider'
import { LocaleProvider } from './i18n/LocaleProvider'
import Seo from './components/Seo'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import FilmPicker from './components/FilmPicker'
import Process from './components/Process'
import WhyUs from './components/WhyUs'
import FilmStructure from './components/FilmStructure'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'

export default function App() {
  useEffect(() => {
    // ---- Smooth scroll (Lenis) ----
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, smoothTouch: false })
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // ---- Scroll progress indicator ----
    const bar = document.getElementById('scroll-progress')
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      const scrolled = max > 0 ? (window.scrollY / max) * 100 : 0
      if (bar) bar.style.width = `${scrolled}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ---- Custom cursor (fine pointers only) ----
    let cleanupCursor = () => {}
    if (window.matchMedia('(pointer: fine)').matches) {
      const dot = document.getElementById('cursor-dot')
      const ring = document.getElementById('cursor-ring')
      const interactive = 'a, button, input, textarea, select, [role="button"]'
      const move = (e) => {
        if (dot) { dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px` }
        if (ring) { ring.style.left = `${e.clientX}px`; ring.style.top = `${e.clientY}px` }
      }
      const over = (e) => {
        if (ring && e.target.closest?.(interactive)) {
          ring.style.transform = 'translate(-50%, -50%) scale(2)'
          ring.style.borderColor = '#1DB954'
        }
      }
      const out = (e) => {
        if (ring && e.target.closest?.(interactive)) {
          ring.style.transform = 'translate(-50%, -50%) scale(1)'
          ring.style.borderColor = 'rgba(29,185,84,0.5)'
        }
      }
      window.addEventListener('mousemove', move)
      document.addEventListener('mouseover', over)
      document.addEventListener('mouseout', out)
      cleanupCursor = () => {
        window.removeEventListener('mousemove', move)
        document.removeEventListener('mouseover', over)
        document.removeEventListener('mouseout', out)
      }
    }

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      cleanupCursor()
    }
  }, [])

  return (
    <ThemeProvider>
      <LocaleProvider>
        <Seo />
        {/* Scroll progress bar */}
        <div id="scroll-progress" style={{ position: 'fixed', top: 0, left: 0, height: '2px', width: '0%', background: 'linear-gradient(90deg, #1DB954, #39e07a)', zIndex: 9999, transition: 'width 0.1s linear' }} />

        {/* Custom cursor */}
        <div id="cursor-dot" style={{ position: 'fixed', top: 0, left: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#1DB954', pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%, -50%)', transition: 'transform 0.1s ease' }} />
        <div id="cursor-ring" style={{ position: 'fixed', top: 0, left: 0, width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(29, 185, 84, 0.5)', pointerEvents: 'none', zIndex: 9997, transform: 'translate(-50%, -50%)', transition: 'transform 0.15s ease, border-color 0.15s ease' }} />

        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <FilmPicker />
          <Process />
          <WhyUs />
          <FilmStructure />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <FloatingContact />
      </LocaleProvider>
    </ThemeProvider>
  )
}
