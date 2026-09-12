export const USER_ROLES = {
  USUARIO: 'usuario',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
