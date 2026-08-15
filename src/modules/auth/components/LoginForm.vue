<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useLogin } from '../composables/useLogin'

const router = useRouter()

const { login, loading, error } = useLogin()

const formulario = reactive({
  correo: '',
  contraseña: '',
})

function validar(): string | null {
  if (!formulario.correo.trim()) {
    return 'Ingresá tu correo electrónico.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo.trim())) {
    return 'Ingresá un correo electrónico válido.'
  }

  if (!formulario.contraseña) {
    return 'Ingresá tu contraseña.'
  }

  return null
}

async function manejarEnvio(): Promise<void> {
  error.value = null

  const errorValidacion = validar()

  if (errorValidacion) {
    error.value = errorValidacion
    return
  }

  const inicioExitoso = await login({
    correo: formulario.correo,
    contraseña: formulario.contraseña,
  })

  if (!inicioExitoso) {
    return
  }

  await router.push('/onboarding')
}
</script>

<template>
  <form class="space-y-6" novalidate @submit.prevent="manejarEnvio">
    <!-- Correo -->
    <div class="space-y-2">
      <Label for="correo" class="font-semibold text-(--syner-text)"> Correo electrónico </Label>

      <Input
        id="correo"
        v-model="formulario.correo"
        type="email"
        name="correo"
        autocomplete="email"
        inputmode="email"
        placeholder="nombre@correo.com"
        :disabled="loading"
        class="h-12 rounded-(--syner-radius-md) border-(--syner-border) bg-(--syner-surface) px-4 text-(--syner-text) shadow-none placeholder:text-(--syner-text-subtle) focus-visible:border-(--syner-primary) focus-visible:ring-(--syner-primary-soft)"
      />
    </div>

    <!-- Contraseña -->
    <div class="space-y-2">
      <div class="flex items-center justify-between gap-4">
        <Label for="contraseña" class="font-semibold text-(--syner-text)"> Contraseña </Label>

        <button
          type="button"
          class="text-xs font-semibold text-(--syner-primary) transition hover:text-(--syner-primary-hover) hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <Input
        id="contraseña"
        v-model="formulario.contraseña"
        type="password"
        name="contraseña"
        autocomplete="current-password"
        placeholder="Ingresá tu contraseña"
        :disabled="loading"
        class="h-12 rounded-(--syner-radius-md) border-(--syner-border) bg-(--syner-surface) px-4 text-(--syner-text) shadow-none placeholder:text-(--syner-text-subtle) focus-visible:border-(--syner-primary) focus-visible:ring-(--syner-primary-soft)"
      />
    </div>

    <!-- Error -->
    <div
      v-if="error"
      role="alert"
      class="rounded-(--syner-radius-md) border border-(--syner-danger)/20 bg-(--syner-danger-soft) px-4 py-3 text-sm leading-6 text-(--syner-danger)"
    >
      {{ error }}
    </div>

    <!-- Submit -->
    <Button
      type="submit"
      :disabled="loading"
      class="h-12 w-full rounded-(--syner-radius-md) bg-(--syner-primary) font-bold text-white shadow-lg shadow-(--syner-primary)/20 hover:bg-(--syner-primary-hover) disabled:bg-slate-400 disabled:shadow-none"
    >
      {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
    </Button>

    <!-- Register -->
    <p class="text-center text-sm text-(--syner-text-muted)">
      ¿Todavía no tenés una cuenta?

      <RouterLink
        to="/register"
        class="font-bold text-(--syner-primary) transition hover:text-(--syner-primary-hover) hover:underline"
      >
        Creá tu cuenta
      </RouterLink>
    </p>
  </form>
</template>
