<script setup lang="ts">
import { Button } from '@/components/ui/button'

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
    class="group relative flex h-full flex-col overflow-hidden rounded-[var(--syner-radius-lg)] border bg-[var(--syner-surface)] p-6 shadow-[var(--syner-shadow-sm)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--syner-shadow-card)] sm:p-7"
    :class="
      plan.featured
        ? 'border-[var(--syner-primary)] ring-4 ring-[var(--syner-primary-soft)]'
        : 'border-[var(--syner-border)]'
    "
  >
    <!-- Featured badge -->
    <div
      v-if="plan.featured"
      class="absolute top-0 right-7 rounded-b-[var(--syner-radius-sm)] bg-[var(--syner-primary)] px-3 py-1.5 text-xs font-bold text-white"
    >
      Recomendado
    </div>

    <!-- Plan badge -->
    <span
      class="mb-5 w-fit rounded-full bg-[var(--syner-surface-muted)] px-3 py-1 text-xs font-bold tracking-wide text-[var(--syner-text-muted)] uppercase"
    >
      {{ plan.badge }}
    </span>

    <!-- Plan information -->
    <h2 class="text-2xl font-bold tracking-tight text-[var(--syner-text)]">
      {{ plan.name }}
    </h2>

    <p class="mt-3 flex-1 text-sm leading-6 text-[var(--syner-text-muted)]">
      {{ plan.description }}
    </p>

    <!-- Metrics -->
    <dl class="mt-7 grid grid-cols-3 gap-3 border-y border-[var(--syner-border)] py-5">
      <div>
        <dt class="text-xs text-[var(--syner-text-subtle)]">Desde</dt>

        <dd class="mt-1 text-sm font-bold text-[var(--syner-text)]">
          {{ plan.minimumContribution }}
        </dd>
      </div>

      <div>
        <dt class="text-xs text-[var(--syner-text-subtle)]">Retorno</dt>

        <dd class="mt-1 text-sm font-bold text-[var(--syner-text)]">
          {{ plan.estimatedReturn }}
        </dd>
      </div>

      <div>
        <dt class="text-xs text-[var(--syner-text-subtle)]">Plazo</dt>

        <dd class="mt-1 text-sm font-bold text-[var(--syner-text)]">
          {{ plan.duration }}
        </dd>
      </div>
    </dl>

    <!-- Action -->
    <Button
      type="button"
      class="mt-6 w-full rounded-[var(--syner-radius-md)] py-3.5 font-bold"
      :class="
        plan.featured
          ? 'bg-[var(--syner-primary)] text-white shadow-lg shadow-[var(--syner-primary)]/20 hover:bg-[var(--syner-primary-hover)]'
          : 'bg-[var(--syner-text)] text-white hover:bg-[var(--syner-text)]/90'
      "
      @click="emit('select', plan)"
    >
      Ver detalles
    </Button>
  </article>
</template>
