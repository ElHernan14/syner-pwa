import type { UserRole } from '@/modules/auth/constants/roles'

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
