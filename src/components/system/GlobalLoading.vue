<script setup lang="ts">
import { useGlobalLoading } from '@/composables/useGlobalLoading'

const { cargando } = useGlobalLoading()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="cargando"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-(--syner-background)/70 p-6 backdrop-blur-[2px]"
        role="status"
        aria-live="polite"
        aria-label="Cargando"
      >
        <div class="relative flex size-24 items-center justify-center">
          <!-- Halo pulsante -->
          <div class="absolute inset-0 animate-pulse rounded-full bg-(--syner-primary-soft)" />

          <!-- Ícono más grande -->
          <div
            class="relative flex size-20 items-center justify-center overflow-hidden rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) shadow-(--syner-shadow-sm)"
          >
            <img src="/icons/icon-192.png" alt="App Icon" class="size-full object-cover" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
