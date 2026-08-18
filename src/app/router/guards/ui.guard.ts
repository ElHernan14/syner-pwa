import type { Router } from 'vue-router'
import { useGlobalLoading } from '@/composables/useGlobalLoading'

export function setupUIGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const globalLoading = useGlobalLoading()

    if (to.path !== from.path) {
      globalLoading.iniciarLoading()
    }

    next()
  })

  router.afterEach(() => {
    const globalLoading = useGlobalLoading()

    setTimeout(() => {
      globalLoading.finalizarLoading()
    }, 250)
  })
}
