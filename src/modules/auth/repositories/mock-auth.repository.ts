import { usuariosMock } from '../data/usuarios.mock'
import type { AddressModel } from '../models/address.model'
import type { UserModel } from '../models/user.model'
import type { AuthRepository } from './auth.repository'
import type { LoginModel, LoginResult, RegisterModel, RegisterResult } from '../types/auth.types'
import { direccionesMock } from '../data/direcciones.mock'

const MOCK_DELAY_MS = 900

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

export class MockAuthRepository implements AuthRepository {
  async register(input: RegisterModel): Promise<RegisterResult> {
    await delay(MOCK_DELAY_MS)

    const correoNormalizado = input.correo.trim().toLowerCase()

    const usuarioExistente = usuariosMock.some(
      (usuario) => usuario.correo.toLowerCase() === correoNormalizado,
    )

    if (usuarioExistente) {
      throw new Error('EMAIL_ALREADY_EXISTS')
    }

    const usuario: UserModel = {
      id: crypto.randomUUID(),
      nombre: input.nombre.trim(),
      correo: correoNormalizado,
      contraseña: input.contraseña,
      telefono: input.telefono.trim(),
      dni: input.dni.trim(),
      rol: input.rol,
      estado: 'pendiente',
      avatar: input.avatar,
    }

    const direccion: AddressModel = {
      id: crypto.randomUUID(),
      usuarioId: usuario.id,
      calle: input.direccion.calle.trim(),
      numero: input.direccion.numero.trim(),
      ciudad: input.direccion.ciudad.trim(),
      provincia: input.direccion.provincia.trim(),
      codigoPostal: input.direccion.codigoPostal.trim(),
      referencia: input.direccion.referencia.trim(),
    }

    usuariosMock.push(usuario)
    direccionesMock.push(direccion)

    return {
      usuario,
      direccion,
    }
  }

  async login(input: LoginModel): Promise<LoginResult> {
    await delay(MOCK_DELAY_MS)

    const correoNormalizado = input.correo.trim().toLowerCase()

    const usuario = usuariosMock.find(
      (usuarioActual) => usuarioActual.correo.toLowerCase() === correoNormalizado,
    )

    if (!usuario) {
      throw new Error('INVALID_CREDENTIALS')
    }

    if (usuario.contraseña !== input.contraseña) {
      throw new Error('INVALID_CREDENTIALS')
    }

    if (usuario.estado === 'bloqueado') {
      throw new Error('USER_BLOCKED')
    }

    return {
      usuario,
    }
  }
}

export const authRepository: AuthRepository = new MockAuthRepository()
