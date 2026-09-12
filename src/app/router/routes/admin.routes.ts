import type { RouteRecordRaw } from 'vue-router'

import AdminLayout from '@/modules/admin/layouts/AdminLayout.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      roles: ['admin'],
    },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/modules/admin/pages/DashboardPage.vue'),
      },
      {
        path: 'lotes',
        name: 'admin-lotes',
        component: () => import('@/modules/lotes/pages/CatalogoPage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          area: 'admin',
        },
      },
      {
        path: 'lotes/:id',
        name: 'admin-lote-detalle',
        component: () => import('@/modules/lotes/pages/DetalleLotePage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          area: 'admin',
        },
      },
    ],
  },
]
