<template>
  <section id="progetti" class="projects">
    <div class="projects-head">
      <span class="eyebrow">Progetti</span>
      <p class="glow-words">
        <span>Ho</span>
        <span>lavorato</span>
        <span>a</span>
        <span>questi</span>
        <span>progetti</span>
        <span>utilizzando</span>
        <span>diversi</span>
        <span>linguaggi</span>
        <span>di</span>
        <span>programmazione</span>
        <span>e</span>
        <span>tecnologie</span>
        <span>moderne.</span>
        <span>Qui</span>
        <span>trovi</span>
        <span>una</span>
        <span>selezione</span>
        <span>dei</span>
        <span>miei</span>
        <span>lavori</span>
        <span>più</span>
        <span>rilevanti,</span>
        <span>che</span>
        <span>dimostrano</span>
        <span>le</span>
        <span>mie</span>
        <span>competenze</span>
        <span>e</span>
        <span>la</span>
        <span>mia</span>
        <span>passione</span>
        <span>per</span>
        <span>lo</span>
        <span>sviluppo.</span>
      </p>
    </div>

    <div class="projects-archive">
      <article
        v-for="(project, i) in projects"
        :key="i"
        class="project"
        :class="{ in: visible[i] }"
        :ref="el => (projectEls[i] = el)"
      >
        <div class="project-media">
          <img :src="project.image" :alt="project.title" />
        </div>

        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p class="desc">{{ project.desc }}</p>

          <div class="tags">
            <span v-for="(tag, t) in project.tech" :key="t">{{ tag }}</span>
          </div>

          <a :href="project.link" target="_blank" class="btn">
            Apri progetto →
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const projects = [
  {
    title: 'Ristorboo',
    desc: 'Sito Web completo per ristorante con design accattivante e funzionalità di prenotazione.',
    tech: ['Vue', 'Laravel', 'MySQL', 'UI/UX'],
    image: '/src/assets/project/ristorboo.png',
    link: 'https://github.com/thomassalvaterra/laravel-auth'
  },
  {
    title: 'ZampAura E-commerce',
    desc: 'Landing + Pagina prodotto per brand e-commerce. Focus su conversione e UX.',
    tech: ['Shopify', 'UX', 'Altre Librerie'],
    image: '/src/assets/project/ecommerce.png',
    link: '#'
  },
  {
    title: 'Clone Discord',
    desc: 'Riproduzione semplice della homepage di Discord.',
    tech: ['HTML', 'CSS'],
    image: '/src/assets/project/discord.png',
    link: 'https://github.com/thomassalvaterra/htmlcss-discord'
  },
  {
    title: 'Sito vetrina Boolzapp',
    desc: 'Sito vetrina Whatsapp Web.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/src/assets/project/boolzapp.png',
    link: 'https://github.com/thomassalvaterra/vue-boolzapp'
  }
]

const projectEls = ref([])
const visible = ref([])

let io = null

onMounted(() => {
  visible.value = projects.map(() => false)

  const isMobile = window.matchMedia('(max-width: 900px)').matches

  // ✅ Su mobile: rendili subito visibili (zero bug)
  if (isMobile) {
    visible.value = projects.map(() => true)
    return
  }

  // ✅ Desktop/tablet: reveal robusto con IntersectionObserver
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const idx = Number(entry.target.dataset.idx)
        visible.value[idx] = true
        io.unobserve(entry.target)
      })
    },
    { threshold: 0.18 }
  )

  // collega osservatore
  projectEls.value.forEach((el, i) => {
    if (!el) return
    el.dataset.idx = String(i)
    io.observe(el)
  })
})

onUnmounted(() => {
  if (io) io.disconnect()
})
</script>

<style scoped>
.projects {
  padding: 160px 0 200px;
}

.projects-head {
  max-width: 900px;
  margin: 0 auto 80px;
  text-align: center;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  font-size: 30px;
}

.projects-head h2 {
  font-size: clamp(36px, 6vw, 56px);
  margin-bottom: 12px;
}

.projects-head p {
  color: var(--muted);
}

.projects-archive {
  display: grid;
  gap: 80px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 60px;
}

.project {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 48px;
  align-items: center;

  opacity: 0;
  transform: translateY(120px) scale(.96);
  transition: all .9s cubic-bezier(.2,.8,.2,1);
}

.project.in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.project-media {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,.55);
  border: 1px solid rgba(255,255,255,.12);
}

.project-media img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
}

.project-info h3 {
  font-size: clamp(26px, 3vw, 36px);
  margin-bottom: 10px;
  font-family: "Lavishly Yours", cursive;
  font-weight: 600;
  font-style: normal;
}

.project-info .desc {
  color: var(--muted);
  max-width: 48ch;
  margin-bottom: 18px;
  font-size: 18px;      /* 🔥 più grande */
  line-height: 1.6; 
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}

.tags span {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
}

.btn {
  display: inline-block;
  padding: 12px 22px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  font-weight: 900;
}

@media (max-width: 900px) {
  .project {
  grid-template-columns: 1fr;
  gap: 18px;
  padding: 32px 0;   /* 🔥 distanza pulita tra le card */
}

  .projects-head{
    margin: 0 auto 46px;
    padding: 0 16px;
    text-align: center;
  }

  .projects-head .eyebrow{
    font-size: 12px;          /* prima era 30px (troppo) */
    font-weight: 900;
    letter-spacing: .14em;
    padding: 6px 14px;
  }

  .projects-head h2{
    font-size: 32px;
    margin: 12px 0 10px;
    line-height: 1.1;
  }

  /* Testo “glow words” centrato e con spaziatura migliore */
  .projects-head .glow-words{
    justify-content: center;
    text-align: center;
    gap: 6px 8px;
    line-height: 1.55;
    max-width: 560px;
    margin: 0 auto;
  }

  .projects-head .glow-words span{
    font-size: 16px !important;   /* 🔥 più grande su mobile */
  }

  .projects-archive{
    padding: 0 16px;
    gap: 10px; /* più vicino */
  }

  .project{
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .project-media{
    border-radius: 18px;
  }

  .project-media img{
    height: 210px;
  }

  /* Info centrata */
  .project-info{
    text-align: center;
  }

  .project-info h3{
    font-size: 34px; /* font corsivo, ma leggibile */
    margin-bottom: 8px;
  }

  .project-info .desc{
    margin-left: auto;
    margin-right: auto;
    max-width: 52ch;
    font-size: 19px !important;   /* 🔥 forza mobile */
    line-height: 1.7 !important; /* 🔥 più aria */
  }

  .tags{
    justify-content: center;
    margin-bottom: 16px;
  }

  .btn{
    display: inline-block;
    justify-content: center;
    align-items: center;
    width: 100%;           /* bottone full */
    max-width: 340px;      /* ma non enorme */
    margin: 0 auto;
  }
}

.projects-head .glow-words {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.projects-head .glow-words span {
  color: rgba(255,255,255,.55);
  transition: 
    color .2s ease,
    text-shadow .2s ease,
    transform .2s ease;
  cursor: default;
}

.projects-head .glow-words span:hover {
  color: #ffffff;
  text-shadow: 
    0 0 8px rgba(255,255,255,.6),
    0 0 18px rgba(255,255,255,.4),
    0 0 28px rgba(255,255,255,.2);
  transform: translateY(-1px);
}
</style>