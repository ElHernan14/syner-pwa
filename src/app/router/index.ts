import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { authGuard } from './guards/auth.guard'

import { adminRoutes } from './routes/admin.routes'
import { appRoutes } from './routes/app.routes'
import { authRoutes } from './routes/auth.routes'
import { publicRoutes } from './routes/public.routes'

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  ...appRoutes,
  ...adminRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

router.beforeEach(authGuard)
