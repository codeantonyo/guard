import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useLocale } from '../i18n/LocaleProvider'

const numbers = ['01', '02', '03', '04']

export default function Process() {
  const { t } = useLocale()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const steps = t('process.steps')
  const list = Array.isArray(steps) ? steps : []

  return (
    <section id="process" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-primary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '80px' }}>
          <div className="section-label">{t('process.label')}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>{t('process.title')}</h2>
        </div>

        {/* Desktop */}
        <div style={{ position: 'relative' }} className="process-desktop">
          <div style={{ position: 'absolute', top: '28px', left: '7%', right: '7%', height: '1px', background: 'var(--color-border)', zIndex: 0 }}>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} style={{ height: '100%', background: 'linear-gradient(90deg, #1DB954, rgba(29,185,84,0.3))', transformOrigin: 'left' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
            {list.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'relative' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-bg-card)', border: '1px solid rgba(29,185,84,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '22px', color: '#1DB954', marginBottom: '28px', position: 'relative', zIndex: 1, boxShadow: '0 0 20px rgba(29,185,84,0.15)' }}>{numbers[i]}</div>
                <div style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: '20px', background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.15)', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#1DB954', letterSpacing: '0.08em', marginBottom: '12px' }}>{step.duration}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-3)', lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div style={{ display: 'none', flexDirection: 'column' }} className="process-mobile">
          {list.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', paddingBottom: i < list.length - 1 ? '40px' : '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-bg-card)', border: '1px solid rgba(29,185,84,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '18px', color: '#1DB954', flexShrink: 0 }}>{numbers[i]}</div>
                {i < list.length - 1 && <div style={{ width: '1px', flex: 1, background: 'rgba(29,185,84,0.2)', marginTop: '8px' }} />}
              </div>
              <div style={{ paddingTop: '10px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-3)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
