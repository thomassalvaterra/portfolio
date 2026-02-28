<template>
  <section ref="wrap" class="marquee">
    <!-- Riga loghi (auto loop) -->
    <div class="track logos">
      <div class="row auto">
        <img
          v-for="(logo, i) in logos"
          :key="'logo-'+i"
          :src="logo"
          class="logo"
          alt="Brand logo"
        />
        <!-- duplica per loop infinito -->
        <img
          v-for="(logo, i) in logos"
          :key="'logo-dup-'+i"
          :src="logo"
          class="logo"
          alt="Brand logo"
        />
      </div>
    </div>

    <!-- Riga immagini (scroll sync) -->
    <div class="track left">
      <div class="row" :style="{ transform: `translateX(${offsetLeft}px)` }">
        <img v-for="(img, i) in imagesTop" :key="'l'+i" :src="img" />
      </div>
    </div>

    <!-- Riga immagini (scroll sync opposta) -->
    <div class="track right">
      <div class="row" :style="{ transform: `translateX(${offsetRight}px)` }">
        <img v-for="(img, i) in imagesBottom" :key="'r'+i" :src="img" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const wrap = ref(null)
const offsetLeft = ref(0)
const offsetRight = ref(0)

// 🔁 LOGHI
const logos = [
  '/brand/Replica.png',
  '/brand/Origini.png',
  '/brand/Fonzies.png',
  '/brand/JD.png',
  '/brand/GearXPro.png',
]

// 🖼️ IMMAGINI
const modules = import.meta.glob('/src/assets/work/*.{jpg,png,webp,JPG,PNG,WEBP}', { eager: true })
const images = Object.values(modules).map(m => m.default)

// Duplica per riempire sempre la riga (niente buchi)
const imagesTop = [...images, ...images, ...images]
const imagesBottom = [...images, ...images, ...images]

// BASE iniziale (più alto = meno rischio di buchi)
const BASE = 800
const MAX_MOVE = 520

const update = () => {
  if (!wrap.value) return

  const rect = wrap.value.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight

  // progress normalizzato 0 → 1
  const progress = 1 - Math.min(Math.max(rect.top / vh, 0), 1)

  offsetLeft.value  = -BASE - progress * MAX_MOVE
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
  --gap: 6px;
  padding: 34px 0 96px;
  overflow: hidden;
  width: 100%;
  margin-left: calc(50% - 50vw);  /* full-bleed */
}

/* Track generica */
.track{
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;
}

/* Riga */
.row{
  display: flex;
  gap: var(--gap);
  width: max-content;
  transition: transform .08s linear; /* smoothing scroll-sync */
  margin: 0;
  .row{
  will-change: transform;
  transform: translateZ(0);
}

/* Mobile: togli smoothing che "ammazza" il movimento */
@media (max-width: 900px){
  .row{
    transition: none;
  }
}
}

/* --- RIGA LOGHI (auto) --- */
.track.logos{
  margin-bottom: 32px;
}

.row.auto{
  animation: logosScroll 28s linear infinite;
}

@keyframes logosScroll{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }  /* loop continuo */
}

.logo{
  height: 36px;
  width: auto;
  opacity: .9;
  filter: grayscale(1) brightness(1.1);
  transition: opacity .2s ease, filter .2s ease, transform .2s ease;
}

.logo:hover{
  opacity: 1;
  filter: grayscale(0) brightness(1);
  transform: scale(1.05);
}

/* --- RIGHE IMMAGINI (scroll-sync) --- */
.track img{
  width:350px;
  height: 270px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 20px 60px rgba(0,0,0,.45);
  transition: transform .3s ease;
}

.track img:hover{
  transform: scale(1.03);
}

/* Responsive */
@media (max-width: 900px){
  .track img{ width: 260px; height: 180px; }
  .logo{ height: 28px; }
  @media (max-width: 900px){
  /* Nasconde le 2 righe che si muovono con lo scroll */
  .track.left,
  .track.right{
    display: none;
  }

  /* Un po’ di respiro sopra/sotto ai loghi */
  .track.logos{
    margin-bottom: -90px;
  }
}
}


</style>