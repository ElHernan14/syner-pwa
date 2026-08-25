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
        meta: {
          public: true,
        },
      },

      {
        path: 'register',
        name: 'register',
        component: () => import('@/modules/auth/pages/RegisterPage.vue'),
        meta: {
          public: true,
          guestOnly: true,
        },
      },

      {
        path: 'login',
        name: 'login',
        component: () => import('@/modules/auth/pages/LoginPage.vue'),
        meta: {
          public: true,
          guestOnly: true,
        },
      },

      {
        path: 'lotes',
        name: 'lotes',
        component: () => import('@/modules/lotes/pages/CatalogoPage.vue'),
        meta: {
          public: true,
        },
      },

      {
        path: 'lotes/:id',
        name: 'lote-detalle',
        component: () => import('@/modules/lotes/pages/DetalleLotePage.vue'),
        meta: {
          public: true,
        },
      },

      {
        path: 'onboarding',
        name: 'onboarding',
        component: () => import('@/modules/onboarding/pages/OnboardingPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: 'terms',
        name: 'terms',
        component: () => import('@/modules/legal/pages/TermsPage.vue'),
        meta: {
          public: true,
        },
      },

      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('@/modules/legal/pages/PrivacyPage.vue'),
        meta: {
          public: true,
        },
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
