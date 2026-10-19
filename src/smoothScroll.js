// Scroll fluido con Lenis + ancore (#sezione) gestite da Lenis
import Lenis from 'lenis'

let lenis = null

export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 4)
  })

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // i link interni scorrono con Lenis invece del salto/smooth nativo
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a || e.defaultPrevented) return
    const id = a.getAttribute('href')
    const target = id.length > 1 ? document.querySelector(id) : null
    if (!target) return
    e.preventDefault()
    scrollToTarget(target)
  })
}

export function scrollToTarget(target) {
  const offset = window.innerWidth < 900 ? -40 : -90
  if (lenis) lenis.scrollTo(target, { offset })
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
