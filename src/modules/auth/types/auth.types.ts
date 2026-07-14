export interface RegisterFormData {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
  acceptsTerms: boolean
}

export interface RegisterResult {
  userId: string
  fullName: string
  email: string
  requiresEmailVerification: boolean
}

export interface AuthUser {
  id: string
  fullName: string
  email: string
  emailVerified: boolean
  onboardingCompleted: boolean
}
