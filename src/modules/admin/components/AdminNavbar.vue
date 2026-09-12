<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

import { LogOut, Menu, PackageSearch, X } from 'lucide-vue-next'

import { useAuthStore } from '@/modules/auth/stores/auth.store'

defineProps<{
  mobileSidebarOpen: boolean
}>()

const emit = defineEmits<{
  toggleSidebar: []
}>()

const router = useRouter()
const authStore = useAuthStore()

async function cerrarSesion(): Promise<void> {
  authStore.logout()
  await router.push('/login')
}

function toggleSidebar(): void {
  emit('toggleSidebar')
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-(--syner-border) bg-(--syner-surface)/95 backdrop-blur-xl"
  >
    <div class="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Left -->
      <div class="flex min-w-0 items-center gap-2 sm:gap-3">
        <!-- Mobile menu -->
        <button
          type="button"
          class="flex size-10 shrink-0 items-center justify-center rounded-xl text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-text) lg:hidden"
          :aria-expanded="mobileSidebarOpen"
          aria-controls="admin-sidebar"
          aria-label="Abrir menú de administración"
          @click="toggleSidebar"
        >
          <X v-if="mobileSidebarOpen" class="size-5" />
          <Menu v-else class="size-5" />
        </button>

        <RouterLink
          to="/admin"
          class="flex min-w-0 items-center gap-2.5 rounded-xl px-1 py-1.5 transition-opacity hover:opacity-80 sm:gap-3"
          aria-label="Ir al centro de operaciones de SYNER"
        >
          <img
            src="/icons/icon-192.png"
            alt="SYNER"
            class="size-9 shrink-0 rounded-(--syner-radius-md)"
          />

          <div class="min-w-0 leading-tight">
            <div class="flex items-center gap-2">
              <span class="font-bold tracking-tight text-(--syner-text)"> SYNER </span>

              <span
                class="rounded-full bg-(--syner-primary)/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--syner-primary)"
              >
                Admin
              </span>
            </div>

            <p class="hidden truncate text-xs text-(--syner-text-muted) sm:block">
              Centro de operaciones
            </p>
          </div>
        </RouterLink>
      </div>

      <!-- Desktop contextual action -->
      <RouterLink
        to="/admin/lotes"
        class="hidden items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text) sm:flex"
        active-class="bg-(--syner-primary-soft) text-(--syner-primary)"
      >
        <PackageSearch class="size-4" />
        <span>Gestionar lotes</span>
      </RouterLink>

      <!-- Account -->
      <div class="flex min-w-0 items-center gap-2 sm:gap-3">
        <div class="hidden min-w-0 text-right md:block">
          <p class="max-w-40 truncate text-sm font-semibold text-(--syner-text)">
            {{ authStore.user?.nombre }}
          </p>

          <p class="text-xs text-(--syner-text-muted)">Administrador</p>
        </div>

        <!-- Compact mobile identity -->
        <div
          class="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--syner-primary-soft) text-sm font-bold text-(--syner-primary) md:hidden"
          :title="authStore.user?.nombre"
        >
          {{ authStore.user?.nombre?.charAt(0).toUpperCase() }}
        </div>

        <button
          type="button"
          class="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          @click="cerrarSesion"
        >
          <LogOut class="size-4" />
          <span class="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </div>
  </header>
</template>
