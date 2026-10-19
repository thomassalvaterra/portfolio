import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { reveal, tilt } from './directives'
import { initSmoothScroll } from './smoothScroll'

createApp(App)
  .use(router)
  .directive('reveal', reveal)
  .directive('tilt', tilt)
  .mount('#app')

initSmoothScroll()
