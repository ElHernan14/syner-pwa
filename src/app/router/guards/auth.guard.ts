import type { NavigationGuard } from 'vue-router'

import { getAuthenticatedHome, getAuthenticatedLotesHome } from '@/app/navigation/navigation'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

import type { UserRole } from '@/modules/auth/constants/roles'

export const authGuard: NavigationGuard = (to) => {
  const authStore = useAuthStore()

  /**
   * Rutas solamente para visitantes.
   */
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    if (!authStore.role) {
      return '/'
    }

    return getAuthenticatedHome(authStore.role)
  }

  /**
   * Rutas públicas que no deben utilizarse
   * desde una sesión iniciada.
   */
  if (to.meta.publicOnly && authStore.isAuthenticated) {
    if (!authStore.role) {
      return '/'
    }

    return getAuthenticatedLotesHome(authStore.role)
  }

  /**
   * Rutas que requieren una sesión iniciada.
   */
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  /**
   * Rutas restringidas por rol.
   */
  const rolesPermitidos = to.meta.roles as Array<UserRole> | undefined

  if (rolesPermitidos && (!authStore.role || !rolesPermitidos.includes(authStore.role))) {
    return '/'
  }

  return true
}
