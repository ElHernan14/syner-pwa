<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { CreditCard, LayoutDashboard, PackageSearch, ShoppingCart, Truck, X } from 'lucide-vue-next'

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
    aria-label="Barra lateral del centro de operaciones"
  >
    <!-- Mobile sidebar header -->
    <div
      class="flex h-16 shrink-0 items-center justify-between border-b border-(--syner-border) px-5 lg:hidden"
    >
      <div>
        <p class="text-sm font-bold text-(--syner-text)">Centro de operaciones</p>

        <p class="text-xs text-(--syner-text-muted)">Administración</p>
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

    <nav
      class="flex-1 overflow-y-auto p-4 lg:p-5"
      aria-label="Navegación del centro de operaciones"
    >
      <section class="space-y-2">
        <p
          class="px-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-(--syner-text-muted)"
        >
          Operaciones
        </p>

        <RouterLink
          to="/admin"
          exact
          class="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-primary-soft) font-semibold text-(--syner-primary)"
          @click="closeSidebar"
        >
          <LayoutDashboard class="size-5 shrink-0" />
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/admin/lotes"
          class="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-primary-soft) font-semibold text-(--syner-primary)"
          @click="closeSidebar"
        >
          <PackageSearch class="size-5 shrink-0" />
          <span>Lotes</span>
        </RouterLink>

        <RouterLink
          to="/admin/pagos"
          class="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-primary-soft) font-semibold text-(--syner-primary)"
          @click="closeSidebar"
        >
          <CreditCard class="size-5 shrink-0" />
          <span>Pagos</span>
        </RouterLink>

        <RouterLink
          to="/admin/proveedores"
          class="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-primary-soft) font-semibold text-(--syner-primary)"
          @click="closeSidebar"
        >
          <Truck class="size-5 shrink-0" />
          <span>Proveedores</span>
        </RouterLink>

        <RouterLink
          to="/admin/pedidos"
          class="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          active-class="bg-(--syner-primary-soft) font-semibold text-(--syner-primary)"
          @click="closeSidebar"
        >
          <ShoppingCart class="size-5 shrink-0" />
          <span>Pedidos</span>
        </RouterLink>
      </section>
    </nav>
  </aside>
</template>
