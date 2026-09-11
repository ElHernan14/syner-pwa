import type { AddressModel } from '../models/address.model'
import type { UserModel, UserRole } from '../models/user.model'

export interface RegisterModel {
  nombre: string
  correo: string
  contraseña: string
  telefono: string
  dni: string
  rol: UserRole
  avatar: string | null
  direccion: Omit<AddressModel, 'id' | 'usuarioId'>
  aceptaTerminos: boolean
}

export interface RegisterResult {
  usuario: UserModel
  direccion: AddressModel
}

export interface LoginModel {
  correo: string
  contraseña: string
}

export interface LoginResult {
  usuario: UserModel
}
