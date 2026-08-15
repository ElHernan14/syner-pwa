<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--syner-background) px-4 py-10 sm:px-6"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(22,143,232,0.10),transparent_42%)]"
    />

    <div class="relative w-full max-w-md">
      <header class="mb-8 text-center">
        <RouterLink
          to="/"
          class="mx-auto mb-6 flex size-14 items-center justify-center overflow-hidden rounded-(--syner-radius-md) bg-(--syner-surface) shadow-(--syner-shadow-sm) ring-1 ring-(--syner-border)"
          aria-label="Ir al inicio de SYNER"
        >
          <img src="/icons/icon-192.png" alt="" class="size-full object-cover" />
        </RouterLink>

        <p class="mb-2 text-sm font-semibold tracking-wide text-(--syner-primary)">
          BIENVENIDO DE NUEVO
        </p>

        <h1 class="text-3xl font-bold tracking-tight text-(--syner-text) sm:text-4xl">
          Iniciá sesión
        </h1>

        <p class="mx-auto mt-3 max-w-sm text-sm leading-6 text-(--syner-text-muted) sm:text-base">
          Ingresá a tu cuenta para continuar con tu experiencia en SYNER.
        </p>
      </header>

      <div
        class="rounded-(--syner-radius-xl) border border-(--syner-border) bg-(--syner-surface) p-6 shadow-(--syner-shadow-card) sm:p-8"
      >
        <LoginForm />
      </div>

      <p class="mt-6 text-center text-xs leading-5 text-(--syner-text-subtle)">
        ¿Todavía no formás parte de SYNER?
        <RouterLink
          to="/register"
          class="font-semibold text-(--syner-primary) transition hover:text-(--syner-primary-hover) hover:underline"
        >
          Creá tu cuenta
        </RouterLink>
      </p>
    </div>
  </section>
</template>
