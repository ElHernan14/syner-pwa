<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Handshake,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import PlanDetailsModal from '../components/PlanDetailsModal.vue'
import { lotesMock } from '../../lotes/data/lotes.mock.ts'
import type { SynerPlan } from '../types/plan.types'

const selectedPlan = ref<SynerPlan | null>(null)

const poolsDestacados = computed(() => lotesMock.slice(0, 3))

function closeModal(): void {
  selectedPlan.value = null
}

function verPool(id: string): void {
  window.location.href = `/lotes/${id}`
}
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-(--syner-background)">
    <!-- Hero -->
    <section class="relative isolate">
      <!-- Background -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden"
      >
        <div
          class="absolute left-1/2 top-[-280px] size-[720px] -translate-x-1/2 rounded-full bg-(--syner-primary)/10 blur-3xl"
        />

        <div
          class="absolute right-[-180px] top-40 size-[420px] rounded-full bg-(--syner-forest)/8 blur-3xl"
        />
      </div>

      <div
        class="mx-auto max-w-[1440px] px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24"
      >
        <div class="mx-auto max-w-4xl text-center">
          <!-- Eyebrow -->
          <div
            class="inline-flex items-center gap-2 rounded-full bg-(--syner-primary-soft) px-3.5 py-2 text-xs font-bold tracking-[0.12em] text-(--syner-primary) uppercase"
          >
            <Sparkles class="size-3.5" />
            Comprá mejor, juntos
          </div>

          <!-- Heading -->
          <h1
            class="mt-7 text-4xl font-extrabold tracking-[-0.035em] text-(--syner-text) sm:text-6xl lg:text-7xl"
          >
            Hacer posible algo grande
            <span class="text-(--syner-primary)"> empieza por unirnos. </span>
          </h1>

          <p
            class="mx-auto mt-7 max-w-2xl text-base leading-8 text-(--syner-text-muted) sm:text-lg"
          >
            SYNER conecta personas para participar juntas en compras y oportunidades que,
            individualmente, serían más difíciles de alcanzar.
          </p>

          <!-- Actions -->
          <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              as-child
              size="lg"
              class="h-12 rounded-(--syner-radius-md) bg-(--syner-primary) px-6 font-bold text-white shadow-lg shadow-(--syner-primary)/20 hover:bg-(--syner-primary-hover)"
            >
              <RouterLink to="/lotes">
                Explorar pools
                <ArrowRight class="ml-2 size-4" />
              </RouterLink>
            </Button>

            <Button
              as-child
              size="lg"
              variant="outline"
              class="h-12 rounded-(--syner-radius-md) border-(--syner-border) bg-(--syner-surface) px-6 font-bold text-(--syner-text) hover:bg-(--syner-hover-surface)"
            >
              <RouterLink to="/register"> Crear cuenta </RouterLink>
            </Button>
          </div>

          <!-- Small reassurance -->
          <div
            class="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-(--syner-text-muted)"
          >
            <span class="inline-flex items-center gap-1.5">
              <Check class="size-3.5 text-(--syner-success)" />
              Participación simple
            </span>

            <span class="inline-flex items-center gap-1.5">
              <Check class="size-3.5 text-(--syner-success)" />
              Información clara
            </span>

            <span class="inline-flex items-center gap-1.5">
              <Check class="size-3.5 text-(--syner-success)" />
              Experiencia transparente
            </span>
          </div>
        </div>

        <!-- Hero visual -->
        <div class="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div
            class="relative overflow-hidden rounded-(--syner-radius-xl) bg-(--syner-surface) shadow-(--syner-shadow-card)"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(53,169,162,0.10),transparent_55%)]"
            />

            <div class="relative grid gap-0 sm:grid-cols-3">
              <div
                class="border-b border-(--syner-border-soft) p-6 sm:border-b-0 sm:border-r sm:p-8"
              >
                <div
                  class="flex size-11 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary-soft) text-(--syner-primary)"
                >
                  <Users class="size-5" />
                </div>

                <p class="mt-5 text-lg font-bold text-(--syner-text)">Nos unimos</p>

                <p class="mt-2 text-sm leading-6 text-(--syner-text-muted)">
                  Personas con un objetivo en común forman un pool.
                </p>
              </div>

              <div
                class="border-b border-(--syner-border-soft) p-6 sm:border-b-0 sm:border-r sm:p-8"
              >
                <div
                  class="flex size-11 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary-soft) text-(--syner-primary)"
                >
                  <Handshake class="size-5" />
                </div>

                <p class="mt-5 text-lg font-bold text-(--syner-text)">Crecemos juntos</p>

                <p class="mt-2 text-sm leading-6 text-(--syner-text-muted)">
                  El aporte colectivo permite acceder a mejores condiciones.
                </p>
              </div>

              <div class="p-6 sm:p-8">
                <div
                  class="flex size-11 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary-soft) text-(--syner-primary)"
                >
                  <CircleDollarSign class="size-5" />
                </div>

                <p class="mt-5 text-lg font-bold text-(--syner-text)">Conseguimos más</p>

                <p class="mt-2 text-sm leading-6 text-(--syner-text-muted)">
                  Buscamos que cada participación tenga un propósito claro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-(--syner-how-it-works-bg)">
      <div class="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <!-- Intro -->
          <div class="max-w-xl">
            <p class="text-[11px] font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
              Cómo funciona
            </p>

            <h2 class="mt-3 text-3xl font-bold tracking-tight text-(--syner-text) sm:text-4xl">
              Una forma más simple de participar.
            </h2>

            <p class="mt-5 text-base leading-7 text-(--syner-text-muted)">
              Encontrá una oportunidad, elegí tu participación y seguí su evolución desde un mismo
              lugar.
            </p>

            <RouterLink
              to="/lotes"
              class="mt-7 inline-flex items-center gap-2 text-sm font-bold text-(--syner-primary) transition-colors hover:text-(--syner-primary-hover)"
            >
              Ver pools disponibles
              <ArrowRight class="size-4" />
            </RouterLink>
          </div>

          <!-- Steps -->
          <div class="grid gap-4 sm:grid-cols-3">
            <div
              class="rounded-(--syner-radius-lg) bg-(--syner-surface) p-6 shadow-(--syner-shadow-sm)"
            >
              <span
                class="flex size-9 items-center justify-center rounded-full bg-(--syner-primary) text-sm font-bold text-white"
              >
                01
              </span>

              <h3 class="mt-5 font-bold text-(--syner-text)">Explorá</h3>

              <p class="mt-2 text-sm leading-6 text-(--syner-text-muted)">
                Descubrí pools y compará sus condiciones.
              </p>
            </div>

            <div
              class="rounded-(--syner-radius-lg) bg-(--syner-surface) p-6 shadow-(--syner-shadow-sm)"
            >
              <span
                class="flex size-9 items-center justify-center rounded-full bg-(--syner-primary) text-sm font-bold text-white"
              >
                02
              </span>

              <h3 class="mt-5 font-bold text-(--syner-text)">Sumate</h3>

              <p class="mt-2 text-sm leading-6 text-(--syner-text-muted)">
                Reservá tu cupo cuando encuentres el que buscás.
              </p>
            </div>

            <div
              class="rounded-(--syner-radius-lg) bg-(--syner-surface) p-6 shadow-(--syner-shadow-sm)"
            >
              <span
                class="flex size-9 items-center justify-center rounded-full bg-(--syner-primary) text-sm font-bold text-white"
              >
                03
              </span>

              <h3 class="mt-5 font-bold text-(--syner-text)">Seguí el proceso</h3>

              <p class="mt-2 text-sm leading-6 text-(--syner-text-muted)">
                Acompañá el avance de tu participación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pools reales -->
    <section id="plans" class="scroll-mt-24">
      <div class="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div class="max-w-2xl">
          <p class="text-[11px] font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
            Pools disponibles
          </p>

          <h2 class="mt-3 text-3xl font-bold tracking-tight text-(--syner-text) sm:text-4xl">
            Oportunidades que podés hacer posibles.
          </h2>

          <p class="mt-4 leading-7 text-(--syner-text-muted)">
            Conocé algunos de los pools disponibles actualmente en SYNER.
          </p>
        </div>

        <!-- Real mock pools -->
        <div class="mt-10 grid gap-4 md:grid-cols-3">
          <article
            v-for="pool in poolsDestacados"
            :key="pool.id"
            class="rounded-(--syner-radius-lg) bg-(--syner-surface) p-5 shadow-(--syner-shadow-sm)"
          >
            <div
              class="aspect-[16/10] overflow-hidden rounded-(--syner-radius-md) bg-(--syner-surface-muted)"
            >
              <img :src="pool.imagen" :alt="pool.nombre" class="size-full object-cover" />
            </div>

            <div class="mt-5">
              <p class="text-[11px] font-bold tracking-[0.12em] text-(--syner-primary) uppercase">
                {{ pool.categoria }}
              </p>

              <h3 class="mt-2 line-clamp-2 text-lg font-bold text-(--syner-text)">
                {{ pool.nombre }}
              </h3>

              <p class="mt-2 line-clamp-2 text-sm leading-6 text-(--syner-text-muted)">
                {{ pool.descripcion }}
              </p>

              <div class="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p class="text-xs text-(--syner-text-muted)">Por cupo</p>

                  <p class="mt-0.5 text-lg font-bold text-(--syner-text)">
                    ${{ pool.precioCupo.toLocaleString('es-AR') }}
                  </p>
                </div>

                <span
                  class="rounded-full bg-(--syner-success-soft) px-2.5 py-1 text-xs font-bold text-(--syner-success)"
                >
                  {{ pool.porcentajeAhorro }}% ahorro
                </span>
              </div>

              <button
                type="button"
                class="mt-5 inline-flex w-full items-center justify-center rounded-(--syner-radius-md) border border-(--syner-primary) bg-transparent px-4 py-2.5 text-sm font-bold text-(--syner-primary) transition-colors hover:bg-(--syner-primary) hover:text-white"
                @click="verPool(pool.id)"
              >
                Ver pool
                <ArrowRight class="ml-2 size-4" />
              </button>
            </div>
          </article>
        </div>

        <div class="mt-8 text-center">
          <RouterLink
            to="/lotes"
            class="inline-flex items-center gap-2 text-sm font-bold text-(--syner-primary) transition-colors hover:text-(--syner-primary-hover)"
          >
            Ver todos los pools
            <ArrowRight class="size-4" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Trust -->
    <section class="pb-16 sm:pb-20 lg:pb-24">
      <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          class="overflow-hidden rounded-(--syner-radius-xl) bg-(--syner-brand-forest) px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14"
        >
          <div class="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div class="max-w-2xl">
              <div class="flex items-center gap-2 text-sm font-semibold text-(--syner-brand-mint)">
                <ShieldCheck class="size-4" />
                Una experiencia pensada para dar claridad
              </div>

              <h2 class="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Información clara antes de tomar una decisión.
              </h2>

              <p class="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                Queremos que puedas entender qué estás viendo, cuánto participás y en qué estado se
                encuentra cada oportunidad.
              </p>
            </div>

            <RouterLink
              to="/lotes"
              class="inline-flex h-11 items-center justify-center rounded-(--syner-radius-md) bg-white px-5 text-sm font-bold text-(--syner-brand-forest) transition-colors hover:bg-(--syner-brand-mint)"
            >
              Explorar oportunidades
              <ArrowRight class="ml-2 size-4" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <PlanDetailsModal :plan="selectedPlan" @close="closeModal" />
  </main>
</template>
