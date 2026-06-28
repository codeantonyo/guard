import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Download, ExternalLink, X, Send } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider'

const PDF_PATH = '/catalog-guardfilm.pdf'

export default function CatalogViewer() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)

  const pdfAbs = typeof window !== 'undefined' ? window.location.origin + PDF_PATH : PDF_PATH
  const waShare = `https://wa.me/?text=${encodeURIComponent('GUARD FILM — Catalog culori PPF: ' + pdfAbs)}`

  const handleOpen = () => {
    // Mobile browsers render PDFs unreliably inside iframes → use the native viewer.
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      window.open(PDF_PATH, '_blank', 'noopener')
    } else {
      setOpen(true)
    }
  }

  // Esc to close + lock background scroll while the modal is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <button className="catalog-cta" onClick={handleOpen}>
        <span className="catalog-cta-icon"><BookOpen size={22} color="#39e07a" /></span>
        <span style={{ minWidth: 0 }}>
          <span className="catalog-cta-title">{t('catalog.title')}</span>
          <span className="catalog-cta-sub">{t('catalog.subtitle')}</span>
        </span>
        <span className="catalog-cta-badge">{t('catalog.pdfBadge')}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="catalog-overlay"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="catalog-modal"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="catalog-modal-head">
                <div className="catalog-modal-title">{t('catalog.heading')}</div>
                <div className="catalog-modal-actions">
                  <a href={waShare} target="_blank" rel="noopener noreferrer" className="catalog-act"><Send size={16} /><span>{t('catalog.share')}</span></a>
                  <a href={PDF_PATH} target="_blank" rel="noopener noreferrer" className="catalog-act"><ExternalLink size={16} /><span>{t('catalog.newTab')}</span></a>
                  <a href={PDF_PATH} download className="catalog-act catalog-act-primary"><Download size={16} /><span>{t('catalog.download')}</span></a>
                  <button onClick={() => setOpen(false)} className="catalog-act catalog-close" aria-label={t('catalog.close')}><X size={18} /></button>
                </div>
              </div>
              <div className="catalog-modal-body">
                <iframe src={`${PDF_PATH}#view=FitH`} title={t('catalog.heading')} />
                <div className="catalog-fallback">
                  {t('catalog.fallback')}{' '}
                  <a href={PDF_PATH} target="_blank" rel="noopener noreferrer">{t('catalog.newTab')} ↗</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
