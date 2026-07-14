<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { authService } from '../services/mock-auth.service'
import type { RegisterFormData } from '../types/auth.types'

const router = useRouter()

const form = reactive<RegisterFormData>({
  fullName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  acceptsTerms: false,
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function validate(): string | null {
  if (!form.fullName.trim()) {
    return 'Ingresá tu nombre completo.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    return 'Ingresá un correo electrónico válido.'
  }

  if (form.password.length < 8) {
    return 'La contraseña debe contener al menos 8 caracteres.'
  }

  if (!/[A-Z]/.test(form.password)) {
    return 'La contraseña debe incluir al menos una mayúscula.'
  }

  if (!/[0-9]/.test(form.password)) {
    return 'La contraseña debe incluir al menos un número.'
  }

  if (form.password !== form.passwordConfirmation) {
    return 'Las contraseñas no coinciden.'
  }

  if (!form.acceptsTerms) {
    return 'Debés aceptar los términos y la política de privacidad.'
  }

  return null
}

async function handleSubmit(): Promise<void> {
  errorMessage.value = ''
  successMessage.value = ''

  const validationError = validate()

  if (validationError) {
    errorMessage.value = validationError
    return
  }

  loading.value = true

  try {
    const result = await authService.register(form)

    successMessage.value = result.requiresEmailVerification
      ? 'Cuenta creada. En la versión final enviaremos un correo de verificación.'
      : 'Cuenta creada correctamente.'

    window.setTimeout(() => {
      void router.push('/onboarding')
    }, 1200)
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
      errorMessage.value = 'Ese correo ya se encuentra registrado.'
      return
    }

    errorMessage.value = 'No pudimos crear la cuenta. Intentá nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="space-y-5" novalidate @submit.prevent="handleSubmit">
    <div>
      <label for="full-name" class="mb-2 block text-sm font-semibold text-slate-700">
        Nombre completo
      </label>

      <input
        id="full-name"
        v-model="form.fullName"
        type="text"
        name="fullName"
        autocomplete="name"
        placeholder="Ej. Hernán Constante"
        :disabled="loading"
        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label for="email" class="mb-2 block text-sm font-semibold text-slate-700">
        Correo electrónico
      </label>

      <input
        id="email"
        v-model="form.email"
        type="email"
        name="email"
        autocomplete="email"
        inputmode="email"
        placeholder="nombre@correo.com"
        :disabled="loading"
        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label for="password" class="mb-2 block text-sm font-semibold text-slate-700">
        Contraseña
      </label>

      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
        autocomplete="new-password"
        placeholder="Mínimo 8 caracteres"
        :disabled="loading"
        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />

      <p class="mt-2 text-xs leading-5 text-slate-500">
        Debe incluir al menos una mayúscula y un número.
      </p>
    </div>

    <div>
      <label for="password-confirmation" class="mb-2 block text-sm font-semibold text-slate-700">
        Confirmar contraseña
      </label>

      <input
        id="password-confirmation"
        v-model="form.passwordConfirmation"
        type="password"
        name="passwordConfirmation"
        autocomplete="new-password"
        placeholder="Repetí tu contraseña"
        :disabled="loading"
        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <label class="flex items-start gap-3">
      <input
        v-model="form.acceptsTerms"
        type="checkbox"
        :disabled="loading"
        class="mt-1 size-4 shrink-0 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
      />

      <span class="text-sm leading-6 text-slate-600">
        Acepto los
        <RouterLink
          to="/terms"
          class="font-semibold text-sky-600 hover:text-sky-700 hover:underline"
        >
          términos y condiciones
        </RouterLink>
        y la
        <RouterLink
          to="/privacy"
          class="font-semibold text-sky-600 hover:text-sky-700 hover:underline"
        >
          política de privacidad </RouterLink
        >.
      </span>
    </label>

    <div
      v-if="errorMessage"
      role="alert"
      class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ errorMessage }}
    </div>

    <div
      v-if="successMessage"
      role="status"
      class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
    >
      {{ successMessage }}
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
    >
      {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
    </button>

    <p class="text-center text-sm text-slate-600">
      ¿Ya tenés una cuenta?

      <RouterLink to="/login" class="font-bold text-sky-600 hover:text-sky-700 hover:underline">
        Iniciá sesión
      </RouterLink>
    </p>
  </form>
</template>
