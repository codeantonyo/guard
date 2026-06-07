import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const transformations = [
  { before: '/images/before-1.webp', after: '/images/after-1.webp', car: 'BMW M3 F80', service: 'Full PPF Wrap', film: 'XPEL Ultimate Plus' },
  { before: '/images/before-2.webp', after: '/images/after-2.webp', car: 'Mercedes C63 AMG', service: 'Matte Vinyl Wrap', film: 'Avery Matte Black' },
  { before: '/images/before-3.webp', after: '/images/after-3.webp', car: 'Audi RS6', service: 'PPF + Ceramic', film: 'XPEL + Gtechniq' },
]

// Placeholder shown until real before/after photos are added to /public/images.
// Replace <PlaceholderImage /> with <ReactCompareSliderImage src={...} /> when ready.
function PlaceholderImage({ label, variant }) {
  return (
    <div
      style={{
        width: '100%', height: '340px',
        background:
          variant === 'before'
            ? 'linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 100%)'
            : 'linear-gradient(135deg, #0f2418 0%, #081208 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px',
      }}
    >
      <div style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: variant === 'before' ? '#454545' : '#1DB954', opacity: 0.75, letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}>REPLACE WITH REAL PHOTO</div>
    </div>
  )
}

export default function BeforeAfter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="gallery" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '72px' }}>
          <div className="section-label">Transformations</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 7vw, 96px)', color: '#fff', lineHeight: 0.95 }}>
            THE GUARD FILM
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>DIFFERENCE.</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', marginTop: '16px' }}>
            Drag the slider to reveal the transformation. Every car tells a story.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="gallery-grid">
          {transformations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}
            >
              <ReactCompareSlider
                itemOne={<PlaceholderImage label="BEFORE" variant="before" />}
                itemTwo={<PlaceholderImage label="AFTER" variant="after" />}
                style={{ height: '340px' }}
              />
              <div style={{ padding: '20px 24px', background: 'var(--color-bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ fontFamily: 'Syne', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{item.car}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{item.service}</div>
                  </div>
                  <div style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.2)', fontFamily: 'Inter', fontSize: '11px', color: '#1DB954', whiteSpace: 'nowrap' }}>{item.film}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
