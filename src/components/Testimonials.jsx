import { useLocale } from '../i18n/LocaleProvider'

const testimonials = [
  { name: 'Alexandru M.', car: 'BMW M3 Competition', rating: 5, text: "Guard Film wrapped my M3 in matte black PPF and the result is absolutely flawless. You can't even see the film edges. Worth every leu." },
  { name: 'Vitalie T.', car: 'Mercedes GLE 63', rating: 5, text: 'Professional team, climate-controlled facility, and they took extra care with my AMG. The satin finish on the hood looks incredible.' },
  { name: 'Irina S.', car: 'Audi Q7', rating: 5, text: "Finally a studio in Moldova that actually knows what they're doing. My Q7 looks factory-new and the paint is protected for years." },
  { name: 'Dmitri P.', car: 'Porsche Cayenne', rating: 5, text: "I've had PPF done in Germany and Bucharest before. Guard Film is absolutely on the same level — detail-obsessed and professional." },
  { name: 'Radu C.', car: 'Tesla Model 3', rating: 5, text: 'Full front-end PPF done perfectly. The film is invisible and the car feels new. Their catalog of films is huge — I loved choosing the finish.' },
  { name: 'Natalia V.', car: 'Range Rover Sport', rating: 5, text: 'Brought my Range Rover for a full vinyl color change. The color shift film they recommended is stunning. People stop me on the street.' },
]

function Card({ t }) {
  return (
    <div style={{ width: '360px', flexShrink: 0, padding: '28px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)', borderLeft: '3px solid rgba(29,185,84,0.4)' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
        {[...Array(t.rating)].map((_, j) => (
          <span key={j} style={{ fontSize: '14px', color: '#1DB954' }}>★</span>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-2)', lineHeight: 1.7, marginBottom: '20px' }}>"{t.text}"</p>
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--c-text)' }}>{t.name}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-3)' }}>{t.car}</div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLocale()
  return (
    <section style={{ padding: '120px 0', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px', marginBottom: '56px' }}>
        <div className="section-label">{t('testimonials.label')}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>{t('testimonials.title')}</h2>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(90deg, var(--color-bg-primary), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(-90deg, var(--color-bg-primary), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="marquee-track">
          {[...testimonials, ...testimonials].map((item, i) => (
            <Card key={i} t={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
