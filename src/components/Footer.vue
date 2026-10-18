<template>
  <footer class="site-footer">
    <div class="wrap footer-wrap">
      <div class="footer-brand">
        <p class="footer-tagline">
          Frontend Developer — siti moderni, veloci, funzionali.
        </p>
        <a href="#contatti" class="btn-light">Parliamo del tuo progetto →</a>
      </div>

      <div class="footer-links">
        <strong>Sezioni</strong>
        <a href="#home">Home</a>
        <a href="#servizi">Servizi</a>
        <a href="#progetti">Progetti</a>
        <a href="#contatti">Contatti</a>
      </div>

      <div class="footer-socials">
        <strong>Contatti</strong>
        <a href="mailto:thomassalvaterra2001@gmail.com">📩 Email</a>
        <a href="https://www.linkedin.com/in/thomas-salvaterra-239a05279/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://www.instagram.com/thomas_salvaterra" target="_blank" rel="noopener">Instagram</a>
        <a href="https://www.tiktok.com/@thomas_salvaterra" target="_blank" rel="noopener">TikTok</a>
        <a :href="pixelai.url" target="_blank" rel="noopener" class="pixel-link">PixelAi <span>· AI</span></a>
      </div>
    </div>

    <!-- Nome gigante: le lettere si sollevano in 3D al passaggio del mouse -->
    <h2 class="footer-name" aria-label="Thomas Salvaterra">
      <span class="word">
        <span v-for="(l, i) in 'THOMAS'" :key="'t' + i" :style="{ '--i': i }">{{ l }}</span>
      </span>
      <span class="word">
        <span v-for="(l, i) in 'SALVATERRA'" :key="'s' + i" :style="{ '--i': i + 6 }">{{ l }}</span>
      </span>
    </h2>

    <div class="wrap footer-bottom">
      <span>© {{ year }} Thomas Salvaterra</span>
      <span>Made with ❤️ in Italy</span>
    </div>
  </footer>
</template>

<script setup>
import { pixelai } from '@/data/socials'
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer{
  position: relative;
  overflow: hidden;
  padding: 90px 0 30px;
  color: #eef2e6;
  background:
    radial-gradient(60% 50% at 50% 0%, rgba(143,191,154,.18), transparent 70%),
    linear-gradient(180deg, #1c3323, #101b13);
  border-radius: 40px 40px 0 0;
}

.footer-wrap{
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.footer-tagline{
  max-width: 22ch;
  font-size: clamp(26px, 2.6vw, 36px);
  line-height: 1.15;
  letter-spacing: -.035em;
  color: #f4f1e6;
  margin-bottom: 28px;
}

.footer-links,
.footer-socials{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links strong,
.footer-socials strong{
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(238,242,230,.5);
  margin-bottom: 8px;
}

.footer-links a,
.footer-socials a{
  width: fit-content;
  color: rgba(238,242,230,.85);
  transition: color .3s ease, transform .3s var(--ease);
}
.footer-links a:hover,
.footer-socials a:hover{
  color: #fff;
  transform: translateX(6px);
}

.pixel-link span{ color: #8fa8ff; }

.footer-name{
  margin: 90px 0 10px;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 .2em;
  font-size: clamp(48px, 10.5vw, 190px);
  font-weight: 400;
  line-height: .9;
  letter-spacing: -.06em;
  perspective: 900px;
}

.footer-name .word{ display: flex; }

.footer-name span span{
  display: inline-block;
  background: linear-gradient(180deg, #d5e7cf, #6f9e7d);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transform-origin: 50% 100%;
  transition: transform .6s var(--ease), filter .4s ease;
}

.footer-name span span:hover{
  transform: translateY(-14px) rotateX(24deg) scale(1.06);
  filter: brightness(1.3);
}

.footer-bottom{
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,.1);
  font-size: 13px;
  color: rgba(238,242,230,.55);
}

@media (max-width: 900px){
  .site-footer{
    padding: 60px 0 24px;
    border-radius: 28px 28px 0 0;
  }
  .footer-wrap{
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
  .footer-brand{ grid-column: 1 / -1; }
  .pixel-link span{ color: #8fa8ff; }

.footer-name{ margin-top: 50px; font-size: 15vw; }
  .footer-name span span{ animation: letterFloat 3.2s ease-in-out infinite; animation-delay: calc(var(--i) * .12s); }
  .footer-bottom{
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
}

@keyframes letterFloat{
  0%, 100%{ transform: translateY(0); }
  50%{ transform: translateY(-5px); }
}
</style>
