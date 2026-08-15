<script setup lang="ts">
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import type { SynerPlan } from '../types/plan.types'

const props = defineProps<{
  plan: SynerPlan | null
}>()

const emit = defineEmits<{
  close: []
}>()

const isOpen = computed({
  get: () => props.plan !== null,
  set: (value: boolean) => {
    if (!value) {
      emit('close')
    }
  },
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-lg rounded-[var(--syner-radius-lg)] p-6 sm:p-8">
      <DialogHeader>
        <p class="text-sm font-bold text-[var(--syner-primary)]">
          {{ plan?.badge }}
        </p>

        <DialogTitle class="text-2xl font-bold tracking-tight text-[var(--syner-text)]">
          {{ plan?.name }}
        </DialogTitle>

        <DialogDescription class="pt-3 text-base leading-7 text-[var(--syner-text-muted)]">
          {{ plan?.details }}
        </DialogDescription>
      </DialogHeader>

      <!-- Demo notice -->
      <div
        class="rounded-[var(--syner-radius-md)] border border-[var(--syner-warning)]/20 bg-[var(--syner-warning-soft)] p-4 text-sm leading-6 text-[var(--syner-warning)]"
      >
        Esta funcionalidad forma parte de una demostración. No procesa aportes ni operaciones
        reales.
      </div>

      <DialogFooter class="flex-col gap-3 sm:flex-row">
        <Button
          as-child
          class="w-full rounded-[var(--syner-radius-md)] bg-[var(--syner-primary)] py-3.5 font-bold text-white hover:bg-[var(--syner-primary-hover)] sm:flex-1"
        >
          <RouterLink to="/register"> Crear cuenta </RouterLink>
        </Button>

        <Button
          type="button"
          variant="outline"
          class="w-full rounded-[var(--syner-radius-md)] py-3.5 font-bold text-[var(--syner-text-muted)] sm:flex-1"
          @click="emit('close')"
        >
          Seguir explorando
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
