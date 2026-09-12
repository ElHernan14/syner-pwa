<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { LogOut } from 'lucide-vue-next'

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
      <RouterLink to="/admin" class="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="SYNER" class="size-9 rounded-(--syner-radius-md)" />

        <div class="leading-tight">
          <div class="flex items-center gap-2">
            <span class="font-bold tracking-tight text-(--syner-text)"> SYNER </span>

            <span
              class="rounded-full bg-(--syner-primary)/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--syner-primary)"
            >
              Admin
            </span>
          </div>

          <p class="hidden text-xs text-(--syner-text-muted) sm:block">Centro de operaciones</p>
        </div>
      </RouterLink>

      <RouterLink
        to="/lotes"
        class="hidden rounded-(--syner-radius-md) px-3 py-2 text-sm font-semibold text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary) sm:block"
      >
        Ver pools
      </RouterLink>

      <div class="flex items-center gap-3 sm:gap-4">
        <div class="hidden text-right md:block">
          <p class="text-sm font-semibold text-(--syner-text)">
            {{ authStore.user?.nombre }}
          </p>

          <p class="text-xs text-(--syner-text-muted)">Administrador</p>
        </div>

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
