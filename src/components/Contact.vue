<template>
  <section id="contatti" class="contacts">
    <div class="wrap">
      <div class="panel">
        <div class="panel-bg" aria-hidden="true"></div>

        <!-- Testo -->
        <div v-reveal class="contacts-text">
          <span class="eyebrow on-dark">Contatti</span>
          <h2 class="contacts-title">
            Parliamo del <span class="soft">tuo progetto</span>
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
              <a href="https://www.linkedin.com/in/thomas-salvaterra-239a05279/" target="_blank" rel="noopener" class="social">LinkedIn</a>
              <a href="https://www.instagram.com/thomas_salvaterra" target="_blank" rel="noopener" class="social">Instagram</a>
              <a href="https://www.tiktok.com/@thomas_salvaterra" target="_blank" rel="noopener" class="social">TikTok</a>
              <a :href="pixelai.url" target="_blank" rel="noopener" class="social pixel">PixelAi · AI</a>
              <a href="https://calendly.com/thomassalvaterra2001/30min" target="_blank" rel="noopener" class="btn-light call" @click.prevent="openCalendly = true">
                📅 Chiamata
              </a>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form v-reveal="150" class="contacts-form" @submit.prevent="submit">
          <div class="field">
            <input id="c-name" v-model="form.name" type="text" placeholder=" " required />
            <label for="c-name">Nome</label>
          </div>

          <div class="field">
            <input id="c-email" v-model="form.email" type="email" placeholder=" " required />
            <label for="c-email">Email</label>
          </div>

          <div class="field">
            <textarea id="c-msg" v-model="form.message" rows="4" placeholder=" " required></textarea>
            <label for="c-msg">Dimmi di cosa hai bisogno...</label>
          </div>

          <button class="btn-dark submit-btn" :class="{ loading }" :disabled="loading">
            <span v-if="!loading">Invia richiesta →</span>
            <span v-else class="sending">
              <span class="spinner"></span>
              Invio in corso...
            </span>
          </button>

          <p v-if="error" class="form-error" role="alert">{{ error }}</p>

          <p class="privacy">
            Nessuno spam. Ti scrivo solo per rispondere alla tua richiesta.
          </p>
        </form>
      </div>
    </div>

    <transition name="fade">
      <div v-if="openCalendly" class="calendly-overlay" data-lenis-prevent @click.self="openCalendly = false">
        <div class="calendly-modal">
          <button class="close" @click="openCalendly = false">✕</button>
          <iframe
            src="https://calendly.com/thomassalvaterra2001/30min"
            frameborder="0"
            allow="camera; microphone; fullscreen"
          ></iframe>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="sent" class="sent-toast">
        <div class="sent-box">
          <span class="sent-icon">🚀</span>
          <h3>Messaggio inviato!</h3>
          <p>Ti risponderò il prima possibile.</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'
import { pixelai } from '@/data/socials'

const openCalendly = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const error = ref('')
const sent = ref(false)

const submit = async () => {
  if (loading.value) return
  error.value = ''

  // ✅ Validazione base
  if (!form.value.name || !form.value.email || !form.value.message) {
    error.value = 'Compila tutti i campi 😉'
    return
  }

  loading.value = true

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
    error.value = 'Errore durante l’invio 😥 Riprova o scrivimi direttamente via email.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contacts{
  padding: 40px 0 120px;
}

.panel{
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
  padding: 80px 72px;
  border-radius: 40px;
  color: #eef2e6;
  background: linear-gradient(170deg, #2a4a33, #15261a 70%);
  box-shadow: 0 60px 120px -50px rgba(22,40,27,.8);
}

/* bagliore caldo sul fondo del pannello */
.panel-bg{
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(40% 60% at 85% 110%, rgba(243,217,164,.35), transparent 70%),
    radial-gradient(60% 40% at 10% 0%, rgba(143,191,154,.25), transparent 70%);
}
.panel-bg::after{
  content: '';
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: -40%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(143,191,154,.18), transparent);
  animation: breathe 10s ease-in-out infinite;
}
@keyframes breathe{
  0%, 100%{ transform: scale(1); opacity: .8; }
  50%{ transform: scale(1.08); opacity: 1; }
}

.eyebrow.on-dark{
  background: rgba(255,255,255,.08);
  border-color: rgba(255,255,255,.14);
  color: #d4e4d4;
}
.eyebrow.on-dark::before{
  background: #9fd1ad;
  box-shadow: 0 0 0 4px rgba(159,209,173,.18);
}

.contacts-title{
  margin: 22px 0 20px;
  font-size: clamp(42px, 5.6vw, 80px);
  line-height: .98;
  font-weight: 400;
  letter-spacing: -.05em;
  color: #f4f1e6;
}
.contacts-title .soft{
  background: linear-gradient(90deg, #9fc8a8, #d5e7cf);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.contacts-sub{
  color: rgba(238,242,230,.72);
  max-width: 44ch;
  margin-bottom: 34px;
  font-size: 17px;
}

.direct{
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.direct-item{
  font-size: 17px;
  font-weight: 500;
  width: fit-content;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition: background-size .5s var(--ease);
}
.direct-item:hover{ background-size: 100% 1px; }

.socials{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.social{
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.18);
  font-size: 14px;
  transition: background .3s ease, transform .3s var(--ease);
}
.social:hover{
  background: rgba(255,255,255,.1);
  transform: translateY(-2px);
}

.social.pixel{
  border-color: rgba(130,140,255,.5);
  background: linear-gradient(100deg, rgba(123,61,255,.25), rgba(0,180,255,.2));
}

.call{ padding: 10px 18px; font-size: 14px; }

/* Form */
.contacts-form{
  padding: 34px;
  border-radius: 28px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.14);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.field{
  position: relative;
  margin-bottom: 16px;
}

/* label flottante */
.field label{
  position: absolute;
  left: 16px;
  top: 16px;
  font-size: 15px;
  color: rgba(238,242,230,.55);
  pointer-events: none;
  transform-origin: left top;
  transition: transform .3s var(--ease), color .3s ease;
}

input, textarea{
  width: 100%;
  background: rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 16px;
  padding: 26px 16px 10px;
  font: inherit;
  font-size: 15px;
  color: #f4f1e6;
  outline: none;
  resize: vertical;
  transition: border-color .3s ease, background .3s ease, box-shadow .3s ease;
}

input:focus, textarea:focus{
  border-color: rgba(159,209,173,.7);
  background: rgba(0,0,0,.24);
  box-shadow: 0 0 0 4px rgba(159,209,173,.12);
}

input:focus + label,
input:not(:placeholder-shown) + label,
textarea:focus + label,
textarea:not(:placeholder-shown) + label{
  transform: translateY(-9px) scale(.78);
  color: #9fd1ad;
}

.submit-btn{
  width: 100%;
  margin-top: 6px;
  padding: 16px;
  font-size: 16px;
  color: var(--forest);
  background: linear-gradient(180deg, #f7f4ea, #e6e9da);
  box-shadow: 0 1px 0 #fff inset, 0 16px 30px -14px rgba(0,0,0,.6);
}
.submit-btn:hover{ transform: translateY(-2px); }
.submit-btn:active{ transform: translateY(0) scale(.98); }
.submit-btn.loading{ pointer-events: none; opacity: .8; }

.sending{
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.spinner{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(31,58,39,.25);
  border-top-color: var(--forest);
  animation: spin .8s linear infinite;
}
@keyframes spin{ to{ transform: rotate(360deg); } }

.form-error{
  margin-top: 14px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  color: #ffd9d0;
  background: rgba(220,80,60,.18);
  border: 1px solid rgba(255,140,120,.3);
}

.privacy{
  margin-top: 14px;
  font-size: 13px;
  color: rgba(238,242,230,.55);
  text-align: center;
}

/* Calendly + conferma */
.calendly-overlay,
.sent-toast{
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 999;
  background: rgba(22,40,27,.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.calendly-modal{
  width: min(900px, 92vw);
  height: min(700px, 90vh);
  background: #fff;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 60px 120px -40px rgba(22,40,27,.8);
  animation: pop .45s var(--ease);
}
.calendly-modal iframe{
  width: 100%;
  height: 100%;
  border: 0;
}
.calendly-modal .close{
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 0;
  background: var(--dark-btn);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: transform .3s var(--ease);
}
.calendly-modal .close:hover{ transform: rotate(90deg); }

.sent-box{
  background: var(--panel-solid);
  border-radius: 28px;
  padding: 48px 56px;
  text-align: center;
  box-shadow: 0 60px 120px -40px rgba(22,40,27,.8);
  animation: pop .5s var(--ease);
}
.sent-icon{
  font-size: 42px;
  display: block;
  margin-bottom: 10px;
}
.sent-box h3{
  font-size: 32px;
  font-weight: 400;
  color: var(--forest);
  margin-bottom: 6px;
}
.sent-box p{ color: var(--muted); }

@keyframes pop{
  from{ transform: scale(.9) translateY(20px); opacity: 0; }
  to{ transform: none; opacity: 1; }
}

.fade-enter-active, .fade-leave-active{ transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to{ opacity: 0; }

@media (max-width: 900px){
  .contacts{ padding: 20px 0 60px; }
  .panel{
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 40px 20px;
    border-radius: 28px;
  }
  .contacts-form{ padding: 20px; }
  .direct-item{ font-size: 15px; word-break: break-all; }
}
</style>
