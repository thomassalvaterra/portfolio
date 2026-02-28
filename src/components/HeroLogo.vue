<template>
  <div
    class="hero-logo"
    :class="[
      { hide: done },
      { mobile: isMobile }
    ]"
  >
    <div class="intro-wrap">
      <img :src="logo" class="hero-logo-img" alt="Logo" />

      <!-- TESTO SOLO DESKTOP -->
      <h2 v-if="!isMobile" class="intro-text">
        Benvenuto nel mio Portfolio
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import logo from '../assets/logo.png'

const done = ref(false)
const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768

  setTimeout(() => {
    done.value = true
  }, 1200)
})
</script>

<style scoped>
.hero-logo{
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh; /* meglio su mobile */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b0f14;
  z-index: 9999;
  pointer-events: none;
}

.hero-logo.hide{
  opacity: 0;
}

/* Wrapper */
.intro-wrap{
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
}

/* LOGO */
.hero-logo-img{
  width: 220px;
  height: 220px;
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(0,255,140,.55);
}

/* Desktop: logo che vola nell’header */
.hero-logo:not(.mobile) .hero-logo-img{
  animation: logoToHeader 1.1s cubic-bezier(.2,.8,.2,1) forwards;
}

/* Mobile: logo che si dissolve */
.hero-logo.mobile .hero-logo-img{
  animation: logoFade 1.1s ease forwards;
}

/* TESTO (desktop) */
.intro-text{
  font-size: clamp(48px, 8vw, 112px);
  font-weight: 800;
  letter-spacing: .3px;
  line-height: 0.95;
  color: #e6f7f2;
  opacity: 1;
  animation: textFade 1.1s ease forwards;
  animation-delay: .2s;
}

/* Animazioni */
@keyframes textFade{
  0%{ opacity: 1; transform: translateY(0); }
  70%{ opacity: 1; }
  100%{ opacity: 0; transform: translateY(-2px); }
}

@keyframes logoToHeader{
  0%{
    transform: translate(0, 0) scale(1);
  }
  70%{
    transform: translate(0, -180px) scale(.55);
  }
  100%{
    transform: translate(-30vw, -42vh) scale(.42);
  }
}

/* Mobile dissolve */
@keyframes logoFade{
  0%{
    opacity: 1;
    transform: scale(1);
  }
  100%{
    opacity: 0;
    transform: scale(.9);
  }
}

@media (max-width: 768px){
  .hero-logo{
    padding: 0 !important;
    margin: 0 !important;
  }

  .hero-logo-img{
    margin: 0 !important;
    width: 160px;
    height: 160px;
  }
}
</style>