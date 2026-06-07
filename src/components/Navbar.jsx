import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Films', href: '#films' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

function ShieldLogo({ size = 40, gradId = 'navGuardGrad' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M20 2.5 L33.5 7.2 V19.3 C33.5 27.8 27.7 33.9 20 37.5 C12.3 33.9 6.5 27.8 6.5 19.3 V7.2 Z" fill={`url(#${gradId})`} />
      <path d="M20 2.5 L33.5 7.2 V19.3 C33.5 27.8 27.7 33.9 20 37.5 C12.3 33.9 6.5 27.8 6.5 19.3 V7.2 Z" stroke="#39e07a" strokeWidth="0.6" strokeOpacity="0.5" />
      <text x="20" y="26.5" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="19" fontWeight="700" fill="#fff" textAnchor="middle">G</text>
      <defs>
        <linearGradient id={gradId} x1="6.5" y1="2.5" x2="33.5" y2="37.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1DB954" />
          <stop offset="1" stopColor="#0d6b30" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '12px 48px' : '20px 48px',
          background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          <ShieldLogo size={40} gradId="navGuardGrad" />
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '0.1em', color: '#fff', lineHeight: 1 }}>Guard Film</div>
            <div style={{ fontFamily: 'Inter', fontSize: '9px', letterSpacing: '0.3em', color: '#1DB954', textTransform: 'uppercase' }}>Make a Difference</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              style={{
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                transition: 'color 0.2s ease', position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              {link.label}
            </a>
          ))}
          <button className="btn-primary" onClick={() => scrollTo('#contact')} style={{ fontSize: '12px', padding: '10px 24px' }}>
            Get a Quote
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          className="hamburger-btn"
          aria-label="Toggle menu"
        >
          <div style={{ width: '24px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: 'block', height: '2px', background: '#fff', borderRadius: '1px' }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', height: '2px', background: '#fff', borderRadius: '1px' }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: 'block', height: '2px', background: '#fff', borderRadius: '1px' }} />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                style={{ fontFamily: 'Bebas Neue', fontSize: '48px', letterSpacing: '0.05em', color: '#fff', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="btn-primary"
              onClick={() => scrollTo('#contact')}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
