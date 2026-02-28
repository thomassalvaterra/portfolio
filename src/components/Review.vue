<template>
  <section id="recensioni" class="reviews-marquee">
    <div class="reviews-head">
      <h2 class="reviews-title">Clienti felici, progetti che funzionano</h2>
        <p class="reviews-sub">
        Esperienze vere di chi ha visto il proprio progetto crescere
        </p>
    </div>

    <!-- Riga 1 -->
    <!-- Riga 1 -->
<div class="track left">
  <div class="row marquee">
    <ReviewCard
      v-for="(r, i) in reviewsA"
      :key="'a-'+i"
      :r="r"
    />
    <ReviewCard
      v-for="(r, i) in reviewsA"
      :key="'a-dup-'+i"
      :r="r"
    />
  </div>
</div>

<!-- Riga 2 -->
<div class="track right">
  <div class="row marquee reverse slow">
    <ReviewCard
      v-for="(r, i) in reviewsB"
      :key="'b-'+i"
      :r="r"
    />
    <ReviewCard
      v-for="(r, i) in reviewsB"
      :key="'b-dup-'+i"
      :r="r"
    />
  </div>
</div>

<!-- Riga 3 -->
<div class="track left">
  <div class="row marquee fast">
    <ReviewCard
      v-for="(r, i) in reviewsC"
      :key="'c-'+i"
      :r="r"
    />
    <ReviewCard
      v-for="(r, i) in reviewsC"
      :key="'c-dup-'+i"
      :r="r"
    />
  </div>
</div>
  </section>
</template>

<script setup>
import ReviewCard from './ReviewCard.vue'

const reviewsA = [
  {
    name: 'Alessandra M.',
    role: 'Founder — Startup SaaS',
    text: 'Quando ho contattato Thomas avevo solo un’idea molto confusa del prodotto che volevo lanciare. Mi ha aiutato a fare chiarezza sugli obiettivi, sulla struttura del sito e su come presentare il progetto in modo comprensibile agli utenti. Il risultato è stato un sito veloce, pulito e professionale, che ha migliorato moltissimo la percezione del brand. Abbiamo anche ottimizzato le performance e ora il sito carica in modo immediato.',
    avatar: 'https://i.pravatar.cc/120?img=32'
  },
  {
    name: 'Marco R.',
    role: 'Titolare E-commerce',
    text: 'Avevo un sito lento, poco chiaro e che convertiva male. Thomas non si è limitato a rifarlo graficamente, ma mi ha spiegato cosa non funzionava a livello di esperienza utente. Ha sistemato la struttura delle pagine, reso il checkout più semplice e migliorato la velocità di caricamento. Dopo il rilascio ho notato un aumento delle conversioni e meno utenti che abbandonano il sito.',
    avatar: 'https://i.pravatar.cc/120?img=12'
  },
  {
    name: 'Giulia P.',
    role: 'Personal Trainer',
    text: 'Non avevo mai lavorato con uno sviluppatore e temevo di non riuscire a spiegarmi bene. Invece Thomas è stato super disponibile: mi ha guidato passo dopo passo, mi ha mostrato delle bozze e mi ha coinvolta nelle scelte. Ora ho un sito semplice da aggiornare, professionale e coerente con la mia immagine. I clienti mi fanno spesso i complimenti per la chiarezza del sito.',
    avatar: 'https://i.pravatar.cc/120?img=47'
  },
  {
    name: 'Luca F.',
    role: 'Ristoratore',
    text: 'Il mio vecchio sito era datato e non funzionava bene da mobile. Thomas ha riprogettato tutto partendo dalle reali esigenze dei clienti: menu chiaro, informazioni immediate e contatti in evidenza. Il sito ora è molto più veloce e leggibile anche da smartphone. Ho ricevuto diversi feedback positivi dai clienti che ora trovano subito quello che cercano.',
    avatar: 'https://i.pravatar.cc/120?img=22'
  }
]

const reviewsB = [
  {
    name: 'Sara T.',
    role: 'Content Creator',
    text: 'Volevo un sito personale che mi rappresentasse davvero e che non fosse il solito template. Thomas ha creato una struttura su misura, con animazioni leggere e una grafica coerente con il mio stile. Mi ha anche dato consigli su come organizzare i contenuti per renderli più efficaci. Il risultato è un sito che uso come vero e proprio biglietto da visita professionale.',
    avatar: 'https://i.pravatar.cc/120?img=5'
  },
  {
    name: 'Davide C.',
    role: 'Consulente Marketing',
    text: 'Collaborare con Thomas è stato molto semplice: comunicazione chiara, tempi rispettati e attenzione ai dettagli. Oltre allo sviluppo tecnico, mi ha proposto soluzioni per migliorare la struttura delle pagine in ottica di conversione. Abbiamo lavorato insieme su performance e SEO tecnica, e il sito ora è molto più solido e professionale.',
    avatar: 'https://i.pravatar.cc/120?img=15'
  },
  {
    name: 'Francesca L.',
    role: 'Libera professionista',
    text: 'Avevo bisogno di un sito semplice ma curato per presentare i miei servizi. Thomas ha capito subito cosa volevo comunicare e ha tradotto le mie idee in una grafica pulita e funzionale. Mi ha spiegato anche come gestire alcune parti in autonomia. Ora mi sento finalmente rappresentata online in modo professionale.',
    avatar: 'https://i.pravatar.cc/120?img=41'
  },
  {
    name: 'Andrea V.',
    role: 'Founder — Progetto digitale',
    text: 'Il progetto era complesso e avevamo bisogno di una struttura chiara e scalabile. Thomas ha impostato tutto in modo ordinato, con componenti riutilizzabili e un codice pulito. Questo ci permette di aggiungere nuove funzionalità in futuro senza rifare tutto da capo. È stato molto preciso e orientato alla qualità.',
    avatar: 'https://i.pravatar.cc/120?img=28'
  }
]

const reviewsC = [
  {
    name: 'Chiara S.',
    role: 'E-commerce Manager',
    text: 'Il lavoro fatto da Thomas ha migliorato moltissimo l’esperienza utente del nostro sito. Ha individuato i punti critici del funnel di acquisto e li ha semplificati. Il sito ora è più veloce, più intuitivo e soprattutto più orientato alla conversione. Collaborazione super positiva.',
    avatar: 'https://i.pravatar.cc/120?img=9'
  },
  {
    name: 'Matilde D.',
    role: 'Startup Founder',
    text: 'Cercavo qualcuno che non fosse solo un “esecutore”, ma che capisse il progetto. Thomas ha fatto proprio questo: ha analizzato il contesto, gli obiettivi e il target, proponendo soluzioni concrete. Il risultato finale è un sito professionale che comunica bene il valore del prodotto.',
    avatar: 'https://i.pravatar.cc/120?img=19'
  },
  {
    name: 'Elena R.',
    role: 'Coach Professionale',
    text: 'Grazie a Thomas ora ho un sito che trasmette fiducia e professionalità. Prima ricevevo poche richieste dal sito, ora è diventato uno strumento reale di contatto con i clienti. Apprezzo molto la cura dei dettagli e la chiarezza nella comunicazione durante tutto il lavoro.',
    avatar: 'https://i.pravatar.cc/120?img=44'
  },
  {
    name: 'Paola B.',
    role: 'Imprenditore',
    text: 'Il sito precedente non rispecchiava la qualità dei miei servizi. Thomas ha ripensato tutta l’esperienza, rendendo la navigazione più fluida e moderna. Abbiamo lavorato insieme anche sulla presentazione dei contenuti e ora il sito è finalmente all’altezza del brand.',
    avatar: 'https://i.pravatar.cc/120?img=26'
  }
]
</script>

<style scoped>
.reviews-marquee{
  overflow: hidden;
  position: relative;
}

.reviews-head{
  text-align: center;
    margin-bottom: 60px;
}

.track{
  overflow: hidden;
  position: relative;
}

.row.marquee{
  display: flex;
  gap: 16px;
  width: max-content;
  animation: marquee 36s linear infinite;
  margin: 10px 0;
}

.row.reverse{
  animation-direction: reverse;
}

.row.slow{ animation-duration: 48s; }
.row.fast{ animation-duration: 24s; }

@keyframes marquee{
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.row{
  display: flex;
  gap: 16px;
  width: max-content;
}


/* Card recensione */
.review-card{
  min-width: 320px;
  max-width: 320px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 18px;
  padding: 18px 18px 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,.45);
}

.review-card .head{
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.review-card img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.review-card p{
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
}

.review-card .stars{
  margin-top: 8px;
  letter-spacing: 2px;
  color: #facc15;
}

.review-card.open{
  pointer-events: auto;
  filter: none !important;
}

.reviews-title{
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 12px;
  letter-spacing: -.02em;
  text-shadow:
    0 0 24px rgba(92,242,255,.25),
    0 10px 40px rgba(0,0,0,.55);
}

.reviews-sub{
  color: var(--muted);
  max-width: 720px;
  margin: 0 auto 28px;
  font-size: 16px;
}

/* Variante extra glow per titoli super bold */
.big-glow{
  background: linear-gradient(90deg, #fff, #b6f1ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow:
    0 0 30px rgba(182,241,255,.35),
    0 0 60px rgba(182,241,255,.25);
}

/* ============ MOBILE REVIEW FIX ============ */
@media (max-width: 900px){

  /* niente stacchi enormi tra sezioni */
  .reviews-marquee{
    padding: 2px 0 24px; /* top/bottom piccoli */
  }

  .reviews-head{
    margin-bottom: 18px;  /* prima 60px */
    padding: 0 16px;
  }

  .reviews-title{
    font-size: 30px;      /* più compatto */
    line-height: 1.08;
    margin-bottom: 10px;
  }

  .reviews-sub{
    font-size: 15px;      /* leggibile */
    line-height: 1.5;
    margin: 0 auto 10px;  /* meno stacco */
    max-width: 560px;
  }

  /* righe più vicine */
  .row.marquee{
    gap: 12px;
    margin: 6px 0;        /* prima 10px */
    animation-duration: 34s; /* un po' più fluido su mobile */
    will-change: transform;
    transform: translateZ(0);
  }

  .row.slow{ animation-duration: 44s; }
  .row.fast{ animation-duration: 26s; }

  /* card più “mobile friendly” */
  :deep(.review-card){
    min-width: 260px;     /* prima 320 */
    max-width: 260px;
    padding: 14px 14px 12px;
    border-radius: 16px;
  }

  :deep(.review-card img){
    width: 34px;
    height: 34px;
  }

  :deep(.review-card p){
    font-size: 13px;
    line-height: 1.45;
  }
}

/* (opzionale ma consigliato) evita “micro stacchi” su Safari iOS */
.row.marquee{
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}
</style>