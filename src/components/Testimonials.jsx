import { useState, useEffect } from 'react'
import { useLocale } from '../i18n/LocaleProvider'

const people = [
  { name: 'Alexandru M.', car: 'BMW M3 Competition', rating: 5 },
  { name: 'Vitalie T.', car: 'Mercedes GLE 63', rating: 5 },
  { name: 'Irina S.', car: 'Audi Q7', rating: 5 },
  { name: 'Dmitri P.', car: 'Porsche Cayenne', rating: 5 },
  { name: 'Radu C.', car: 'Tesla Model 3', rating: 5 },
  { name: 'Natalia V.', car: 'Range Rover Sport', rating: 5 },
]

function Card({ name, car, rating, text }) {
  return (
    <div
      className="testi-card"
      style={{
        width: '360px', flexShrink: 0, padding: '28px',
        background: 'var(--color-bg-card)', borderRadius: '8px',
        border: '1px solid var(--color-border)', borderLeft: '3px solid rgba(29,185,84,0.4)',
      }}
    >
      <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
        {[...Array(rating)].map((_, j) => (
          <span key={j} style={{ fontSize: '14px', color: '#1DB954' }}>★</span>
        ))}
      </div>
      <p className="testi-quote" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-2)', lineHeight: 1.7, marginBottom: '20px' }}>"{text}"</p>
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--c-text)' }}>{name}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-3)' }}>{car}</div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLocale()
  const texts = t('testimonials.items')
  const items = people.map((p, i) => ({ ...p, text: Array.isArray(texts) ? texts[i] : '' }))

  // Desktop = seamless auto-scroll marquee (duplicated). Mobile = swipe carousel
  // (single set) so each testimonial is large and fully readable.
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const list = isMobile ? items : [...items, ...items]

  return (
    <section style={{ padding: '120px 0', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <div className="testimonials-header" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px', marginBottom: '56px' }}>
        <div className="section-label">{t('testimonials.label')}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>{t('testimonials.title')}</h2>
      </div>

      <div className="testi-viewport" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="testi-fade" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(90deg, var(--color-bg-primary), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="testi-fade" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(-90deg, var(--color-bg-primary), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className={isMobile ? 'testi-carousel' : 'marquee-track'}>
          {list.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
        {isMobile && (
          <div style={{ textAlign: 'center', marginTop: '14px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-faint)', letterSpacing: '0.05em' }}>
            ‹ {t('testimonials.swipe')} ›
          </div>
        )}
      </div>
    </section>
  )
}
