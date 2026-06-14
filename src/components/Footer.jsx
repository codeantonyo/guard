import { useLocale } from '../i18n/LocaleProvider'

const navKeys = ['services', 'films', 'process', 'contact']

function ShieldLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M20 2.5 L33.5 7.2 V19.3 C33.5 27.8 27.7 33.9 20 37.5 C12.3 33.9 6.5 27.8 6.5 19.3 V7.2 Z" fill="url(#footerGuardGrad)" />
      <text x="20" y="26.5" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="19" fontWeight="700" fill="#fff" textAnchor="middle">G</text>
      <defs>
        <linearGradient id="footerGuardGrad" x1="6.5" y1="2.5" x2="33.5" y2="37.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1DB954" />
          <stop offset="1" stopColor="#0d6b30" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Footer() {
  const { t } = useLocale()
  const scrollTo = (id) => document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })

  const linkStyle = { fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-3)', textDecoration: 'none', transition: 'color 0.2s ease' }
  const headingStyle = { fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }

  return (
    <footer style={{ background: 'var(--color-bg-primary)', borderTop: '1px solid rgba(29,185,84,0.15)', padding: '64px 48px 28px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '64px', marginBottom: '56px' }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <ShieldLogo />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '0.1em', color: 'var(--c-text)', lineHeight: 1 }}>Guard Film</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.3em', color: '#1DB954', textTransform: 'uppercase' }}>{t('brand.tagline')}</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-3)', lineHeight: 1.8, maxWidth: '320px' }}>{t('footer.blurb')}</p>
          </div>

          <div>
            <div style={headingStyle}>{t('footer.navTitle')}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navKeys.map((key) => (
                <li key={key}>
                  <a href={`#${key}`} onClick={(e) => { e.preventDefault(); scrollTo(key) }} style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-3)')}>
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={headingStyle}>{t('footer.contactTitle')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '+373 697 27 151', href: 'tel:+37369727151' },
                { label: 'info@guardfilm.md', href: 'mailto:info@guardfilm.md' },
                { label: 'Chișinău, Moldova', href: '#' },
              ].map((item) => (
                <a key={item.label} href={item.href} style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-3)')}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-faint)' }}>
            © {new Date().getFullYear()} Guard Film. {t('footer.rights')}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-faint)' }}>{t('footer.premium')}</div>
        </div>

        {/* Watermark */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <a
            href="https://webmake.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px',
              border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-3)', letterSpacing: '0.04em',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-green-border)'; e.currentTarget.style.color = 'var(--c-text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--c-text-3)' }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1DB954', boxShadow: '0 0 8px #1DB954' }} />
            {t('footer.developedBy')}{' '}
            <strong style={{ fontWeight: 700, letterSpacing: '0.08em', background: 'linear-gradient(90deg,#1DB954,#39e07a)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>WEBMAKE.DEV</strong>
          </a>
        </div>
      </div>
    </footer>
  )
}
