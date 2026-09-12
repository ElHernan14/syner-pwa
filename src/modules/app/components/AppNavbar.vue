<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { LogOut, Bell } from 'lucide-vue-next'

import { useAuthStore } from '@/modules/auth/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

async function cerrarSesion(): Promise<void> {
  authStore.logout()
  await router.push('/login')
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-(--syner-border) bg-(--syner-surface)/95 backdrop-blur"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <RouterLink to="/app" class="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="SYNER" class="size-9 rounded-(--syner-radius-md)" />

        <div class="leading-tight">
          <span class="font-bold tracking-tight text-(--syner-text)"> SYNER </span>

          <p class="hidden text-xs text-(--syner-text-muted) sm:block">Tu participación</p>
        </div>
      </RouterLink>

      <div class="flex items-center gap-2 sm:gap-4">
        <RouterLink
          to="/lotes"
          class="hidden rounded-(--syner-radius-md) px-3 py-2 text-sm font-semibold text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary) sm:block"
        >
          Explorar pools
        </RouterLink>

        <RouterLink
          to="/app/notificaciones"
          class="flex size-9 items-center justify-center rounded-(--syner-radius-md) text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
          aria-label="Notificaciones"
        >
          <Bell class="size-5" />
        </RouterLink>

        <span class="hidden max-w-40 truncate text-sm text-(--syner-text-muted) md:block">
          {{ authStore.user?.nombre }}
        </span>

        <button
          type="button"
          class="flex items-center gap-2 rounded-(--syner-radius-md) px-2 py-2 text-sm font-semibold text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
          @click="cerrarSesion"
        >
          <LogOut class="size-4" />
          <span class="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </div>
  </header>
</template>
