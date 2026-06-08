import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

// +373 69 727 151
const PHONE_DIGITS = '37369727151'
const PHONE_INTL = '+37369727151'

const WhatsAppIcon = ({ size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)
const TelegramIcon = ({ size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212-.07-.062-.174-.041-.249-.024-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)
const ViberIcon = ({ size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82.555 12.938.467 18.789 6.11 20.38h.003l-.004 2.42s-.037.97.602 1.17c.79.244 1.249-.51 2-1.32.413-.45.982-1.103 1.41-1.6 3.855.324 6.82-.416 7.158-.526.776-.252 5.176-.816 5.892-6.66.74-6.024-.36-9.829-2.34-11.529l-.012-.01c-.6-.553-3.018-2.313-8.404-2.337 0 0-.395-.025-1.057-.011a.34.34 0 00-.37.005zm.066 1.514c.562-.01.927.011.927.011 4.557.02 6.736 1.49 7.243 1.957 1.674 1.42 2.528 4.857 1.906 9.887v.001c-.605 4.875-4.174 5.183-4.83 5.394-.281.09-2.884.737-6.155.523 0 0-2.435 2.941-3.196 3.705-.119.118-.259.167-.352.143-.131-.033-.167-.188-.166-.413l.02-4.026c-4.776-1.327-4.497-6.31-4.444-8.913.054-2.605.543-4.74 1.998-6.177 1.962-1.778 5.48-2.044 7.107-2.064a.339.339 0 00.09-.002zm.687 3.291a.27.27 0 00.001.54 4.93 4.93 0 013.587 1.393c.92.95 1.371 2.225 1.385 3.897a.27.27 0 00.27.27h.001a.27.27 0 00.27-.272c-.014-1.762-.497-3.18-1.524-4.242-1.058-1.092-2.534-1.586-3.91-1.586a.27.27 0 00-.07.002zm-3.523.563a.832.832 0 00-.485.069l-.004.002c-.331.193-.63.44-.88.764l-.004.005c-.207.272-.318.542-.347.803l-.001.005c-.018.155.005.31.066.452l.003.008c.176.516.71 1.591 1.762 2.81 1.05 1.22 2.347 2.182 3.31 2.658.79.39 1.376.53 1.78.51l.006-.001c.226-.013.439-.075.633-.196l.005-.003c.348-.245.65-.567.846-.967l.001-.003c.139-.291.087-.566-.135-.752a8.83 8.83 0 00-1.343-.932c-.337-.182-.68-.072-.818.112l-.294.371c-.151.19-.428.164-.428.164l-.008.004c-2.046-.522-2.592-2.595-2.592-2.595s-.026-.276.168-.426l.371-.294c.182-.139.293-.481.111-.819a8.83 8.83 0 00-.932-1.342c-.117-.142-.27-.218-.43-.225a.832.832 0 00-.032.001zm3.594.65a.27.27 0 00-.018.539c.853.06 1.453.347 1.879.79.426.444.677 1.06.69 1.91a.27.27 0 00.27.265h.003a.27.27 0 00.265-.273c-.015-.95-.305-1.704-.84-2.263-.537-.56-1.292-.89-2.23-.957a.27.27 0 00-.019-.001zm.237 1.275a.27.27 0 00-.013.54c.317.013.49.108.598.226.108.117.18.296.192.597a.27.27 0 00.27.259h.011a.27.27 0 00.258-.281c-.015-.39-.124-.733-.334-.962-.21-.23-.524-.355-.913-.37a.27.27 0 00-.069-.008z" />
  </svg>
)

const channels = [
  { id: 'whatsapp', label: 'WhatsApp', color: '#25D366', Icon: WhatsAppIcon, href: `https://wa.me/${PHONE_DIGITS}`, external: true },
  { id: 'telegram', label: 'Telegram', color: '#229ED9', Icon: TelegramIcon, href: `https://t.me/${PHONE_INTL}`, external: true },
  { id: 'viber', label: 'Viber', color: '#7360F2', Icon: ViberIcon, href: `viber://chat?number=${encodeURIComponent(PHONE_INTL)}`, external: false },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="fab-stack" ref={ref}>
      <AnimatePresence>
        {open &&
          channels.map((c, i) => {
            const Icon = c.Icon
            return (
              <motion.a
                key={c.id}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="fab"
                style={{ background: c.color }}
                aria-label={`${c.label}: ${PHONE_INTL}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14, scale: 0.4 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.4 }}
                transition={{ delay: open ? (channels.length - 1 - i) * 0.05 : 0, type: 'spring', stiffness: 320, damping: 22 }}
              >
                <span className="fab-label">{c.label}</span>
                <Icon size={25} />
              </motion.a>
            )
          })}
      </AnimatePresence>

      <motion.button
        className={`fab fab-main${open ? '' : ' fab-pulse'}`}
        style={{ background: '#1DB954', ['--fab-color']: '#1DB954' }}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close contact menu' : 'Contact us'}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span style={{ display: 'flex' }} animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
          {open ? <X size={26} /> : <MessageCircle size={26} />}
        </motion.span>
      </motion.button>
    </div>
  )
}
