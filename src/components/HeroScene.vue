<template>
  <div ref="scene" class="scene" aria-hidden="true">
    <div class="sky"></div>
    <div class="sun"></div>

    <!-- Guglie lontane -->
    <div class="layer" data-depth="0.06">
      <svg :viewBox="VB" preserveAspectRatio="xMidYMax slice">
        <g fill="#d5e0d4">
          <path v-for="(p, i) in farPillars" :key="'fp' + i" :d="p.d" />
        </g>
        <g fill="#c7d6c7">
          <template v-for="(p, i) in farPillars" :key="'ft' + i">
            <circle v-for="(c, j) in p.tufts" :key="j" :cx="c.x" :cy="c.y" :r="c.r" />
          </template>
        </g>
        <rect x="0" y="0" width="1600" height="1000" fill="url(#hazeFar)" />
        <defs>
          <linearGradient id="hazeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.35" stop-color="#f6efdc" stop-opacity="0" />
            <stop offset="0.8" stop-color="#f3ecd8" stop-opacity=".85" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Guglie medie -->
    <div class="layer" data-depth="0.14">
      <svg :viewBox="VB" preserveAspectRatio="xMidYMax slice">
        <g fill="#b2c8b4">
          <path v-for="(p, i) in midPillars" :key="'mp' + i" :d="p.d" />
        </g>
        <g fill="#9fbb9f">
          <template v-for="(p, i) in midPillars" :key="'mt' + i">
            <circle v-for="(c, j) in p.tufts" :key="j" :cx="c.x" :cy="c.y" :r="c.r" />
          </template>
        </g>
        <defs>
          <radialGradient id="mist">
            <stop offset="0" stop-color="#fffaf0" stop-opacity=".95" />
            <stop offset="1" stop-color="#fffaf0" stop-opacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="800" cy="760" rx="900" ry="150" fill="url(#mist)" />
      </svg>
    </div>

    <!-- Rupi interne + ponte -->
    <div class="layer" data-depth="0.3">
      <svg :viewBox="VB" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="bridgeRock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#5f8256" />
            <stop offset=".5" stop-color="#4a6a45" />
            <stop offset="1" stop-color="#3b5639" />
          </linearGradient>
          <linearGradient id="midRockL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#5d7a5a" />
            <stop offset=".85" stop-color="#77926c" />
            <stop offset="1" stop-color="#a3ad7a" />
          </linearGradient>
          <linearGradient id="midRockR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stop-color="#5d7a5a" />
            <stop offset=".85" stop-color="#77926c" />
            <stop offset="1" stop-color="#a3ad7a" />
          </linearGradient>
          <radialGradient id="glowArch">
            <stop offset="0" stop-color="#fff6dc" stop-opacity="1" />
            <stop offset="1" stop-color="#fff6dc" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- luce dietro l'arco -->
        <ellipse cx="800" cy="900" rx="320" ry="240" fill="url(#glowArch)" />

        <path :d="midLeft.body" fill="url(#midRockL)" />
        <path :d="midRight.body" fill="url(#midRockR)" />

        <!-- ponte naturale -->
        <path :d="BRIDGE" fill="url(#bridgeRock)" />
        <path :d="ARCH_SHADE" fill="none" stroke="#2c4130" stroke-opacity=".45" stroke-width="14" />

        <g v-for="(c, i) in [...midLeft.canopy, ...midRight.canopy, ...bridgeMoss]" :key="'mc' + i">
          <circle :cx="c.x" :cy="c.y" :r="c.r" :fill="c.fill" />
          <circle :cx="c.x - c.r * 0.25" :cy="c.y - c.r * 0.3" :r="c.r * 0.55" :fill="c.hi" opacity=".55" />
        </g>

        <!-- due figure sul ponte -->
        <g fill="#2a3529">
          <rect x="788" y="583" width="3" height="12" rx="1.5" />
          <circle cx="789.5" cy="580" r="2.4" />
          <rect x="799" y="584" width="3" height="11" rx="1.5" />
          <circle cx="800.5" cy="581" r="2.3" />
        </g>

        <rect x="0" y="0" width="1600" height="1000" fill="#f3ecd8" opacity=".14" />
      </svg>
    </div>

    <!-- Nebbia di mezzo -->
    <div class="layer drift-slow" data-depth="0.42">
      <svg :viewBox="VB" preserveAspectRatio="xMidYMax slice">
        <ellipse cx="420" cy="860" rx="420" ry="90" fill="url(#mist)" opacity=".9" />
        <ellipse cx="1180" cy="880" rx="460" ry="100" fill="url(#mist)" opacity=".85" />
        <ellipse cx="800" cy="980" rx="520" ry="130" fill="url(#mist)" />
      </svg>
    </div>

    <!-- Rupe sinistra (si apre allo scroll) -->
    <div class="layer" data-depth="0.6" data-split="-1">
      <svg :viewBox="VB" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="rockL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#18241a" />
            <stop offset=".7" stop-color="#26392a" />
            <stop offset=".92" stop-color="#3f5838" />
            <stop offset="1" stop-color="#7c8a52" />
          </linearGradient>
          <linearGradient id="shadeDown" x1="0" y1="0" x2="0" y2="1">
            <stop offset=".3" stop-color="#0f1a11" stop-opacity="0" />
            <stop offset="1" stop-color="#0f1a11" stop-opacity=".7" />
          </linearGradient>
          <clipPath id="clipL"><path :d="frontLeft.body" /></clipPath>
        </defs>
        <path :d="frontLeft.body" fill="url(#rockL)" />
        <g clip-path="url(#clipL)">
          <line v-for="(s, i) in frontLeft.streaks" :key="i" :x1="s.x" :y1="s.y1" :x2="s.x + s.dx" :y2="s.y2" stroke="#0e1810" :stroke-width="s.w" stroke-opacity=".35" stroke-linecap="round" />
          <rect x="-100" y="0" width="1800" height="1100" fill="url(#shadeDown)" />
        </g>
        <g v-for="(c, i) in frontLeft.canopy" :key="'lc' + i">
          <circle :cx="c.x" :cy="c.y" :r="c.r" :fill="c.fill" />
          <circle :cx="c.x + c.r * 0.2" :cy="c.y - c.r * 0.32" :r="c.r * 0.55" :fill="c.hi" opacity=".6" />
        </g>
      </svg>
    </div>

    <!-- Rupe destra (si apre allo scroll) -->
    <div class="layer" data-depth="0.6" data-split="1">
      <svg :viewBox="VB" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="rockR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stop-color="#18241a" />
            <stop offset=".7" stop-color="#26392a" />
            <stop offset=".92" stop-color="#3f5838" />
            <stop offset="1" stop-color="#7c8a52" />
          </linearGradient>
          <clipPath id="clipR"><path :d="frontRight.body" /></clipPath>
        </defs>
        <path :d="frontRight.body" fill="url(#rockR)" />
        <g clip-path="url(#clipR)">
          <line v-for="(s, i) in frontRight.streaks" :key="i" :x1="s.x" :y1="s.y1" :x2="s.x + s.dx" :y2="s.y2" stroke="#0e1810" :stroke-width="s.w" stroke-opacity=".35" stroke-linecap="round" />
          <rect x="-100" y="0" width="1800" height="1100" fill="url(#shadeDown)" />
        </g>
        <g v-for="(c, i) in frontRight.canopy" :key="'rc' + i">
          <circle :cx="c.x" :cy="c.y" :r="c.r" :fill="c.fill" />
          <circle :cx="c.x - c.r * 0.2" :cy="c.y - c.r * 0.32" :r="c.r * 0.55" :fill="c.hi" opacity=".6" />
        </g>
      </svg>
    </div>

    <!-- Nuvole in primo piano -->
    <div class="layer drift" data-depth="0.9">
      <svg :viewBox="VB" preserveAspectRatio="xMidYMax slice">
        <ellipse cx="200" cy="1010" rx="380" ry="120" fill="url(#mist)" />
        <ellipse cx="760" cy="1040" rx="420" ry="110" fill="url(#mist)" />
        <ellipse cx="1380" cy="1000" rx="400" ry="130" fill="url(#mist)" />
      </svg>
    </div>

    <!-- Pollini / particelle -->
    <div class="pollen">
      <span v-for="p in pollen" :key="p.id" :style="p.style"></span>
    </div>

    <div class="fade-bottom"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const VB = '0 0 1600 1000'

// RNG deterministico: la scena è sempre uguale ad ogni caricamento
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const f = (n) => Math.round(n * 10) / 10

function makePillars(seed, count, baseTop, spread, wMin, wMax) {
  const r = rng(seed)
  const out = []
  for (let i = 0; i < count; i++) {
    const x = ((i + 0.5) / count) * 1800 - 100 + (r() - 0.5) * 70
    const w = wMin + r() * (wMax - wMin)
    // più basse al centro, così il sole resta visibile
    const centerDist = Math.min(Math.abs(x - 800) / 800, 1)
    const t = baseTop + (1 - centerDist) * spread + (r() - 0.5) * 70
    const d = `M${f(x - w)} 1000 L${f(x - w * 0.82)} ${f(t + w * 0.9)} Q${f(x - w * 0.7)} ${f(t)} ${f(x)} ${f(t - w * 0.06)} Q${f(x + w * 0.7)} ${f(t)} ${f(x + w * 0.82)} ${f(t + w * 0.9)} L${f(x + w)} 1000Z`
    const tufts = []
    const n = 5 + Math.floor(r() * 4)
    for (let k = 0; k < n; k++) {
      tufts.push({
        x: f(x + (r() - 0.5) * w * 1.3),
        y: f(t + r() * w * 0.4),
        r: f(w * (0.12 + r() * 0.14))
      })
    }
    out.push({ d, tufts })
  }
  return out
}

function smoothPath(points) {
  let d = `M${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i]
    const [nx, ny] = points[i + 1]
    d += ` Q${x} ${y} ${f((x + nx) / 2)} ${f((y + ny) / 2)}`
  }
  const last = points[points.length - 1]
  return d + ` L${last[0]} ${last[1]}`
}

function makeCliff(points, seed, { palette, highlights, rMin, rMax, step, canopyUntil, streaks = 0 }) {
  const r = rng(seed)
  const last = points[points.length - 1]
  const body = smoothPath(points) + ` L${last[0]} 1100 L${points[0][0]} 1100Z`

  const canopy = []
  for (let i = 0; i < canopyUntil; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    const len = Math.hypot(x2 - x1, y2 - y1)
    const n = Math.max(1, Math.round(len / step))
    for (let k = 0; k < n; k++) {
      const t = k / n
      const rad = rMin + r() * (rMax - rMin)
      canopy.push({
        x: f(x1 + (x2 - x1) * t + (r() - 0.5) * step),
        y: f(y1 + (y2 - y1) * t + r() * rad * 0.9),
        r: f(rad),
        fill: palette[Math.floor(r() * palette.length)],
        hi: highlights[Math.floor(r() * highlights.length)]
      })
      // fogliame più scuro che scende dentro la parete
      if (r() < 0.7) {
        const rad2 = rMin + r() * (rMax - rMin) * 0.8
        canopy.push({
          x: f(x1 + (x2 - x1) * t + (r() - 0.5) * step * 2),
          y: f(y1 + (y2 - y1) * t + rad2 * (1.2 + r() * 2.2)),
          r: f(rad2),
          fill: palette[Math.floor(r() * 2)],
          hi: palette[2 + Math.floor(r() * (palette.length - 2))]
        })
      }
    }
  }
  canopy.sort((a, b) => a.y - b.y)

  const xs = points.map((p) => p[0])
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const lines = []
  for (let i = 0; i < streaks; i++) {
    const x = minX + r() * (maxX - minX)
    lines.push({
      x: f(x),
      dx: f((r() - 0.5) * 30),
      y1: f(380 + r() * 300),
      y2: f(800 + r() * 300),
      w: f(1.5 + r() * 5)
    })
  }

  return { body, canopy, streaks: lines }
}

const farPillars = makePillars(7, 15, 330, 210, 34, 70)
const midPillars = makePillars(21, 11, 420, 170, 46, 90)

const frontPalette = ['#2f4f2c', '#3b6234', '#46723b', '#527f42', '#3a5a32']
const frontHi = ['#6f9a50', '#85ac5c', '#9cbc68', '#7aa257']
const midPalette = ['#6d9264', '#7b9f6e', '#86a876', '#6a8b62']
const midHi = ['#a9c487', '#b8cf92', '#c3d59c']

const frontLeft = makeCliff(
  [[-60, 290], [40, 270], [140, 300], [230, 350], [300, 410], [355, 480], [395, 550], [420, 630], [440, 720], [448, 1000]],
  3,
  { palette: frontPalette, highlights: frontHi, rMin: 10, rMax: 26, step: 11, canopyUntil: 8, streaks: 30 }
)

const frontRight = makeCliff(
  [[1660, 250], [1560, 240], [1460, 280], [1380, 335], [1310, 400], [1255, 475], [1215, 555], [1190, 640], [1172, 730], [1165, 1000]],
  11,
  { palette: frontPalette, highlights: frontHi, rMin: 10, rMax: 26, step: 11, canopyUntil: 8, streaks: 30 }
)

const midLeft = makeCliff(
  [[300, 540], [380, 515], [450, 530], [510, 575], [545, 630], [560, 700], [566, 1000]],
  5,
  { palette: midPalette, highlights: midHi, rMin: 6, rMax: 14, step: 8, canopyUntil: 5 }
)

const midRight = makeCliff(
  [[1320, 500], [1230, 480], [1150, 505], [1090, 560], [1055, 630], [1040, 710], [1034, 1000]],
  9,
  { palette: midPalette, highlights: midHi, rMin: 6, rMax: 14, step: 8, canopyUntil: 5 }
)

// ponte naturale: impalcato + arco
const BRIDGE =
  'M500 640 C650 588 950 588 1100 640 L1100 1100 L992 1100 C992 830 912 722 800 722 C688 722 608 830 608 1100 L500 1100Z'
const ARCH_SHADE = 'M612 1000 C618 820 696 730 800 730 C904 730 982 820 988 1000'

const bridgeMoss = (() => {
  const r = rng(13)
  const out = []
  for (let i = 0; i <= 90; i++) {
    const t = i / 90
    const mt = 1 - t
    const x = mt ** 3 * 500 + 3 * mt * mt * t * 650 + 3 * mt * t * t * 950 + t ** 3 * 1100
    const y = mt ** 3 * 640 + 3 * mt * mt * t * 588 + 3 * mt * t * t * 588 + t ** 3 * 640
    const rad = 5 + r() * 7
    out.push({
      x: f(x + (r() - 0.5) * 8),
      y: f(y + rad * 0.55 + r() * 4),
      r: f(rad),
      fill: midPalette[Math.floor(r() * midPalette.length)],
      hi: midHi[Math.floor(r() * midHi.length)]
    })
  }
  return out
})()

const pollen = (() => {
  const r = rng(99)
  return Array.from({ length: 22 }, (_, id) => ({
    id,
    style: {
      left: `${f(r() * 100)}%`,
      top: `${f(30 + r() * 65)}%`,
      width: `${f(2 + r() * 3)}px`,
      height: `${f(2 + r() * 3)}px`,
      animationDuration: `${f(9 + r() * 10)}s`,
      animationDelay: `${f(-r() * 12)}s`
    }
  }))
})()

// ---------- Parallasse (mouse + scroll) ----------
const scene = ref(null)
let layers = []
let raf = 0
let running = false
let tx = 0, ty = 0, cx = 0, cy = 0
let visibleObs = null

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const onPointer = (e) => {
  tx = (e.clientX / window.innerWidth - 0.5) * 2
  ty = (e.clientY / window.innerHeight - 0.5) * 2
}

const frame = () => {
  cx += (tx - cx) * 0.06
  cy += (ty - cy) * 0.06
  const s = Math.min(window.scrollY, window.innerHeight * 1.2)

  for (const el of layers) {
    const d = el._depth
    const x = -cx * d * 42 + el._split * s * 0.45 * d
    const y = -cy * d * 18 + s * (1 - d) * 0.5
    const scale = 1 + s * 0.00035 * d
    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
  }

  if (running) raf = requestAnimationFrame(frame)
}

const start = () => {
  if (running) return
  running = true
  raf = requestAnimationFrame(frame)
}
const stop = () => {
  running = false
  cancelAnimationFrame(raf)
}

onMounted(() => {
  if (reduce) return
  layers = [...scene.value.querySelectorAll('.layer')]
  layers.forEach((el) => {
    el._depth = Number(el.dataset.depth || 0)
    el._split = Number(el.dataset.split || 0)
  })
  window.addEventListener('pointermove', onPointer, { passive: true })

  visibleObs = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
  visibleObs.observe(scene.value)
})

onUnmounted(() => {
  stop()
  visibleObs?.disconnect()
  window.removeEventListener('pointermove', onPointer)
})
</script>

<style scoped>
.scene{
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.sky{
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #fbf3df 0%, #f8eccf 38%, #eef0dc 70%, #e4ecdc 100%);
}

.sun{
  position: absolute;
  left: 50%;
  top: 58%;
  width: 90vmax;
  height: 70vmax;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, rgba(255,240,200,.95), rgba(255,236,190,.45) 45%, transparent 75%);
  animation: breathe 9s ease-in-out infinite;
}

.layer{
  position: absolute;
  inset: 2% -8% -16% -8%;
  will-change: transform;
  transform-origin: 50% 80%;
}

.layer svg{
  width: 100%;
  height: 100%;
  display: block;
}

.drift svg{ animation: drift 26s ease-in-out infinite alternate; }
.drift-slow svg{ animation: drift 40s ease-in-out infinite alternate-reverse; }

.pollen span{
  position: absolute;
  border-radius: 50%;
  background: #fff8e2;
  box-shadow: 0 0 8px 2px rgba(255,244,210,.8);
  opacity: 0;
  animation: float linear infinite;
}

.fade-bottom{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22%;
  background: linear-gradient(180deg, transparent, var(--bg));
}

@keyframes drift{
  from{ transform: translateX(-3%); }
  to{ transform: translateX(3%); }
}

@keyframes breathe{
  0%, 100%{ opacity: .85; transform: translate(-50%, -50%) scale(1); }
  50%{ opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
}

@keyframes float{
  0%{ opacity: 0; transform: translate(0, 0); }
  15%{ opacity: .9; }
  85%{ opacity: .7; }
  100%{ opacity: 0; transform: translate(40px, -160px); }
}
</style>
