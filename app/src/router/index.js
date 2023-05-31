import { createRouter, createWebHistory } from 'vue-router'


import UserRouter from './UserRouter'
import AdminRouter from './AdminRouter'

const routes = [
  ...UserRouter,
  ...AdminRouter
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
