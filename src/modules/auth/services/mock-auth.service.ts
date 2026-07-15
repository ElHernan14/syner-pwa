import type { AuthService } from './auth.service'
import type { RegisterFormData, RegisterResult } from '../types/auth.types'

const MOCK_DELAY_MS = 900

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

export class MockAuthService implements AuthService {
  async register(input: RegisterFormData): Promise<RegisterResult> {
    await delay(MOCK_DELAY_MS)

    const normalizedEmail = input.email.trim().toLowerCase()

    if (normalizedEmail === 'existente@syner.com') {
      throw new Error('EMAIL_ALREADY_EXISTS')
    }

    return {
      userId: crypto.randomUUID(),
      fullName: input.fullName.trim(),
      email: normalizedEmail,
      requiresEmailVerification: true,
    }
  }
}

export const authService: AuthService = new MockAuthService()
