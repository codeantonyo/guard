import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShieldCheck, SprayCan, Droplets, SunDim } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider'

const meta = [
  { Icon: ShieldCheck, short: 'PPF' },
  { Icon: SprayCan, short: 'WRAP' },
  { Icon: Droplets, short: 'CERAMIC' },
  { Icon: SunDim, short: 'TINT' },
]

export default function Services() {
  const { t } = useLocale()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const items = t('services.items')

  return (
    <section id="services" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-primary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-head" style={{ marginBottom: '72px' }}>
          <div className="section-label">{t('services.label')}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>
            {t('services.titleLine1')}<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>{t('services.titleLine2')}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--c-text-3)', maxWidth: '480px', marginTop: '20px', lineHeight: 1.7 }}>{t('services.intro')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--color-border)' }} className="services-grid">
          {meta.map((m, i) => {
            const Icon = m.Icon
            const item = items?.[i] || {}
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: 'var(--color-bg-primary)', padding: '48px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'background 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-card)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-primary)' }}
              >
                <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: 'var(--font-display)', fontSize: '80px', color: 'var(--c-hairline)', lineHeight: 1, userSelect: 'none' }}>{m.short}</div>

                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Icon size={26} strokeWidth={1.6} color="#39e07a" />
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--c-text-2)', lineHeight: 1.7, marginBottom: '24px' }}>{item.desc}</p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(item.features || []).map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--c-text-2)' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1DB954', flexShrink: 0 }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div style={{ position: 'absolute', bottom: 0, left: '48px', right: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(29,185,84,0.3), transparent)' }} />
              </motion.div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--c-text-3)', marginBottom: '20px' }}>{t('services.ctaText')}</p>
          <button className="btn-ghost" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>{t('services.ctaButton')}</button>
        </div>
      </div>
    </section>
  )
}
