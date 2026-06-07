// Tiny cookie helpers used to persist user preferences (theme, language, car).
export function getCookie(name) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'))
  return match ? decodeURIComponent(match.pop()) : null
}

export function setCookie(name, value, days = 365) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`
}
