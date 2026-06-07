import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import toast, { Toaster } from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, CircleCheckBig } from 'lucide-react'
import { filmCategories } from '../data/films'
import { useLocale } from '../i18n/LocaleProvider'

// ─────────────────────────────────────────────────────────────
// TODO: Replace these with real company details
const COMPANY_INFO = {
  phone: '+373 XXX XXX XXX', // TODO
  email: 'info@guardfilm.md', // TODO
  address: 'Str. Calea Ieșilor 10, Chișinău, Moldova', // TODO
  maps_url: 'https://www.google.com/maps/search/?api=1&query=47.01512761256857,28.88808696971555',
  instagram: 'https://instagram.com/guardfilm', // TODO
  tiktok: 'https://tiktok.com/@guardfilm', // TODO
  facebook: 'https://facebook.com/guardfilm', // TODO
}
const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1130.7930754943636!2d28.88808696971555!3d47.01512761256857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97b7ac5f86a2f%3A0xfd79cbc0a95649d3!2sFriends%20Detailing!5e1!3m2!1sen!2s!4v1780849238335!5m2!1sen!2s'
// ─────────────────────────────────────────────────────────────

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.054-.059 1.37-.059 4.04 0 2.67.01 2.987.059 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.059 4.041.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.054.059-1.37.059-4.041 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.059-4.041-.059zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
  </svg>
)
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.042.88.124V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
)
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const allFilms = filmCategories.flatMap((c) => c.films.map((f) => f.name))

export default function Contact() {
  const { t } = useLocale()
  const [form, setForm] = useState({ name: '', phone: '', email: '', car: '', service: '', film: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // TODO: Connect to a real email service (EmailJS, Formspree, or backend API).
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    toast.success(t('contact.toast'))
  }

  const labelStyle = { fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--c-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }
  const inputStyle = { width: '100%', padding: '14px 16px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--c-text)', outline: 'none', transition: 'border-color 0.2s ease', boxSizing: 'border-box' }
  const focusOn = (e) => (e.target.style.borderColor = '#1DB954')
  const focusOff = (e) => (e.target.style.borderColor = 'var(--color-border)')

  const serviceOptions = t('contact.serviceOptions')
  const details = [
    { Icon: Phone, label: t('contact.phoneLabel'), value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
    { Icon: Mail, label: t('contact.emailLabel'), value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { Icon: MapPin, label: t('contact.addressLabel'), value: COMPANY_INFO.address, href: COMPANY_INFO.maps_url },
    { Icon: Clock, label: t('contact.hoursLabel'), value: t('contact.hoursValue'), href: null },
  ]
  const socials = [
    { label: 'Instagram', href: COMPANY_INFO.instagram, Icon: InstagramIcon },
    { label: 'TikTok', href: COMPANY_INFO.tiktok, Icon: TikTokIcon },
    { label: 'Facebook', href: COMPANY_INFO.facebook, Icon: FacebookIcon },
  ]

  return (
    <section id="contact" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-secondary)' }}>
      <Toaster position="top-right" toastOptions={{ style: { background: 'var(--color-bg-elevated)', color: 'var(--c-text)', border: '1px solid rgba(29,185,84,0.3)' } }} />
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '72px' }}>
          <div className="section-label">{t('contact.label')}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)', lineHeight: 0.95 }}>
            {t('contact.titleLine1')}
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>{t('contact.titleHighlight')}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--c-text-3)', maxWidth: '420px', marginTop: '16px', lineHeight: 1.7 }}>{t('contact.intro')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '80px', alignItems: 'start' }} className="contact-layout">
          {/* FORM */}
          <div>
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t('contact.name')} *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder={t('contact.namePh')} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t('contact.phone')} *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder={t('contact.phonePh')} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t('contact.email')}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t('contact.emailPh')} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t('contact.car')}</label>
                    <input name="car" value={form.car} onChange={handleChange} placeholder={t('contact.carPh')} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t('contact.service')}</label>
                    <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }} onFocus={focusOn} onBlur={focusOff}>
                      <option value="">{t('contact.servicePh')}</option>
                      {(Array.isArray(serviceOptions) ? serviceOptions : []).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>{t('contact.film')}</label>
                    <input id="film-color-input" name="film" value={form.film} onChange={handleChange} list="film-list" placeholder={t('contact.filmPh')} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                    <datalist id="film-list">
                      {allFilms.map((f) => (
                        <option key={f} value={f} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{t('contact.message')}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder={t('contact.messagePh')} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} onFocus={focusOn} onBlur={focusOff} />
                </div>

                <button type="submit" className="btn-primary" disabled={sending} style={{ fontSize: '14px', padding: '16px', opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}>
                  {sending ? t('contact.sending') : t('contact.send')}
                </button>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-faint)', lineHeight: 1.5 }}>{t('contact.disclaimer')}</p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid rgba(29,185,84,0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <CircleCheckBig size={64} strokeWidth={1.5} color="#1DB954" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--c-text)', marginBottom: '12px' }}>{t('contact.successTitle')}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--c-text-2)', lineHeight: 1.7 }}>{t('contact.successBody')}</p>
                <button className="btn-ghost" onClick={() => setSent(false)} style={{ marginTop: '24px' }}>{t('contact.again')}</button>
              </div>
            )}
          </div>

          {/* INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ padding: '32px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '24px' }}>{t('contact.detailsTitle')}</h3>
              {details.map((item) => {
                const Icon = item.Icon
                return (
                  <div key={item.label} style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: '1px', color: '#39e07a', display: 'flex' }}><Icon size={18} strokeWidth={1.7} /></span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--c-text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--c-text)', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text)')}>{item.value}</a>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--c-text)' }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '16px' }}>{t('contact.followTitle')}</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {socials.map((social) => {
                  const Icon = social.Icon
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '14px 12px', textAlign: 'center', borderRadius: '6px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--c-text-2)', textDecoration: 'none', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(29,185,84,0.3)'; e.currentTarget.style.color = '#1DB954' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--c-text-2)' }}>
                      <Icon size={20} />
                      {social.label}
                    </a>
                  )
                })}
              </div>
            </div>

            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', height: '240px', background: 'var(--color-bg-card)' }}>
              <iframe title="Guard Film — studio location, Chișinău" src={MAPS_EMBED_SRC} width="100%" height="100%" style={{ border: 0, display: 'block', filter: 'contrast(1.05) brightness(0.92)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
