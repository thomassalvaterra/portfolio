<template>
  <section id="recensioni" class="reviews-marquee">
    <div v-reveal class="reviews-head wrap">
      <span class="eyebrow">Recensioni</span>
      <h2 class="section-title">Clienti felici, <span class="soft">progetti che funzionano</span></h2>
      <p class="lead">
        Esperienze vere di chi ha visto il proprio progetto crescere
      </p>
    </div>

    <!-- Due righe che scorrono in direzioni opposte (si fermano al passaggio del mouse) -->
    <div v-for="(row, k) in rows" :key="k" class="track">
      <div class="row marquee" :class="{ reverse: k === 1, slow: k === 1 }">
        <ReviewCard v-for="(r, i) in [...row, ...row]" :key="k + '-' + i" :r="r" />
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
  },
  {
    name: 'Marco R.',
    role: 'Titolare E-commerce',
    text: 'Avevo un sito lento, poco chiaro e che convertiva male. Thomas non si è limitato a rifarlo graficamente, ma mi ha spiegato cosa non funzionava a livello di esperienza utente. Ha sistemato la struttura delle pagine, reso il checkout più semplice e migliorato la velocità di caricamento. Dopo il rilascio ho notato un aumento delle conversioni e meno utenti che abbandonano il sito.',
  },
  {
    name: 'Giulia P.',
    role: 'Personal Trainer',
    text: 'Non avevo mai lavorato con uno sviluppatore e temevo di non riuscire a spiegarmi bene. Invece Thomas è stato super disponibile: mi ha guidato passo dopo passo, mi ha mostrato delle bozze e mi ha coinvolta nelle scelte. Ora ho un sito semplice da aggiornare, professionale e coerente con la mia immagine. I clienti mi fanno spesso i complimenti per la chiarezza del sito.',
  },
  {
    name: 'Luca F.',
    role: 'Ristoratore',
    text: 'Il mio vecchio sito era datato e non funzionava bene da mobile. Thomas ha riprogettato tutto partendo dalle reali esigenze dei clienti: menu chiaro, informazioni immediate e contatti in evidenza. Il sito ora è molto più veloce e leggibile anche da smartphone. Ho ricevuto diversi feedback positivi dai clienti che ora trovano subito quello che cercano.',
  }
]

const reviewsB = [
  {
    name: 'Sara T.',
    role: 'Content Creator',
    text: 'Volevo un sito personale che mi rappresentasse davvero e che non fosse il solito template. Thomas ha creato una struttura su misura, con animazioni leggere e una grafica coerente con il mio stile. Mi ha anche dato consigli su come organizzare i contenuti per renderli più efficaci. Il risultato è un sito che uso come vero e proprio biglietto da visita professionale.',
  },
  {
    name: 'Davide C.',
    role: 'Consulente Marketing',
    text: 'Collaborare con Thomas è stato molto semplice: comunicazione chiara, tempi rispettati e attenzione ai dettagli. Oltre allo sviluppo tecnico, mi ha proposto soluzioni per migliorare la struttura delle pagine in ottica di conversione. Abbiamo lavorato insieme su performance e SEO tecnica, e il sito ora è molto più solido e professionale.',
  },
  {
    name: 'Francesca L.',
    role: 'Libera professionista',
    text: 'Avevo bisogno di un sito semplice ma curato per presentare i miei servizi. Thomas ha capito subito cosa volevo comunicare e ha tradotto le mie idee in una grafica pulita e funzionale. Mi ha spiegato anche come gestire alcune parti in autonomia. Ora mi sento finalmente rappresentata online in modo professionale.',
  },
  {
    name: 'Andrea V.',
    role: 'Founder — Progetto digitale',
    text: 'Il progetto era complesso e avevamo bisogno di una struttura chiara e scalabile. Thomas ha impostato tutto in modo ordinato, con componenti riutilizzabili e un codice pulito. Questo ci permette di aggiungere nuove funzionalità in futuro senza rifare tutto da capo. È stato molto preciso e orientato alla qualità.',
  }
]

const reviewsC = [
  {
    name: 'Chiara S.',
    role: 'E-commerce Manager',
    text: 'Il lavoro fatto da Thomas ha migliorato moltissimo l’esperienza utente del nostro sito. Ha individuato i punti critici del funnel di acquisto e li ha semplificati. Il sito ora è più veloce, più intuitivo e soprattutto più orientato alla conversione. Collaborazione super positiva.',
  },
  {
    name: 'Matilde D.',
    role: 'Startup Founder',
    text: 'Cercavo qualcuno che non fosse solo un “esecutore”, ma che capisse il progetto. Thomas ha fatto proprio questo: ha analizzato il contesto, gli obiettivi e il target, proponendo soluzioni concrete. Il risultato finale è un sito professionale che comunica bene il valore del prodotto.',
  },
  {
    name: 'Elena R.',
    role: 'Coach Professionale',
    text: 'Grazie a Thomas ora ho un sito che trasmette fiducia e professionalità. Prima ricevevo poche richieste dal sito, ora è diventato uno strumento reale di contatto con i clienti. Apprezzo molto la cura dei dettagli e la chiarezza nella comunicazione durante tutto il lavoro.',
  },
  {
    name: 'Paola B.',
    role: 'Imprenditore',
    text: 'Il sito precedente non rispecchiava la qualità dei miei servizi. Thomas ha ripensato tutta l’esperienza, rendendo la navigazione più fluida e moderna. Abbiamo lavorato insieme anche sulla presentazione dei contenuti e ora il sito è finalmente all’altezza del brand.',
  }
]

// 12 recensioni divise su due righe
const rows = [
  [...reviewsA, ...reviewsC.slice(0, 2)],
  [...reviewsB, ...reviewsC.slice(2)]
]
</script>

<style scoped>
.reviews-marquee{
  padding: 60px 0 140px;
  overflow: hidden;
  position: relative;
}

.reviews-head{
  text-align: center;
  margin-bottom: 56px;
}
.reviews-head .section-title{ margin: 22px auto 18px; max-width: 15ch; }
.reviews-head .lead{ margin: 0 auto; }

.track{
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.row.marquee{
  display: flex;
  gap: 16px;
  width: max-content;
  padding: 10px 0;
  animation: marquee 60s linear infinite;
  backface-visibility: hidden;
}
.row.reverse{ animation-direction: reverse; }
.row.slow{ animation-duration: 80s; }

/* pausa al passaggio del mouse per poter leggere */
.track:hover .row.marquee{ animation-play-state: paused; }

@keyframes marquee{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }
}

@media (max-width: 900px){
  .reviews-marquee{ padding: 30px 0 80px; }
  .reviews-head{ margin-bottom: 28px; }
  .row.marquee{ gap: 12px; padding: 6px 0; }
}
</style>
