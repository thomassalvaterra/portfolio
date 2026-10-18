<template>
  <section ref="wrap" class="marquee">
    <p class="trusted">Hanno lavorato con me</p>

    <!-- Riga loghi (auto loop) -->
    <div class="track logos">
      <div class="row auto">
        <img v-for="(logo, i) in [...logos, ...logos]" :key="'logo-' + i" :src="logo" class="logo" alt="Brand logo" />
      </div>
    </div>

    <!-- Righe immagini con prospettiva 3D, legate allo scroll -->
    <div class="stage">
      <div class="track left">
        <div class="row" :style="{ transform: `translate3d(${offsetLeft}px,0,0)` }">
          <img v-for="(img, i) in imagesTop" :key="'l' + i" :src="img" alt="" loading="lazy" />
        </div>
      </div>

      <div class="track right">
        <div class="row" :style="{ transform: `translate3d(${offsetRight}px,0,0)` }">
          <img v-for="(img, i) in imagesBottom" :key="'r' + i" :src="img" alt="" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const wrap = ref(null)
const offsetLeft = ref(0)
const offsetRight = ref(0)

const logos = [
  '/brand/Replica.webp',
  '/brand/Origini.webp',
  '/brand/Fonzies.webp',
  '/brand/JD.webp',
  '/brand/GearXPro.webp'
]

// le immagini stanno in /public/work
const images = [
  '/work/Develop.webp',
  '/work/Hello.webp',
  '/work/Keyboard.webp',
  '/work/Nature.webp',
  '/work/Overview.webp',
  '/work/Pc.webp',
  '/work/Web.webp'
]

const imagesTop = [...images, ...images, ...images]
const imagesBottom = [...images.slice().reverse(), ...images, ...images]

const BASE = 800
const MAX_MOVE = 520

const update = () => {
  if (!wrap.value) return
  const rect = wrap.value.getBoundingClientRect()
  const vh = window.innerHeight
  const progress = 1 - Math.min(Math.max(rect.top / vh, 0), 1)
  offsetLeft.value = -BASE - progress * MAX_MOVE
  offsetRight.value = -BASE + progress * MAX_MOVE
}

let raf = null
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    update()
    raf = null
  })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', update)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', update)
})
</script>

<style scoped>
.marquee{
  padding: 40px 0 120px;
  overflow: hidden;
}

.trusted{
  text-align: center;
  font-size: 13px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 22px;
}

.track{
  position: relative;
  overflow: hidden;
}

.track.logos{
  margin-bottom: 70px;
  mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
}

.row{
  display: flex;
  gap: 14px;
  width: max-content;
  will-change: transform;
}

.row.auto{
  gap: 70px;
  align-items: center;
  animation: logosScroll 30s linear infinite;
}

@keyframes logosScroll{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }
}

/* i loghi hanno sfondi chiari: multiply li fonde con la crema */
.logo{
  height: 64px;
  width: auto;
  mix-blend-mode: multiply;
  filter: grayscale(1) contrast(1.2);
  opacity: .7;
  transition: opacity .3s ease, filter .3s ease, transform .3s ease;
}
.logo:hover{
  opacity: 1;
  filter: grayscale(0);
  transform: scale(1.06);
}

/* Prospettiva: le righe sono leggermente inclinate verso lo spettatore */
.stage{
  perspective: 1400px;
}

.stage .track{
  transform: rotateX(12deg) rotateZ(-2deg) scale(1.08);
  transform-origin: 50% 50%;
  margin-bottom: 14px;
}

.stage .track.right{
  transform: rotateX(12deg) rotateZ(-2deg) scale(1.08) translateX(-60px);
}

.stage img{
  width: 360px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 30px 50px -28px rgba(31,58,39,.55);
  transition: transform .5s var(--ease), filter .5s ease;
  filter: saturate(.85) sepia(.08);
}

.stage img:hover{
  transform: translateY(-6px) scale(1.03);
  filter: none;
}

@media (max-width: 900px){
  .marquee{ padding: 10px 0 60px; }
  .track.logos{ margin-bottom: 30px; }
  .logo{ height: 48px; }
  .row.auto{ gap: 40px; }
  .stage{ display: none; }
}
</style>
