import { useState, lazy, Suspense, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Pause, Play } from 'lucide-react'
import { filmCategories, defaultFilm } from '../data/films'
import { cars, defaultCar } from '../data/cars'
import { useLocale } from '../i18n/LocaleProvider'

const CarViewer = lazy(() => import('./CarViewer'))
let prefetchCar = () => {}
import('./CarViewer').then((m) => { prefetchCar = m.prefetchCar || prefetchCar })

export default function FilmPicker() {
  const { t } = useLocale()
  const [activeCategory, setActiveCategory] = useState('gloss')
  const [selectedFilm, setSelectedFilm] = useState(defaultFilm)
  const [hoveredFilm, setHoveredFilm] = useState(null)
  const [selectedCar, setSelectedCar] = useState(defaultCar)
  const [paused, setPaused] = useState(false)
  const [mount3D, setMount3D] = useState(false)
  const [loadedCars, setLoadedCars] = useState(() => new Set())
  const { ref, inView } = useInView({ threshold: 0.1 })

  // Warm the 3D viewer shortly after load (during idle) so the Audi RS7 is ready
  // before the user scrolls down — this removes the freeze at the 3D section.
  useEffect(() => {
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 800))
    const cic = window.cancelIdleCallback || clearTimeout
    const id = ric(() => setMount3D(true))
    return () => cic(id)
  }, [])

  const handleReady = useCallback((id) => {
    setLoadedCars((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  const currentCategory = filmCategories.find((c) => c.id === activeCategory)
  const cats = t('films.categories')
  const isSwitching = mount3D && !loadedCars.has(selectedCar.id)

  const handleRequestFilm = () => {
    const contactSection = document.querySelector('#contact')
    if (!contactSection) return
    contactSection.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      const el = document.getElementById('contact-message')
      if (!el) return
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set
      setter?.call(el, `${t('films.requestMessage')} ${selectedFilm.name} — ${selectedCar.name}.`)
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.focus()
    }, 800)
  }

  return (
    <section id="films" ref={ref} style={{ padding: '120px 0', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <div className="films-header" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
        <div className="sec-head" style={{ marginBottom: '64px' }}>
          <div className="section-label">{t('films.label')}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>
            {t('films.title')}
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}> {t('films.titleHighlight')}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--c-text-3)', maxWidth: '520px', marginTop: '16px', lineHeight: 1.7 }}>
            {t('films.intro')}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', minHeight: '600px', gap: '0' }} className="film-picker-layout">
        {/* LEFT: 3D Car Viewer */}
        <div style={{ position: 'relative', background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--color-green-primary) 8%, var(--color-bg-primary)) 0%, var(--color-bg-primary) 70%)', borderRight: '1px solid var(--color-border)', minHeight: '560px' }}>
          {/* Selected film info overlay */}
          <div className="viewer-chip-tl" style={{ position: 'absolute', top: '24px', left: '32px', zIndex: 10 }}>
            <div style={{ background: 'var(--c-glass)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: selectedFilm.hex, border: '2px solid var(--c-swatch-ring)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--c-text)' }}>{selectedFilm.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--c-text-3)', marginTop: '2px' }}>{selectedFilm.brand} · {selectedCar.name}</div>
              </div>
            </div>
          </div>

          {/* Pause / rotate toggle */}
          <button
            className="viewer-chip-tr"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? t('films.resume') : t('films.pause')}
            style={{
              position: 'absolute', top: '24px', right: '24px', zIndex: 10,
              display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: '6px',
              background: 'var(--c-glass)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--color-border)', color: 'var(--c-text)', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em',
            }}
          >
            {paused ? <Play size={15} color="#39e07a" /> : <Pause size={15} color="#39e07a" />}
            {paused ? t('films.resume') : t('films.pause')}
          </button>

          {/* 3D Canvas */}
          <Suspense fallback={<ViewerSpinner label={t('films.loading')} />}>
            {mount3D && (
              <CarViewer
                car={selectedCar}
                selectedFilm={selectedFilm}
                paused={paused}
                active={inView}
                hint={t('films.controls')}
                onReady={handleReady}
              />
            )}
          </Suspense>

          {/* Switching / first-load spinner overlay */}
          {isSwitching && <ViewerSpinner label={t('films.switching')} overlay />}
        </div>

        {/* RIGHT: Panel */}
        <div style={{ background: 'var(--color-bg-secondary)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'hidden' }}>
          {/* Car model selector */}
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: '10px' }}>{t('films.model')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cars.length}, 1fr)`, gap: '6px' }}>
              {cars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedCar(car)}
                  onMouseEnter={() => prefetchCar(car.id)}
                  title={car.name}
                  style={{
                    fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em',
                    padding: '10px 6px', borderRadius: '6px', cursor: 'pointer', border: '1px solid',
                    borderColor: selectedCar.id === car.id ? 'transparent' : 'var(--color-border)',
                    background: selectedCar.id === car.id ? '#1DB954' : 'transparent',
                    color: selectedCar.id === car.id ? '#04140a' : 'var(--c-text-2)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {car.short}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {filmCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '7px 14px', borderRadius: '4px', cursor: 'pointer', border: 'none',
                  background: activeCategory === cat.id ? '#1DB954' : 'var(--color-bg-elevated)',
                  color: activeCategory === cat.id ? '#04140a' : 'var(--c-text-2)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cats?.[cat.id] || cat.label}
              </button>
            ))}
          </div>

          {/* Swatches */}
          <AnimatePresence mode="wait">
            <motion.div className="swatch-scroll" key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', maxHeight: '232px', overflowY: 'auto', overflowX: 'hidden', paddingRight: '4px' }}>
              {currentCategory.films.map((film) => (
                <div
                  key={film.id}
                  title={film.name}
                  onClick={() => setSelectedFilm(film)}
                  onMouseEnter={() => setHoveredFilm(film)}
                  onMouseLeave={() => setHoveredFilm(null)}
                  style={{
                    aspectRatio: '1', borderRadius: '6px', background: film.hex,
                    border: selectedFilm.id === film.id ? '2px solid #1DB954' : '1px solid var(--c-swatch-ring)',
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
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: selectedFilm.hex, border: '1px solid var(--c-swatch-ring)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--c-text)', lineHeight: 1 }}>{selectedFilm.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#1DB954', marginTop: '4px' }}>{selectedFilm.brand}</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text-2)', lineHeight: 1.6 }}>{selectedFilm.description}</p>
          </div>

          <button className="btn-primary" onClick={handleRequestFilm} style={{ width: '100%', textAlign: 'center' }}>
            {t('films.request')}
          </button>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--c-text-faint)', textAlign: 'center', lineHeight: 1.5 }}>
            {t('films.hint')}
          </p>
        </div>
      </div>
    </section>
  )
}

function ViewerSpinner({ label, overlay }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', minHeight: '560px',
        ...(overlay ? { position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' } : {}),
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '2px solid #1DB954', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--c-text-3)' }}>{label}</p>
      </div>
    </div>
  )
}
