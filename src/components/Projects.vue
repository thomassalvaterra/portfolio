<template>
  <section id="progetti" ref="projectsSection" class="projects">
    <div class="wrap">
      <div class="head">
        <span v-reveal class="eyebrow">Progetti</span>
        <p ref="wordsEl" class="glow-words">
          <span v-for="(w, i) in words" :key="i" :style="{ '--i': i }" :class="{ lit: i < litCount }">{{ w }}</span>
        </p>
      </div>

      <div class="list">
        <article
          v-for="(project, i) in (showAll ? projects : projects.slice(0, 3))"
          :key="project.title"
          v-reveal
          class="project"
          :class="{ flip: i % 2 === 1 }"
        >
          <a v-tilt="7" :href="project.link" target="_blank" class="media">
            <img :src="project.image" :alt="project.title" loading="lazy" />
            <span class="open">Apri ↗</span>
          </a>

          <div class="info">
            <span class="index">{{ String(i + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</span>
            <h3>{{ project.title }}</h3>
            <p class="desc">{{ project.desc }}</p>

            <div class="tags">
              <span v-for="tag in project.tech" :key="tag">{{ tag }}</span>
            </div>

            <a :href="project.link" target="_blank" class="btn-dark">Apri progetto →</a>
          </div>
        </article>
      </div>

      <div v-if="projects.length > 3" class="more">
        <button class="btn-light" @click="toggleProjects">
          {{ showAll ? 'Mostra meno' : 'Mostra altri progetti' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const words = 'Ho lavorato a questi progetti utilizzando diversi linguaggi di programmazione e tecnologie moderne. Qui trovi una selezione dei miei lavori più rilevanti, che dimostrano le mie competenze e la mia passione per lo sviluppo.'.split(' ')

const projects = [
  {
    title: 'Flabber Studio',
    desc: 'Ho sviluppato un’esperienza web immersiva per Flabber, combinando 3D, animazioni e interazioni dinamiche. Un racconto digitale che ripercorre la vera storia del brand, presentandone identità, progetti e collaborazioni.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WebGL + GLSL'],
    image: '/project/Flabber.png',
    link: 'https://flabber.it/'
  },
  {
    title: 'Studio Giorgita',
    desc: 'Sviluppo di una piattaforma web moderna per uno studio multidisciplinare, con focus su esperienza utente, identità visiva e conversione. Il progetto integra un sistema di prenotazione intelligente, animazioni raffinate, design responsive e performance elevate (99/100 Lighthouse).',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/project/StudioGiorgita.png',
    link: 'https://studiogiorgita.it/'
  },
  {
    title: 'SportCity',
    desc: 'Redesign completo del sito SportCity Mantova con un approccio moderno e orientato alla conversione. Interfaccia dinamica con animazioni 3D, navigazione intuitiva e ottimizzazione mobile-first.',
    tech: ['Vue.js', 'Tailwind', 'gsap'],
    image: '/project/SportCity.png',
    link: 'https://mantova-sportcity-redesign.vercel.app/'
  },
  {
    title: 'ProjectHub',
    desc: 'Applicazione web full-stack per la gestione dei progetti tra sviluppatore e cliente. Il sistema include autenticazione con ruoli (admin/client), dashboard progetti, caricamento file, feedback del cliente e condivisione delle consegne.',
    tech: ['Next.js', 'Typescript', 'Tailwind', 'Supabase', 'PostgreSQL'],
    image: '/project/ProjectHub.png',
    link: 'https://projecthub-dfnafro00-thomassalvaterras-projects.vercel.app'
  },
  {
    title: 'Ristorboo',
    desc: 'Sito Web completo per ristorante con design accattivante e funzionalità di prenotazione.',
    tech: ['Vue', 'Laravel', 'MySQL', 'UI/UX'],
    image: '/project/RistorBoo.png',
    link: 'https://github.com/thomassalvaterra/laravel-auth'
  },
  {
    title: 'ZampAura E-commerce',
    desc: 'Landing + Pagina prodotto per brand e-commerce. Focus su conversione e UX.',
    tech: ['Shopify', 'UX', 'Altre Librerie'],
    image: '/project/ecommerce.png',
    link: '#'
  },
  {
    title: 'Clone Discord',
    desc: 'Riproduzione semplice della homepage di Discord.',
    tech: ['HTML', 'CSS'],
    image: '/project/discord.png',
    link: 'https://github.com/thomassalvaterra/htmlcss-discord'
  },
  {
    title: 'Sito vetrina Boolzapp',
    desc: 'Sito vetrina Whatsapp Web.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/project/boolzapp.png',
    link: 'https://github.com/thomassalvaterra/vue-boolzapp'
  }
]

const projectsSection = ref(null)
const showAll = ref(false)

const toggleProjects = () => {
  showAll.value = !showAll.value
  if (!showAll.value) {
    projectsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// le parole si "accendono" una dopo l'altra mentre si scorre
const wordsEl = ref(null)
const litCount = ref(0)
let ticking = false

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    if (wordsEl.value) {
      const r = wordsEl.value.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1)
      litCount.value = Math.round(progress * words.length)
    }
    ticking = false
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    litCount.value = words.length
    return
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.projects{
  padding: 120px 0 140px;
}

.head{
  max-width: 980px;
  margin: 0 auto 110px;
  text-align: center;
}

.glow-words{
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 .28em;
  font-size: clamp(26px, 3.4vw, 46px);
  line-height: 1.18;
  letter-spacing: -.035em;
}

.glow-words span{
  color: rgba(31,58,39,.16);
  transition: color .5s ease;
}
.glow-words span.lit{ color: var(--forest); }

.list{
  display: grid;
  gap: 120px;
}

.project{
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 64px;
  align-items: center;
}

.project.flip .media{ order: 2; }

.media{
  display: block;
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  padding: 14px;
  background: linear-gradient(160deg, #e7eedf, #d3e2d2);
  box-shadow: var(--shadow-lift);
}

.media img{
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  display: block;
  border-radius: 18px;
  transition: transform 1s var(--ease);
}
.media:hover img{ transform: scale(1.04); }

.open{
  position: absolute;
  right: 28px;
  bottom: 28px;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: 500;
  color: var(--forest);
  opacity: 0;
  transform: translateY(10px) translateZ(40px);
  transition: opacity .4s ease, transform .4s var(--ease);
}
.media:hover .open{ opacity: 1; transform: translateZ(40px); }

.index{
  font-size: 13px;
  color: var(--muted);
  letter-spacing: .08em;
}

.info h3{
  font-size: clamp(32px, 3.6vw, 48px);
  font-weight: 400;
  letter-spacing: -.045em;
  color: var(--forest);
  margin: 10px 0 16px;
}

.desc{
  color: var(--muted);
  font-size: 16.5px;
  line-height: 1.65;
  margin-bottom: 22px;
}

.tags{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}
.tags span{
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--forest-2);
}

.more{
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

@media (max-width: 900px){
  .projects{ padding: 80px 0; }
  .head{ margin-bottom: 60px; }
  .glow-words{ font-size: 24px; }
  .list{ gap: 64px; }
  .project{
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .project.flip .media{ order: 0; }
  .media{ padding: 8px; border-radius: 22px; }
  .media img{ border-radius: 16px; }
  .info .btn-dark{ width: 100%; }
  .more{ margin-top: 60px; }
}
</style>
