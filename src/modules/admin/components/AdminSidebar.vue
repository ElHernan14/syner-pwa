<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  PackageSearch,
  ShoppingCart,
  Users,
} from 'lucide-vue-next'
</script>

<template>
  <aside
    class="hidden w-64 shrink-0 border-r border-(--syner-border) bg-(--syner-surface) lg:block"
  >
    <nav class="sticky top-16 space-y-1 p-4">
      <p class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-(--syner-text-muted)">
        Operaciones
      </p>

      <RouterLink
        to="/admin"
        exact-active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
      >
        <LayoutDashboard class="size-5" />
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink
        to="/admin/lotes"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
      >
        <Package class="size-5" />
        <span>Lotes</span>
      </RouterLink>

      <RouterLink
        to="/admin/pagos"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
      >
        <ClipboardList class="size-5" />
        <span>Pagos</span>
      </RouterLink>

      <RouterLink
        to="/admin/proveedores"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
      >
        <Users class="size-5" />
        <span>Proveedores</span>
      </RouterLink>

      <RouterLink
        to="/admin/pedidos"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
      >
        <ShoppingCart class="size-5" />
        <span>Pedidos</span>
      </RouterLink>

      <RouterLink
        to="/lotes"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-semibold text-(--syner-primary) transition hover:bg-(--syner-primary-soft)"
      >
        <PackageSearch class="size-5" />
        <span>Ver pools</span>
      </RouterLink>
    </nav>
  </aside>
</template>
