<template>
  <section id="pixelai" class="pixelai">
    <div class="wrap">
      <div v-reveal class="card">
        <div class="text">
          <span class="eyebrow">Nuovo · Instagram</span>

          <img src="/brand/PixelAi.webp" alt="PixelAi" class="logo" width="900" height="300" loading="lazy" />

          <p class="lead">
            La mia nuova pagina Instagram dove parlo di <strong>intelligenza artificiale</strong>.
            Se ti interessa il mondo dell’AI, seguimi lì.
          </p>

          <div class="actions">
            <a :href="pixelai.url" target="_blank" rel="noopener" class="btn-pixel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Seguimi su Instagram
            </a>
            <span class="handle">{{ pixelai.handle }}</span>
          </div>
        </div>

        <!-- Griglia di pixel 3D: si inclina col mouse, i pixel si accendono a onde -->
        <div class="visual" aria-hidden="true">
          <div v-tilt="18" class="tilt-box"><div class="grid3d">
            <span
              v-for="p in pixels"
              :key="p.id"
              class="px"
              :class="{ lit: p.lit }"
              :style="p.style"
            ></span>
          </div></div>
          <div class="glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { pixelai } from '@/data/socials'

const N = 7

// forma a "P" pixelata, come nel logo
const P = [
  '1111100',
  '1000110',
  '1000010',
  '1000110',
  '1111100',
  '1000000',
  '1000000'
]

const pixels = Array.from({ length: N * N }, (_, id) => {
  const x = id % N
  const y = Math.floor(id / N)
  const lit = P[y][x] === '1'
  return {
    id,
    lit,
    style: {
      '--z': lit ? `${18 + ((x * 7 + y * 3) % 4) * 10}px` : '0px',
      '--delay': `${(x + y) * 0.12}s`,
      '--hue': `${200 + ((x + y) / (2 * N)) * 70}`
    }
  }
})
</script>

<style scoped>
.pixelai{
  padding: 20px 0 100px;
}

.card{
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 40px;
  align-items: center;
  padding: 60px 64px;
  border-radius: 40px;
  background:
    radial-gradient(60% 80% at 100% 50%, rgba(120,110,255,.14), transparent 70%),
    radial-gradient(40% 60% at 85% 10%, rgba(0,190,255,.12), transparent 70%),
    #fff;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-lift);
}

.logo{
  display: block;
  width: min(440px, 100%);
  height: auto;
  margin: 26px 0 18px -10px;
  mix-blend-mode: multiply;
}

.lead strong{ color: var(--text); font-weight: 500; }

.actions{
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.btn-pixel{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  border-radius: 999px;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  background: linear-gradient(100deg, #7b3dff, #2b4dff 50%, #00b4ff);
  background-size: 200% 100%;
  box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 16px 30px -14px rgba(60,70,255,.8);
  transition: background-position .6s var(--ease), transform .35s var(--ease);
}
.btn-pixel:hover{
  background-position: 100% 0;
  transform: translateY(-2px);
}
.btn-pixel svg{ width: 18px; height: 18px; }

.handle{
  font-size: 15px;
  color: var(--muted);
}

/* ---------- Pixel 3D ---------- */
.visual{
  position: relative;
  display: grid;
  place-items: center;
  perspective: 900px;
}

.tilt-box{
  width: min(320px, 80%);
}

.grid3d{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  width: 100%;
  transform: rotateX(18deg) rotateY(-22deg);
  transform-style: preserve-3d;
}

.px{
  aspect-ratio: 1;
  border-radius: 7px;
  background: rgba(60,70,160,.06);
  border: 1px solid rgba(60,70,160,.08);
  transform-style: preserve-3d;
}

.px.lit{
  background: linear-gradient(135deg, hsl(var(--hue) 100% 62%), hsl(calc(var(--hue) + 30) 90% 55%));
  border-color: rgba(255,255,255,.6);
  box-shadow: 0 10px 20px -8px hsl(var(--hue) 90% 50% / .7);
  transform: translateZ(var(--z));
  animation: wave 3.2s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes wave{
  0%, 100%{ transform: translateZ(var(--z)); filter: brightness(1); }
  50%{ transform: translateZ(calc(var(--z) + 22px)); filter: brightness(1.2); }
}

.glow{
  position: absolute;
  inset: 10% 15%;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(90,90,255,.25), transparent);
  filter: blur(20px);
}

@media (max-width: 900px){
  .pixelai{ padding: 0 0 60px; }
  .card{
    grid-template-columns: 1fr;
    padding: 36px 22px;
    border-radius: 28px;
    gap: 30px;
  }
  .visual{ order: -1; }
  .tilt-box{ width: 220px; }
}
</style>
