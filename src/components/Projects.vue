<template>
  <section id="progetti" ref="projectsSection" class="projects">
    <div class="wrap">
      <div class="head">
        <span v-reveal class="eyebrow">Progetti</span>
        <p ref="wordsEl" class="glow-words">
          <span v-for="(w, i) in words" :key="i" :style="{ '--i': i }" :class="{ lit: i < litCount }">{{ w }}</span>
        </p>
      </div>

      <div class="layout">
        <!-- Desktop: l'immagine resta ferma e cambia col progetto in lettura -->
        <div class="sticky">
          <a
            :href="visible[active].link"
            target="_blank"
            rel="noopener"
            class="frame"
            data-cursor="Apri ↗"
          >
            <img
              v-for="(p, i) in visible"
              :key="p.title"
              :src="p.image"
              :alt="p.title"
              class="shot"
              :class="{ on: i === active, past: i < active }"
              loading="lazy"
            />
          </a>
          <div class="progress">
            <span class="count">{{ String(active + 1).padStart(2, '0') }}</span>
            <span class="bar"><i :style="{ transform: `scaleX(${(active + 1) / visible.length})` }"></i></span>
            <span class="count muted">{{ String(visible.length).padStart(2, '0') }}</span>
          </div>
        </div>

        <div class="list">
          <article
            v-for="(project, i) in visible"
            :key="project.title"
            :ref="(el) => (itemEls[i] = el)"
            class="item"
            :class="{ on: i === active }"
          >
            <!-- Mobile: immagine sopra il testo -->
            <a :href="project.link" target="_blank" rel="noopener" class="media-mobile">
              <img :src="project.image" :alt="project.title" loading="lazy" />
            </a>

            <span class="index">{{ String(i + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</span>
            <h3>{{ project.title }}</h3>
            <p class="desc">{{ project.desc }}</p>

            <div class="tags">
              <span v-for="tag in project.tech" :key="tag">{{ tag }}</span>
            </div>

            <a :href="project.link" target="_blank" rel="noopener" class="btn-dark">Apri progetto →</a>
          </article>
        </div>
      </div>

      <div v-if="projects.length > INITIAL" class="more">
        <button class="btn-light" @click="toggleProjects">
          {{ showAll ? 'Mostra meno' : 'Mostra altri progetti' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { projects } from '@/data/projects'
import { scrollToTarget } from '@/smoothScroll'

const words = 'Ho lavorato a questi progetti utilizzando diversi linguaggi di programmazione e tecnologie moderne. Qui trovi una selezione dei miei lavori più rilevanti, che dimostrano le mie competenze e la mia passione per lo sviluppo.'.split(' ')

const INITIAL = 4
const projectsSection = ref(null)
const showAll = ref(false)
const visible = computed(() => (showAll.value ? projects : projects.slice(0, INITIAL)))

const toggleProjects = async () => {
  showAll.value = !showAll.value
  itemEls.value = []
  await nextTick()
  if (!showAll.value) {
    active.value = Math.min(active.value, INITIAL - 1)
    scrollToTarget(projectsSection.value)
  }
}

// le parole si "accendono" una dopo l'altra mentre si scorre
const wordsEl = ref(null)
const litCount = ref(0)

// progetto attivo = quello il cui testo è più vicino al centro dello schermo
const itemEls = ref([])
const active = ref(0)

let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const vh = window.innerHeight

    if (wordsEl.value && litCount.value < words.length) {
      const r = wordsEl.value.getBoundingClientRect()
      const progress = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1)
      litCount.value = Math.round(progress * words.length)
    }

    let best = active.value
    let bestD = Infinity
    itemEls.value.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const d = Math.abs(r.top + r.height / 2 - vh / 2)
      if (d < bestD) { bestD = d; best = i }
    })
    if (best < visible.value.length) active.value = best

    ticking = false
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) litCount.value = words.length
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
  margin: 0 auto 100px;
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

/* ---------- Layout immagine fissa + testi ---------- */
.layout{
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 64px;
  align-items: start;
}

.sticky{
  position: sticky;
  top: calc(50vh - 250px);
}

.frame{
  display: block;
  position: relative;
  aspect-ratio: 16 / 10.4;
  border-radius: 30px;
  overflow: hidden;
  padding: 14px;
  background: linear-gradient(160deg, #e7eedf, #d3e2d2);
  box-shadow: var(--shadow-lift);
}

.shot{
  position: absolute;
  inset: 14px;
  width: calc(100% - 28px);
  height: calc(100% - 28px);
  object-fit: cover;
  object-position: top;
  border-radius: 18px;
  opacity: 0;
  transform: translateY(40px) scale(1.04);
  clip-path: inset(100% 0 0 0 round 18px);
  transition:
    clip-path .9s var(--ease),
    transform 1.1s var(--ease),
    opacity .5s ease;
}

/* il nuovo progetto "sale" dal basso coprendo il precedente */
.shot.on{
  opacity: 1;
  transform: none;
  clip-path: inset(0 0 0 0 round 18px);
  z-index: 2;
}
.shot.past{
  transform: translateY(-30px) scale(.98);
  clip-path: inset(0 0 100% 0 round 18px);
}

.progress{
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 18px;
  padding: 0 6px;
  font-size: 13px;
  color: var(--forest);
}
.count.muted{ color: var(--muted); }
.bar{
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: rgba(31,58,39,.12);
  overflow: hidden;
}
.bar i{
  display: block;
  height: 100%;
  background: var(--accent);
  transform-origin: 0 50%;
  transition: transform .6s var(--ease);
}

.list{
  display: grid;
}

.item{
  min-height: 62vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;
  opacity: .28;
  transition: opacity .5s ease;
}
.item.on{ opacity: 1; }

.media-mobile{ display: none; }

.index{
  font-size: 13px;
  color: var(--muted);
  letter-spacing: .08em;
}

.item h3{
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

.item .btn-dark{ align-self: flex-start; }

.more{
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

@media (max-width: 900px){
  .projects{ padding: 80px 0; }
  .head{ margin-bottom: 50px; }
  .glow-words{ font-size: 24px; }

  .layout{ grid-template-columns: 1fr; gap: 0; }
  .sticky{ display: none; }

  .item{
    min-height: 0;
    padding: 0 0 56px;
    opacity: 1;
  }

  .media-mobile{
    display: block;
    padding: 8px;
    border-radius: 22px;
    margin-bottom: 20px;
    background: linear-gradient(160deg, #e7eedf, #d3e2d2);
    box-shadow: var(--shadow-soft);
  }
  .media-mobile img{
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
    border-radius: 16px;
  }

  .item .btn-dark{ align-self: stretch; }
  .more{ margin-top: 10px; }
}
</style>
