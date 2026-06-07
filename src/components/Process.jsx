import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const steps = [
  { number: '01', title: 'Free Consultation', desc: 'Tell us about your car and goals. We assess the vehicle, recommend the best films, and provide a transparent no-obligation quote.', duration: '30 min' },
  { number: '02', title: 'Surface Preparation', desc: 'Complete paint decontamination, clay bar treatment, and paint correction if needed. The surface must be perfect before any film goes on.', duration: '2–4 hrs' },
  { number: '03', title: 'Film Installation', desc: 'Precision film cutting and application in our climate-controlled studio. We use custom patterns for a factory-fitted finish with no edge lifting.', duration: '1–3 days' },
  { number: '04', title: 'Quality Inspection', desc: 'Every panel is inspected under controlled lighting. We only hand back your car when it meets our exacting standards — and not a moment before.', duration: '1–2 hrs' },
]

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="process" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-primary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '80px' }}>
          <div className="section-label">Our Process</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 7vw, 96px)', color: '#fff', lineHeight: 0.95 }}>HOW IT WORKS.</h2>
        </div>

        {/* Desktop horizontal steps */}
        <div style={{ position: 'relative' }} className="process-desktop">
          {/* Connector line */}
          <div style={{ position: 'absolute', top: '28px', left: '7%', right: '7%', height: '1px', background: 'var(--color-border)', zIndex: 0 }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #1DB954, rgba(29,185,84,0.3))', transformOrigin: 'left' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative' }}
              >
                <div
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-bg-card)',
                    border: '1px solid rgba(29,185,84,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue', fontSize: '22px', color: '#1DB954', marginBottom: '28px',
                    position: 'relative', zIndex: 1, boxShadow: '0 0 20px rgba(29,185,84,0.15)',
                  }}
                >
                  {step.number}
                </div>

                <div style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: '20px', background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.15)', fontFamily: 'Inter', fontSize: '11px', color: '#1DB954', letterSpacing: '0.08em', marginBottom: '12px' }}>{step.duration}</div>

                <h3 style={{ fontFamily: 'Syne', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical steps */}
        <div style={{ display: 'none', flexDirection: 'column' }} className="process-mobile">
          {steps.map((step, i) => (
            <div key={step.number} style={{ display: 'flex', gap: '24px', paddingBottom: i < steps.length - 1 ? '40px' : '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-bg-card)', border: '1px solid rgba(29,185,84,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: '18px', color: '#1DB954', flexShrink: 0 }}>{step.number}</div>
                {i < steps.length - 1 && <div style={{ width: '1px', flex: 1, background: 'rgba(29,185,84,0.2)', marginTop: '8px' }} />}
              </div>
              <div style={{ paddingTop: '10px' }}>
                <h3 style={{ fontFamily: 'Syne', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
