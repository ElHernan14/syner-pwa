<script setup lang="ts">
import type { SynerPlan } from '../types/plan.types'

defineProps<{
  plan: SynerPlan
}>()

const emit = defineEmits<{
  select: [plan: SynerPlan]
}>()
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8 sm:p-7"
    :class="plan.featured ? 'border-sky-300 ring-4 ring-sky-100' : 'border-slate-200'"
  >
    <div
      v-if="plan.featured"
      class="absolute top-0 right-7 rounded-b-xl bg-sky-600 px-3 py-1.5 text-xs font-bold text-white"
    >
      Recomendado
    </div>

    <span
      class="mb-5 w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold tracking-wide text-slate-600 uppercase"
    >
      {{ plan.badge }}
    </span>

    <h2 class="text-2xl font-bold tracking-tight text-slate-900">
      {{ plan.name }}
    </h2>

    <p class="mt-3 flex-1 text-sm leading-6 text-slate-500">
      {{ plan.description }}
    </p>

    <dl class="mt-7 grid grid-cols-3 gap-3 border-y border-slate-100 py-5">
      <div>
        <dt class="text-xs text-slate-400">Desde</dt>

        <dd class="mt-1 text-sm font-bold text-slate-900">
          {{ plan.minimumContribution }}
        </dd>
      </div>

      <div>
        <dt class="text-xs text-slate-400">Retorno</dt>

        <dd class="mt-1 text-sm font-bold text-slate-900">
          {{ plan.estimatedReturn }}
        </dd>
      </div>

      <div>
        <dt class="text-xs text-slate-400">Plazo</dt>

        <dd class="mt-1 text-sm font-bold text-slate-900">
          {{ plan.duration }}
        </dd>
      </div>
    </dl>

    <button
      type="button"
      class="mt-6 w-full rounded-xl px-4 py-3.5 font-bold transition focus-visible:outline-none focus-visible:ring-4"
      :class="
        plan.featured
          ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700 focus-visible:ring-sky-200'
          : 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-300'
      "
      @click="emit('select', plan)"
    >
      Ver detalles
    </button>
  </article>
</template>
