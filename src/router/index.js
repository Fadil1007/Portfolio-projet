import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import NotFound from '../components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
        path: '/:pathmatch(.*)',
        name: 'NotFound',
        component: NotFound
    }
  ]
})

export default router