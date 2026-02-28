<template>
  <section id="contatti" class="contacts">
    <div class="contacts-wrap">

      <!-- Testo -->
      <div class="contacts-text">
        <span class="eyebrow balloon">Contatti</span>
        <h2 class="contacts-title big-glow">
          Parliamo del tuo progetto
        </h2>
        <p class="contacts-sub">
          Hai un’idea, un sito da rifare o un progetto da lanciare?  
          Raccontami cosa hai in mente e troviamo insieme la soluzione migliore.
        </p>

        

        <!-- Contatti diretti -->
        <div class="direct">
          <a href="mailto:thomassalvaterra2001@gmail.com" class="direct-item">
            📩 thomassalvaterra2001@gmail.com
          </a>

          <div class="socials">
            <a href="https://www.linkedin.com/in/thomas-salvaterra-239a05279/" target="_blank" class="social linkedin">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/thomas_salvaterra" target="_blank" class="social instagram">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@thomas_salvaterra" target="_blank" class="social github">
              TikTok
            </a>
            <a href="https://calendly.com/thomassalvaterra2001/30min" target="_blank" class="social-btn call" @click.prevent="openCalendly = true">
              📅 Chiamata
            </a>
            <div v-if="openCalendly" class="calendly-overlay" @click.self="openCalendly = false">
              <div class="calendly-modal">
                <button class="close" @click="openCalendly = false">✕</button>

                <iframe
                  src="https://calendly.com/thomassalvaterra2001/30min"
                  frameborder="0"
                  allow="camera; microphone; fullscreen"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form class="contacts-form" @submit.prevent="submit">
        <div class="field">
          <label>Nome</label>
          <input v-model="form.name" type="text" placeholder="Il tuo nome" required />
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="La tua email" required />
        </div>

        <div class="field">
          <label>Messaggio</label>
          <textarea v-model="form.message" rows="4" placeholder="Dimmi di cosa hai bisogno..." required></textarea>
        </div>

        <button
          class="cta big glow submit-btn"
          :class="{ loading }"
          :disabled="loading"
        >
          <span v-if="!loading">Invia richiesta →</span>
          <span v-else class="sending">
            <span class="spinner"></span>
            Invio in corso...
          </span>
        </button>

        <p class="privacy">
          Nessuno spam. Ti scrivo solo per rispondere alla tua richiesta.
        </p>
      </form>
      <div v-if="sent" class="sent-toast">
        <div class="sent-box">
          <span class="sent-icon">🚀</span>
          <h3>Messaggio inviato!</h3>
          <p>Ti risponderò il prima possibile.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const openCalendly = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const sent = ref(false)

const submit = async () => {
  if (loading.value) return
  loading.value = true

  // ✅ Validazione base
  if (!form.value.name || !form.value.email || !form.value.message) {
    alert('Compila tutti i campi 😉')
    loading.value = false
    return
  }

  try {
    await emailjs.send(
      'service_vw74axl',
      'template_mi7xvnl',
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message
      },
      'atc4Z_dvJlqtUfgck'
    )

    form.value = { name: '', email: '', message: '' }
    sent.value = true

    setTimeout(() => {
      sent.value = false
    }, 3500)

  } catch (err) {
    console.error(err)
    alert('Errore durante l’invio 😥')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.eyebrow.balloon{
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 900;
  letter-spacing: .14em;
  text-transform: uppercase;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  box-shadow:
    0 6px 18px rgba(0,0,0,.25),
    inset 0 1px 1px rgba(255,255,255,.5),
    0 0 24px rgba(92,242,255,.35);
  font-size: 12px;
  animation: floatIn .6s cubic-bezier(.2,.8,.2,1) both;
}

@keyframes floatIn{
  from{
    opacity: 0;
    transform: translateY(8px) scale(.95);
  }
  to{
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.contacts{
  padding: 160px 0;
}

.contacts-wrap{
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 90px;
  align-items: center;
}

/* Testo */
.contacts-title{
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 16px;
}

.contacts-sub{
  color: var(--muted);
  max-width: 520px;
  margin-bottom: 28px;
  font-size: 16px;
}

.trust{
  display: grid;
  gap: 10px;
  margin-bottom: 28px;
  font-weight: 600;
}

/* Contatti diretti */
.direct{
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.direct-item{
  display: inline-block;
  font-weight: 700;
  font-size: 16px;
  color: white;
  opacity: .9;
  transition: opacity .2s ease;
}

.direct-item:hover{
  opacity: 1;
}

/* Social */
.socials{
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social{
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.15);
  font-weight: 700;
  font-size: 13px;
  transition: transform .2s ease, box-shadow .2s ease, border .2s ease;
}

.social:hover{
  transform: translateY(-2px);
  box-shadow: 0 0 18px rgba(92,242,255,.35);
  border-color: rgba(92,242,255,.6);
}

.github{ background: rgba(255,255,255,.04); }
.linkedin{ background: rgba(10,102,194,.15); }
.instagram{ background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af); }

/* Form */
.contacts-form{
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 26px;
  padding: 40px;
  box-shadow: 0 40px 100px rgba(0,0,0,.65);
  position: relative;
  overflow: hidden;
}

.contacts-form::after{
  content: '';
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at top left, rgba(92,242,255,.12), transparent 50%);
  pointer-events: none;
}

.field{
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

label{
  font-size: 12px;
  opacity: .7;
}

input, textarea{
  background: rgba(0,0,0,.45);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 12px;
  padding: 12px 14px;
  color: white;
  outline: none;
  transition: border .2s ease, box-shadow .2s ease;
}

input:focus, textarea:focus{
  border-color: rgba(92,242,255,.6);
  box-shadow: 0 0 0 2px rgba(92,242,255,.15);
}

.cta.big{
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 14px;
}

.cta.glow{
  box-shadow: 0 0 30px rgba(37,99,235,.45);
}

.privacy{
  margin-top: 12px;
  font-size: 12px;
  opacity: .6;
  text-align: center;
}

/* Responsive */
@media (max-width: 900px){
  .contacts-wrap{
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.social-btn.call{
  border-radius: 10px; /* 👈 più quadrata */
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  box-shadow: 0 0 16px rgba(92,242,255,.35);
  padding: 9px 16px;
}

.social-btn.call:hover{
  box-shadow:
    0 0 24px rgba(92,242,255,.55),
    0 10px 30px rgba(0,0,0,.6);
}

.calendly-overlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  z-index: 999;
  animation: fadeIn .25s ease;
}

.calendly-modal{
  width: min(900px, 92vw);
  height: min(700px, 90vh);
  background: #0b0f14;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 40px 120px rgba(0,0,0,.8);
  animation: pop .35s cubic-bezier(.2,.8,.2,1);
}

.calendly-modal iframe{
  width: 100%;
  height: 100%;
  border: 0;
}

.calendly-modal .close{
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0;
  background: rgba(255,255,255,.1);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all .2s ease;
}

.calendly-modal .close:hover{
  background: rgba(255,255,255,.25);
  transform: rotate(90deg);
}

@keyframes fadeIn{
  from{ opacity: 0 }
  to{ opacity: 1 }
}

@keyframes pop{
  from{ transform: scale(.9) translateY(20px); opacity: 0 }
  to{ transform: scale(1) translateY(0); opacity: 1 }
}

.sent-toast{
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 9999;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(10px);
  animation: fadeIn .3s ease;
}

.sent-box{
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 24px;
  padding: 48px 56px;
  text-align: center;
  box-shadow: 0 40px 120px rgba(0,0,0,.9);
  animation: popUp .45s cubic-bezier(.2,.8,.2,1);
}

.sent-icon{
  font-size: 42px;
  display: block;
  margin-bottom: 10px;
}

.sent-box h3{
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 6px;
  background: linear-gradient(90deg, #fff, #b6f1ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sent-box p{
  font-size: 15px;
  opacity: .75;
}

@keyframes popUp{
  from{ transform: scale(.8) translateY(20px); opacity: 0 }
  to{ transform: scale(1) translateY(0); opacity: 1 }
}

.submit-btn{
  position: relative;
  overflow: hidden;
  transition: transform .2s ease, box-shadow .25s ease;
}

.submit-btn:hover{
  transform: translateY(-2px);
  box-shadow:
    0 0 28px rgba(92,242,255,.55),
    0 12px 30px rgba(0,0,0,.7);
}

.submit-btn:active{
  transform: translateY(0) scale(.98);
}

/* Stato loading */
.submit-btn.loading{
  pointer-events: none;
  filter: grayscale(.2);
  box-shadow: 0 0 18px rgba(92,242,255,.25);
}

/* Contenuto */
.sending{
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

/* Spinner */
.spinner{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(0,0,0,.3);
  border-top-color: #0b0f14;
  animation: spin .8s linear infinite;
}

@keyframes spin{
  to{ transform: rotate(360deg) }
}
</style>