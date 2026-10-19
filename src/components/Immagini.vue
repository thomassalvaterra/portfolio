<template>
  <section class="showcase">
    <!-- Loghi: fila ferma su desktop, scorrevole su mobile -->
    <div class="brands">
      <p class="trusted">Hanno lavorato con me</p>
      <div class="logos-track">
        <div class="logos-row">
          <span v-for="(logo, i) in [...logos, ...logos]" :key="i" class="logo-pill" :class="{ dup: i >= logos.length }">
            <img :src="logo.src" :alt="logo.name" loading="lazy" />
          </span>
        </div>
      </div>
    </div>

    <!-- Anello 3D con gli screenshot dei progetti -->
    <div
      ref="stage"
      class="stage"
      :class="{ dragging }"
      @pointerdown="onDown"
      aria-hidden="true"
    >
      <div ref="ring" class="ring" :style="{ '--r': `${radius}px` }">
        <a
          v-for="(p, i) in projects"
          :key="p.title"
          :ref="(el) => (cards[i] = el)"
          href="#progetti"
          class="card"
          tabindex="-1"
          :style="{ transform: `rotateY(${i * step}deg) translateZ(var(--r))` }"
          @click="onCardClick"
        >
          <span class="face front">
            <img :src="p.image" :alt="p.title" loading="lazy" draggable="false" />
          </span>
          <span class="face back">
            <span>{{ p.title }}</span>
          </span>
        </a>
      </div>
      <div class="floor"></div>
    </div>

    <!-- Didascalia del progetto in primo piano -->
    <div class="caption">
      <transition name="cap" mode="out-in">
        <div :key="active" class="cap-inner">
          <span class="cap-index">{{ String(active + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</span>
          <h3>{{ projects[active].title }}</h3>
          <div class="cap-tags">
            <span v-for="t in projects[active].tech" :key="t">{{ t }}</span>
          </div>
        </div>
      </transition>
      <a href="#progetti" class="btn-ghost all">Vedi tutti i progetti <span class="arrow">→</span></a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { projects } from '@/data/projects'

const logos = [
  { name: 'Replica Sistemi', src: '/brand/Replica.webp' },
  { name: 'Origini', src: '/brand/Origini.webp' },
  { name: 'Fonzies', src: '/brand/Fonzies.webp' },
  { name: 'JD', src: '/brand/JD.webp' },
  { name: 'GearXPro', src: '/brand/GearXPro.webp' }
]

const step = 360 / projects.length
const stage = ref(null)
const ring = ref(null)
const cards = []
const active = ref(0)
const dragging = ref(false)
const radius = ref(480)

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// raggio calcolato dalla larghezza delle card, così non si sovrappongono
const computeRadius = () => {
  const w = window.innerWidth < 700 ? 210 : 380
  radius.value = Math.round((w / 2) / Math.tan(Math.PI / projects.length) * 1.12)
}

let rot = 0
let velocity = 0
let tiltX = -6, tiltTarget = -6
let lastScroll = window.scrollY
let raf = 0
let running = false
let io = null

// trascinamento
let dragX = 0
let moved = 0

const onDown = (e) => {
  dragging.value = true
  dragX = e.clientX
  moved = 0
  window.addEventListener('pointermove', onDrag)
  window.addEventListener('pointerup', onUp, { once: true })
}
const onDrag = (e) => {
  const dx = e.clientX - dragX
  dragX = e.clientX
  moved += Math.abs(dx)
  velocity = -dx * 0.25
}
const onUp = () => {
  dragging.value = false
  window.removeEventListener('pointermove', onDrag)
}
// un trascinamento non deve diventare un click sulla card
const onCardClick = (e) => {
  if (moved > 6) e.preventDefault()
}

const onPointer = (e) => {
  if (dragging.value) return
  tiltTarget = -6 + (e.clientY / window.innerHeight - 0.5) * -10
}

const norm = (a) => ((a % 360) + 540) % 360 - 180

const frame = () => {
  const s = window.scrollY
  const ds = s - lastScroll
  lastScroll = s

  // rotazione: lenta da sola, spinta da scroll e trascinamento, con inerzia
  if (!dragging.value) velocity += ds * 0.04
  velocity = Math.max(-6, Math.min(6, velocity * 0.92))
  rot -= (reduce ? 0 : 0.06) + velocity
  tiltX += (tiltTarget - tiltX) * 0.06

  ring.value.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(${tiltX.toFixed(2)}deg) rotateY(${rot.toFixed(2)}deg)`

  // la card più vicina allo spettatore è quella attiva; le altre si scuriscono
  let best = 0, bestA = 999
  for (let i = 0; i < cards.length; i++) {
    const a = norm(i * step + rot)
    const c = Math.cos((a * Math.PI) / 180)
    if (cards[i]) cards[i].style.setProperty('--lit', (0.55 + 0.45 * Math.max(c, 0)).toFixed(3))
    if (Math.abs(a) < bestA) { bestA = Math.abs(a); best = i }
  }
  if (best !== active.value) active.value = best

  if (running) raf = requestAnimationFrame(frame)
}

const start = () => {
  if (running) return
  running = true
  lastScroll = window.scrollY
  raf = requestAnimationFrame(frame)
}
const stop = () => {
  running = false
  cancelAnimationFrame(raf)
}

onMounted(() => {
  computeRadius()
  window.addEventListener('resize', computeRadius)
  window.addEventListener('pointermove', onPointer, { passive: true })
  io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
  io.observe(stage.value)
  // primo frame anche se non visibile, per posizionare le card
  requestAnimationFrame(frame)
})

onUnmounted(() => {
  stop()
  io?.disconnect()
  window.removeEventListener('resize', computeRadius)
  window.removeEventListener('pointermove', onPointer)
  window.removeEventListener('pointermove', onDrag)
})
</script>

<style scoped>
.showcase{
  padding: 40px 0 30px;
  overflow: hidden;
}

/* ---------- Loghi ---------- */
.trusted{
  text-align: center;
  font-size: 13px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 20px;
}

.logos-track{ overflow: hidden; }

.logos-row{
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  padding: 0 16px;
}

.logo-pill{
  width: 168px;
  height: 76px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(255,255,255,.6);
  border: 1px solid rgba(255,255,255,.9);
  box-shadow: 0 10px 26px -16px rgba(31,58,39,.4);
  transition: transform .4s var(--ease), background .3s ease;
}
.logo-pill.dup{ display: none; }

.logo-pill img{
  max-width: 62%;
  max-height: 38px;
  object-fit: contain;
  mix-blend-mode: multiply;
  filter: grayscale(1) contrast(1.5) brightness(1.08);
  opacity: .75;
  transition: opacity .3s ease, filter .3s ease;
}

.logo-pill:hover{
  transform: translateY(-3px);
  background: #fff;
}
.logo-pill:hover img{
  opacity: 1;
  filter: grayscale(0) contrast(1.1);
}

/* ---------- Anello 3D ---------- */
.stage{
  position: relative;
  height: 480px;
  margin-top: 50px;
  perspective: 1400px;
  perspective-origin: 50% 40%;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
}
.stage.dragging{ cursor: grabbing; }

.ring{
  position: absolute;
  left: 50%;
  top: 46%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  will-change: transform;
}

.card{
  position: absolute;
  width: 380px;
  height: 238px;
  margin: -119px 0 0 -190px;
  transform-style: preserve-3d;
}

.face{
  position: absolute;
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.front{
  background: #dfe8d9;
  padding: 7px;
  box-shadow: 0 30px 50px -30px rgba(31,58,39,.6);
  filter: brightness(var(--lit, 1));
}
.front img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 14px;
  display: block;
}

.back{
  transform: rotateY(180deg);
  display: grid;
  place-items: center;
  background: linear-gradient(160deg, #e3ebdc, #cddcc9);
  border: 1px solid rgba(255,255,255,.7);
  color: var(--forest-2);
  font-size: 22px;
  letter-spacing: -.03em;
  text-align: center;
  padding: 20px;
}

/* ombra morbida a terra */
.floor{
  position: absolute;
  left: 50%;
  bottom: 0;
  width: min(900px, 90vw);
  height: 80px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(31,58,39,.22), transparent);
  filter: blur(6px);
}

/* ---------- Didascalia ---------- */
.caption{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 26px;
  text-align: center;
  padding: 0 16px;
}

.cap-inner{ min-height: 108px; }

.cap-index{
  font-size: 13px;
  letter-spacing: .08em;
  color: var(--muted);
}

.caption h3{
  font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 400;
  letter-spacing: -.04em;
  color: var(--forest);
  margin: 4px 0 12px;
}

.cap-tags{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
}
.cap-tags span{
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 13px;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--forest-2);
}

.all{
  margin-top: 14px;
  color: var(--forest);
}

.cap-enter-active, .cap-leave-active{ transition: opacity .3s ease, transform .3s var(--ease), filter .3s ease; }
.cap-enter-from{ opacity: 0; transform: translateY(10px); filter: blur(4px); }
.cap-leave-to{ opacity: 0; transform: translateY(-10px); filter: blur(4px); }

/* ---------- Mobile ---------- */
@media (max-width: 900px){
  .showcase{ padding: 10px 0 20px; }

  .logos-track{
    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  }
  .logos-row{
    width: max-content;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 10px;
    padding: 0;
    animation: logosScroll 26s linear infinite;
  }
  .logo-pill{ width: 128px; height: 60px; }
  .logo-pill.dup{ display: grid; }
}

@media (max-width: 700px){
  .stage{
    height: 300px;
    margin-top: 36px;
  }
  .card{
    width: 210px;
    height: 132px;
    margin: -66px 0 0 -105px;
  }
  .face{ border-radius: 14px; }
  .front{ padding: 5px; }
  .front img{ border-radius: 10px; }
  .back{ font-size: 16px; }
}

@keyframes logosScroll{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }
}
</style>
