<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/button'

import PlanCard from '../components/PlanCard.vue'
import PlanDetailsModal from '../components/PlanDetailsModal.vue'
import { plansMock } from '../data/plan.mocks.js'
import type { SynerPlan } from '../types/plan.types'

const selectedPlan = ref<SynerPlan | null>(null)

function selectPlan(plan: SynerPlan): void {
  selectedPlan.value = plan
}

function closeModal(): void {
  selectedPlan.value = null
}
</script>

<template>
  <div class="min-h-screen bg-[var(--syner-background)]">
    <!-- Header -->
    <header
      class="border-b border-[var(--syner-border)] bg-[var(--syner-surface)]/90 backdrop-blur"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/icons/icon-512.png" alt="" class="size-10 rounded-xl" />

          <span class="text-xl font-extrabold tracking-tight text-[var(--syner-text)]">
            SYNER
          </span>
        </RouterLink>

        <nav class="flex items-center gap-2">
          <Button
            as-child
            variant="ghost"
            class="font-semibold text-[var(--syner-text-muted)] hover:bg-[var(--syner-surface-muted)] hover:text-[var(--syner-text)]"
          >
            <RouterLink to="/login"> Ingresar </RouterLink>
          </Button>

          <Button
            as-child
            class="bg-[var(--syner-primary)] font-bold text-white shadow-sm hover:bg-[var(--syner-primary-hover)]"
          >
            <RouterLink to="/register"> Crear cuenta </RouterLink>
          </Button>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section
        class="relative overflow-hidden px-4 pb-12 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24"
      >
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 z-0 h-96 bg-[radial-gradient(circle_at_top,rgba(22,143,232,0.14),transparent_60%)]"
        />

        <div class="relative mx-auto max-w-3xl">
          <p class="text-sm font-bold tracking-[0.18em] text-[var(--syner-primary)] uppercase">
            La unión hace la fuerza
          </p>

          <h1
            class="mt-5 text-4xl font-extrabold tracking-tight text-[var(--syner-text)] sm:text-6xl"
          >
            Conocé las propuestas de
            <span class="text-[var(--syner-primary)]">SYNER</span>
          </h1>

          <p
            class="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--syner-text-muted)] sm:text-lg"
          >
            Explorá una demostración visual de los planes y conocé cómo evolucionará la experiencia
            de la plataforma.
          </p>

          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              as-child
              size="lg"
              class="rounded-[var(--syner-radius-md)] bg-[var(--syner-primary)] px-6 py-3.5 font-bold text-white shadow-lg shadow-[var(--syner-primary)]/20 hover:bg-[var(--syner-primary-hover)]"
            >
              <RouterLink to="/register"> Crear cuenta </RouterLink>
            </Button>

            <Button
              as-child
              size="lg"
              variant="outline"
              class="rounded-[var(--syner-radius-md)] border-[var(--syner-border-strong)] bg-[var(--syner-surface)] px-6 py-3.5 font-bold text-[var(--syner-text)] hover:bg-[var(--syner-surface-muted)]"
            >
              <a href="#plans"> Ver propuestas </a>
            </Button>
          </div>
        </div>
      </section>

      <!-- Plans -->
      <section id="plans" class="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
        <div class="mb-10 max-w-2xl">
          <p class="text-sm font-bold text-[var(--syner-primary)]">PROPUESTAS</p>

          <h2 class="mt-2 text-3xl font-bold tracking-tight text-[var(--syner-text)]">
            Elegí una experiencia para conocer
          </h2>

          <p class="mt-3 leading-7 text-[var(--syner-text-muted)]">
            Los valores mostrados son demostrativos y serán reemplazados cuando el modelo de negocio
            quede formalmente definido.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <PlanCard v-for="plan in plansMock" :key="plan.id" :plan="plan" @select="selectPlan" />
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[var(--syner-border)] bg-[var(--syner-surface)]">
      <div
        class="mx-auto max-w-7xl px-4 py-10 text-center text-sm leading-6 text-[var(--syner-text-muted)] sm:px-6"
      >
        <strong class="text-[var(--syner-text)]"> SYNER © 2026 </strong>

        <p class="mt-2">
          Prototipo en desarrollo. La información mostrada es ilustrativa y no constituye una oferta
          financiera.
        </p>
      </div>
    </footer>

    <PlanDetailsModal :plan="selectedPlan" @close="closeModal" />
  </div>
</template>
