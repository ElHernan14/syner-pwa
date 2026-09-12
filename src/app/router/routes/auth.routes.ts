import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/modules/auth/pages/RegisterPage.vue'),
    meta: {
      public: true,
      guestOnly: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/pages/LoginPage.vue'),
    meta: {
      public: true,
      guestOnly: true,
    },
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/modules/onboarding/pages/OnboardingPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
