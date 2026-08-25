import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { UserModel } from '../models/user.model'

const AUTH_STORAGE_KEY = 'syner-auth-session'

type AuthSession = Omit<UserModel, 'contraseña'>

function crearSesionSegura(usuario: UserModel): AuthSession {
  const { contraseña: _contraseña, ...sesion } = usuario

  return sesion
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthSession | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  const isAdmin = computed(() => user.value?.rol === 'admin')

  const isUser = computed(() => user.value?.rol === 'usuario')

  const role = computed(() => user.value?.rol ?? null)

  function login(usuario: UserModel): void {
    user.value = crearSesionSegura(usuario)
    persistSession()
  }

  function logout(): void {
    user.value = null
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  function persistSession(): void {
    if (!user.value) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user.value))
  }

  function restoreSession(): void {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedSession) {
      return
    }

    try {
      const session = JSON.parse(storedSession) as AuthSession

      if (!session.id || !session.correo || !session.rol) {
        logout()
        return
      }

      user.value = session
    } catch {
      logout()
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isUser,
    role,
    login,
    logout,
    restoreSession,
  }
})
