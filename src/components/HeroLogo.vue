<template>
  <div v-if="show" class="hero-logo" :class="{ hide: done }">
    <div class="intro-wrap">
      <img :src="logo" class="hero-logo-img" alt="Logo" />
      <h2 class="intro-text">
        <span v-for="(w, i) in words" :key="i" :style="{ animationDelay: `${150 + i * 90}ms` }">{{ w }}</span>
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import logo from '/logo-sm.webp'

const done = ref(false)
const words = ['Benvenuto', 'nel', 'mio', 'Portfolio']

// l'intro si vede solo alla prima visita della sessione
let seen = false
try {
  seen = sessionStorage.getItem('intro-seen') === '1'
  sessionStorage.setItem('intro-seen', '1')
} catch {}

const show = ref(!seen)
if (seen) document.documentElement.style.setProperty('--intro-delay', '0ms')

onMounted(() => {
  if (!show.value) return
  setTimeout(() => {
    done.value = true
  }, 1300)
  // rimuove l'overlay dal DOM a transizione finita
  setTimeout(() => {
    show.value = false
  }, 2600)
})
</script>

<style scoped>
.hero-logo{
  position: fixed;
  inset: 0;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(60% 50% at 50% 60%, #fbefd0, transparent 70%),
    var(--bg);
  z-index: 9999;
  pointer-events: none;
  clip-path: inset(0 0 0 0);
  transition: clip-path 1s cubic-bezier(.76,0,.24,1), opacity .6s ease .6s;
}

/* la tenda si alza verso l'alto */
.hero-logo.hide{
  clip-path: inset(0 0 100% 0);
  opacity: 0;
}

.intro-wrap{
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
  padding: 0 16px;
  text-align: center;
}

.hero-logo-img{
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 0 0 6px rgba(255,255,255,.8), 0 30px 60px -20px rgba(31,58,39,.5);
  animation: pop .9s var(--ease) both;
}

.intro-text{
  font-size: clamp(36px, 7vw, 96px);
  font-weight: 400;
  letter-spacing: -.05em;
  line-height: 1;
  color: var(--forest);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 .25em;
}

.intro-text span{
  display: inline-block;
  animation: word .8s var(--ease) both;
}
.intro-text span:last-child{
  background: linear-gradient(90deg, #6f9e7d, #a9c9b0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes word{
  from{ opacity: 0; transform: translateY(40%); filter: blur(8px); }
  to{ opacity: 1; transform: none; filter: none; }
}

@keyframes pop{
  from{ opacity: 0; transform: scale(.6) rotate(-12deg); }
  to{ opacity: 1; transform: none; }
}
</style>
