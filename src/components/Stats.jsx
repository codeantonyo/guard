import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { value: 500, suffix: '+', label: 'Cars Protected', sublabel: 'since 2016' },
  { value: 8, suffix: '+', label: 'Years Experience', sublabel: 'in Moldova' },
  { value: 15, suffix: '+', label: 'Film Brands', sublabel: 'premium only' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate', sublabel: 'guaranteed' },
]

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '64px 48px',
      }}
    >
      <div
        style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 6vw, 80px)', color: '#1DB954', lineHeight: 1 }}>
              {inView ? <CountUp end={stat.value} duration={2.5} delay={i * 0.2} suffix={stat.suffix} /> : `0${stat.suffix}`}
            </div>
            <div style={{ fontFamily: 'Syne', fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '8px' }}>{stat.label}</div>
            <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.sublabel}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
