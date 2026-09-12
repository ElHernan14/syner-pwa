import type { RouteRecordRaw } from 'vue-router'

import AppLayout from '@/modules/app/layouts/AppLayout.vue'

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: AppLayout,
    meta: {
      requiresAuth: true,
      roles: ['usuario'],
    },
    children: [
      {
        path: '',
        name: 'app-dashboard',
        component: () => import('@/modules/app/pages/DashboardPage.vue'),
      },
      {
        path: 'lotes',
        name: 'app-lotes',
        component: () => import('@/modules/lotes/pages/CatalogoPage.vue'),
      },
      {
        path: 'lotes/:id',
        name: 'app-lote-detalle',
        component: () => import('@/modules/lotes/pages/DetalleLotePage.vue'),
      },
    ],
  },
]
