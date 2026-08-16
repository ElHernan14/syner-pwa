<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useRegister } from '../composables/useRegister'

const router = useRouter()

const { register, loading, error } = useRegister()

const formulario = reactive({
  nombre: '',
  correo: '',
  contraseña: '',
  confirmacionContraseña: '',
  telefono: '',
  dni: '',

  direccion: {
    calle: '',
    numero: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    referencia: '',
  },

  aceptaTerminos: false,
})

function validar(): string | null {
  if (!formulario.nombre.trim()) {
    return 'Ingresá tu nombre completo.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo.trim())) {
    return 'Ingresá un correo electrónico válido.'
  }

  if (formulario.contraseña.length < 8) {
    return 'La contraseña debe contener al menos 8 caracteres.'
  }

  if (!/[A-Z]/.test(formulario.contraseña)) {
    return 'La contraseña debe incluir al menos una mayúscula.'
  }

  if (!/[0-9]/.test(formulario.contraseña)) {
    return 'La contraseña debe incluir al menos un número.'
  }

  if (formulario.contraseña !== formulario.confirmacionContraseña) {
    return 'Las contraseñas no coinciden.'
  }

  if (!formulario.telefono.trim()) {
    return 'Ingresá tu teléfono.'
  }

  if (!formulario.dni.trim()) {
    return 'Ingresá tu DNI.'
  }

  if (!formulario.direccion.calle.trim()) {
    return 'Ingresá la calle de tu domicilio.'
  }

  if (!formulario.direccion.numero.trim()) {
    return 'Ingresá el número de tu domicilio.'
  }

  if (!formulario.direccion.ciudad.trim()) {
    return 'Ingresá tu ciudad.'
  }

  if (!formulario.direccion.provincia.trim()) {
    return 'Ingresá tu provincia.'
  }

  if (!formulario.direccion.codigoPostal.trim()) {
    return 'Ingresá tu código postal.'
  }

  if (!formulario.aceptaTerminos) {
    return 'Debés aceptar los términos y la política de privacidad.'
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

  try {
    await register({
      nombre: formulario.nombre,
      correo: formulario.correo,
      contraseña: formulario.contraseña,
      telefono: formulario.telefono,
      dni: formulario.dni,
      direccion: {
        calle: formulario.direccion.calle,
        numero: formulario.direccion.numero,
        ciudad: formulario.direccion.ciudad,
        provincia: formulario.direccion.provincia,
        codigoPostal: formulario.direccion.codigoPostal,
        referencia: formulario.direccion.referencia,
      },
      aceptaTerminos: formulario.aceptaTerminos,
    })

    await router.push('/onboarding')
  } catch {
    // useRegister ya gestiona el error de la operación.
  }
}
</script>

<template>
  <form class="space-y-6" novalidate @submit.prevent="manejarEnvio">
    <!-- Datos personales -->
    <div>
      <h2 class="text-base font-bold text-[var(--syner-text)]">Datos personales</h2>

      <p class="mt-1 text-sm text-[var(--syner-text-muted)]">
        Necesitamos algunos datos para crear tu cuenta.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Nombre -->
      <div>
        <label for="nombre" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
          Nombre completo
        </label>

        <input
          id="nombre"
          v-model="formulario.nombre"
          type="text"
          name="nombre"
          autocomplete="name"
          placeholder="Ej. Hernán Constante"
          :disabled="loading"
          class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
        />
      </div>

      <!-- Correo -->
      <div>
        <label for="correo" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
          Correo electrónico
        </label>

        <input
          id="correo"
          v-model="formulario.correo"
          type="email"
          name="correo"
          autocomplete="email"
          inputmode="email"
          placeholder="nombre@correo.com"
          :disabled="loading"
          class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
        />
      </div>

      <!-- Teléfono + DNI -->
      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label for="telefono" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
            Teléfono
          </label>

          <input
            id="telefono"
            v-model="formulario.telefono"
            type="tel"
            name="telefono"
            autocomplete="tel"
            placeholder="+54 9 266..."
            :disabled="loading"
            class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
          />
        </div>

        <div>
          <label for="dni" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
            DNI
          </label>

          <input
            id="dni"
            v-model="formulario.dni"
            type="text"
            name="dni"
            inputmode="numeric"
            placeholder="40123456"
            :disabled="loading"
            class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
          />
        </div>
      </div>

      <!-- Contraseña -->
      <div>
        <label for="contraseña" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
          Contraseña
        </label>

        <input
          id="contraseña"
          v-model="formulario.contraseña"
          type="password"
          name="contraseña"
          autocomplete="new-password"
          placeholder="Mínimo 8 caracteres"
          :disabled="loading"
          class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
        />

        <p class="mt-2 text-xs leading-5 text-[var(--syner-text-muted)]">
          Debe incluir al menos una mayúscula y un número.
        </p>
      </div>

      <!-- Confirmación -->
      <div>
        <label
          for="confirmacion-contraseña"
          class="mb-2 block text-sm font-semibold text-[var(--syner-text)]"
        >
          Confirmar contraseña
        </label>

        <input
          id="confirmacion-contraseña"
          v-model="formulario.confirmacionContraseña"
          type="password"
          name="confirmacionContraseña"
          autocomplete="new-password"
          placeholder="Repetí tu contraseña"
          :disabled="loading"
          class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
        />
      </div>
    </div>

    <!-- Dirección -->
    <div class="border-t border-[var(--syner-border)] pt-6">
      <h2 class="text-base font-bold text-[var(--syner-text)]">Dirección de entrega</h2>

      <p class="mt-1 text-sm text-[var(--syner-text-muted)]">
        Esta dirección quedará asociada a tu cuenta.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Calle + número -->
      <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_140px]">
        <div>
          <label for="calle" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
            Calle
          </label>

          <input
            id="calle"
            v-model="formulario.direccion.calle"
            type="text"
            name="calle"
            autocomplete="street-address"
            placeholder="Av. Siempre Viva"
            :disabled="loading"
            class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
          />
        </div>

        <div>
          <label for="numero" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
            Número
          </label>

          <input
            id="numero"
            v-model="formulario.direccion.numero"
            type="text"
            name="numero"
            inputmode="numeric"
            placeholder="742"
            :disabled="loading"
            class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
          />
        </div>
      </div>

      <!-- Ciudad + provincia -->
      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label for="ciudad" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
            Ciudad
          </label>

          <input
            id="ciudad"
            v-model="formulario.direccion.ciudad"
            type="text"
            name="ciudad"
            autocomplete="address-level2"
            placeholder="La Punta"
            :disabled="loading"
            class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
          />
        </div>

        <div>
          <label for="provincia" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
            Provincia
          </label>

          <input
            id="provincia"
            v-model="formulario.direccion.provincia"
            type="text"
            name="provincia"
            autocomplete="address-level1"
            placeholder="San Luis"
            :disabled="loading"
            class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
          />
        </div>
      </div>

      <!-- Código postal -->
      <div>
        <label
          for="codigo-postal"
          class="mb-2 block text-sm font-semibold text-[var(--syner-text)]"
        >
          Código postal
        </label>

        <input
          id="codigo-postal"
          v-model="formulario.direccion.codigoPostal"
          type="text"
          name="codigoPostal"
          autocomplete="postal-code"
          inputmode="numeric"
          placeholder="5710"
          :disabled="loading"
          class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
        />
      </div>

      <!-- Referencia -->
      <div>
        <label for="referencia" class="mb-2 block text-sm font-semibold text-[var(--syner-text)]">
          Referencia
          <span class="font-normal text-[var(--syner-text-subtle)]">(opcional)</span>
        </label>

        <input
          id="referencia"
          v-model="formulario.direccion.referencia"
          type="text"
          name="referencia"
          placeholder="Casa esquina"
          :disabled="loading"
          class="w-full rounded-(--syner-radius-md) border border-[var(--syner-border)] bg-[var(--syner-surface)] px-4 py-3.5 text-[var(--syner-text)] outline-none transition placeholder:text-[var(--syner-text-subtle)] focus:border-[var(--syner-primary)] focus:ring-4 focus:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-[var(--syner-surface-muted)]"
        />
      </div>
    </div>

    <!-- Términos -->
    <label class="flex items-start gap-3">
      <input
        v-model="formulario.aceptaTerminos"
        type="checkbox"
        :disabled="loading"
        class="mt-1 size-4 shrink-0 rounded border-[var(--syner-border-strong)] text-[var(--syner-primary)] focus:ring-[var(--syner-primary)]"
      />

      <span class="text-sm leading-6 text-[var(--syner-text-muted)]">
        Acepto los
        <RouterLink
          to="/terms"
          class="font-semibold text-[var(--syner-primary)] hover:text-[var(--syner-primary-hover)] hover:underline"
        >
          términos y condiciones
        </RouterLink>
        y la
        <RouterLink
          to="/privacy"
          class="font-semibold text-[var(--syner-primary)] hover:text-[var(--syner-primary-hover)] hover:underline"
        >
          política de privacidad </RouterLink
        >.
      </span>
    </label>

    <!-- Error -->
    <div
      v-if="error"
      role="alert"
      class="rounded-(--syner-radius-md) border border-[var(--syner-danger)]/20 bg-[var(--syner-danger-soft)] px-4 py-3 text-sm text-[var(--syner-danger)]"
    >
      {{ error }}
    </div>

    <!-- Submit -->
    <button
      type="submit"
      :disabled="loading"
      class="flex w-full items-center justify-center rounded-(--syner-radius-md) bg-[var(--syner-primary)] px-4 py-3.5 font-bold text-white shadow-lg shadow-[var(--syner-primary)]/20 transition hover:bg-[var(--syner-primary-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--syner-primary-soft)] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
    >
      {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
    </button>

    <!-- Login -->
    <p class="text-center text-sm text-[var(--syner-text-muted)]">
      ¿Ya tenés una cuenta?

      <RouterLink
        to="/login"
        class="font-bold text-[var(--syner-primary)] hover:text-[var(--syner-primary-hover)] hover:underline"
      >
        Iniciá sesión
      </RouterLink>
    </p>
  </form>
</template>
