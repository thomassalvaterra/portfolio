<template>
  <article v-if="r" class="review-card">
    <div class="head">
      <img :src="r.avatar" :alt="r.name" />
      <div class="meta">
        <strong>{{ r.name }}</strong>
        <span>{{ r.role }}</span>
      </div>
    </div>

    <p class="text">“{{ r.text }}”</p>
  </article>
</template>

<script setup>
defineProps({
  r: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.review-card{
  min-width: 360px;
  max-width: 360px;
  background: #0b0f14;
  border: 1px solid rgba(255,255,255,.65);
  border-radius: 16px;
  padding: 16px 18px 14px;
  box-shadow: 0 20px 50px rgba(0,0,0,.55);
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: default;

  transition:
    transform .35s cubic-bezier(.2,.8,.2,1),
    box-shadow .35s ease,
    border-color .35s ease;

  /* aiuta su mobile/iOS a non “scattare” */
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.review-card:hover{
  transform: translateY(-6px) rotateX(6deg);
  box-shadow: 0 30px 80px rgba(0,0,0,.75);
  border-color: white;
}

.head{
  display: flex;
  align-items: center;
  gap: 12px;
}

.head img{
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  background: #fff;
}

.meta strong{
  display: block;
  font-size: 14px;
  color: white;
}

.meta span{
  font-size: 12px;
  color: rgba(255,255,255,.6);
}

.text{
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,.75);

  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ============ MOBILE ============ */
@media (max-width: 900px){

  .review-card{
    min-width: 260px;      /* più piccola */
    max-width: 260px;
    padding: 14px 14px 12px;
    border-radius: 14px;
    gap: 8px;
  }

  /* hover/3D disattivato su touch (evita “saltelli”) */
  .review-card:hover{
    transform: none;
    box-shadow: 0 20px 50px rgba(0,0,0,.55);
    border-color: rgba(255,255,255,.65);
  }

  .head{
    gap: 10px;
  }

  .head img{
    width: 34px;
    height: 34px;
    border-width: 2px;
  }

  .meta strong{
    font-size: 13px;
  }

  .meta span{
    font-size: 11px;
  }

  .text{
    font-size: 13px;
    line-height: 1.45;
    -webkit-line-clamp: 3; /* meno alta */
    line-clamp: 3;
  }
}
</style>