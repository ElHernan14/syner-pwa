<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

import type { SynerPlan } from '../types/plan.types'

const props = defineProps<{
  plan: SynerPlan | null
}>()

const emit = defineEmits<{
  close: []
}>()

function close(): void {
  emit('close')
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.plan) {
    close()
  }
}

watch(
  () => props.plan,
  (plan) => {
    document.body.style.overflow = plan ? 'hidden' : ''
  },
)

window.addEventListener('keydown', handleKeydown)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="plan"
        class="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/60 p-4 backdrop-blur-sm sm:items-center"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`plan-title-${plan.id}`"
        @click.self="close"
      >
        <div class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-bold text-sky-600">
                {{ plan.badge }}
              </p>

              <h2 :id="`plan-title-${plan.id}`" class="mt-1 text-2xl font-bold text-slate-900">
                {{ plan.name }}
              </h2>
            </div>

            <button
              type="button"
              class="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 transition hover:bg-slate-200"
              aria-label="Cerrar detalle"
              @click="close"
            >
              ×
            </button>
          </div>

          <p class="mt-5 leading-7 text-slate-600">
            {{ plan.details }}
          </p>

          <div class="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            Esta funcionalidad forma parte de una demostración. No procesa aportes ni operaciones
            reales.
          </div>

          <div class="mt-7 grid gap-3 sm:grid-cols-2">
            <RouterLink
              to="/register"
              class="rounded-xl bg-sky-600 px-4 py-3.5 text-center font-bold text-white transition hover:bg-sky-700"
            >
              Crear cuenta
            </RouterLink>

            <button
              type="button"
              class="rounded-xl border border-slate-200 px-4 py-3.5 font-bold text-slate-600 transition hover:bg-slate-50"
              @click="close"
            >
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
