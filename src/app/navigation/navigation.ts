import type { UserRole } from '@/modules/auth/constants/roles'

export type NavigationArea = 'public' | 'user' | 'admin'

export function getAuthenticatedHome(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin'

    case 'usuario':
      return '/app'
  }
}

export function getAuthenticatedLotesHome(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin/lotes'

    case 'usuario':
      return '/app/lotes'
  }
}

export function getAuthenticatedLoteDetailRoute(role: UserRole, loteId: string): string {
  switch (role) {
    case 'admin':
      return `/admin/lotes/${loteId}`

    case 'usuario':
      return `/app/lotes/${loteId}`
  }
}

export function getLotesRouteByArea(area: NavigationArea): string {
  switch (area) {
    case 'public':
      return '/lotes'

    case 'user':
      return '/app/lotes'

    case 'admin':
      return '/admin/lotes'
  }
}

export function getLoteDetailRouteByArea(area: NavigationArea, loteId: string): string {
  switch (area) {
    case 'public':
      return `/lotes/${loteId}`

    case 'user':
      return `/app/lotes/${loteId}`

    case 'admin':
      return `/admin/lotes/${loteId}`
  }
}
