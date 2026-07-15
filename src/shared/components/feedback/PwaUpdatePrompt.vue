<script setup lang="ts">
import { computed } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(_serviceWorkerUrl, registration) {
    if (!registration) {
      return
    }

    window.setInterval(
      () => {
        void registration.update()
      },
      60 * 60 * 1000,
    )
  },

  onRegisterError(error) {
    console.error('No se pudo registrar el Service Worker:', error)
  },
})

const visible = computed(() => offlineReady.value || needRefresh.value)

const title = computed(() => {
  if (needRefresh.value) {
    return 'Nueva versión disponible'
  }

  return 'SYNER está lista para funcionar sin conexión'
})

const description = computed(() => {
  if (needRefresh.value) {
    return 'Actualizá la aplicación para utilizar la versión más reciente.'
  }

  return 'Los recursos principales quedaron guardados en este dispositivo.'
})

async function updateApplication(): Promise<void> {
  await updateServiceWorker(true)
}

function dismiss(): void {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-4 opacity-0"
  >
    <aside
      v-if="visible"
      role="status"
      aria-live="polite"
      class="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/15 sm:right-6 sm:bottom-6 sm:left-auto sm:w-full"
    >
      <div class="flex items-start gap-3">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-600"
          aria-hidden="true"
        >
          S
        </div>

        <div class="min-w-0 flex-1">
          <h2 class="font-bold text-slate-900">
            {{ title }}
          </h2>

          <p class="mt-1 text-sm leading-5 text-slate-500">
            {{ description }}
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <button
              v-if="needRefresh"
              type="button"
              class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
              @click="updateApplication"
            >
              Actualizar
            </button>

            <button
              type="button"
              class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              @click="dismiss"
            >
              {{ needRefresh ? 'Más tarde' : 'Entendido' }}
            </button>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
</template>
