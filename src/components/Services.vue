<template>
  <section id="servizi" class="services">
    <div class="wrap services-grid">
      <div v-reveal class="head services-head">
        <span class="eyebrow">Servizi</span>
        <h2 class="section-title">
          Tutti i servizi che offro <span class="soft">per i miei clienti</span>
        </h2>
      </div>

      <!-- Card che restano agganciate e si impilano una sull'altra mentre si scorre -->
      <div class="stack">
        <article
          v-for="(s, i) in services"
          :key="s.title"
          :ref="(el) => (stackEls[i] = el)"
          class="stack-card"
          :class="'tone-' + i"
          :style="{ '--i': i }"
        >
          <div class="stack-inner">
            <div class="stack-top">
              <div class="icon" v-html="s.icon"></div>
              <span class="num">0{{ i + 1 }} / 0{{ services.length }}</span>
            </div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="pacchetti" class="pricing">
    <div class="wrap">
      <div v-reveal class="head">
        <span class="eyebrow">Pacchetti</span>
        <h2 class="section-title">
          Soluzioni moderne per <span class="soft">valorizzare il tuo brand online</span>
        </h2>
      </div>

      <div class="pricing-grid">
        <div v-for="(p, i) in plans" :key="p.name" v-reveal="i * 120" class="price-wrap">
          <div v-tilt="6" class="price-card" :class="{ featured: p.featured }">
            <span v-if="p.featured" class="badge">Più richiesto</span>

            <h3>{{ p.name }}</h3>
            <p class="desc">{{ p.desc }}</p>
            <p class="time">⏱ {{ p.time }}</p>

            <div class="price">{{ p.price }}</div>

            <ul>
              <li v-for="f in p.features" :key="f">{{ f }}</li>
            </ul>

            <a href="#contatti" :class="p.featured ? 'btn-light' : 'btn-dark'" class="cta">{{ p.cta }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stackEls = ref([])

// mentre la card successiva sale, quella sotto si rimpicciolisce e si scurisce
let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const els = stackEls.value
    for (let i = 0; i < els.length - 1; i++) {
      const cur = els[i]
      const next = els[i + 1]
      if (!cur || !next) continue
      const curTop = cur.getBoundingClientRect().top
      const nextTop = next.getBoundingClientRect().top
      const h = cur.offsetHeight
      const p = Math.min(Math.max(1 - (nextTop - curTop) / h, 0), 1)
      cur.firstElementChild.style.transform = `scale(${(1 - p * 0.06).toFixed(4)}) translateY(${(-p * 10).toFixed(2)}px)`
      cur.firstElementChild.style.filter = `brightness(${(1 - p * 0.12).toFixed(3)})`
    }
    ticking = false
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const services = [
  {
    title: 'Design grafico',
    text: 'Partendo dalla tua idea realizzo la grafica perfetta per il tuo servizio utilizzando i concetti di design più aggiornati.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 1 9-9c0 2.5-2 3-3.5 3H15a2 2 0 0 0-1.5 3.3A1.7 1.7 0 0 1 12 21Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15.5" cy="8" r="1"/></svg>'
  },
  {
    title: 'Sviluppo Web',
    text: 'Sviluppo siti web moderni, responsive e ottimizzati per performance e conversioni.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2.5"/><path d="m9 9-2 2 2 2M15 9l2 2-2 2M8 21h8"/></svg>'
  },
  {
    title: 'Pubblicazione, Analisi e Store',
    text: 'Ti seguo dal rilascio alla pubblicazione, con analisi delle performance e supporto continuo.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2-.1-2.8a2 2 0 0 0-2.9-.2Z"/><path d="M12 15 9 12a15 15 0 0 1 9-9c1 0 3 0 3 3a15 15 0 0 1-9 9Z"/><path d="M9 12H5s.5-3 2-4c1.6-1 4 0 4 0M12 15v4s3-.5 4-2c1-1.6 0-4 0-4"/></svg>'
  }
]

const plans = [
  {
    name: 'Starter',
    desc: 'Ideale per landing page e piccole attività che vogliono una presenza online moderna.',
    time: '1–2 settimane',
    price: 'da 800€',
    features: ['Landing page o mini sito', 'UI moderna responsive', 'Vue.js oppure React', 'Form contatti', 'SEO base', 'Deploy e setup hosting', 'Animazioni leggere'],
    cta: 'Richiedi informazioni'
  },
  {
    name: 'Business',
    desc: 'Soluzione professionale per aziende, professionisti e brand che vogliono distinguersi.',
    time: '3–6 settimane',
    price: 'da 1.800€',
    features: ['Design personalizzato', 'Frontend Vue.js / React', 'Backend Laravel o Supabase', 'CMS custom', 'Dashboard amministrativa', 'SEO avanzata', 'Animazioni premium', 'Effetti 3D leggeri'],
    cta: 'Richiedi informazioni',
    featured: true
  },
  {
    name: 'Premium / Custom',
    desc: 'Esperienze web immersive e web app avanzate sviluppate completamente su misura.',
    time: '1–4 mesi',
    price: 'da 4.000€',
    features: ['Web app custom', 'Autenticazione utenti', 'API integrations', 'Pagamenti Stripe', 'Realtime features', 'Esperienze 3D immersive', 'Three.js / React Three Fiber', 'Performance avanzate'],
    cta: 'Prenota una call'
  }
]
</script>

<style scoped>
.services{
  padding: 80px 0 120px;
}

.head{
  text-align: center;
  margin-bottom: 64px;
}
.head .section-title{
  margin: 22px auto 0;
  max-width: 18ch;
}

.services-grid{
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: 60px;
  align-items: start;
}

.services-head{
  position: sticky;
  top: 140px;
  text-align: left;
  margin-bottom: 0;
}
.services-head .section-title{ margin-left: 0; }

.stack{
  display: grid;
  gap: 40px;
  padding-bottom: 40px;
}

.stack-card{
  position: sticky;
  top: calc(130px + var(--i) * 26px);
}

.stack-inner{
  min-height: 320px;
  display: flex;
  flex-direction: column;
  padding: 36px 38px;
  border-radius: 30px;
  border: 1px solid var(--line);
  box-shadow: 0 -10px 40px -24px rgba(31,58,39,.35), var(--shadow-soft);
  transform-origin: 50% 0;
  will-change: transform;
}

.tone-0 .stack-inner{ background: var(--panel-solid); }
.tone-1 .stack-inner{ background: linear-gradient(160deg, #e4ecdc, #d3e2d0); }
.tone-2 .stack-inner{
  background:
    radial-gradient(80% 60% at 100% 0%, rgba(143,191,154,.3), transparent 60%),
    linear-gradient(160deg, #24432e, #16281b);
  color: #eef2e6;
  border-color: rgba(255,255,255,.08);
}

.stack-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.num{
  font-size: 14px;
  color: var(--muted);
}
.tone-2 .num{ color: rgba(238,242,230,.6); }

.icon{
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #f4f1e6;
  background: linear-gradient(160deg, #3f7a52, #1f3a27);
  box-shadow: 0 14px 26px -12px rgba(31,58,39,.6), 0 1px 0 rgba(255,255,255,.25) inset;
}
.tone-2 .icon{
  color: var(--forest);
  background: linear-gradient(160deg, #f7f4ea, #d9e7d6);
}
.icon :deep(svg){ width: 28px; height: 28px; }

.stack-inner h3{
  margin: auto 0 12px;
  padding-top: 40px;
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 400;
  letter-spacing: -.04em;
  color: var(--forest);
}
.tone-2 h3{ color: #f4f1e6; }

.stack-inner p{
  color: var(--muted);
  font-size: 17px;
  max-width: 46ch;
}
.tone-2 p{ color: rgba(238,242,230,.72); }

/* ---------- Pricing ---------- */
.pricing{
  padding: 40px 0 120px;
}

.pricing-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
}

.price-wrap{ height: 100%; }

.price-card{
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 34px 30px;
  border-radius: 28px;
  background: var(--panel-solid);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
}

.price-card h3{
  font-size: 26px;
  color: var(--forest);
  margin-bottom: 8px;
}
.price-card .desc{
  color: var(--muted);
  font-size: 15px;
  margin-bottom: 12px;
}
.price-card .time{
  font-size: 14px;
  color: var(--muted);
}

.price{
  font-size: 46px;
  font-weight: 400;
  letter-spacing: -.04em;
  color: var(--forest);
  margin: 22px 0;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
}

.price-card ul{
  list-style: none;
  display: grid;
  gap: 10px;
  margin-bottom: 30px;
  flex: 1;
}
.price-card li{
  position: relative;
  padding-left: 28px;
  font-size: 15px;
}
.price-card li::before{
  content: '';
  position: absolute;
  left: 0;
  top: .2em;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(47,107,69,.12) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232f6b45' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 12 4 4 8-8'/%3E%3C/svg%3E") center / 12px no-repeat;
}

.cta{ width: 100%; }

.featured{
  background:
    radial-gradient(120% 60% at 50% 0%, rgba(143,191,154,.35), transparent 60%),
    linear-gradient(180deg, #24432e, #16281b);
  color: #eef2e6;
  border-color: rgba(255,255,255,.08);
  box-shadow: 0 50px 90px -40px rgba(22,40,27,.8);
}
.featured h3,
.featured .price{ color: #f4f1e6; }
.featured .desc,
.featured .time{ color: rgba(238,242,230,.7); }
.featured .price{ border-color: rgba(255,255,255,.12); }
.featured li::before{
  background-color: rgba(185,210,189,.18);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b9d2bd' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 12 4 4 8-8'/%3E%3C/svg%3E");
}

.badge{
  position: absolute;
  top: 26px;
  right: 26px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: var(--forest);
  background: #d9ead9;
}

@media (max-width: 1000px){
  .pricing-grid{ grid-template-columns: 1fr; }
  .services-grid{ grid-template-columns: 1fr; gap: 36px; }
  .services-head{ position: static; text-align: center; }
  .services-head .section-title{ margin-left: auto; }
  .stack{ gap: 24px; }
  .stack-card{ top: calc(90px + var(--i) * 18px); }
  .stack-inner{ min-height: 280px; padding: 26px 24px; border-radius: 24px; }
  .head{ margin-bottom: 40px; }
  .services{ padding: 60px 0 80px; }
  .pricing{ padding: 20px 0 80px; }
}
</style>
