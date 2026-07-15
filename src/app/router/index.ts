import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import PublicLayout from '../layouts/PublicLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'landing',
        component: () => import('@/modules/landing/pages/LandingPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/modules/auth/pages/RegisterPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/modules/auth/pages/LoginPage.vue'),
      },
      {
        path: 'onboarding',
        name: 'onboarding',
        component: () => import('@/modules/onboarding/pages/OnboardingPage.vue'),
      },
      {
        path: 'terms',
        name: 'terms',
        component: () => import('@/modules/legal/pages/TermsPage.vue'),
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('@/modules/legal/pages/PrivacyPage.vue'),
      },
    ],
  },

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
