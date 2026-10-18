<template>
  <section id="home" class="hero">
    <HeroScene />

    <div class="hero-inner">
      <!-- Centro -->
      <div ref="center" class="center">
        <div class="social-proof appear" style="--d: 0ms">
          <span class="stars">★★★★★</span>
          <span class="reviews">+200 recensioni</span>
        </div>

        <h1 class="title">
          <span class="line-1">
            <span v-for="(w, i) in ['Ciao', 'sono', 'un']" :key="w" class="word" :style="{ '--d': `${120 + i * 90}ms` }">{{ w }}</span>
          </span>
          <span class="line-2">
            <span class="typed">{{ currentWord }}</span><span class="cursor"></span>
          </span>
        </h1>

        <p class="sub appear" style="--d: 520ms">
          Aiuto <strong>piccole attività e professionisti</strong> a farsi notare online con
          interfacce <strong>veloci, responsive</strong> e dal look futuristico.
        </p>
      </div>

      <!-- Basso sinistra -->
      <div class="bottom-left appear" style="--d: 700ms">
        <div class="core">
          <span class="spinner-dots"></span>
          <span>Trasformo le tue idee in realtà.</span>
        </div>

        <ul class="stack">
          <li>Ti aiuto a farti notare online (UI che colpiscono)</li>
          <li>Performance alte: siti rapidi e fluidi</li>
          <li>Lavoro su misura, niente template copia-incolla</li>
          <li>Seguo il progetto dall’idea al lancio</li>
        </ul>

        <div class="actions">
          <a href="#contatti" class="btn-light">Contattami</a>
          <a href="#progetti" class="btn-ghost light">Vedi i progetti <span class="arrow">→</span></a>
        </div>
      </div>

      <!-- Basso destra: card di fiducia -->
      <div class="bottom-right appear" style="--d: 850ms">
        <div v-tilt="10" class="trust-card">
          <div class="trust-header">
            <span class="live"></span>
            Il tuo Sviluppatore di Fiducia
          </div>
          <h3>Prenota subito una consulenza gratuita</h3>
          <p>🚀 Parlami della tua idea o esponi il tuo problema e vediamo come poterlo risolvere!</p>
          <a href="#contatti" class="btn-dark trust-cta">Prenota ora</a>
        </div>
        <div class="trust-meta">▸ Consulenza gratuita <span>30 min</span></div>
      </div>

      <a href="#chi-sono" class="scroll-hint appear" style="--d: 1100ms" aria-label="Scorri">
        <span></span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroScene from './HeroScene.vue'

const words = ['Developer', 'Frontend Dev', 'Freelancer']
const currentWord = ref('Developer')
let wordIndex = 0
let charIndex = words[0].length
let deleting = false
let timer = null

const typeSpeed = 90
const deleteSpeed = 55
const pauseAfterType = 1600

const loopType = () => {
  const full = words[wordIndex]

  if (!deleting) {
    currentWord.value = full.slice(0, charIndex++)
    if (charIndex > full.length) {
      deleting = true
      timer = setTimeout(loopType, pauseAfterType)
      return
    }
  } else {
    currentWord.value = full.slice(0, charIndex--)
    if (charIndex < 0) {
      deleting = false
      charIndex = 0
      wordIndex = (wordIndex + 1) % words.length
    }
  }

  timer = setTimeout(loopType, deleting ? deleteSpeed : typeSpeed)
}

// il testo centrale sale e sfuma mentre si scorre
const center = ref(null)
let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const s = Math.min(window.scrollY, window.innerHeight)
    if (center.value) {
      center.value.style.transform = `translate3d(0, ${s * -0.25}px, 0)`
      center.value.style.opacity = String(1 - s / (window.innerHeight * 0.8))
    }
    ticking = false
  })
}

onMounted(() => {
  // parte dopo l'intro, la parola iniziale è già scritta
  deleting = true
  timer = setTimeout(loopType, 2600)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onUnmounted(() => {
  clearTimeout(timer)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.hero{
  position: relative;
  min-height: 100svh;
  min-height: max(100svh, 760px);
  overflow: hidden;
  isolation: isolate;
}

.hero-inner{
  position: relative;
  z-index: 2;
  max-width: 1440px;
  min-height: inherit;
  margin: 0 auto;
  padding: 128px 40px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  gap: 40px;
}

/* ---------- Entrata ---------- */
.appear,
.word{
  opacity: 0;
  animation: rise 1.1s var(--ease) both;
  animation-delay: calc(1300ms + var(--d, 0ms));
}

@keyframes rise{
  from{ opacity: 0; transform: translateY(30px); filter: blur(10px); }
  to{ opacity: 1; transform: none; filter: none; }
}

/* ---------- Centro ---------- */
.center{
  grid-column: 1 / -1;
  text-align: center;
  will-change: transform, opacity;
}

.social-proof{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 16px;
  border-radius: 999px;
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(255,255,255,.8);
  backdrop-filter: blur(10px);
  font-size: 14px;
  margin-bottom: 20px;
}
.stars{ color: #d6a43a; letter-spacing: 2px; font-size: 13px; }
.reviews{ font-weight: 500; color: var(--forest); }

.title{
  font-weight: 400;
  line-height: .95;
  letter-spacing: -.055em;
  font-size: clamp(54px, 8.2vw, 124px);
}

.line-1{
  display: flex;
  justify-content: center;
  gap: 0 .22em;
  flex-wrap: wrap;
}
.line-1 .word{
  display: inline-block;
  background: linear-gradient(180deg, #2d6440, #1c4128);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-bottom: .06em;
}

.line-2{
  display: block;
  min-height: 1em;
  padding-bottom: .08em;
}

.typed{
  background: linear-gradient(90deg, #6c9c7a, #a6c8ad 70%, #b9d4bc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cursor{
  display: inline-block;
  width: .06em;
  height: .8em;
  margin-left: .06em;
  background: #8fb59a;
  border-radius: 2px;
  vertical-align: -.04em;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink{ 50%{ opacity: 0; } }

.sub{
  margin: 22px auto 0;
  max-width: 34ch;
  font-size: clamp(17px, 1.6vw, 21px);
  line-height: 1.45;
  color: #6b766b;
  letter-spacing: -.01em;
}
.sub strong{ font-weight: 500; color: #3c4a3f; }

/* ---------- Basso sinistra ---------- */
.bottom-left{
  align-self: end;
  max-width: 400px;
  color: #eef2e6;
  text-shadow: 0 1px 12px rgba(10,20,12,.45);
}

.core{
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 14px;
}

.spinner-dots{
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px dotted #eef2e6;
  animation: spin 6s linear infinite;
}
@keyframes spin{ to{ transform: rotate(360deg); } }

.stack{
  list-style: none;
  display: grid;
  gap: 6px;
  font-size: 14.5px;
  color: rgba(238,242,230,.85);
}
.stack li{
  position: relative;
  padding-left: 18px;
}
.stack li::before{
  content: '';
  position: absolute;
  left: 0;
  top: .62em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #b7d39a;
}

.actions{
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 26px;
  text-shadow: none;
}
.btn-ghost.light{ color: #f4f1e6; }

/* ---------- Basso destra ---------- */
.bottom-right{
  align-self: end;
  justify-self: end;
  width: min(360px, 100%);
}

.trust-card{
  padding: 22px;
  border-radius: 24px;
  background: rgba(255,255,255,.42);
  border: 1px solid rgba(255,255,255,.7);
  backdrop-filter: blur(22px) saturate(1.3);
  -webkit-backdrop-filter: blur(22px) saturate(1.3);
  box-shadow: 0 30px 60px -24px rgba(10,24,14,.55);
  color: var(--text);
}

.trust-header{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--forest-2);
  background: rgba(255,255,255,.7);
  border-radius: 999px;
  padding: 5px 12px 5px 10px;
  margin-bottom: 14px;
}

.live{
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3fae62;
  box-shadow: 0 0 0 0 rgba(63,174,98,.6);
  animation: ping 2s ease-out infinite;
}
@keyframes ping{
  0%{ box-shadow: 0 0 0 0 rgba(63,174,98,.6); }
  100%{ box-shadow: 0 0 0 10px rgba(63,174,98,0); }
}

.trust-card h3{
  font-size: 22px;
  line-height: 1.15;
  letter-spacing: -.03em;
  margin-bottom: 8px;
  color: var(--forest);
}
.trust-card p{
  font-size: 14.5px;
  color: #3e4a40;
  margin-bottom: 18px;
}
.trust-cta{ width: 100%; }

.trust-meta{
  margin-top: 12px;
  font-size: 13px;
  color: #eef2e6;
  text-shadow: 0 1px 10px rgba(10,20,12,.5);
  padding-left: 6px;
}
.trust-meta span{ opacity: .7; margin-left: 6px; }

/* ---------- Scroll hint ---------- */
.scroll-hint{
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  width: 26px;
  height: 42px;
  border-radius: 999px;
  border: 1.5px solid rgba(255,255,255,.85);
  display: grid;
  justify-items: center;
  padding-top: 8px;
}
.scroll-hint span{
  width: 4px;
  height: 8px;
  border-radius: 4px;
  background: #fff;
  animation: wheel 1.8s var(--ease) infinite;
}
@keyframes wheel{
  0%{ opacity: 0; transform: translateY(-2px); }
  30%{ opacity: 1; }
  100%{ opacity: 0; transform: translateY(12px); }
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px){
  .scroll-hint{ display: none; }
}

@media (max-width: 900px){
  .hero{ min-height: auto; }

  .hero-inner{
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 120px 16px 40px;
    gap: 22px;
  }

  .title{ font-size: clamp(46px, 13vw, 72px); }

  .sub{ margin-top: 20px; }

  .hero :deep(.scene){
    bottom: auto;
    height: 820px;
  }

  .bottom-left{
    margin-top: 290px;
    max-width: none;
    padding: 22px;
    border-radius: 24px;
    background: rgba(20,36,24,.45);
    border: 1px solid rgba(255,255,255,.18);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .bottom-right{
    justify-self: stretch;
    width: 100%;
  }

  .trust-card{ background: rgba(255,255,255,.75); }

  .trust-meta{
    color: var(--muted);
    text-shadow: none;
  }
}

@media (prefers-reduced-motion: reduce){
  .appear, .word{ animation: none; opacity: 1; }
}
</style>
