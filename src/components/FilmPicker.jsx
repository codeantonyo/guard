import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { filmCategories, defaultFilm } from '../data/films'

const CarViewer = lazy(() => import('./CarViewer'))

export default function FilmPicker() {
  const [activeCategory, setActiveCategory] = useState('gloss')
  const [selectedFilm, setSelectedFilm] = useState(defaultFilm)
  const [hoveredFilm, setHoveredFilm] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const currentCategory = filmCategories.find((c) => c.id === activeCategory)

  const handleRequestFilm = () => {
    const contactSection = document.querySelector('#contact')
    if (!contactSection) return
    contactSection.scrollIntoView({ behavior: 'smooth' })
    // Pre-fill the film field. Use the native setter + input event so React's
    // controlled <input> actually updates its state (a raw .value assignment won't).
    setTimeout(() => {
      const input = document.getElementById('film-color-input')
      if (!input) return
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
      setter?.call(input, selectedFilm.name)
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }, 800)
  }

  return (
    <section id="films" ref={ref} style={{ padding: '120px 0', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-label">Interactive Showcase</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 7vw, 96px)', color: '#fff', lineHeight: 0.95 }}>
            CHOOSE YOUR
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}> FILM.</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '18px', color: 'rgba(255,255,255,0.4)', maxWidth: '480px', marginTop: '16px', lineHeight: 1.7 }}>
            Select a film finish and watch the car transform in real time. Drag to rotate and explore every angle.
          </p>
        </div>
      </div>

      {/* Full-width picker layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', minHeight: '600px', gap: '0' }} className="film-picker-layout">
        {/* LEFT: 3D Car Viewer */}
        <div style={{ position: 'relative', background: 'radial-gradient(ellipse at center, #0f1a0f 0%, #080808 70%)', borderRight: '1px solid var(--color-border)', minHeight: '560px' }}>
          {/* Selected film info overlay */}
          <div style={{ position: 'absolute', top: '24px', left: '32px', zIndex: 10 }}>
            <div style={{ background: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: selectedFilm.hex, border: '2px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Syne', fontSize: '14px', fontWeight: 700, color: '#fff' }}>{selectedFilm.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{selectedFilm.brand}</div>
              </div>
            </div>
          </div>

          {/* 3D Canvas */}
          <Suspense
            fallback={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '560px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', border: '2px solid #1DB954', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                  <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Loading 3D viewer...</p>
                </div>
              </div>
            }
          >
            {inView && <CarViewer selectedFilm={selectedFilm} />}
          </Suspense>
        </div>

        {/* RIGHT: Film Swatches Panel */}
        <div style={{ background: 'var(--color-bg-secondary)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', overflow: 'hidden' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {filmCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '7px 14px', borderRadius: '4px', cursor: 'pointer', border: 'none',
                  background: activeCategory === cat.id ? '#1DB954' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat.id ? '#000' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Color swatches grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}
            >
              {currentCategory.films.map((film) => (
                <div
                  key={film.id}
                  title={film.name}
                  onClick={() => setSelectedFilm(film)}
                  onMouseEnter={() => setHoveredFilm(film)}
                  onMouseLeave={() => setHoveredFilm(null)}
                  style={{
                    aspectRatio: '1', borderRadius: '6px', background: film.hex,
                    border: selectedFilm.id === film.id ? '2px solid #1DB954' : '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer', transition: 'transform 0.15s ease, border 0.15s ease',
                    transform: hoveredFilm?.id === film.id ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: selectedFilm.id === film.id ? '0 0 12px rgba(29,185,84,0.4)' : 'none',
                    position: 'relative',
                  }}
                >
                  {selectedFilm.id === film.id && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1DB954', boxShadow: '0 0 6px #1DB954' }} />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Selected film info */}
          <div style={{ padding: '20px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: selectedFilm.hex, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', color: '#fff', lineHeight: 1 }}>{selectedFilm.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#1DB954', marginTop: '4px' }}>{selectedFilm.brand}</div>
              </div>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{selectedFilm.description}</p>
          </div>

          {/* Request button */}
          <button className="btn-primary" onClick={handleRequestFilm} style={{ width: '100%', textAlign: 'center' }}>
            Request This Film →
          </button>

          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.5 }}>
            Not sure? Book a free consultation and we'll recommend the best film for your car.
          </p>
        </div>
      </div>
    </section>
  )
}
