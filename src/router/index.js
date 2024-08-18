import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import MyPostsView from '../views/MyPostsView.vue'
import NotFound from '@/views/error/NotFound.vue'
import Unauthorized from '@/views/error/Unauthorized.vue'
import {api} from '@/ky'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostView
    },
    {
      path: '/my-posts',
      name: 'my-posts',
      component: MyPostsView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    { path: '/unauthorized', component: Unauthorized },
    { path: '/:pathMatch(.*)*', component: NotFound }, // 404 route
  ]
})

export default router
