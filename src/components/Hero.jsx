import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function Hero() {
  const heroRef = useRef()
  const scanRef = useRef()
  const [particlesReady, setParticlesReady] = useState(false)

  // tsparticles v3: initialise the engine once, then render <Particles />
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setParticlesReady(true))
  }, [])

  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 60, density: { enable: true, area: 900 } },
        color: { value: '#1DB954' },
        opacity: { value: { min: 0.05, max: 0.2 } },
        size: { value: { min: 1, max: 3 } },
        links: { enable: true, distance: 120, color: '#1DB954', opacity: 0.06, width: 1 },
        move: { enable: true, speed: 0.6, outModes: { default: 'out' } },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
    }),
    []
  )

  useEffect(() => {
    // Scan line sweep
    const tween = gsap.to(scanRef.current, { x: '200%', duration: 2.5, ease: 'power2.inOut', repeat: -1, repeatDelay: 3 })

    // Parallax on the background layer
    const onScroll = () => {
      if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      tween.kill()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const wordVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] } }),
  }

  const words = ['PROTECT', 'WHAT', 'YOU', 'DRIVE.']

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Technical blueprint grid pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(29,185,84,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,185,84,0.05) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 42%, #000 22%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 42%, #000 22%, transparent 80%)',
        }}
      />
      {/* Larger accent grid for depth */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '216px 216px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 45%, #000 30%, transparent 85%)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 45%, #000 30%, transparent 85%)',
        }}
      />

      {/* Particle background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {particlesReady && <Particles id="hero-particles" options={particlesOptions} style={{ position: 'absolute', inset: 0 }} />}
      </div>

      {/* Background glow effects */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,185,84,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,185,84,0.05) 0%, transparent 70%)' }} />
      </div>

      {/* Scan line effect */}
      <div
        ref={scanRef}
        style={{ position: 'absolute', top: 0, bottom: 0, left: '-100%', width: '100%', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(90deg, transparent 0%, rgba(29,185,84,0.03) 50%, transparent 100%)' }}
      />

      {/* Parallax background layer */}
      <div ref={heroRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(29,185,84,0.03) 0%, transparent 40%, rgba(13,107,48,0.05) 100%)' }} />
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 48px', paddingTop: '100px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="section-label" style={{ marginBottom: '24px' }}>
          Premium PPF &amp; Car Wraps — Chișinău, Moldova
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 20px' }}>
            {words.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(72px, 11vw, 140px)', lineHeight: 0.95, letterSpacing: '0.02em', color: '#fff', display: 'block' }}
              >
                {word === 'DRIVE.' ? (
                  <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.8)' }}>{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ fontFamily: 'Inter', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', maxWidth: '520px', marginTop: '24px', lineHeight: 1.7 }}
        >
          Premium Paint Protection Film and vinyl wrap installation. Invisible armor for your vehicle — engineered to last.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => document.querySelector('#films')?.scrollIntoView({ behavior: 'smooth' })}>Explore Films</button>
          <button className="btn-ghost" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>Book a Consultation</button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} style={{ display: 'flex', gap: '20px', marginTop: '48px', flexWrap: 'wrap' }}>
          {['500+ Cars Protected', 'Self-Healing Film', '10-Year Warranty'].map((badge) => (
            <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1DB954', flexShrink: 0 }} />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(29,185,84,0.8), transparent)' }} />
      </motion.div>
    </section>
  )
}
