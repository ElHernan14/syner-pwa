<script setup lang="ts">
import { RouterLink } from 'vue-router'

import {
  Bell,
  CircleUserRound,
  LayoutDashboard,
  PackageSearch,
  ShoppingBag,
  Ticket,
  X,
} from 'lucide-vue-next'

defineProps<{
  mobileOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function closeSidebar(): void {
  emit('close')
}
</script>

<template>
  <!-- Mobile overlay -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="mobileOpen"
      type="button"
      class="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] lg:hidden"
      aria-label="Cerrar menú"
      @click="closeSidebar"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed inset-y-16 left-0 z-50 flex w-[min(82vw,18rem)] flex-col border-r border-(--syner-border) bg-(--syner-surface) shadow-(--syner-shadow-elevated) transition-transform duration-300 ease-out lg:sticky lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:translate-x-0 lg:shadow-none"
    :class="mobileOpen ? 'translate-x-0' : '-translate-x-full'"
    aria-label="Barra lateral del espacio personal"
  >
    <!-- Mobile header -->
    <div
      class="flex h-16 shrink-0 items-center justify-between border-b border-(--syner-border) px-5 lg:hidden"
    >
      <div>
        <p class="text-sm font-bold text-(--syner-text)">Mi espacio</p>

        <p class="text-xs text-(--syner-text-muted)">Participación en SYNER</p>
      </div>

      <button
        type="button"
        class="flex size-9 items-center justify-center rounded-xl text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-text)"
        aria-label="Cerrar menú"
        @click="closeSidebar"
      >
        <X class="size-5" />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 lg:p-5" aria-label="Navegación del espacio personal">
      <!-- Exploración -->
      <section class="space-y-2">
        <p
          class="px-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-(--syner-text-muted)"
        >
          Explorar
        </p>

        <RouterLink
          to="/app/lotes"
          class="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition-colors"
          active-class="bg-(--syner-primary-soft) text-(--syner-primary)"
          exact-active-class="bg-(--syner-primary-soft) text-(--syner-primary)"
          @click="closeSidebar"
        >
          <PackageSearch class="size-5 shrink-0" />
          <span>Explorar pools</span>
        </RouterLink>
      </section>

      <!-- Mi espacio -->
      <section class="mt-7 space-y-2">
        <p
          class="px-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-(--syner-text-muted)"
        >
          Mi espacio
        </p>

        <RouterLink
          to="/app"
          exact
          class="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-hover-surface) font-semibold text-(--syner-text)"
          @click="closeSidebar"
        >
          <LayoutDashboard class="size-5 shrink-0" />
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/app/mis-cupos"
          class="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-hover-surface) font-semibold text-(--syner-text)"
          @click="closeSidebar"
        >
          <Ticket class="size-5 shrink-0" />
          <span>Mis cupos</span>
        </RouterLink>

        <RouterLink
          to="/app/compras"
          class="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-hover-surface) font-semibold text-(--syner-text)"
          @click="closeSidebar"
        >
          <ShoppingBag class="size-5 shrink-0" />
          <span>Mis compras</span>
        </RouterLink>

        <RouterLink
          to="/app/perfil"
          class="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-hover-surface) font-semibold text-(--syner-text)"
          @click="closeSidebar"
        >
          <CircleUserRound class="size-5 shrink-0" />
          <span>Mi perfil</span>
        </RouterLink>

        <RouterLink
          to="/app/notificaciones"
          class="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-hover-surface) font-semibold text-(--syner-text)"
          @click="closeSidebar"
        >
          <Bell class="size-5 shrink-0" />
          <span>Notificaciones</span>
        </RouterLink>
      </section>
    </nav>
  </aside>
</template>
