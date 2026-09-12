import type { RouteRecordRaw } from 'vue-router'

import PublicLayout from '@/app/layouts/PublicLayout.vue'

export const publicRoutes: RouteRecordRaw[] = [
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
        path: 'lotes',
        name: 'lotes',
        component: () => import('@/modules/lotes/pages/CatalogoPage.vue'),
        meta: {
          public: true,
          publicOnly: true,
          area: 'public',
        },
      },
      {
        path: 'lotes/:id',
        name: 'lote-detalle',
        component: () => import('@/modules/lotes/pages/DetalleLotePage.vue'),
        meta: {
          public: true,
          publicOnly: true,
          area: 'public',
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
