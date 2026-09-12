import type { UserRole } from '../constants/roles'

export function getAuthenticatedHome(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin'

    case 'usuario':
      return '/app'
  }
}
