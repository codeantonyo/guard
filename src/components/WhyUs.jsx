import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Sparkles, BadgeCheck, Award, Thermometer, Layers, Scissors } from 'lucide-react'

const features = [
  { Icon: Sparkles, title: 'Self-Healing Technology', desc: 'Our PPF films use thermoplastic polyurethane that heals light scratches with heat exposure — your paint stays flawless.' },
  { Icon: BadgeCheck, title: '10-Year Warranty Available', desc: 'We stand behind our work. Selected films come with a decade of manufacturer warranty against yellowing, cracking, and delamination.' },
  { Icon: Award, title: 'Certified Installers', desc: "Our team is trained and certified by the world's leading film manufacturers including XPEL, Avery Dennison, and Hexis." },
  { Icon: Thermometer, title: 'Climate-Controlled Studio', desc: 'Film installation requires a dust-free, temperature-regulated environment. Our studio is built to professional standards.' },
  { Icon: Layers, title: '15+ Premium Film Brands', desc: 'We partner directly with top manufacturers to stock the widest film catalog in Moldova — including rare and specialty finishes.' },
  { Icon: Scissors, title: 'Custom Pattern Cutting', desc: "Every car is different. We use proprietary software to precision-cut patterns specific to your vehicle's exact panel geometry." },
]

export default function WhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginBottom: '72px' }} className="whyus-header">
          <div>
            <div className="section-label">Why Guard Film</div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 7vw, 96px)', color: '#fff', lineHeight: 0.95 }}>
              NOT ALL PROTECTION
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>IS EQUAL.</span>
            </h2>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '18px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
              Guard Film is Moldova's premier PPF and wrap studio. We've protected over 500 vehicles — from daily drivers to supercars — and our standards have never dropped.
            </p>
            <button className="btn-ghost" style={{ marginTop: '32px' }} onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Our Story →
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--color-border)' }} className="features-grid">
          {features.map((feat, i) => {
            const Icon = feat.Icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ padding: '40px', background: 'var(--color-bg-secondary)', transition: 'background 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-card)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-secondary)' }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Icon size={24} strokeWidth={1.6} color="#39e07a" />
                </div>
                <h3 style={{ fontFamily: 'Syne', fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{feat.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
