import { ref } from 'vue'

import { authRepository } from '../repositories/mock-auth.repository'
import type { RegisterModel, RegisterResult } from '../types/auth.types'

export function useRegister() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<RegisterResult | null>(null)

  async function register(input: RegisterModel): Promise<boolean> {
    loading.value = true
    error.value = null
    result.value = null

    try {
      result.value = await authRepository.register(input)

      return true
    } catch (cause) {
      if (cause instanceof Error && cause.message === 'EMAIL_ALREADY_EXISTS') {
        error.value = 'Ese correo ya se encuentra registrado.'
      } else {
        error.value = 'No pudimos crear la cuenta. Intentá nuevamente.'
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
    register,
  }
}
