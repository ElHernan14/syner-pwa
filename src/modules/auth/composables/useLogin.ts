import { ref } from 'vue'

import { authRepository } from '../repositories/mock-auth.repository'
import type { LoginModel, LoginResult } from '../types/auth.types'

export function useLogin() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<LoginResult | null>(null)

  async function login(input: LoginModel): Promise<boolean> {
    loading.value = true
    error.value = null
    result.value = null

    try {
      result.value = await authRepository.login(input)

      return true
    } catch (cause) {
      if (cause instanceof Error) {
        switch (cause.message) {
          case 'USER_BLOCKED':
            error.value = 'Tu cuenta se encuentra bloqueada.'
            break

          case 'INVALID_CREDENTIALS':
          default:
            error.value = 'El correo o la contraseña son incorrectos.'
            break
        }
      } else {
        error.value = 'No pudimos iniciar sesión. Intentá nuevamente.'
      }

      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    result,
    login,
  }
}
