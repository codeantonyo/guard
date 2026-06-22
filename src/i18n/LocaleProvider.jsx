import { createContext, useContext, useState, useCallback } from 'react'
import { getCookie, setCookie } from '../lib/cookies'
import { translations } from './translations'

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ro', label: 'RO', name: 'Română' },
  { code: 'ru', label: 'RU', name: 'Русский' },
]
const CODES = SUPPORTED_LOCALES.map((l) => l.code)

const LocaleContext = createContext({ locale: 'en', setLocale: () => {}, t: (k) => k })

function detectLocale() {
  // 1) explicit ?lang= (hreflang / sitemap URLs)
  if (typeof window !== 'undefined') {
    const param = new URLSearchParams(window.location.search).get('lang')
    if (CODES.includes(param)) return param
  }
  // 2) returning visitor's saved choice
  const saved = getCookie('gf_lang')
  if (CODES.includes(saved)) return saved
  // 3) Moldova default = Romanian. Russian-language browsers get Russian (Moldova's
  //    other main language); everyone else (incl. English/unknown) opens in Romanian.
  if (typeof navigator !== 'undefined') {
    const browser = (navigator.language || '').slice(0, 2).toLowerCase()
    if (browser === 'ru') return 'ru'
  }
  return 'ro'
}

function resolve(obj, key) {
  return key.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj)
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale)

  const setLocale = useCallback((code) => {
    setLocaleState(code)
    setCookie('gf_lang', code, 365)
    if (typeof document !== 'undefined') document.documentElement.lang = code
  }, [])

  // Returns translated value (string OR array); falls back to EN, then the key itself.
  const t = useCallback(
    (key) => {
      const val = resolve(translations[locale], key)
      if (val !== undefined && val !== null) return val
      const fallback = resolve(translations.en, key)
      return fallback !== undefined && fallback !== null ? fallback : key
    },
    [locale]
  )

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export const useLocale = () => useContext(LocaleContext)
