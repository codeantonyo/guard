import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLocale } from '../i18n/LocaleProvider'

// Visuals per layer (top → bottom), echoing the HOHOFILM structure diagram.
const LAYER_STYLES = [
  { grad: 'linear-gradient(135deg, rgba(196,210,217,0.34) 0%, rgba(74,90,100,0.5) 100%)', dot: '#c4d2d8' }, // PET
  { grad: 'linear-gradient(135deg, rgba(74,176,196,0.62) 0%, rgba(26,90,110,0.74) 100%)', dot: '#46b0c4' }, // self-healing
  { grad: 'linear-gradient(135deg, rgba(242,176,86,0.9) 0%, rgba(198,122,46,0.92) 100%)', dot: '#f0b05a' }, // TPU color
  { grad: 'linear-gradient(135deg, rgba(66,102,176,0.84) 0%, rgba(26,52,102,0.9) 100%)', dot: '#4a6cb0' }, // adhesive
  { grad: 'linear-gradient(135deg, rgba(78,82,92,0.74) 0%, rgba(20,21,26,0.88) 100%)', dot: '#5a5d67' }, // matte backing
]

export default function FilmStructure() {
  const { t } = useLocale()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })
  const [hovered, setHovered] = useState(null)

  const layers = t('structure.layers')
  const list = Array.isArray(layers) ? layers : []

  return (
    <section id="structure" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header (centered, like the catalog diagram) */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 24px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1DB954', marginBottom: '18px' }}>
            {t('structure.label')}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6.5vw, 88px)', color: 'var(--c-text)', lineHeight: 0.98 }}>
            {t('structure.titleA')} <span style={{ color: '#1DB954' }}>{t('structure.titleB')}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--c-text-3)', lineHeight: 1.7, marginTop: '18px' }}>
            {t('structure.subtitle')}
          </p>
        </div>

        <div className="ppf-wrap">
          {/* 3D exploded stack */}
          <div className="ppf-stage" aria-hidden>
            <div className="ppf-float">
              <div className="ppf-deck">
                {list.map((layer, i) => {
                  const s = LAYER_STYLES[i] || LAYER_STYLES[0]
                  // PET (i=0) sits on top → highest translateZ; matte backing (last) at the bottom.
                  const z = (inView ? (2 - i) * 56 : (4 - i) * 5) + (hovered === i ? 40 : 0)
                  const dim = hovered != null && hovered !== i
                  return (
                    <div
                      key={i}
                      className="ppf-layer"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        background: s.grad,
                        transform: `translateZ(${z}px) scale(${hovered === i ? 1.05 : 1})`,
                        opacity: inView ? (dim ? 0.5 : 1) : 0,
                        boxShadow: hovered === i
                          ? '0 0 0 1.5px rgba(57,224,122,0.7), 0 40px 55px rgba(0,0,0,0.55)'
                          : '0 26px 40px rgba(0,0,0,0.5)',
                        transitionDelay: inView ? `${i * 0.08}s` : '0s',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* Layer descriptions */}
          <ol className="ppf-list">
            {list.map((layer, i) => {
              const s = LAYER_STYLES[i] || LAYER_STYLES[0]
              const active = hovered === i
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px 18px', borderRadius: '10px',
                    border: `1px solid ${active ? 'var(--color-green-border)' : 'var(--color-border)'}`,
                    background: active ? 'var(--color-bg-card)' : 'transparent',
                    transition: 'all 0.25s ease', cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flexShrink: 0, paddingTop: '2px' }}>
                    <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: s.dot, boxShadow: active ? `0 0 12px ${s.dot}` : 'none', transition: 'box-shadow 0.25s ease' }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--c-text-faint)', letterSpacing: '0.05em' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '4px' }}>{layer.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-3)', lineHeight: 1.6 }}>{layer.text}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
