import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Languages, Check } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'
import { useLocale, SUPPORTED_LOCALES } from '../i18n/LocaleProvider'

const navItems = [
  { key: 'services', href: '#services' },
  { key: 'films', href: '#films' },
  { key: 'gallery', href: '#gallery' },
  { key: 'process', href: '#process' },
  { key: 'contact', href: '#contact' },
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

function LangSwitcher({ compact }) {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Language"
        style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '6px',
          background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--c-text-2)',
          cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em',
        }}
      >
        <Languages size={15} />
        {locale.toUpperCase()}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', [compact ? 'left' : 'right']: 0, minWidth: '150px',
              background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '8px',
              padding: '6px', zIndex: 50, boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
          >
            {SUPPORTED_LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLocale(l.code); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', width: '100%',
                  padding: '9px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                  background: locale === l.code ? 'rgba(29,185,84,0.1)' : 'transparent',
                  color: locale === l.code ? '#39e07a' : 'var(--c-text-2)',
                  fontFamily: 'var(--font-body)', fontSize: '13px', textAlign: 'left',
                }}
              >
                <span><strong>{l.label}</strong> · {l.name}</span>
                {locale === l.code && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLocale()
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
      title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px',
        borderRadius: '6px', background: 'transparent', border: '1px solid var(--color-border)',
        color: 'var(--c-text-2)', cursor: 'pointer',
      }}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export default function Navbar() {
  const { t } = useLocale()
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
          background: scrolled ? 'var(--c-glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <ShieldLogo size={40} gradId="navGuardGrad" />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.1em', color: 'var(--c-text)', lineHeight: 1 }}>Guard Film</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.3em', color: '#1DB954', textTransform: 'uppercase' }}>{t('brand.tagline')}</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          {navItems.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-text-2)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-2)')}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
          <LangSwitcher />
          <ThemeToggle />
          <button className="btn-primary" onClick={() => scrollTo('#contact')} style={{ fontSize: '12px', padding: '10px 24px' }}>
            {t('nav.getQuote')}
          </button>
        </div>

        {/* Mobile controls — language is the more-used control, so it lives here */}
        <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="hamburger-btn">
          <LangSwitcher />
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }} aria-label="Toggle menu">
            <div style={{ width: '24px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: 'block', height: '2px', background: 'var(--c-text)', borderRadius: '1px' }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', height: '2px', background: 'var(--c-text)', borderRadius: '1px' }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: 'block', height: '2px', background: 'var(--c-text)', borderRadius: '1px' }} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--color-bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px' }}
          >
            {navItems.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                style={{ fontFamily: 'var(--font-display)', fontSize: '44px', letterSpacing: '0.05em', color: 'var(--c-text)', textDecoration: 'none' }}
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
              <ThemeToggle />
            </motion.div>
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }} className="btn-primary" onClick={() => scrollTo('#contact')}>
              {t('nav.getQuote')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
