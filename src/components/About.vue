<template>
  <section id="chi-sono" class="about">
    <div class="wrap about-grid">
      <!-- Testo -->
      <div v-reveal class="about-text">
        <span class="eyebrow">Chi sono</span>
        <h2 class="section-title">
          Sviluppatore Frontend <span class="soft">orientato all’impatto</span>
        </h2>
        <p class="lead">
          Ciao! Mi chiamo Thomas Salvaterra e sono uno sviluppatore frontend freelance.
          Amo sviluppare siti web: per me non è solo lavoro, è divertimento. Mi piace costruirli nel modo migliore e più funzionale possibile, pensando sempre a chi li userà davvero.
        </p>

        <div class="tabs" role="tablist">
          <span class="tab-bg" :style="{ transform: tab === 'skills' ? 'translateX(0)' : 'translateX(100%)' }"></span>
          <button :class="{ active: tab === 'skills' }" @click="tab = 'skills'">Skills</button>
          <button :class="{ active: tab === 'esperienze' }" @click="tab = 'esperienze'">Esperienze</button>
        </div>

        <div class="panel glass">
          <transition name="swap" mode="out-in">
            <div v-if="tab === 'skills'" :key="'s' + currentSkill" class="content">
              <div class="row-head">
                <h4>{{ skills[currentSkill].title }}</h4>
                <small>{{ skills[currentSkill].date }}</small>
              </div>

              <div class="chips">
                <span v-for="(chip, i) in skills[currentSkill].items" :key="chip" class="chip" :style="{ animationDelay: `${i * 40}ms` }">
                  {{ chip }}
                </span>
              </div>

              <div class="foot">
                <span class="dots">
                  <i v-for="(s, i) in skills" :key="i" :class="{ on: i === currentSkill }"></i>
                </span>
                <button class="btn-ghost more" @click="nextSkill">Scopri di più <span class="arrow">→</span></button>
              </div>
            </div>

            <div v-else :key="'e' + currentExp" class="content">
              <div class="row-head">
                <h4>{{ experiences[currentExp].title }}</h4>
                <small>{{ experiences[currentExp].date }}</small>
              </div>
              <p>{{ experiences[currentExp].desc }}</p>

              <div class="foot">
                <span class="dots">
                  <i v-for="(s, i) in experiences" :key="i" :class="{ on: i === currentExp }"></i>
                </span>
                <button class="btn-ghost more" @click="nextExperience">Scopri di più <span class="arrow">→</span></button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Visual -->
      <div v-reveal="150" class="about-visual">
        <div v-tilt="12" class="profile-card">
          <div class="halo"></div>
          <img src="/Thomas.webp" alt="Thomas Salvaterra, Frontend Developer freelance" width="608" height="624" />
          <div class="badge glass float-a">
            <strong>Dal 2023</strong>
            <span>sviluppo web</span>
          </div>
          <div class="badge glass float-b">
            <span class="ping"></span>
            Disponibile per progetti
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('skills')
const currentSkill = ref(0)
const currentExp = ref(0)

const skills = [
  {
    title: 'Frontend',
    date: 'Dal 2023',
    items: ['HTML', 'CSS', 'JavaScript', 'Vue 3 (Composition API)', 'Bootstrap', 'Tailwind', 'Git', 'Figma']
  },
  {
    title: 'Backend',
    date: 'Dal 2023',
    items: ['PHP', 'MySQL', 'jQuery', 'Laravel', 'SQL Server', 'C#']
  }
]

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

const nextSkill = () => {
  currentSkill.value = (currentSkill.value + 1) % skills.length
}

const nextExperience = () => {
  currentExp.value = (currentExp.value + 1) % experiences.length
}
</script>

<style scoped>
.about{
  padding: 60px 0 140px;
}

.about-grid{
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 80px;
  align-items: center;
}

.about-text .section-title{
  margin: 22px 0 26px;
}

.tabs{
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  margin: 38px 0 18px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(31,58,39,.06);
  border: 1px solid var(--line);
}

.tab-bg{
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  width: calc(50% - 5px);
  border-radius: 999px;
  background: var(--dark-btn);
  transition: transform .5s var(--ease);
}

.tabs button{
  position: relative;
  z-index: 1;
  border: 0;
  background: none;
  padding: 9px 26px;
  font-size: 15px;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: color .3s ease;
}
.tabs button.active{ color: #f4f1e6; }

.panel{
  padding: 26px 28px;
  min-height: 210px;
}

.content{
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row-head{
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.row-head h4{
  font-size: 22px;
  color: var(--forest);
}
.row-head small{
  font-size: 13px;
  color: var(--muted);
}

.content p{
  color: var(--muted);
  max-width: 52ch;
}

.chips{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip{
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 14px;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--forest);
  animation: chipIn .5s var(--ease) both;
  transition: transform .3s var(--ease), background .3s ease, color .3s ease;
}
.chip:hover{
  transform: translateY(-2px);
  background: var(--forest);
  color: #f4f1e6;
}
@keyframes chipIn{
  from{ opacity: 0; transform: translateY(8px) scale(.95); }
  to{ opacity: 1; transform: none; }
}

.foot{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
}

.dots{ display: flex; gap: 6px; }
.dots i{
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(31,58,39,.18);
  transition: width .4s var(--ease), background .3s ease;
}
.dots i.on{
  width: 22px;
  background: var(--accent);
}

.more{
  color: var(--forest);
  padding: 6px 0;
}

.swap-enter-active, .swap-leave-active{ transition: opacity .35s ease, transform .35s var(--ease); }
.swap-enter-from{ opacity: 0; transform: translateX(16px); }
.swap-leave-to{ opacity: 0; transform: translateX(-16px); }

/* Visual */
.about-visual{
  display: flex;
  justify-content: center;
}

.profile-card{
  position: relative;
  width: min(440px, 100%);
  aspect-ratio: 4 / 5;
  border-radius: 32px;
  background:
    radial-gradient(120% 80% at 50% 100%, #b9d2bd, transparent 60%),
    linear-gradient(180deg, #f3ead2, #dfe9d9);
  box-shadow: var(--shadow-lift);
}

.profile-card img{
  position: absolute;
  inset: auto 0 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  border-radius: 32px;
  transform: translateZ(40px);
}

.halo{
  position: absolute;
  left: 50%;
  top: 40%;
  width: 70%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%) translateZ(10px);
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255,240,200,.9), transparent);
}

.badge{
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--muted);
  border-radius: 18px;
  transform: translateZ(80px);
}
.badge strong{ font-size: 20px; color: var(--forest); font-weight: 500; letter-spacing: -.02em; }

.float-a{ left: -28px; top: 18%; animation: bob 6s ease-in-out infinite; }
.float-b{
  right: -24px;
  bottom: 14%;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: var(--forest);
  font-weight: 500;
  animation: bob 7s ease-in-out -2s infinite;
}

.ping{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3fae62;
  animation: ping 2s ease-out infinite;
}

@keyframes bob{
  0%, 100%{ translate: 0 0; }
  50%{ translate: 0 -10px; }
}
@keyframes ping{
  0%{ box-shadow: 0 0 0 0 rgba(63,174,98,.6); }
  100%{ box-shadow: 0 0 0 10px rgba(63,174,98,0); }
}

@media (max-width: 900px){
  .about{ padding: 40px 0 80px; }
  .about-grid{
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .about-visual{ order: -1; }
  .profile-card{ width: min(320px, 82%); }
  .float-a{ left: -14px; }
  .float-b{ right: -14px; }
  .tabs{ display: grid; width: 100%; }
  .panel{ padding: 22px 20px; }
}
</style>
