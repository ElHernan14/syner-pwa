<script setup lang="ts">
import { ref } from 'vue'

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
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/icons/icon-512.png" alt="" class="size-10 rounded-xl" />

          <span class="text-xl font-extrabold tracking-tight text-slate-900"> SYNER </span>
        </RouterLink>

        <nav class="flex items-center gap-2">
          <RouterLink
            to="/login"
            class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Ingresar
          </RouterLink>

          <RouterLink
            to="/register"
            class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-700"
          >
            Crear cuenta
          </RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <section class="relative overflow-hidden px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24">
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 z-0 h-96 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_60%)]"
        />

        <div class="relative mx-auto max-w-3xl">
          <p class="text-sm font-bold tracking-[0.18em] text-sky-600 uppercase">
            La unión hace la fuerza
          </p>

          <h1 class="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
            Conocé las propuestas de
            <span class="text-sky-600">SYNER</span>
          </h1>

          <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Explorá una demostración visual de los planes y conocé cómo evolucionará la experiencia
            de la plataforma.
          </p>

          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <RouterLink
              to="/register"
              class="rounded-xl bg-sky-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
            >
              Crear cuenta
            </RouterLink>

            <a
              href="#plans"
              class="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Ver propuestas
            </a>
          </div>
        </div>
      </section>

      <section id="plans" class="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
        <div class="mb-10 max-w-2xl">
          <p class="text-sm font-bold text-sky-600">PROPUESTAS</p>

          <h2 class="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Elegí una experiencia para conocer
          </h2>

          <p class="mt-3 leading-7 text-slate-500">
            Los valores mostrados son demostrativos y serán reemplazados cuando el modelo de negocio
            quede formalmente definido.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <PlanCard v-for="plan in plansMock" :key="plan.id" :plan="plan" @select="selectPlan" />
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-200 bg-white">
      <div
        class="mx-auto max-w-7xl px-4 py-10 text-center text-sm leading-6 text-slate-500 sm:px-6"
      >
        <strong class="text-slate-700"> SYNER © 2026 </strong>

        <p class="mt-2">
          Prototipo en desarrollo. La información mostrada es ilustrativa y no constituye una oferta
          financiera.
        </p>
      </div>
    </footer>

    <PlanDetailsModal :plan="selectedPlan" @close="closeModal" />
  </div>
</template>
