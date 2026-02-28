<template>
  <section id="home" class="hero hero-full">
    <div class="grid">
      <div ref="glowRef" class="left hero-text glow-bg">

        <div class="social-proof">
          <div class="top-line">
            <span class="stars">★★★★★</span>
            <span class="reviews">+200 recensioni</span>
          </div>
          <div class="tagline">Trasformo le tue idee in realtà.</div>
        </div>

        <h1 class="title">
          <span class="line-1">Ciao sono un</span>
          <span class="line-2">
            <span class="typed">{{ currentWord }}</span>
            <span class="cursor">|</span>
          </span>
        </h1>

        <p>
          Aiuto piccole attività e professionisti a farsi notare online con
          interfacce veloci, responsive e dal look futuristico.
        </p>

        <ul class="stack">
          <li>✅ Ti aiuto a farti notare online (UI che colpiscono)</li>
          <li>✅ Performance alte: siti rapidi e fluidi</li>
          <li>✅ Lavoro su misura, niente template copia-incolla</li>
          <li>✅ Seguo il progetto dall’idea al lancio</li>
        </ul>
      </div>

      <div ref="glowCardRef" class="right glow-bg glow-card">
        <div class="trust-card enter-right">
          <div class="trust-header">Il tuo Sviluppatore di Fiducia</div>

          <div class="trust-body">
            <h3>Prenota subito una consulenza gratuita</h3>
            <p>🚀 Parlami della tua idea o esponi il tuo problema e vediamo come poterlo risolvere!</p>

            <a href="#contatti" class="trust-cta">Prenota ora</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const words = ['Developer', 'Frontend Dev', 'Freelancer']
const currentWord = ref('Developer') // parola fissa di default (mobile)
let wordIndex = 0
let charIndex = 0
let deleting = false
let isDesktop = window.innerWidth >= 768

const typeSpeed = 90
const deleteSpeed = 60
const pauseAfterType = 900

const loopType = () => {
  if (!isDesktop) return   // ❌ su mobile non anima

  const full = words[wordIndex]

  if (!deleting) {
    currentWord.value = full.slice(0, charIndex++)
    if (charIndex > full.length) {
      setTimeout(() => (deleting = true), pauseAfterType)
    }
  } else {
    currentWord.value = full.slice(0, charIndex--)
    if (charIndex < 0) {
      deleting = false
      charIndex = 0
      wordIndex = (wordIndex + 1) % words.length
    }
  }

  setTimeout(loopType, deleting ? deleteSpeed : typeSpeed)
}

// 👉 Glow parallax
const glowRef = ref(null)
const glowCardRef = ref(null)

const onScroll = () => {
  const scrollY = Math.max(0, window.scrollY)

  if (glowRef.value) {
    glowRef.value.style.setProperty('--glow-shift', `${Math.min(scrollY * 0.06, 180)}px`)
  }

  if (glowCardRef.value) {
    glowCardRef.value.style.setProperty('--glow-shift', `${Math.min(scrollY * 0.04, 120)}px`)
  }
}

onMounted(() => {
  isDesktop = window.innerWidth >= 768
  if (isDesktop) loopType()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>


.hero .left{ 
  grid-column: span 8; 
}

.hero .right{ 
  grid-column: span 4; 
  justify-self: end; 
}

/* Testo a sinistra libero sullo sfondo */
.hero-text{
  padding: 16px 8px 16px 8px; /* un po’ di margine dal bordo */
}

.hero-text p{
  max-width: 52ch;      /* larghezza simile allo screenshot */
  margin-top: 14px;
  font-size: 20px;
}

.hero-text ul{
  margin-top: 16px;
  display: grid;
  gap: 8px;
}

/* Hero full width */
.hero-full{
  width: 100%;
  padding: 140px 0 88px; 
}

.hero-full .grid{
  max-width: 1480px;     /* più largo = meno spazio vuoto */
  margin: 0 auto;
  padding: 0 60px;      /* margine laterale simile allo screenshot */
  gap: 14px;            /* colonne più vicine */
}

/* Spingiamo davvero a sinistra il testo */
.hero-full .left{
  padding-left: 12px;
}

@media (min-width: 1200px){
  .hero-full .right{
    margin-left: 24px;   /* ✅ usa margin invece di transform */
  }
}

@media (min-width: 900px){
  .hero .right{
    margin-left: 24px;   /* ✅ */
  }
}

.stack li{
  margin-top: 20px 0;
  font-size: 15px;
  font-weight: 600;
  /*text-shadow: 0 0 12px rgba(92,242,255,.35);*/
}

/* Card di fiducia a destra */
.trust-card{
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 16px;
  overflow: hidden;
  max-width: 440px;
  margin-left: auto; /* spinge a destra */
  box-shadow: 0 20px 60px rgba(0,0,0,.45);
}

.trust-header{
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  color: white;
  padding: 12px 16px;
  font-weight: 800;
  letter-spacing: .8px;
  text-align: center;
  font-size: 18px;
}

.trust-body{
  padding: 28px;
}

.trust-body h3{
  text-align: center;
  margin: 6px 0 20px;
  font-size: 25px;
}

.trust-body p{
  text-align: center;
  color: var(--muted);
  margin-bottom: 20px;
  font-size: 16px
}

.trust-cta{
  display:flex;
  justify-content: center;
  background: #2563eb;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 700;
  box-shadow: 0 0 24px rgba(37,99,235,.45);
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
  font-size: 16px;
}

.trust-cta:hover{
  transform: translateY(-2px);
  box-shadow: 0 0 36px rgba(37,99,235,.7);
  filter: brightness(1.05);
}

h1{ font-size: clamp(28px, 4vw, 44px); line-height: 1.1; margin: 12px 0; }
.accent{
  display:block;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 12px rgba(92,242,255,.35));
}
p{ color: var(--muted); max-width: 52ch; }
.chip{ display:inline-block; padding:6px 10px; border-radius:999px; border:1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04); font-size:12px; }
.actions{ display:flex; gap:12px; margin-top: 18px; }
.ghost{ color: var(--text); opacity:.8; }
.ghost:hover{ opacity:1; text-decoration: underline; }
.orb{
  position:absolute; width:220px; height:220px; right:-40px; top:-40px; border-radius:50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(92,242,255,.9), transparent 55%),
    radial-gradient(circle at 70% 70%, rgba(138,125,255,.9), transparent 55%);
  filter: blur(22px); animation: float 8s ease-in-out infinite;
}
@keyframes float{ 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(16px); } }
.stack{ list-style:none; padding:0; margin:0; }
.stack li{ padding:10px 0; border-bottom: 1px dashed rgba(255,255,255,.1); }

.title{
  font-weight: 900;
  line-height: 1.05;
}

.line-1{
  display: block;
  font-size: clamp(44px, 6vw, 72px);
  opacity: .85;
}

.line-2{
  display: block;
  font-size: clamp(72px, 9vw, 112px); /* 🔥 più grande */
  margin-top: 10px;
  min-height: 1.1em;
}

.typed{
  color: var(--accent); /* blu/ciano del tema */
  text-shadow: 0 0 28px rgba(92,242,255,.45);
}

.cursor{
  margin-left: 6px;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink{
  50%{ opacity: 0; }
}

.social-proof{
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 20px;
}

.top-line{
  flex-direction: column;   /* stelle sopra */
    align-items: flex-start;  /* oppure center se le vuoi centrate */
    gap: 6px;
}

.stars{
  color: #facc15; /* giallo stelline */
  text-shadow: 0 0 12px rgba(250, 204, 21, .45);
  letter-spacing: 1px;
  order: 1;
    font-size: 18px; 
}

.reviews{
  font-weight: 700;
  opacity: .9;
  order: 2;
}

.tagline{
  color: var(--muted);
  font-size: 16px;
}

.glow-bg{
  position: relative;
}

.glow-bg::before{
  content: '';
  position: absolute;
  inset: -60px;
  background:
    radial-gradient(380px 220px at 20% 20%, rgba(59,130,246,.28), transparent 60%),
    radial-gradient(420px 260px at 40% 60%, rgba(16,185,129,.22), transparent 65%);
  filter: blur(36px);
  z-index: -1;
  transform: translate3d(0, var(--glow-shift, 0px), 0);  /* 👈 usa la variabile */
  will-change: transform;
}

@keyframes glowMove{
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(20px, -10px) scale(1.05); }
}

.enter-right{
  animation: slideInRight .7s cubic-bezier(.2,.8,.2,1) .1s both;
  animation-duration: 1s;
}

@keyframes slideInRight{
  from{
    opacity: 0;
    transform: translateX(40px) scale(.98);
  }
  to{
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@media (max-width: 768px) {
  .line-2{
    font-size: 48px;
  }

  .cursor{
    display: none;  /* ❌ niente cursore che lampeggia su mobile */
  }
}

@media (max-width: 900px){
  .hero .left,
  .hero .right{
    grid-column: 1 / -1;   /* prende tutta la riga */
    justify-self: center; /* centra */
  }

  .hero-full .grid{
    padding: 0 16px;
    text-align: center;
  }

  .hero-text{
    padding: 0;
  }

  .trust-card{
    margin: 24px auto 0; /* card centrata */
  }
}
</style>