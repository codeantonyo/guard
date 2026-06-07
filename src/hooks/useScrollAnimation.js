import { useInView } from 'react-intersection-observer'

/**
 * Convenience wrapper around react-intersection-observer for reveal-on-scroll.
 * Returns a ref, the inView flag, and ready-made framer-motion props.
 *
 *   const { ref, inView, motionProps } = useScrollAnimation()
 *   <motion.div ref={ref} {...motionProps}>…</motion.div>
 */
export function useScrollAnimation({ threshold = 0.15, triggerOnce = true, y = 40, duration = 0.7, delay = 0 } = {}) {
  const { ref, inView } = useInView({ threshold, triggerOnce })

  const motionProps = {
    initial: { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  }

  return { ref, inView, motionProps }
}

export default useScrollAnimation
