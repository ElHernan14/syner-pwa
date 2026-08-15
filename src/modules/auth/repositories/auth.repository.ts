import type { LoginModel, LoginResult, RegisterModel, RegisterResult } from '../types/auth.types'

export interface AuthRepository {
  register(input: RegisterModel): Promise<RegisterResult>

  login(input: LoginModel): Promise<LoginResult>
}
