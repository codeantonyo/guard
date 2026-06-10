import { ReactCompareSlider } from 'react-compare-slider'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLocale } from '../i18n/LocaleProvider'

const transformations = [
  { car: 'BMW M3 F80', service: 'Full PPF Wrap', film: 'XPEL Ultimate Plus' },
  { car: 'Mercedes C63 AMG', service: 'Matte Vinyl Wrap', film: 'Avery Matte Black' },
  { car: 'Audi RS6', service: 'PPF + Ceramic', film: 'XPEL + Gtechniq' },
]

function PlaceholderImage({ label, variant, note }) {
  return (
    <div style={{ width: '100%', height: '340px', background: variant === 'before' ? 'linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 100%)' : 'linear-gradient(135deg, #0f2418 0%, #081208 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: variant === 'before' ? '#454545' : '#1DB954', opacity: 0.75, letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}>{note}</div>
    </div>
  )
}

export default function BeforeAfter() {
  const { t } = useLocale()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="gallery" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-head" style={{ marginBottom: '72px' }}>
          <div className="section-label">{t('gallery.label')}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>
            {t('gallery.titleLine1')}
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>{t('gallery.titleHighlight')}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--c-text-3)', maxWidth: '420px', marginTop: '16px' }}>{t('gallery.intro')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="gallery-grid">
          {transformations.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <ReactCompareSlider
                className="ba-slider"
                onlyHandleDraggable
                itemOne={<PlaceholderImage label={t('gallery.before')} variant="before" note={t('gallery.replaceNote')} />}
                itemTwo={<PlaceholderImage label={t('gallery.after')} variant="after" note={t('gallery.replaceNote')} />}
                style={{ height: '340px' }}
              />
              <div style={{ padding: '20px 24px', background: 'var(--color-bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--c-text)' }}>{item.car}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--c-text-3)', marginTop: '4px' }}>{item.service}</div>
                  </div>
                  <div style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.2)', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#1DB954', whiteSpace: 'nowrap' }}>{item.film}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
