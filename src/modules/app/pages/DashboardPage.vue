<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <section class="space-y-6">
    <header>
      <p class="text-sm font-semibold text-(--syner-primary)">MI CUENTA</p>

      <h1 class="mt-1 text-3xl font-bold tracking-tight">Hola, {{ authStore.user?.nombre }}</h1>

      <p class="mt-2 text-(--syner-text-muted)">
        Desde acá vas a poder gestionar tus cupos, compras y cuenta.
      </p>
    </header>

    <div
      class="rounded-(--syner-radius-xl) border border-(--syner-border) bg-(--syner-surface) p-6 shadow-(--syner-shadow-sm)"
    >
      <p class="text-sm text-(--syner-text-muted)">Dashboard de usuario</p>
    </div>
  </section>
</template>
