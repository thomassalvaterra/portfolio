<template>
  <section id="servizi" class="services">
    <div class="services-wrap">
      <div class="services-head">
        <span class="services-eyebrow">Servizi</span>
        <h2 class="services-title">
          Tutti i servizi che offro per i miei clienti
        </h2>
      </div>

      <div class="cards">
        <article class="card">
          <div class="icon purple">🎨</div>
          <h3>Design grafico</h3>
          <p>
            Partendo dalla tua idea realizzo la grafica perfetta per il tuo
            servizio utilizzando i concetti di design più aggiornati.
          </p>
        </article>

        <article class="card">
          <div class="icon blue">💻</div>
          <h3>Sviluppo Web</h3>
          <p>
            Sviluppo siti web moderni, responsive e
            ottimizzati per performance e conversioni.
          </p>
        </article>

        <article class="card">
          <div class="icon orange">🚀</div>
          <h3>Pubblicazione, Analisi e Store</h3>
          <p>
            Ti seguo dal rilascio alla pubblicazione, con analisi delle
            performance e supporto continuo.
          </p>
        </article>
      </div>

      <!--<div class="cta-wrap">
        <a href="#contatti" class="cta">Contattami →</a>
      </div>-->
    </div>
  </section>
  <section id="pacchetti" class="pricing">
  <h2 class="pricing-title muted reveal-pricing">
    Scegli il piano giusto per il tuo progetto
  </h2>

  <div class="pricing-grid">

    <div class="price-card reveal-price delay-1">
      <h3>Starter</h3>
      <p class="desc">Ideale per siti vetrina e landing page</p>
      <p class="time">⏱ 3–5 giorni</p>

      <ul class="no-list">
        <li>✔ UI moderna</li>
        <li>✔ 1–2 pagine</li>
        <li>✔ Responsive</li>
        <li>✔ Contenuti statici</li>
      </ul>

      <div class="price">da 149€</div>
      <a href="#contatti" class="cta">Contattami</a>
    </div>

    <div class="price-card featured">
      <span class="badge">Più scelto</span>
      <h3>Business</h3>
      <p class="desc">Per professionisti e aziende</p>
      <p class="time">⏱ 1–2 settimane</p>

      <ul class="no-list">
        <li>✔ UI/UX personalizzata</li>
        <li>✔ Fino a 5–7 pagine</li>
        <li>✔ Animazioni moderne</li>
        <li>✔ Performance ottimizzate</li>
        <li>✔ Supporto post-consegna</li>
      </ul>

      <div class="price">da 499€</div>
      <a href="#contatti" class="cta">Contattami</a>
    </div>

    <div class="price-card">
      <h3>Pro / Custom</h3>
      <p class="desc">Per progetti su misura</p>
      <p class="time">⏱ Variabile</p>

      <ul class="no-list">
        <li>✔ Sviluppo personalizzato</li>
        <li>✔ Integrazioni API</li>
        <li>✔ Consulenza</li>
        <li>✔ Scalabile nel tempo</li>
      </ul>

      <div class="price">Preventivo</div>
      <a href="#contatti" class="cta">Contattami</a>
    </div>

  </div>
</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pricingTitle = ref(null)

const onScrollRevealPricing = () => {
  if (!pricingTitle.value) return

  const rect = pricingTitle.value.getBoundingClientRect()
  const vh = window.innerHeight

  if (rect.top < vh * 0.85) {
    pricingTitle.value.classList.add('in')
  }
}

onMounted(() => {
  onScrollRevealPricing()
  window.addEventListener('scroll', onScrollRevealPricing, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScrollRevealPricing)
})
</script>

<style scoped>

.services{
  padding: 50px 0 ;
}

.services-wrap{
  max-width: 1480px;
  margin: 0 auto;
  padding: 10px 60px;
}

.services-title{
  text-align: center;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
}

/* Card layout */
.cards{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.card{
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px;
  padding: 42px 36px;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0,0,0,.55);
  transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
}

.card:hover{
  transform: translateY(-8px);
  box-shadow: 0 40px 100px rgba(0,0,0,.65);
  border-color: rgba(92,242,255,.45);
}

.card h3{
  margin: 18px 0 12px;
  font-size: 22px;
}

.card p{
  color: var(--muted);
  line-height: 1.6;
}

/* Icone */
.icon{
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 22px;
  margin: 0 auto 12px;
  box-shadow: 0 0 24px rgba(0,0,0,.35);
}

.icon.purple{ background: linear-gradient(135deg, #7c3aed, #a855f7); }
.icon.blue{ background: linear-gradient(135deg, #2563eb, #3b82f6); }
.icon.orange{ background: linear-gradient(135deg, #f59e0b, #f97316); }

.no-list{
  list-style: none;
}

/* CTA */
.cta-wrap{
  display: flex;
  justify-content: center;
  margin-top: 64px;
}

.cta{
  background: #2563eb;
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  box-shadow: 0 0 28px rgba(37,99,235,.45);
  transition: transform .2s ease, box-shadow .2s ease;
  display: flex;
  justify-content: center;
}

.cta:hover{
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(37,99,235,.75);
}

@media (max-width: 900px){
  .cards{
    grid-template-columns: 1fr;
  }
}

.pricing{
  padding: 0;
  text-align: center;
}

.pricing-title{
  font-size: clamp(36px, 5vw, 52px);
  padding: 0 0 40px;
}

.pricing-grid{
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.price-card{
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px;
  padding: 32px 28px;
  text-align: left;
  position: relative;
  transition: transform .25s ease, box-shadow .25s ease;
}

.price-card:hover{
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0,0,0,.45);
}

.price-card h3{
  font-size: 24px;
  margin-bottom: 6px;
}

.price-card .desc{
  color: var(--muted);
  margin-bottom: 10px;
}

.price-card .time{
  font-size: 14px;
  opacity: .8;
  margin-bottom: 16px;
}

.price-card ul{
  display: grid;
  gap: 8px;
  margin-bottom: 28px;
}

.price{
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 16px;
}
.featured{
  transform: scale(1.03);
  border-color: rgba(92,242,255,.45);
  box-shadow: 0 0 40px rgba(92,242,255,.15);
}

.badge{
  position: absolute;
  top: -12px;
  right: 16px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}

@media (max-width: 900px){
  .pricing-grid{
    grid-template-columns: 1fr;
  }
}

.services-head{
  text-align: center;
  margin-bottom: 72px;
}

.services-eyebrow{
  display: inline-block;
  margin-bottom: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 900;
  letter-spacing: .14em;
  text-transform: uppercase;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  box-shadow:
    0 6px 18px rgba(0,0,0,.25),
    inset 0 1px 1px rgba(255,255,255,.5),
    0 0 24px rgba(92,242,255,.35);
  font-size: 12px;
}

/* Titolo pacchetti più "artistico" */
.pricing-title.muted, .services-title{
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.pricing-title.muted{
  letter-spacing: .03em;
  position: relative;
}
 
.pricing-title.muted::after{
  content: "";
  display: block;
  width: 120px;
  height: 2px;
  margin: 14px auto 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  opacity: .6;
}
</style>