import type { RegisterFormData, RegisterResult } from '../types/auth.types'

export interface AuthService {
  register(input: RegisterFormData): Promise<RegisterResult>
}
