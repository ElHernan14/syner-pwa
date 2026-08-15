export type UserRole = 'usuario' | 'admin'

export type UserStatus = 'pendiente' | 'verificado' | 'bloqueado'

export interface UserModel {
  id: string
  nombre: string
  correo: string
  contraseña: string
  telefono: string
  dni: string
  rol: UserRole
  estado: UserStatus
  avatar: string | null
}
