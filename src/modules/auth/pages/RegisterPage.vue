<script setup lang="ts">
import RegisterForm from '../components/RegisterForm.vue'
</script>

<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--syner-background)] px-4 py-10 sm:px-6"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(22,143,232,0.10),transparent_42%)]"
    />

    <div class="relative w-full max-w-2xl">
      <header class="mb-8 text-center">
        <RouterLink
          to="/"
          class="mx-auto mb-6 flex size-14 items-center justify-center overflow-hidden rounded-(--syner-radius-md) bg-[var(--syner-surface)] shadow-(--syner-shadow-sm) ring-1 ring-[var(--syner-border)]"
          aria-label="Ir al inicio de SYNER"
        >
          <img src="/icons/icon-192.png" alt="" class="size-full object-cover" />
        </RouterLink>

        <p class="mb-2 text-sm font-semibold tracking-wide text-[var(--syner-primary)]">
          BIENVENIDO A SYNER
        </p>

        <h1 class="text-3xl font-bold tracking-tight text-[var(--syner-text)] sm:text-4xl">
          Creá tu cuenta
        </h1>

        <p
          class="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--syner-text-muted)] sm:text-base"
        >
          Empezá a conocer la plataforma y completá tu perfil en pocos pasos.
        </p>
      </header>

      <div
        class="rounded-(--syner-radius-xl) border border-[var(--syner-border)] bg-[var(--syner-surface)] p-6 shadow-(--syner-shadow-card) sm:p-8"
      >
        <RegisterForm />
      </div>

      <p class="mt-6 text-center text-xs leading-5 text-[var(--syner-text-subtle)]">
        Tus datos se utilizarán únicamente para crear y administrar tu cuenta.
      </p>
    </div>
  </section>
</template>
