import type { UserModel } from '../models/user.model'

export const usuariosMock: UserModel[] = [
  {
    id: 'usuario-001',
    nombre: 'Juan Pérez',
    correo: 'juan@syner.com',
    contraseña: 'Demo1234',
    telefono: '+54 9 266 000000',
    dni: '40123456',
    rol: 'usuario',
    estado: 'verificado',
    avatar: null,
  },
  {
    id: 'usuario-002',
    nombre: 'María González',
    correo: 'maria@syner.com',
    contraseña: 'Demo1234',
    telefono: '+54 9 266 111111',
    dni: '41234567',
    rol: 'usuario',
    estado: 'verificado',
    avatar: null,
  },
  {
    id: 'admin-001',
    nombre: 'Administrador SYNER',
    correo: 'admin@syner.com',
    contraseña: 'Admin1234',
    telefono: '+54 9 266 999999',
    dni: '30000000',
    rol: 'admin',
    estado: 'verificado',
    avatar: null,
  },
]
