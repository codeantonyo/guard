import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShieldCheck, SprayCan, Droplets, SunDim } from 'lucide-react'

const services = [
  {
    Icon: ShieldCheck,
    title: 'Paint Protection Film',
    short: 'PPF',
    desc: 'Self-healing, optically clear film that guards against stone chips, scratches, UV damage, and chemical etching. Available in matte and glossy finishes.',
    features: ['Self-healing technology', 'UV protection', 'Preserves resale value', '10-year warranty available'],
  },
  {
    Icon: SprayCan,
    title: 'Vinyl Color Wrap',
    short: 'WRAP',
    desc: 'Transform your vehicle with premium vinyl wraps. Over 300 colors, textures, and finishes available. Fully reversible — returns to original paint.',
    features: ['300+ colors & finishes', 'Fully reversible', 'Protects original paint', 'Custom designs available'],
  },
  {
    Icon: Droplets,
    title: 'Ceramic Coating',
    short: 'CERAMIC',
    desc: 'Professional nano-ceramic coating that bonds permanently to your paint. Creates a hydrophobic shield with extreme gloss and chemical resistance.',
    features: ['9H hardness rating', 'Hydrophobic surface', 'Extreme gloss finish', '5-year protection'],
  },
  {
    Icon: SunDim,
    title: 'Window Tinting',
    short: 'TINT',
    desc: 'Professional window film installation for superior UV rejection, heat reduction, enhanced privacy, and a sleek refined look.',
    features: ['99% UV rejection', 'Heat reduction', 'Privacy enhancement', 'Legal compliance guaranteed'],
  },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-primary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '72px' }}>
          <div className="section-label">What we do</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 7vw, 96px)', color: '#fff', lineHeight: 0.95 }}>
            FULL PROTECTION,<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>EVERY SURFACE.</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '18px', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', marginTop: '20px', lineHeight: 1.7 }}>
            From invisible armor to bold transformations — we have every surface covered.
          </p>
        </div>

        {/* Services grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--color-border)' }} className="services-grid">
          {services.map((service, i) => {
            const Icon = service.Icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: 'var(--color-bg-primary)', padding: '48px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'background 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-card)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-primary)' }}
              >
                {/* Background label */}
                <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: 'Bebas Neue', fontSize: '80px', color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>{service.short}</div>

                {/* Icon */}
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Icon size={26} strokeWidth={1.6} color="#39e07a" />
                </div>

                <h3 style={{ fontFamily: 'Syne', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '24px' }}>{service.desc}</p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {service.features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1DB954', flexShrink: 0 }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div style={{ position: 'absolute', bottom: 0, left: '48px', right: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(29,185,84,0.3), transparent)' }} />
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
            Not sure which service is right for you?
          </p>
          <button className="btn-ghost" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  )
}
