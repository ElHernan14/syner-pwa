import type { NavigationGuard } from 'vue-router'

import {
  getAuthenticatedHome,
  getAuthenticatedLotesHome,
  getAuthenticatedLoteDetailRoute,
} from '@/app/navigation/navigation'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import type { UserRole } from '@/modules/auth/constants/roles'

export const authGuard: NavigationGuard = (to) => {
  const authStore = useAuthStore()

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    if (!authStore.role) {
      return '/'
    }

    return getAuthenticatedHome(authStore.role)
  }

  if (to.meta.publicOnly && authStore.isAuthenticated) {
    if (!authStore.role) {
      return '/'
    }

    const loteId = to.params.id as string | undefined

    if (loteId) {
      return getAuthenticatedLoteDetailRoute(authStore.role, loteId)
    }

    return getAuthenticatedLotesHome(authStore.role)
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  const rolesPermitidos = to.meta.roles as Array<UserRole> | undefined

  if (rolesPermitidos && (!authStore.role || !rolesPermitidos.includes(authStore.role))) {
    return '/'
  }

  return true
}
