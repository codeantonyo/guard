import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import toast, { Toaster } from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, CircleCheckBig } from 'lucide-react'
import { filmCategories } from '../data/films'

// ─────────────────────────────────────────────────────────────
// TODO: Replace these with real company details
const COMPANY_INFO = {
  phone: '+373 XXX XXX XXX', // TODO: update
  email: 'info@guardfilm.md', // TODO: update
  address: 'Str. Calea Ieșilor 10, Chișinău, Moldova', // TODO: update with the studio's street address
  maps_url: 'https://www.google.com/maps/search/?api=1&query=47.01512761256857,28.88808696971555',
  instagram: 'https://instagram.com/guardfilm', // TODO: update
  tiktok: 'https://tiktok.com/@guardfilm', // TODO: update
  facebook: 'https://facebook.com/guardfilm', // TODO: update
  hours: 'Monday – Saturday: 9:00 – 18:00',
}
const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1130.7930754943636!2d28.88808696971555!3d47.01512761256857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97b7ac5f86a2f%3A0xfd79cbc0a95649d3!2sFriends%20Detailing!5e1!3m2!1sen!2s!4v1780849238335!5m2!1sen!2s'
// ─────────────────────────────────────────────────────────────

// Brand glyphs (lucide dropped social brand icons, so these are inline). They use
// currentColor, so they tint with their parent link's hover colour.
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
const services = ['Paint Protection Film (PPF)', 'Vinyl Color Wrap', 'Ceramic Coating', 'Window Tinting', 'Full Package', 'Consultation Only']

const labelStyle = { fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', car: '', service: '', film: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // TODO: Connect to a real email service (EmailJS, Formspree, or backend API).
    // Example: await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
    await new Promise((r) => setTimeout(r, 1500)) // simulated network delay
    setSending(false)
    setSent(true)
    toast.success("Message sent! We'll contact you within 24 hours.")
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)', borderRadius: '6px',
    fontFamily: 'Inter', fontSize: '14px', color: '#fff', outline: 'none',
    transition: 'border-color 0.2s ease', boxSizing: 'border-box',
  }
  const focusOn = (e) => (e.target.style.borderColor = '#1DB954')
  const focusOff = (e) => (e.target.style.borderColor = 'rgba(255,255,255,0.06)')

  const details = [
    { Icon: Phone, label: 'Phone', value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
    { Icon: Mail, label: 'Email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { Icon: MapPin, label: 'Address', value: COMPANY_INFO.address, href: COMPANY_INFO.maps_url },
    { Icon: Clock, label: 'Hours', value: COMPANY_INFO.hours, href: null },
  ]
  const socials = [
    { label: 'Instagram', href: COMPANY_INFO.instagram, Icon: InstagramIcon },
    { label: 'TikTok', href: COMPANY_INFO.tiktok, Icon: TikTokIcon },
    { label: 'Facebook', href: COMPANY_INFO.facebook, Icon: FacebookIcon },
  ]

  return (
    <section id="contact" ref={ref} style={{ padding: '120px 48px', background: 'var(--color-bg-secondary)' }}>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1c1c1c', color: '#fff', border: '1px solid rgba(29,185,84,0.3)' } }} />
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '72px' }}>
          <div className="section-label">Get in Touch</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 7vw, 96px)', color: '#fff', lineHeight: 0.95 }}>
            PROTECT YOUR CAR
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(29,185,84,0.6)' }}>TODAY.</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '18px', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', marginTop: '16px', lineHeight: 1.7 }}>
            Based in Chișinău, Moldova. Free consultation, transparent pricing, no pressure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '80px', alignItems: 'start' }} className="contact-layout">
          {/* FORM */}
          <div>
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Alexandru M." style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+373 XXX XXX" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={labelStyle}>Your Car</label>
                    <input name="car" value={form.car} onChange={handleChange} placeholder="BMW M3 2023" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Service Interested In</label>
                    <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }} onFocus={focusOn} onBlur={focusOff}>
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Film</label>
                    <input id="film-color-input" name="film" value={form.film} onChange={handleChange} list="film-list" placeholder="From the color picker..." style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                    <datalist id="film-list">
                      {allFilms.map((f) => (
                        <option key={f} value={f} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us anything else about your project..." style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} onFocus={focusOn} onBlur={focusOff} />
                </div>

                <button type="submit" className="btn-primary" disabled={sending} style={{ fontSize: '14px', padding: '16px', opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}>
                  {sending ? 'Sending...' : 'Send Request →'}
                </button>

                <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.5 }}>
                  By submitting this form you agree to be contacted regarding your inquiry. We respond within 24 hours.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid rgba(29,185,84,0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <CircleCheckBig size={64} strokeWidth={1.5} color="#1DB954" />
                </div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '40px', color: '#fff', marginBottom: '12px' }}>MESSAGE SENT!</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  Thank you for reaching out. We'll contact you within 24 hours to discuss your project.
                </p>
                <button className="btn-ghost" onClick={() => setSent(false)} style={{ marginTop: '24px' }}>Send Another →</button>
              </div>
            )}
          </div>

          {/* CONTACT INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ padding: '32px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontFamily: 'Syne', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>Contact Details</h3>
              {details.map((item) => {
                const Icon = item.Icon
                return (
                  <div key={item.label} style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: '1px', color: '#39e07a', display: 'flex' }}>
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: 'Inter', fontSize: '15px', color: '#fff', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')} onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}>
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ fontFamily: 'Inter', fontSize: '15px', color: '#fff' }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social links */}
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontFamily: 'Syne', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Follow Our Work</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {socials.map((social) => {
                  const Icon = social.Icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ flex: 1, padding: '14px 12px', textAlign: 'center', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(29,185,84,0.3)'; e.currentTarget.style.color = '#1DB954'; e.currentTarget.style.background = 'rgba(29,185,84,0.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                    >
                      <Icon size={20} />
                      {social.label}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Google Maps embed */}
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', height: '240px', background: 'var(--color-bg-card)' }}>
              <iframe
                title="Guard Film — studio location, Chișinău"
                src={MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', filter: 'contrast(1.05) brightness(0.92)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
