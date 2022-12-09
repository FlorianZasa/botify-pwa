import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import BotView from '../views/BotView'
import AddBot from '../views/AddBot'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bot/:name',
    name: 'BotView',
    component: BotView,
    props: true
  },
  {
    path: '/bot/add',
    name: 'AddBot',
    component: AddBot,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
