<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Check, ImagePlus, ShieldCheck, UserRound } from 'lucide-vue-next'
import { useRegister } from '../composables/useRegister'

const router = useRouter()

const { register, loading, error } = useRegister()

const paso = ref<1 | 2>(1)

const formulario = reactive({
  nombre: '',
  correo: '',
  contraseña: '',
  confirmacionContraseña: '',
  telefono: '',
  dni: '',
  rol: 'usuario' as 'usuario' | 'admin',
  avatar: null as string | null,
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

const opcionesRol = [
  {
    valor: 'usuario' as 'usuario' | 'admin',
    titulo: 'Quiero participar',
    descripcion: 'Explorá lotes, reservá cupos y participá de oportunidades de compra colectiva.',
    etiqueta: 'Cuenta personal',
    icono: UserRound,
  },
  {
    valor: 'admin' as 'usuario' | 'admin',
    titulo: 'Quiero administrar',
    descripcion: 'Gestioná lotes, operaciones y el funcionamiento general de la plataforma.',
    etiqueta: 'Cuenta administrativa',
    icono: ShieldCheck,
  },
]

function seleccionarRol(rol: 'usuario' | 'admin'): void {
  formulario.rol = rol
  paso.value = 2
  error.value = null
}

function volverASeleccionRol(): void {
  if (loading.value) return

  paso.value = 1
  error.value = null
}

function procesarAvatar(event: Event): void {
  const input = event.target as HTMLInputElement

  if (!input.files?.length) {
    formulario.avatar = null
    return
  }

  const archivo = input.files[0]

  if (!archivo.type.startsWith('image/')) {
    error.value = 'El avatar debe ser una imagen.'
    input.value = ''
    return
  }

  const MAX_SIZE = 2 * 1024 * 1024

  if (archivo.size > MAX_SIZE) {
    error.value = 'La imagen no puede superar los 2 MB.'
    input.value = ''
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      formulario.avatar = reader.result
      error.value = null
    }
  }

  reader.onerror = () => {
    formulario.avatar = null
    error.value = 'No pudimos cargar la imagen. Intentá nuevamente.'
    input.value = ''
  }

  reader.readAsDataURL(archivo)
}

function quitarAvatar(): void {
  formulario.avatar = null
}

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

  const registroExitoso = await register({
    nombre: formulario.nombre,
    correo: formulario.correo,
    contraseña: formulario.contraseña,
    telefono: formulario.telefono,
    dni: formulario.dni,
    rol: formulario.rol,
    avatar: formulario.avatar,
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

  if (!registroExitoso) {
    return
  }

  await router.push('/onboarding')
}
</script>

<template>
  <div>
    <!-- ========================================= -->
    <!-- PASO 1 · SELECCIÓN DE TIPO DE CUENTA -->
    <!-- ========================================= -->

    <section v-if="paso === 1" class="py-4">
      <div class="mx-auto max-w-3xl text-center">
        <div
          class="mx-auto mb-5 flex size-14 items-center justify-center rounded-(--syner-radius-lg) bg-(--syner-primary-soft) text-(--syner-primary)"
        >
          <UserRound class="size-7" :stroke-width="1.8" />
        </div>

        <p class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-(--syner-primary)">
          Primer paso
        </p>

        <h2 class="text-2xl font-bold tracking-tight text-(--syner-text) sm:text-3xl">
          ¿Cómo querés usar SYNER?
        </h2>

        <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-(--syner-text-muted) sm:text-base">
          Elegí el tipo de cuenta que mejor representa lo que querés hacer dentro de la plataforma.
        </p>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <button
          v-for="opcion in opcionesRol"
          :key="opcion.valor"
          type="button"
          :disabled="loading"
          class="group relative flex min-h-64 flex-col overflow-hidden rounded-(--syner-radius-xl) border border-(--syner-border) bg-(--syner-surface) p-6 text-left shadow-(--syner-shadow-sm) outline-none transition duration-200 hover:-translate-y-1 hover:border-(--syner-primary) hover:shadow-(--syner-shadow-card) focus-visible:ring-4 focus-visible:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:opacity-60"
          @click="seleccionarRol(opcion.valor)"
        >
          <div
            class="mb-6 flex size-12 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary-soft) text-(--syner-primary) transition duration-200 group-hover:scale-105"
          >
            <component :is="opcion.icono" class="size-6" :stroke-width="1.8" />
          </div>

          <span
            class="mb-2 w-fit rounded-full bg-(--syner-surface-muted) px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-(--syner-text-subtle)"
          >
            {{ opcion.etiqueta }}
          </span>

          <h3 class="text-xl font-bold text-(--syner-text)">
            {{ opcion.titulo }}
          </h3>

          <p class="mt-2 max-w-sm text-sm leading-6 text-(--syner-text-muted)">
            {{ opcion.descripcion }}
          </p>

          <div
            class="mt-auto flex items-center justify-end pt-6 text-sm font-bold text-(--syner-primary)"
          >
            Continuar
            <ArrowRight
              class="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>

          <div
            aria-hidden="true"
            class="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-(--syner-primary-soft) opacity-0 blur-2xl transition duration-300 group-hover:opacity-100"
          />
        </button>
      </div>

      <p class="mx-auto mt-6 max-w-xl text-center text-xs leading-5 text-(--syner-text-subtle)">
        Podrás completar tus datos personales y de contacto en el siguiente paso.
      </p>
    </section>

    <!-- ========================================= -->
    <!-- PASO 2 · FORMULARIO -->
    <!-- ========================================= -->

    <form v-else class="space-y-6" novalidate @submit.prevent="manejarEnvio">
      <!-- Selector de rol seleccionado -->

      <div
        class="flex items-center justify-between gap-4 rounded-(--syner-radius-lg) bg-(--syner-surface-muted) px-4 py-3"
      >
        <div class="flex min-w-0 items-center gap-3">
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary-soft) text-(--syner-primary)"
          >
            <component
              :is="formulario.rol === 'admin' ? ShieldCheck : UserRound"
              class="size-5"
              :stroke-width="1.8"
            />
          </div>

          <div class="min-w-0">
            <p class="text-xs font-semibold text-(--syner-text-subtle)">Tipo de cuenta</p>

            <p class="truncate text-sm font-bold text-(--syner-text)">
              {{ formulario.rol === 'admin' ? 'Cuenta administrativa' : 'Cuenta personal' }}
            </p>
          </div>
        </div>

        <button
          type="button"
          :disabled="loading"
          class="shrink-0 text-xs font-bold text-(--syner-primary) transition hover:text-(--syner-primary-hover) hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          @click="volverASeleccionRol"
        >
          Cambiar
        </button>
      </div>

      <!-- Datos personales -->

      <div>
        <h2 class="text-base font-bold text-(--syner-text)">Datos personales</h2>

        <p class="mt-1 text-sm text-(--syner-text-muted)">
          Necesitamos algunos datos para crear tu cuenta.
        </p>
      </div>

      <!-- Avatar -->

      <div
        class="flex flex-col gap-4 rounded-(--syner-radius-lg) bg-(--syner-surface-muted) p-4 sm:flex-row sm:items-center"
      >
        <div class="relative shrink-0">
          <div
            v-if="formulario.avatar"
            class="size-20 overflow-hidden rounded-full ring-4 ring-(--syner-primary-soft)"
          >
            <img
              :src="formulario.avatar"
              alt="Vista previa del avatar"
              class="size-full object-cover"
            />
          </div>

          <div
            v-else
            class="flex size-20 items-center justify-center rounded-full bg-(--syner-primary-soft) text-(--syner-primary) ring-4 ring-(--syner-surface-muted)"
          >
            <UserRound class="size-9" :stroke-width="1.5" />
          </div>
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-sm font-bold text-(--syner-text)">
            Foto de perfil
            <span class="font-normal text-(--syner-text-subtle)"> (opcional) </span>
          </p>

          <p class="mt-1 text-xs leading-5 text-(--syner-text-muted)">
            Elegí una imagen para identificar tu cuenta. JPG, PNG o WEBP de hasta 2 MB.
          </p>

          <div class="mt-3 flex flex-wrap gap-2">
            <label
              class="inline-flex cursor-pointer items-center gap-2 rounded-(--syner-radius-md) bg-(--syner-surface) px-3.5 py-2 text-xs font-bold text-(--syner-text) shadow-(--syner-shadow-sm) transition hover:bg-(--syner-primary-soft) hover:text-(--syner-primary)"
            >
              <ImagePlus class="size-4" />

              {{ formulario.avatar ? 'Cambiar imagen' : 'Elegir imagen' }}

              <input
                type="file"
                accept="image/*"
                class="sr-only"
                :disabled="loading"
                @change="procesarAvatar"
              />
            </label>

            <button
              v-if="formulario.avatar"
              type="button"
              :disabled="loading"
              class="rounded-(--syner-radius-md) px-3 py-2 text-xs font-semibold text-(--syner-text-muted) transition hover:bg-(--syner-surface) hover:text-(--syner-danger) disabled:cursor-not-allowed disabled:opacity-50"
              @click="quitarAvatar"
            >
              Quitar
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Nombre -->

        <div>
          <label for="nombre" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
            class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
          />
        </div>

        <!-- Correo -->

        <div>
          <label for="correo" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
            class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
          />
        </div>

        <!-- Teléfono + DNI -->

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="telefono" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
              class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
            />
          </div>

          <div>
            <label for="dni" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
              class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
            />
          </div>
        </div>

        <!-- Contraseña -->

        <div>
          <label for="contraseña" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
            class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
          />

          <p class="mt-2 text-xs leading-5 text-(--syner-text-muted)">
            Debe incluir al menos una mayúscula y un número.
          </p>
        </div>

        <!-- Confirmación -->

        <div>
          <label
            for="confirmacion-contraseña"
            class="mb-2 block text-sm font-semibold text-(--syner-text)"
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
            class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
          />
        </div>
      </div>

      <!-- Dirección -->

      <div class="border-t border-(--syner-border) pt-6">
        <h2 class="text-base font-bold text-(--syner-text)">Dirección de entrega</h2>

        <p class="mt-1 text-sm text-(--syner-text-muted)">
          Esta dirección quedará asociada a tu cuenta.
        </p>
      </div>

      <div class="space-y-6">
        <!-- Calle + número -->

        <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_140px]">
          <div>
            <label for="calle" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
              class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
            />
          </div>

          <div>
            <label for="numero" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
              class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
            />
          </div>
        </div>

        <!-- Ciudad + provincia -->

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="ciudad" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
              class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
            />
          </div>

          <div>
            <label for="provincia" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
              class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
            />
          </div>
        </div>

        <!-- Código postal -->

        <div>
          <label for="codigo-postal" class="mb-2 block text-sm font-semibold text-(--syner-text)">
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
            class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
          />
        </div>

        <!-- Referencia -->

        <div>
          <label for="referencia" class="mb-2 block text-sm font-semibold text-(--syner-text)">
            Referencia
            <span class="font-normal text-(--syner-text-subtle)"> (opcional) </span>
          </label>

          <input
            id="referencia"
            v-model="formulario.direccion.referencia"
            type="text"
            name="referencia"
            placeholder="Casa esquina"
            :disabled="loading"
            class="w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-4 py-3.5 text-(--syner-text) outline-none transition placeholder:text-(--syner-text-subtle) focus:border-(--syner-primary) focus:ring-4 focus:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-(--syner-surface-muted)"
          />
        </div>
      </div>

      <!-- Términos -->

      <label class="flex items-start gap-3">
        <input
          v-model="formulario.aceptaTerminos"
          type="checkbox"
          :disabled="loading"
          class="mt-1 size-4 shrink-0 rounded border-(--syner-border-strong) text-(--syner-primary) focus:ring-(--syner-primary)"
        />

        <span class="text-sm leading-6 text-(--syner-text-muted)">
          Acepto los

          <RouterLink
            to="/terms"
            class="font-semibold text-(--syner-primary) hover:text-(--syner-primary-hover) hover:underline"
          >
            términos y condiciones
          </RouterLink>

          y la

          <RouterLink
            to="/privacy"
            class="font-semibold text-(--syner-primary) hover:text-(--syner-primary-hover) hover:underline"
          >
            política de privacidad </RouterLink
          >.
        </span>
      </label>

      <!-- Error -->

      <div
        v-if="error"
        role="alert"
        class="rounded-(--syner-radius-md) border border-(--syner-danger)/20 bg-(--syner-danger-soft) px-4 py-3 text-sm text-(--syner-danger)"
      >
        {{ error }}
      </div>

      <!-- Submit -->

      <button
        type="submit"
        :disabled="loading"
        class="flex w-full items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary) px-4 py-3.5 font-bold text-white shadow-lg shadow-(--syner-primary)/20 transition hover:bg-(--syner-primary-hover) focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--syner-primary-soft) disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
      >
        <Check v-if="!loading" class="mr-2 size-5" />

        {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
      </button>

      <!-- Login -->

      <p class="text-center text-sm text-(--syner-text-muted)">
        ¿Ya tenés una cuenta?

        <RouterLink
          to="/login"
          class="font-bold text-(--syner-primary) hover:text-(--syner-primary-hover) hover:underline"
        >
          Iniciá sesión
        </RouterLink>
      </p>
    </form>
  </div>
</template>
