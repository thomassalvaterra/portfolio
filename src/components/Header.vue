<template>
  <header :class="['header', 'header-full', { scrolled }]">
    <div class="nav nav-full">
      
      <!-- Logo -->
      <a href="#home" class="logo">
        <img src="/public/logo.png" alt="Logo" class="logo-img" />
      </a>

      <!-- Desktop menu -->
      <nav class="menu desktop-menu">
        <a href="#home">Home</a>
        <a href="#chi-sono">About</a>
        <a href="#servizi">Services</a>
        <a href="#progetti">Projects</a>
        <a href="#contatti" class="cta">Contact</a>
      </nav>

      <!-- Mobile hamburger -->
      <button class="burger" @click="open = !open" aria-label="Menu">
        <span :class="{ open }"></span>
        <span :class="{ open }"></span>
        <span :class="{ open }"></span>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <transition name="menu">
      <div v-if="open" class="mobile-menu">
        <a href="#home" @click="close">Home</a>
        <a href="#chi-sono" @click="close">About</a>
        <a href="#servizi" @click="close">Services</a>
        <a href="#progetti" @click="close">Projects</a>
        <a href="#contatti" class="cta" @click="close">Contact</a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const open = ref(false)
let ticking = false

const close = () => (open.value = false)

const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrolled.value = window.scrollY > 10
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.header{
  position: fixed;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: linear-gradient(180deg, rgba(11,15,20,.75), rgba(11,15,20,.45));
  border-bottom: 1px solid rgba(255,255,255,.08);
  transition: box-shadow .2s ease, background .2s ease;;
}
.header.scrolled{
  box-shadow: 0 8px 30px rgba(0,0,0,.35);
}

.header-full{
  width: 100%;
}

.nav-full{
  max-width: 1480px;   /* stessa larghezza dell’hero */
  margin: 0 auto;
  padding: 20px 32px; /* margini laterali */
}

.nav{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 10px 0;   /* 🔽 header più basso */
}

.logo{
  display:flex;
  align-items:center;
  gap:10px;
  font-weight: 700;
  letter-spacing:.4px;
}
.dot{
  width:10px; height:10px; border-radius:50%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: var(--glow);
}
.name{
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  -webkit-background-clip:text; background-clip:text;
  color: transparent;
  font-size: 30px;
  font-weight: 700;
}

.menu{ display:flex; gap:18px; }
.menu a{
  color: var(--text);
  opacity:.85;
  padding: 6px 8px;
  border-radius: 8px;
  transition: opacity .2s ease, box-shadow .2s ease, color .2s ease;
  font-size: 16px;  
  padding: 8px 12px;
}
.menu a:hover{
  opacity:1;
  box-shadow: 0 0 0 1px rgba(92,242,255,.4) inset, var(--glow);
}
.menu .cta{
  border:1px solid rgba(92,242,255,.5);
  box-shadow: var(--glow);
}
.logo-img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 18px rgba(0, 255, 140, .55); /* glow verde */
  border: 1px solid rgba(92,242,255,.5);
  transition: transform .2s ease, box-shadow .2s ease;
  margin: 10px 0;
}
.logo-img:hover{
  transform: scale(1.05);
  box-shadow: 0 0 28px rgba(0, 255, 140, .85);
}

.header.scrolled .nav-full{
  padding: 8px 32px;
}

@media (max-width: 768px) {
  .logo-img{
    width: 48px;
    height: 48px;
  }

  .nav-full{
    padding: 12px 16px;
  }

  .menu{
    gap: 8px;
  }

  .menu a{
    font-size: 14px;
    padding: 6px 8px;
  }
}

/* Nascondi menu desktop su mobile */
.desktop-menu {
  display: flex;
}

.burger {
  display: none;
  background: none;
  border: 0;
  cursor: pointer;
  width: 36px;
  height: 28px;
  position: relative;
  margin: 0 40px;
}

.burger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 4px;
  transition: .3s ease;
}

.burger span:nth-child(1) { top: 0; }
.burger span:nth-child(2) { top: 12px; }
.burger span:nth-child(3) { bottom: 0; }

.burger span.open:nth-child(1) {
  transform: rotate(45deg);
  top: 12px;
}
.burger span.open:nth-child(2) {
  opacity: 0;
}
.burger span.open:nth-child(3) {
  transform: rotate(-45deg);
  bottom: 12px;
}

/* Mobile menu dropdown */
.mobile-menu {
  position: fixed;
  inset: 80px 16px auto 16px;
  background: rgba(11,15,20,.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 18px;
  padding: 20px;
  display: grid;
  gap: 14px;
  z-index: 999;
  box-shadow: 0 30px 80px rgba(0,0,0,.7);
}

.mobile-menu a {
  padding: 14px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  color: white;
  background: rgba(255,255,255,.04);
}

.mobile-menu a.cta {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  text-align: center;
}

/* Animazione menu */
.menu-enter-active, .menu-leave-active {
  transition: all .25s ease;
}
.menu-enter-from, .menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(.98);
}

/* Mobile breakpoint */
@media (max-width: 900px) {
  .desktop-menu {
    display: none;
  }

  .nav-full{
    padding: 12px 16px !important;
  }

  .burger {
    display: block;
  }

  .logo-img{
    width: 56px;
    height: 56px;
    margin: 0;
  }
}
</style>