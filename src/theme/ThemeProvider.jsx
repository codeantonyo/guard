import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getCookie, setCookie } from '../lib/cookies'

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, toggleTheme: () => {} })

export function getInitialTheme() {
  const saved = getCookie('gf_theme')
  if (saved === 'light' || saved === 'dark') return saved
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // If the user hasn't chosen explicitly, follow OS changes live.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => {
      if (!getCookie('gf_theme')) setThemeState(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const setTheme = useCallback((t) => {
    setThemeState(t)
    setCookie('gf_theme', t, 365)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      setCookie('gf_theme', next, 365)
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
