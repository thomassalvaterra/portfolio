<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <div ref="ring" class="c-ring" :class="{ hover, label: !!label, down }">
      <span v-if="label" class="text">{{ label }}</span>
    </div>
    <div ref="dot" class="c-dot" :class="{ hidden: !!label }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// solo con mouse vero (niente touch) e senza "riduci animazioni"
const enabled =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const ring = ref(null)
const dot = ref(null)
const hover = ref(false)
const down = ref(false)
const label = ref('')

let x = -100, y = -100, rx = -100, ry = -100
let raf = 0
let visible = false

const INTERACTIVE = 'a, button, input, textarea, select, label, .tilt, [data-cursor]'

const onMove = (e) => {
  x = e.clientX
  y = e.clientY
  if (!visible) {
    visible = true
    rx = x
    ry = y
    document.documentElement.classList.add('has-cursor')
  }
  const el = e.target.closest?.(INTERACTIVE)
  hover.value = !!el
  label.value = el?.closest('[data-cursor]')?.dataset.cursor || ''
}

const onLeave = () => {
  visible = false
  document.documentElement.classList.remove('has-cursor')
}

const onDown = () => (down.value = true)
const onUp = () => (down.value = false)

const loop = () => {
  rx += (x - rx) * 0.18
  ry += (y - ry) * 0.18
  if (ring.value) ring.value.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
  if (dot.value) dot.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  if (!enabled) return
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', onUp)
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerleave', onLeave)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', onUp)
})
</script>

<style scoped>
/* niente contenitore isolato: altrimenti mix-blend-mode non vede la pagina sotto */
.cursor{ display: contents; }

.c-ring,
.c-dot{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  pointer-events: none;
  border-radius: 50%;
  will-change: transform;
  opacity: 0;
}
:global(html.has-cursor) .c-ring,
:global(html.has-cursor) .c-dot{ opacity: 1; }

/* l'anello inverte i colori sotto di sé: si vede sia sul crema che sui pannelli scuri */
.c-ring{
  width: 38px;
  height: 38px;
  margin: -19px 0 0 -19px;
  border: 1.5px solid #fff;
  mix-blend-mode: difference;
  display: grid;
  place-items: center;
  transition: width .35s var(--ease), height .35s var(--ease), margin .35s var(--ease), background .3s ease, border-color .3s ease, opacity .3s ease;
}

.c-ring.hover{
  width: 64px;
  height: 64px;
  margin: -32px 0 0 -32px;
  background: rgba(255,255,255,.12);
}

.c-ring.down{
  width: 30px;
  height: 30px;
  margin: -15px 0 0 -15px;
}

.c-ring.label{
  width: 88px;
  height: 88px;
  margin: -44px 0 0 -44px;
  mix-blend-mode: normal;
  border-color: transparent;
  background: var(--dark-btn);
  box-shadow: 0 16px 30px -12px rgba(24,36,27,.6);
}

.text{
  color: #f4f1e6;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .02em;
}

.c-dot{
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #fff;
  mix-blend-mode: difference;
  transition: opacity .2s ease;
}
:global(html.has-cursor) .c-dot.hidden{ opacity: 0; }
</style>
