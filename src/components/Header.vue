<template>
  <header :class="['header', { scrolled }]">
    <div class="nav">
      <!-- Logo -->
      <a href="#home" class="logo">
        <img src="/logo.png" alt="Logo" class="logo-img" />
        <span class="logo-name">Thomas Salvaterra<sup>™</sup></span>
      </a>

      <!-- Desktop menu (pillola centrale) -->
      <nav class="pill desktop-menu">
        <a href="#home" :class="{ active: active === 'home' }">Home</a>
        <a href="#chi-sono" :class="{ active: active === 'chi-sono' }">About</a>
        <a href="#servizi" :class="{ active: active === 'servizi' }">Services</a>
        <a href="#progetti" :class="{ active: active === 'progetti' }">Projects</a>
        <a href="#contatti" class="btn-dark pill-cta">Contact</a>
      </nav>

      <div class="side desktop-menu">
        <a href="https://www.linkedin.com/in/thomas-salvaterra-239a05279/" target="_blank">LinkedIn</a>
        <a href="mailto:thomassalvaterra2001@gmail.com" class="mail">
          <span class="ico">↗</span> Scrivimi
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button class="burger" @click="open = !open" aria-label="Menu">
        <span :class="{ open }"></span>
        <span :class="{ open }"></span>
        <span :class="{ open }"></span>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <transition name="menu">
      <div v-if="open" class="mobile-menu glass">
        <a href="#home" @click="close">Home</a>
        <a href="#chi-sono" @click="close">About</a>
        <a href="#servizi" @click="close">Services</a>
        <a href="#progetti" @click="close">Projects</a>
        <a href="#contatti" class="btn-dark" @click="close">Contact</a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const open = ref(false)
const active = ref('home')
let ticking = false

const close = () => (open.value = false)

const sections = ['home', 'chi-sono', 'servizi', 'progetti', 'contatti']

const onScroll = () => {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 10

    // sezione attiva per evidenziare il link nella pillola
    const mid = window.innerHeight * 0.4
    for (const id of sections) {
      const el = document.getElementById(id)
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (r.top <= mid && r.bottom > mid) active.value = id
    }
    ticking = false
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: transform .4s var(--ease);
}

.nav{
  max-width: 1440px;
  margin: 0 auto;
  padding: 22px 40px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  transition: padding .4s var(--ease);
}

.header.scrolled .nav{ padding-top: 12px; padding-bottom: 12px; }

/* allo scroll logo e link laterali diventano pillole di vetro, leggibili anche sulle sezioni scure */
.logo,
.side{
  border-radius: 999px;
  border: 1px solid transparent;
  transition: background .4s ease, border-color .4s ease, padding .4s var(--ease), box-shadow .4s ease;
}
.header.scrolled .logo,
.header.scrolled .side{
  background: rgba(255,255,255,.7);
  border-color: rgba(255,255,255,.9);
  box-shadow: 0 10px 30px -12px rgba(31,58,39,.3);
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
}
.header.scrolled .logo{ padding: 5px 16px 5px 5px; }
.header.scrolled .side{ padding: 12px 20px; }

.logo{
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: start;
}

.logo-img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px rgba(255,255,255,.8), 0 8px 18px -6px rgba(31,58,39,.5);
  transition: transform .4s var(--ease);
}
.logo:hover .logo-img{ transform: rotate(-8deg) scale(1.06); }

.logo-name{
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -.03em;
  color: var(--text);
}
.logo-name sup{ font-size: 10px; margin-left: 1px; }

/* Pillola centrale */
.pill{
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 6px 6px 18px;
  border-radius: 999px;
  background: rgba(255,255,255,.7);
  border: 1px solid rgba(255,255,255,.9);
  box-shadow: 0 10px 30px -12px rgba(31,58,39,.3);
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
}

.pill a:not(.pill-cta){
  font-size: 15px;
  color: var(--muted);
  padding: 8px 12px;
  border-radius: 999px;
  transition: color .25s ease;
}
.pill a:not(.pill-cta):hover,
.pill a.active{ color: var(--text); }
.pill a.active{ font-weight: 500; }

.pill-cta{
  margin-left: 12px;
  padding: 10px 20px;
}

.side{
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 26px;
  font-size: 15px;
}
.side a{ color: var(--muted); transition: color .25s ease; }
.side a:hover{ color: var(--text); }
.side .ico{ font-size: 13px; margin-right: 4px; }

/* Burger */
.burger{
  display: none;
  justify-self: end;
  background: rgba(255,255,255,.75);
  border: 1px solid rgba(255,255,255,.9);
  border-radius: 999px;
  cursor: pointer;
  width: 46px;
  height: 46px;
  position: relative;
  padding: 0;
  backdrop-filter: blur(12px);
}

.burger span{
  position: absolute;
  left: 14px;
  width: 18px;
  height: 2px;
  background: var(--text);
  border-radius: 4px;
  transition: .3s ease;
}
.burger span:nth-child(1){ top: 16px; }
.burger span:nth-child(2){ top: 22px; }
.burger span:nth-child(3){ top: 28px; }
.burger span.open:nth-child(1){ transform: rotate(45deg); top: 22px; }
.burger span.open:nth-child(2){ opacity: 0; }
.burger span.open:nth-child(3){ transform: rotate(-45deg); top: 22px; }

.mobile-menu{
  position: fixed;
  inset: 78px 16px auto 16px;
  padding: 14px;
  display: grid;
  gap: 6px;
  z-index: 999;
  background: rgba(251,248,240,.92);
}
.mobile-menu a{
  padding: 14px 16px;
  border-radius: 14px;
  font-weight: 500;
  font-size: 17px;
  color: var(--text);
}
.mobile-menu a:not(.btn-dark):active{ background: rgba(31,58,39,.06); }
.mobile-menu a.btn-dark{ margin-top: 6px; color: #f4f1e6; }

.menu-enter-active, .menu-leave-active{ transition: all .3s var(--ease); }
.menu-enter-from, .menu-leave-to{ opacity: 0; transform: translateY(-10px) scale(.98); }

@media (max-width: 1100px){
  .side{ display: none; }
  .nav{ grid-template-columns: auto 1fr; }
  .pill{ justify-self: end; }
}

@media (max-width: 900px){
  .desktop-menu{ display: none; }
  .nav{ grid-template-columns: 1fr auto; padding: 14px 16px; }
  .header.scrolled .nav{ padding: 10px 16px; }
  .burger{ display: block; }
  .logo-name{ font-size: 17px; }
}
</style>
