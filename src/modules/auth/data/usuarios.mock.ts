import type { UserModel } from '../models/user.model'

const USUARIOS_STORAGE_KEY = 'syner-mock-usuarios'

const usuariosIniciales: UserModel[] = [
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

function cargarUsuarios(): UserModel[] {
  const almacenados = localStorage.getItem(USUARIOS_STORAGE_KEY)

  if (!almacenados) {
    return [...usuariosIniciales]
  }

  try {
    return JSON.parse(almacenados) as UserModel[]
  } catch {
    localStorage.removeItem(USUARIOS_STORAGE_KEY)
    return [...usuariosIniciales]
  }
}

export const usuariosMock: UserModel[] = cargarUsuarios()

export function persistirUsuarios(): void {
  localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuariosMock))
}
