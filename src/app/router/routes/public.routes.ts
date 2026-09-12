import type { RouteRecordRaw } from 'vue-router'

import PublicLayout from '@/app/layouts/PublicLayout.vue'
import LandingLayout from '@/app/layouts/LandingLayout.vue'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LandingLayout,
    children: [
      {
        path: '',
        name: 'landing',
        component: () => import('@/modules/landing/pages/LandingPage.vue'),
        meta: {
          public: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: 'lotes',
        name: 'lotes',
        component: () => import('@/modules/lotes/pages/CatalogoPage.vue'),
        meta: {
          public: true,
          publicOnly: true,
        },
      },
      {
        path: 'lotes/:id',
        name: 'lote-detalle',
        component: () => import('@/modules/lotes/pages/DetalleLotePage.vue'),
        meta: {
          public: true,
          publicOnly: true,
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
]
