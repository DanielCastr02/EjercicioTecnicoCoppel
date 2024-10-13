import { createRouter, createWebHistory } from 'vue-router'

import articleView from '../views/Articulos.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'article',
      component: articleView,
    },
  ]
})

export default router
