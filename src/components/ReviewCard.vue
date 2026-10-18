<template>
  <article v-if="r" class="review-card">
    <div class="head">
      <img :src="r.avatar" :alt="r.name" />
      <div class="meta">
        <strong>{{ r.name }}</strong>
        <span>{{ r.role }}</span>
      </div>
    </div>

    <span class="stars">★★★★★</span>
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
  width: 380px;
  flex-shrink: 0;
  background: var(--panel-solid);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 22px 24px;
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform .5s var(--ease), box-shadow .4s ease, background .4s ease;
}

.review-card:hover{
  transform: translateY(-6px) rotate(-1deg);
  background: #fff;
  box-shadow: var(--shadow-lift);
}

.head{
  display: flex;
  align-items: center;
  gap: 12px;
}

.head img{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 3px #fff, 0 6px 14px -6px rgba(31,58,39,.5);
}

.meta strong{
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: var(--forest);
}
.meta span{
  font-size: 13px;
  color: var(--muted);
}

.stars{
  color: #d6a43a;
  letter-spacing: 2px;
  font-size: 13px;
}

.text{
  font-size: 15px;
  line-height: 1.55;
  color: #47544a;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 900px){
  .review-card{
    width: 280px;
    padding: 18px;
    border-radius: 20px;
  }
  .review-card:hover{ transform: none; }
  .text{
    font-size: 14px;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
}
</style>
