import { createRouter, createWebHistory } from 'vue-router'

// Importa le pagine (views)
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
    // in futuro puoi aggiungere:
    // { path: '/progetti', component: Projects },
  ],

  // 👇 forza sempre lo scroll in alto
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router