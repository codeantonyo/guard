import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { useLocale } from '../i18n/LocaleProvider'

const values = [
  { value: 500, suffix: '+' },
  { value: 8, suffix: '+' },
  { value: 15, suffix: '+' },
  { value: 100, suffix: '%' },
]

export default function Stats() {
  const { t } = useLocale()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const labels = t('stats.labels')
  const sublabels = t('stats.sublabels')

  return (
    <section ref={ref} style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '64px 48px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }} className="stats-grid">
        {values.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 80px)', color: '#1DB954', lineHeight: 1 }}>
              {inView ? <CountUp end={stat.value} duration={2.5} delay={i * 0.2} suffix={stat.suffix} /> : `0${stat.suffix}`}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--c-text)', marginTop: '8px' }}>{labels?.[i]}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-3)', marginTop: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sublabels?.[i]}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
