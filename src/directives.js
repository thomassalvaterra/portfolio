// Direttive globali: v-reveal (comparsa allo scroll) e v-tilt (inclinazione 3D al passaggio del mouse)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

let io = null
const getObserver = () => {
  if (io) return io
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('in')
        io.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  return io
}

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    if (reduceMotion) {
      el.classList.add('in')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    io?.unobserve(el)
  }
}

export const tilt = {
  mounted(el, binding) {
    el.classList.add('tilt')
    if (reduceMotion || !canHover) return

    const max = binding.value || 8

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.classList.add('tilting')
      el.style.transform = `perspective(1000px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(0)`
      el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
      el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
    }

    const leave = () => {
      el.classList.remove('tilting')
      el.style.transform = ''
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el._tilt = { move, leave }
  },
  unmounted(el) {
    if (!el._tilt) return
    el.removeEventListener('pointermove', el._tilt.move)
    el.removeEventListener('pointerleave', el._tilt.leave)
  }
}
