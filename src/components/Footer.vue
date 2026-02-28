<template>
  <footer class="site-footer">
    <div class="footer-wrap">

      <!-- Brand -->
      <div class="footer-brand">
        <h2 class="footer-name two-lines">
            <span class="word">
                <span>T</span><span>H</span><span>O</span><span>M</span><span>A</span><span>S</span>
            </span>
            <span class="word">
                <span>S</span><span>A</span><span>L</span><span>V</span><span>A</span><span>T</span><span>E</span><span>R</span><span>R</span><span>A</span>
            </span>
        </h2>
        <p class="footer-tagline">
          Frontend Developer — siti moderni, veloci, funzionali.
        </p>
      </div>

      <!-- Link -->
      <div class="footer-links">
        <strong>Sezioni</strong>
        <a href="#home">Home</a>
        <a href="#servizi">Servizi</a>
        <a href="#progetti">Progetti</a>
        <a href="#contatti">Contatti</a>
      </div>

      <div class="footer-separator"></div>

      <!-- Social -->
      <div class="footer-socials">
        <strong>Contatti</strong>
        <a href="mailto:thomassalvaterra2001@gmail.com">📩 Email</a>
        <a href="https://www.linkedin.com/in/thomas-salvaterra-239a05279/" target="_blank">LinkedIn</a>
        <a href="https://www.instagram.com/thomas_salvaterra" target="_blank">Instagram</a>
        <a href="https://www.tiktok.com/@thomas_salvaterra" target="_blank">TikTok</a>
      </div>

    </div>

    <div class="footer-bottom">
      <span>© {{ year }} Thomas Salvaterra</span>
      <span>Made with ❤️ in Italy</span>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer{
  margin-top: 20px;
  padding: 100px 0 40px;
  border-top: 1px solid rgba(255,255,255,.12);
  background:
    radial-gradient(800px 300px at 20% -10%, rgba(92,242,255,.08), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,.02), transparent 40%);
}

.footer-wrap{
  max-width: none;
  margin: 0;
  padding: 0 80px;
  display: grid;
  grid-template-columns: 1.5fr 40px 1fr 1fr;
  gap: 100px;
  align-items: start;
}

/* Nome gigante */
.footer-name{
  font-size: clamp(56px, 7vw, 110px);
  font-weight: 900;
  letter-spacing: -.02em;
  gap: 22px;
  line-height: .95;
  perspective: 800px;
}

.footer-name.two-lines{
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer-name .word{
  display: flex;
}

.footer-name span{
  display: inline-block;
  background: linear-gradient(180deg, #fff, #b6f1ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow:
    0 0 20px rgba(182,241,255,.15),
    0 10px 40px rgba(0,0,0,.55);
  transition:
    transform .35s cubic-bezier(.2,.8,.2,1),
    text-shadow .35s ease,
    filter .35s ease;
  will-change: transform;
}

.footer-name span:hover{
  transform: translateY(-10px) rotateX(10deg) scale(1.06);
  filter: brightness(1.2);
  text-shadow:
    0 0 24px rgba(182,241,255,.65),
    0 0 60px rgba(92,242,255,.35);
}
.footer-tagline{
  max-width: 420px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
}

/* Colonne */
.footer-links,
.footer-socials{
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 90px;
}

.footer-links strong,
.footer-socials strong{
  font-size: 20px;
  letter-spacing: .12em;
  text-transform: uppercase;
  opacity: .6;
  margin-bottom: 6px;
}

.footer-links a,
.footer-socials a{
  color: rgba(255,255,255,.8);
  font-weight: 600;
  transition: all .2s ease;
  width: fit-content;
}

.footer-links a:hover,
.footer-socials a:hover{
  color: white;
  transform: translateX(6px);
  text-shadow: 0 0 12px rgba(92,242,255,.55);
}

/* Bottom */
.footer-bottom{
  margin-top: 80px;
  padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,.08);
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 60px;
  padding-right: 60px;

  display: flex;
  justify-content: space-between;
  gap: 16px;

  font-size: 12px;
  opacity: .6;
}

.footer-separator{
  width: 2px;
  height: 100%;
  min-height: 260px;
  justify-self: center;
  align-self: stretch;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(182,241,255,.8),
    rgba(92,242,255,.6),
    transparent
  );
  box-shadow:
    0 0 20px rgba(182,241,255,.45),
    0 0 40px rgba(92,242,255,.25);
  border-radius: 999px;
  animation: glowPulse 3.5s ease-in-out infinite;
}

@keyframes glowPulse{
  0%, 100%{
    opacity: .5;
    filter: blur(.2px);
  }
  50%{
    opacity: 1;
    filter: blur(0);
  }
}

/* Responsive */
@media (max-width: 900px){

  .site-footer{
    padding: 70px 0 28px;
  }

  .footer-wrap{
    grid-template-columns: 1fr;
    gap: 34px;
    text-align: center;
    padding: 0 18px;     /* ✅ meno padding */
  }

  /* Nome più bilanciato su mobile */
  .footer-name{
    font-size: clamp(40px, 10vw, 64px);
    line-height: .95;
    gap: 14px;
  }

  .footer-name .word{
    justify-content: center; /* ✅ centra le lettere */
    flex-wrap: wrap;         /* ✅ se serve va a capo senza rompere */
  }

  .footer-tagline{
    max-width: 320px;
    margin: 10px auto 0;
    font-size: 14px;
    line-height: 1.55;
  }

  /* Colonne: niente mega margine sopra */
  .footer-links,
  .footer-socials{
    margin-top: 0;           /* ✅ era 90px */
    align-items: center;
    gap: 10px;
  }

  .footer-links strong,
  .footer-socials strong{
    font-size: 14px;
    letter-spacing: .16em;
    margin-bottom: 4px;
  }

  .footer-links a,
  .footer-socials a{
    font-size: 15px;
  }

  .footer-links a:active,
  .footer-socials a:active{
    transform: scale(.95);
    color: white;
    text-shadow:
      0 0 12px rgba(92,242,255,.6);
  }

  .footer-separator{
    display: none;
  }

  .footer-bottom{
    margin-top: 34px;
    padding-top: 18px;
    padding-left: 18px;
    padding-right: 18px;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
  }

   .footer-name span{
    animation: mobileLetterFloat 2.8s ease-in-out infinite;
  }

  .footer-name span:nth-child(2n){
    animation-delay: .2s;
  }

  .footer-name span:nth-child(3n){
    animation-delay: .4s;
  }

  .footer-name span:nth-child(4n){
    animation-delay: .6s;
  }

 
}

@keyframes mobileLetterFloat{
  0%,100%{
    transform: translateY(0);
    text-shadow:
      0 0 20px rgba(182,241,255,.15),
      0 10px 40px rgba(0,0,0,.55);
  }
  50%{
    transform: translateY(-6px);
    text-shadow:
      0 0 24px rgba(182,241,255,.65),
      0 0 60px rgba(92,242,255,.35);
  }
}
</style>