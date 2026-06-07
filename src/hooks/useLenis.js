import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

/**
 * Sets up Lenis smooth scrolling for the lifetime of the calling component
 * and returns a ref to the Lenis instance (e.g. for programmatic scrollTo).
 */
export function useLenis(options = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      smoothTouch: false,
      ...options,
    })
    lenisRef.current = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return lenisRef
}

export default useLenis
