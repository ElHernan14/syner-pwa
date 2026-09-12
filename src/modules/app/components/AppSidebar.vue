<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Bell,
  CircleUserRound,
  LayoutDashboard,
  PackageSearch,
  ShoppingBag,
  Ticket,
} from 'lucide-vue-next'
</script>

<template>
  <aside
    class="hidden w-64 shrink-0 border-r border-(--syner-border) bg-(--syner-surface) lg:block"
  >
    <nav class="sticky top-16 space-y-1 p-4">
      <RouterLink
        to="/lotes"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-semibold text-(--syner-primary) transition hover:bg-(--syner-primary-soft)"
      >
        <PackageSearch class="size-5" />
        <span>Explorar pools</span>
      </RouterLink>

      <RouterLink
        to="/app"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
        exact-active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
      >
        <LayoutDashboard class="size-5" />
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink
        to="/app/mis-cupos"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
      >
        <Ticket class="size-5" />
        <span>Mis cupos</span>
      </RouterLink>

      <RouterLink
        to="/app/compras"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
      >
        <ShoppingBag class="size-5" />
        <span>Mis compras</span>
      </RouterLink>

      <RouterLink
        to="/app/perfil"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
      >
        <CircleUserRound class="size-5" />
        <span>Mi perfil</span>
      </RouterLink>

      <RouterLink
        to="/app/notificaciones"
        class="flex items-center gap-3 rounded-(--syner-radius-md) px-3 py-2.5 text-sm font-medium text-(--syner-text-muted) transition hover:bg-(--syner-background) hover:text-(--syner-primary)"
        active-class="bg-(--syner-background) text-(--syner-primary) font-semibold"
      >
        <Bell class="size-5" />
        <span>Notificaciones</span>
      </RouterLink>
    </nav>
  </aside>
</template>
