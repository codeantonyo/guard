const quickLinks = ['Services', 'Films', 'Gallery', 'Process', 'Contact']

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
  const scrollTo = (id) => document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: 'var(--color-bg-primary)', borderTop: '1px solid rgba(29,185,84,0.15)', padding: '64px 48px 32px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '64px', marginBottom: '64px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <ShieldLogo />
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '22px', letterSpacing: '0.1em', color: '#fff', lineHeight: 1 }}>Guard Film</div>
                <div style={{ fontFamily: 'Inter', fontSize: '9px', letterSpacing: '0.3em', color: '#1DB954', textTransform: 'uppercase' }}>Make a Difference</div>
              </div>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, maxWidth: '320px' }}>
              Moldova's premier Paint Protection Film and car wrap studio. We protect what you drive — with precision, passion, and premium materials.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontFamily: 'Syne', fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Navigation</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(link) }}
                    style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact summary */}
          <div>
            <div style={{ fontFamily: 'Syne', fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '+373 XXX XXX XXX', href: 'tel:+373XXXXXXXXX' },
                { label: 'info@guardfilm.md', href: 'mailto:info@guardfilm.md' },
                { label: 'Chișinău, Moldova', href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Guard Film. All rights reserved. Chișinău, Moldova.
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.15)' }}>Premium PPF &amp; Vinyl Wrap</div>
        </div>
      </div>
    </footer>
  )
}
