import { useEffect } from 'react'
import { useLocale } from '../i18n/LocaleProvider'

const OG_LOCALE = { en: 'en_US', ro: 'ro_RO', ru: 'ru_RU' }

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Keeps the document title, description, keywords and social tags in sync with
// the active language — important for the multilingual Moldova/Romania audience
// and for search engines that render JS.
export default function Seo() {
  const { locale, t } = useLocale()

  useEffect(() => {
    const title = t('seo.title')
    const description = t('seo.description')

    document.title = title
    document.documentElement.lang = locale

    setMeta('name', 'description', description)
    setMeta('name', 'keywords', t('seo.keywords'))

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:locale', OG_LOCALE[locale] || 'ro_RO')

    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
  }, [locale, t])

  return null
}
