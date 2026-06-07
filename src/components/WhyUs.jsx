import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Sparkles, BadgeCheck, Award, Thermometer, Layers, Scissors } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider'

const icons = [Sparkles, BadgeCheck, Award, Thermometer, Layers, Scissors]

export default function WhyUs() {
  const { t } = useLocale()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const features = t('whyus.features')
  const list = Array.isArray(features) ? features : []

  return (
    <section ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginBottom: '72px' }} className="whyus-header">
          <div>
            <div className="section-label">{t('whyus.label')}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>
              {t('whyus.titleLine1')}
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>{t('whyus.titleHighlight')}</span>
            </h2>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--c-text-3)', lineHeight: 1.8 }}>{t('whyus.intro')}</p>
            <button className="btn-ghost" style={{ marginTop: '32px' }} onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>{t('whyus.story')}</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--color-border)' }} className="features-grid">
          {list.map((feat, i) => {
            const Icon = icons[i] || Sparkles
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }} style={{ padding: '40px', background: 'var(--color-bg-secondary)', transition: 'background 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-card)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-secondary)' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Icon size={24} strokeWidth={1.6} color="#39e07a" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '10px' }}>{feat.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-3)', lineHeight: 1.7 }}>{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
