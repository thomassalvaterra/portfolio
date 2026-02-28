<template>
  <section id="chi-sono" class="about">
    <div class="about-grid">
      <!-- Testo -->
      <div ref="left" class="about-text reveal">
        <span class="eyebrow balloon">Chi sono</span>
        <h2>Sviluppatore Frontend orientato all’impatto</h2>
        <p>
             Ciao! Mi chiamo Thomas Salvaterra e sono uno sviluppatore frontend freelance.
          Amo sviluppare siti web: per me non è solo lavoro, è divertimento. Mi piace costruirli nel modo migliore e più funzionale possibile, pensando sempre a chi li userà davvero.
        </p>

        <div class="divider"></div>

       <div class="tabs">
  <button :class="{ active: tab === 'skills' }" @click="tab = 'skills'">Skills</button>
  <button :class="{ active: tab === 'esperienze' }" @click="tab = 'esperienze'">Esperienze</button>
</div>

<div class="timeline">
  <div v-if="tab === 'skills'" class="timeline-list">

  <div class="item">
    <div class="rail">
      <span class="dot"></span>
      <span class="line"></span>
    </div>

    <div class="content">
      <h4>{{ skills[currentSkill].title }}</h4>
      <small>{{ skills[currentSkill].date }}</small>

      <div class="chips">
        <span
          v-for="(chip, i) in skills[currentSkill].items"
          :key="i"
          class="chip"
        >
          {{ chip }}
        </span>
      </div>

      <button class="more-btn" @click="nextSkill">
        Scopri di più →
      </button>
    </div>
  </div>

</div>

  <div v-else class="timeline-list">

    <div class="item">
      <div class="rail">
        <span class="dot"></span>
        <span class="line"></span>
      </div>

      <div class="content">
        <h4>{{ experiences[currentExp].title }}</h4>
        <small>{{ experiences[currentExp].date }}</small>
        <p>{{ experiences[currentExp].desc }}</p>

        <button class="more-btn" @click="nextExperience">
          Scopri di più →
        </button>
      </div>
    </div>

  </div>
</div>
      </div>

      <!-- Visual -->
      <div ref="right" class="about-visual reveal">
        <span class="eyebrow balloon badge-mobile">Chi sono</span>

        <div class="profile-card">
          <img src="/public/Thomas.png" alt="Profilo" />
          <div class="glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const left = ref(null)
const right = ref(null)
const tab = ref('skills')
const currentSkill = ref(0)

const skills = [
  {
    title: 'Frontend',
    date: 'Dal 2023',
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'Vue 3 (Composition API)',
      'Bootstrap',
      'Tailwind',
      'Git',
      'Figma'
    ]
  },
  {
    title: 'Backend',
    date: 'Dal 2023',
    items: [
      'PHP',
      'MySQL',
      'jQuery',
      'Laravel',
      'SQL Server',
      'C#'
    ]
  }
]

const nextSkill = () => {
  currentSkill.value = (currentSkill.value + 1) % skills.length
}

const isMobile = window.innerWidth < 900

const onScroll = () => {
  const reveal = (el) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight

    if (isMobile || rect.top < vh * 0.85) {
      el.classList.add('in')
    }
  }

  reveal(left.value)
  reveal(right.value)
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const currentExp = ref(0)

const experiences = [
  {
    title: 'Freelance Frontend',
    date: 'Dal 2025',
    desc: 'Collaborazioni con PMI e brand per la creazione di siti web moderni e performanti.'
  },
  {
    title: 'Software Developer - Replica Sistemi',
    date: '07.2024 – 09.2024',
    desc: 'Gestione fatturazione e sistemi interni con SQL Server e C#. Lavoro in team IT su software per la gestione del magazzino.'
  },
  {
    title: 'Jr. Full Stack Web Developer Trainee – Boolean',
    date: '09.2023 – 03.2024',
    desc: 'Sviluppo di web app (clone WhatsApp in JS), siti vetrina in Vue, layout Bootstrap tipo Spotify.'
  }
]

const nextExperience = () => {
  currentExp.value = (currentExp.value + 1) % experiences.length
}
</script>

<style scoped>

.about{
  padding: 140px 0;
  overflow-x: visible;
}

.about-grid{
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 60px;
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 64px;
  align-items: center;
  overflow-x: visible
  ;
}

/* Testo */

.balloon{
  font-weight: 900;
  letter-spacing: .12em;
  padding: 6px 14px;
  border-radius: 999px;             /* effetto palloncino */
  background:
    radial-gradient(120% 120% at 30% 30%, rgba(255,255,255,.25), rgba(255,255,255,.05)),
    linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  box-shadow:
    0 6px 18px rgba(0,0,0,.25),
    inset 0 1px 1px rgba(255,255,255,.5),
    0 0 24px rgba(92,242,255,.35);
  text-transform: uppercase;
  font-size: 12px;
}
.eyebrow{
  text-transform: uppercase;
  letter-spacing: .18em;
  font-size: 12px;
  opacity: .7;
  margin-bottom: 40px;
}

.about-text h2{
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  margin: 14px 0 42px;
}

.about-text p{
  color: var(--muted);
  max-width: 56ch;
  margin-bottom: 42px;
}

.about-text .divider{
  width: 180px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(92,242,255,.6), transparent);
  margin: 28px 0 34px;
}

.bullets{
  margin-top: 26px;
  display: grid;
  gap: 14px;
  font-weight: 600;
}

/* Visual */
.profile-card{
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.12);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  box-shadow: 0 30px 80px rgba(0,0,0,.55);
}

.profile-card img{
  width: 100%;
  height: 520px;
  object-fit: cover;
  display: block;
  filter: contrast(1.05) saturate(1.05);
}

.profile-card .glow{
  position:absolute;
  inset:-40px;
  background:
    radial-gradient(420px 240px at 20% 20%, rgba(59,130,246,.28), transparent 60%),
    radial-gradient(420px 260px at 60% 70%, rgba(16,185,129,.22), transparent 65%);
  filter: blur(36px);
  z-index:-1;
}

/* Reveal */
.reveal{
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .6s cubic-bezier(.2,.8,.2,1), transform .6s cubic-bezier(.2,.8,.2,1);
}
.reveal.in{
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px){
  .about-grid{
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .about-visual{
    order: 1;
    display: flex;
    justify-content: center;
  }
  .profile-card{
    max-width: 320px;
    margin: 0 auto;
  }
  .profile-card img{ 
    height: 370px; 
  }
  .about{
    padding: 90px 0;
  }
  .about-text h2{
    font-size: 32px;
  }
  .about-text{
    order: 2;
    text-align: center;
  }
  @media (max-width: 900px){
  .about-text h2,
  .about-text p,
  .about-text .divider{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .about-text p{
    max-width: 100%;
  }

  .about-text .divider{
    margin: 24px auto 28px;
  }

  .tabs{
    justify-content: center;
  }

  .timeline-list{
    text-align: left; /* il contenuto resta leggibile */
  }
}
}

.tabs{
  display: flex;
  gap: 18px;
  margin: 22px 0;
}

.tabs button{
  background: none;
  border: none;
  color: var(--muted);
  font-weight: 700;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  margin-bottom: 20px;
}

.tabs button.active{
  color: white;
}

.tabs button.active::after{
  content:'';
  position:absolute;
  left:0;
  bottom:-6px;
  width:100%;
  height:2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 999px;
}

.timeline-list{
  display: grid;
  gap: 26px;
}

.item{
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 18px;
  align-items: start; /* base */
}

.rail{
  position: relative;
  display: flex;
  justify-content: center;
}

.dot{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 12px rgba(92,242,255,.6);
  z-index: 2;
}

.line{
  position: absolute;
  top: 14px;
  width: 2px;
  height: calc(100% + 12px);
  background: linear-gradient(180deg, rgba(255,255,255,.25), transparent);
}

.item:last-child .line{
  display:none;
}

.content{
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: -2px; /* 🔥 micro correzione verticale */
}

.content h4{
  font-size: 18px;
  line-height: 1;
  margin: 0;
}

.content small{
  color: var(--muted);
  font-size: 13px;
}

.content p{
  font-size: 15px;
  color: var(--muted);
}

.timeline::before{
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(92,242,255,.6),
    transparent
  );
}

.skills-list{
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: grid;
  gap: 10px;
}

.skills-list li{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Pill stile “badge tech” */
.pill{
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .3px;
  color: white;
  background: linear-gradient(135deg, rgba(92,242,255,.22), rgba(138,125,255,.22));
  border: 1px solid rgba(255,255,255,.18);
  box-shadow: 
    0 0 0 1px rgba(92,242,255,.25) inset,
    0 0 16px rgba(92,242,255,.25);
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
  backdrop-filter: blur(6px);
}

.pill:hover{
  transform: translateY(-2px) scale(1.03);
  box-shadow:
    0 0 0 1px rgba(92,242,255,.4) inset,
    0 0 26px rgba(92,242,255,.55);
  filter: brightness(1.1);
}

.exp-list{
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.exp-list li{
  position: relative;
  padding-left: 18px;
  color: var(--muted);
  font-size: 14px;
}

.exp-list li::before{
  content: '✦';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  text-shadow: 0 0 10px rgba(92,242,255,.6);
}

.more-btn{
  margin-top: 12px;
  align-self: flex-start;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border: none;
  color: #0b0f14;
  font-weight: 800;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
  box-shadow: 0 6px 18px rgba(92,242,255,.35);
}

.more-btn:hover{
  transform: translateY(-1px);
  filter: brightness(1.05);
  box-shadow: 0 10px 28px rgba(92,242,255,.5);
}

.chips{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 6px;
}

.chip{
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  background:
    radial-gradient(120% 120% at 30% 30%, rgba(255,255,255,.18), rgba(255,255,255,.04)),
    linear-gradient(90deg, rgba(92,242,255,.25), rgba(138,125,255,.25));
  border: 1px solid rgba(255,255,255,.14);
  color: #e6f7f2;
  box-shadow: 0 4px 14px rgba(92,242,255,.25);
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
}

.chip:hover{
  transform: translateY(-1px);
  filter: brightness(1.1);
  box-shadow: 0 8px 22px rgba(92,242,255,.45);
}

.about-visual{
  position: relative;
}

/* targhetta sopra l'immagine - nascosta su desktop */
.badge-mobile{
  display: none;
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

/* MOBILE */
@media (max-width: 900px){

  /* nascondo quella nel testo */
  .about-text .eyebrow{
    display: none;
  }

  /* mostro quella sopra l'immagine */
  .badge-mobile{
    display: inline-block;
    animation: floatBadge 3s ease-in-out infinite;
  }


@keyframes floatBadge{
  0%,100%{ transform: translateX(-50%) translateY(0); }
  50%{ transform: translateX(-50%) translateY(-6px); }
}
}
</style>