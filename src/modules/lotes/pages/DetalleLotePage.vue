<script setup lang="ts">
import { computed, onMounted } from 'vue'

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-vue-next'

import { useRoute, useRouter } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { useLotes } from '../composables/useLotes'

const route = useRoute()
const router = useRouter()

const { lote, loading, error, obtenerLotePorId } = useLotes()

const loteId = computed(() => String(route.params.id))

const cuposRestantes = computed(() => {
  if (!lote.value) {
    return 0
  }

  return Math.max(lote.value.cantidadCupos - lote.value.cuposOcupados, 0)
})

const ahorroMonto = computed(() => {
  if (!lote.value) {
    return 0
  }

  return Math.max(lote.value.precioMercado - lote.value.precioCupo, 0)
})

const categoriaLabel = computed(() => {
  if (!lote.value) {
    return ''
  }

  const categorias: Record<string, string> = {
    tecnologia: 'Tecnología',
    hogar: 'Hogar',
    indumentaria: 'Indumentaria',
    movilidad: 'Movilidad',
    servicios: 'Servicios',
    otros: 'Otros',
  }

  return categorias[lote.value.categoria] ?? lote.value.categoria
})

const estadoLabel = computed(() => {
  if (!lote.value) {
    return ''
  }

  return obtenerTextoEstado(lote.value.estado)
})

const estaDisponible = computed(() => {
  if (!lote.value) {
    return false
  }

  return lote.value.estado === 'fondeando' && lote.value.cuposDisponibles > 0
})

const estadoActivoIndex = computed(() => {
  if (!lote.value) {
    return 0
  }

  const estados = ['fondeando', 'completado', 'comprado', 'enviado', 'entregado']

  const index = estados.indexOf(lote.value.estado)

  return index >= 0 ? index : 0
})

const etapas = [
  {
    id: 'fondeando',
    label: 'Fondeando',
    description: 'Se completan los cupos.',
  },
  {
    id: 'completado',
    label: 'Completado',
    description: 'El lote alcanzó su objetivo.',
  },
  {
    id: 'comprado',
    label: 'Comprado',
    description: 'Se realiza la compra.',
  },
  {
    id: 'enviado',
    label: 'Enviado',
    description: 'El pedido está en camino.',
  },
  {
    id: 'entregado',
    label: 'Entregado',
    description: 'El proceso finalizó.',
  },
]

function volverAlCatalogo(): void {
  void router.push({ name: 'lotes' })
}

function reservarCupo(): void {
  console.log('Reservar cupo:', lote.value?.id)
}

function formatearPrecio(valor: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor)
}

function formatearFecha(fecha: string): string {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${fecha}T12:00:00`))
}

function obtenerTextoEstado(estado: string): string {
  const estados: Record<string, string> = {
    borrador: 'Borrador',
    fondeando: 'Fondeando',
    completado: 'Completado',
    comprado: 'Comprado',
    enviado: 'Enviado',
    entregado: 'Entregado',
    cancelado: 'Cancelado',
  }

  return estados[estado] ?? estado
}

onMounted(() => {
  void obtenerLotePorId(loteId.value)
})
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-(--syner-background)">
    <!-- Loading -->
    <div
      v-if="loading"
      class="mx-auto max-w-(--syner-content-max-width) px-4 py-10 sm:px-6 lg:px-8"
    >
      <div class="mb-8 h-5 w-36 animate-pulse rounded-full bg-(--syner-surface-muted)" />

      <div class="grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
        <div
          class="aspect-[16/10] animate-pulse rounded-(--syner-radius-xl) bg-(--syner-surface-muted)"
        />

        <div class="space-y-4">
          <div class="h-32 animate-pulse rounded-(--syner-radius-lg) bg-(--syner-surface-muted)" />
          <div class="h-40 animate-pulse rounded-(--syner-radius-lg) bg-(--syner-surface-muted)" />
          <div class="h-24 animate-pulse rounded-(--syner-radius-lg) bg-(--syner-surface-muted)" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <section
      v-else-if="error"
      class="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-12 text-center"
    >
      <div
        class="w-full rounded-(--syner-radius-xl) bg-(--syner-surface) p-8 shadow-(--syner-shadow-card)"
      >
        <div
          class="mx-auto flex size-12 items-center justify-center rounded-full bg-(--syner-primary-soft) text-(--syner-primary)"
        >
          <PackageCheck class="size-6" />
        </div>

        <h1 class="mt-5 text-2xl font-bold text-(--syner-text)">No pudimos cargar el lote</h1>

        <p class="mt-3 text-sm leading-6 text-(--syner-text-muted)">
          {{ error }}
        </p>

        <Button
          type="button"
          class="mt-6 rounded-(--syner-radius-md) bg-(--syner-primary) font-bold text-white hover:bg-(--syner-primary-hover)"
          @click="volverAlCatalogo"
        >
          Volver al catálogo
        </Button>
      </div>
    </section>

    <template v-else-if="lote">
      <!-- Back navigation -->
      <div class="mx-auto max-w-(--syner-content-max-width) px-4 pt-6 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="ghost"
          class="group gap-2 px-2 text-(--syner-text-muted) hover:bg-transparent hover:text-(--syner-text)"
          @click="volverAlCatalogo"
        >
          <ArrowLeft class="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Volver a pools
        </Button>
      </div>

      <section
        class="mx-auto max-w-(--syner-content-max-width) px-4 pb-20 pt-5 sm:px-6 sm:pb-24 lg:px-8"
      >
        <!-- ========================================================= -->
        <!-- HERO -->
        <!-- ========================================================= -->

        <div class="grid gap-5 lg:grid-cols-[1.45fr_0.55fr] lg:items-stretch">
          <!-- Product visual -->
          <div
            class="group relative min-h-[390px] overflow-hidden rounded-(--syner-radius-xl) bg-(--syner-surface) shadow-(--syner-shadow-card) sm:min-h-[520px]"
          >
            <img
              :src="lote.imagen"
              :alt="lote.nombre"
              class="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.015]"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />

            <div class="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-7 sm:top-7">
              <Badge
                class="border-0 bg-(--syner-primary-soft) px-3 py-1.5 text-xs font-bold text-(--syner-primary) shadow-sm backdrop-blur"
              >
                {{ categoriaLabel }}
              </Badge>

              <Badge
                class="border-0 bg-(--syner-primary) px-3 py-1.5 text-xs font-bold text-white shadow-sm"
              >
                Ahorrás {{ lote.porcentajeAhorro }}%
              </Badge>
            </div>

            <div class="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-7 sm:right-7">
              <div class="mb-3 flex items-center gap-2 text-sm font-semibold text-white/80">
                <Sparkles class="size-4 text-(--syner-brand-mint)" />
                Una oportunidad de compra colectiva
              </div>

              <h1
                class="max-w-4xl text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
              >
                {{ lote.nombre }}
              </h1>

              <p class="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                Accedé a este producto mediante una participación colectiva y aprovechá
                {{ formatearPrecio(ahorroMonto) }} de ahorro frente al precio de mercado.
              </p>
            </div>
          </div>

          <!-- Participation panel -->
          <div
            class="flex flex-col rounded-(--syner-radius-xl) bg-(--syner-surface) p-6 shadow-(--syner-shadow-card) sm:p-7"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
                  Tu participación
                </p>

                <p class="mt-2 text-sm text-(--syner-text-muted)">
                  Un cupo para formar parte del lote.
                </p>
              </div>

              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-full bg-(--syner-primary-soft) text-(--syner-primary)"
              >
                <Users class="size-5" />
              </div>
            </div>

            <div class="mt-8">
              <p class="text-sm text-(--syner-text-muted)">Precio por cupo</p>

              <p
                class="mt-1 text-4xl font-extrabold tracking-[-0.03em] text-(--syner-text) sm:text-5xl"
              >
                {{ formatearPrecio(lote.precioCupo) }}
              </p>

              <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span class="text-(--syner-text-muted)"> Precio de mercado </span>

                <span class="font-semibold text-(--syner-text-subtle) line-through">
                  {{ formatearPrecio(lote.precioMercado) }}
                </span>
              </div>
            </div>

            <!-- Savings -->
            <div class="mt-6 rounded-(--syner-radius-lg) bg-(--syner-primary-soft) p-4">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold text-(--syner-primary)">Tu ahorro potencial</p>

                  <p class="mt-1 text-xl font-extrabold text-(--syner-primary)">
                    {{ formatearPrecio(ahorroMonto) }}
                  </p>
                </div>

                <span
                  class="rounded-full bg-(--syner-primary) px-3 py-1.5 text-xs font-bold text-white"
                >
                  -{{ lote.porcentajeAhorro }}%
                </span>
              </div>
            </div>

            <!-- Funding -->
            <div class="mt-8">
              <div class="flex items-end justify-between gap-4">
                <div>
                  <p class="text-sm font-bold text-(--syner-text)">
                    {{ lote.porcentajeFondeo }}% alcanzado
                  </p>

                  <p class="mt-1 text-xs text-(--syner-text-muted)">
                    {{ lote.cuposOcupados }} de {{ lote.cantidadCupos }} cupos ocupados
                  </p>
                </div>

                <p class="text-sm font-bold text-(--syner-primary)">
                  {{ cuposRestantes }} disponibles
                </p>
              </div>

              <Progress
                :model-value="lote.porcentajeFondeo"
                class="mt-4 h-3 bg-(--syner-surface-muted)"
              />

              <div class="mt-4 flex flex-wrap gap-1.5">
                <span
                  v-for="indice in lote.cantidadCupos"
                  :key="indice"
                  class="h-2.5 flex-1 rounded-full transition-colors"
                  :class="
                    indice <= lote.cuposOcupados
                      ? 'bg-(--syner-primary)'
                      : 'bg-(--syner-surface-muted)'
                  "
                  :aria-label="
                    indice <= lote.cuposOcupados
                      ? `Cupo ${indice} ocupado`
                      : `Cupo ${indice} disponible`
                  "
                />
              </div>
            </div>

            <!-- Availability -->
            <div class="mt-7 flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--syner-forest-soft) text-(--syner-forest)"
              >
                <Clock3 class="size-5" />
              </div>

              <div>
                <p class="text-sm font-bold text-(--syner-text)">
                  {{ lote.diasRestantes }} días restantes
                </p>

                <p class="text-xs text-(--syner-text-muted)">
                  El período de fondeo finaliza el {{ formatearFecha(lote.fechaFin) }}.
                </p>
              </div>
            </div>

            <!-- CTA -->
            <div class="mt-auto pt-8">
              <Button
                type="button"
                size="lg"
                class="h-13 w-full rounded-(--syner-radius-md) bg-(--syner-primary) text-base font-bold text-white shadow-lg shadow-(--syner-primary)/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--syner-primary-hover) hover:shadow-xl"
                :disabled="!estaDisponible"
                @click="reservarCupo"
              >
                {{
                  lote.cuposDisponibles === 0
                    ? 'Lote completo'
                    : lote.estado !== 'fondeando'
                      ? 'Lote no disponible'
                      : 'Quiero mi cupo'
                }}

                <ArrowRight class="ml-2 size-4" />
              </Button>

              <p class="mt-3 text-center text-xs leading-5 text-(--syner-text-subtle)">
                Tu participación se suma al objetivo colectivo del lote.
              </p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- WHY THIS LOT -->
        <!-- ========================================================= -->

        <div class="mt-14 grid gap-8 lg:grid-cols-[5fr_2fr] lg:items-stretch">
          <!-- Description -->
          <div class="flex flex-col justify-center">
            <p class="text-[11px] font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
              Sobre esta oportunidad
            </p>

            <h2 class="mt-3 text-3xl font-bold tracking-[-0.025em] text-(--syner-text) sm:text-4xl">
              ¿Por qué este lote?
            </h2>

            <p class="mt-5 text-base leading-8 text-(--syner-text-muted)">
              {{ lote.descripcionCorta }}
            </p>

            <p
              v-if="lote.descripcionLarga"
              class="mt-6 text-sm leading-7 text-(--syner-text-muted)"
            >
              {{ lote.descripcionLarga }}
            </p>
          </div>

          <!-- Highlights -->
          <div class="flex flex-col gap-3">
            <div class="rounded-(--syner-radius-lg) bg-(--syner-lote-highlight-bg) p-3.5">
              <div
                class="flex size-9 items-center justify-center rounded-xl bg-(--syner-lote-badge-bg) text-(--syner-lote-highlight-text)"
              >
                <Check class="size-4" />
              </div>

              <p class="mt-3 font-bold text-(--syner-text)">Ahorro colectivo</p>

              <p class="mt-1.5 text-sm leading-6 text-(--syner-text-muted)">
                {{ lote.porcentajeAhorro }}% menos que el valor de referencia de mercado.
              </p>
            </div>

            <div class="rounded-(--syner-radius-lg) bg-(--syner-lote-highlight-bg) p-3.5">
              <div
                class="flex size-9 items-center justify-center rounded-xl bg-(--syner-lote-badge-bg) text-(--syner-lote-highlight-text)"
              >
                <Users class="size-4" />
              </div>

              <p class="mt-3 font-bold text-(--syner-text)">Participación colectiva</p>

              <p class="mt-1.5 text-sm leading-6 text-(--syner-text-muted)">
                Cada cupo acerca el lote a su objetivo de compra.
              </p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- LOT DETAILS -->
        <!-- ========================================================= -->

        <div class="mt-12 grid gap-8 lg:grid-cols-[4fr_4fr] lg:gap-10">
          <!-- Características -->
          <div
            class="rounded-(--syner-radius-xl) bg-(--syner-surface) p-6 shadow-(--syner-shadow-sm) sm:p-7"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--syner-primary-soft) text-(--syner-primary)"
              >
                <Sparkles class="size-5" />
              </div>

              <div>
                <p class="text-xs font-bold tracking-[0.12em] text-(--syner-primary) uppercase">
                  Detalles
                </p>

                <h3 class="mt-1 text-xl font-bold text-(--syner-text)">Características</h3>
              </div>
            </div>

            <ul class="mt-6 space-y-3">
              <li
                v-for="caracteristica in lote.caracteristicas"
                :key="caracteristica"
                class="flex items-start gap-3 text-sm leading-6 text-(--syner-text-muted)"
              >
                <span
                  class="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-(--syner-success-soft) text-(--syner-success)"
                >
                  <Check class="size-3" />
                </span>

                <span>{{ caracteristica }}</span>
              </li>
            </ul>
          </div>

          <!-- Incluye -->
          <div
            class="rounded-(--syner-radius-xl) bg-(--syner-surface) p-6 shadow-(--syner-shadow-sm) sm:p-7"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--syner-forest-soft) text-(--syner-forest)"
              >
                <PackageCheck class="size-5" />
              </div>

              <div>
                <p class="text-xs font-bold tracking-[0.12em] text-(--syner-forest) uppercase">
                  Tu participación
                </p>

                <h3 class="mt-1 text-xl font-bold text-(--syner-text)">Incluye</h3>
              </div>
            </div>

            <ul class="mt-6 space-y-3">
              <li
                v-for="item in lote.incluye"
                :key="item"
                class="flex items-start gap-3 text-sm leading-6 text-(--syner-text-muted)"
              >
                <span
                  class="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-(--syner-forest-soft) text-(--syner-forest)"
                >
                  <Check class="size-3" />
                </span>

                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Consideraciones -->
        <div class="mt-5">
          <div class="rounded-(--syner-radius-xl) bg-(--syner-warning-soft) p-6 sm:p-7">
            <div class="flex items-start gap-4">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--syner-warning-soft) text-(--syner-warning)"
              >
                <Clock3 class="size-5" />
              </div>

              <div class="min-w-0">
                <p class="text-xs font-bold tracking-[0.12em] text-(--syner-warning) uppercase">
                  Antes de participar
                </p>

                <h3 class="mt-1 text-xl font-bold text-(--syner-text)">Consideraciones</h3>

                <ul class="mt-5 space-y-3">
                  <li
                    v-for="consideracion in lote.consideraciones"
                    :key="consideracion"
                    class="flex items-start gap-3 text-sm leading-6 text-(--syner-text-muted)"
                  >
                    <span class="mt-1 size-1.5 shrink-0 rounded-full bg-(--syner-warning)" />

                    <span>{{ consideracion }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- VIGENCIA -->
        <!-- ========================================================= -->

        <div class="mt-10">
          <div
            class="rounded-(--syner-radius-xl) bg-(--syner-section-green-bg) p-7 shadow-(--syner-shadow-sm) sm:p-8"
          >
            <div class="flex items-start justify-between gap-6">
              <div>
                <p class="text-xs font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
                  Vigencia
                </p>

                <h3 class="mt-2 text-2xl font-bold text-(--syner-text)">Tiempo para participar</h3>
              </div>

              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-full bg-(--syner-primary-soft) text-(--syner-primary)"
              >
                <CalendarDays class="size-5" />
              </div>
            </div>

            <div class="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p class="text-xs font-medium text-(--syner-text-subtle)">Comienza</p>

                <p class="mt-2 text-base font-bold text-(--syner-text)">
                  {{ formatearFecha(lote.fechaInicio) }}
                </p>
              </div>

              <div>
                <p class="text-xs font-medium text-(--syner-text-subtle)">Finaliza</p>

                <p class="mt-2 text-base font-bold text-(--syner-text)">
                  {{ formatearFecha(lote.fechaFin) }}
                </p>
              </div>
            </div>

            <div class="mt-8 rounded-(--syner-radius-lg) bg-(--syner-section-green-surface) p-5">
              <p class="text-sm font-semibold text-(--syner-how-it-works-text)">
                El lote necesita {{ cuposRestantes }} cupos más para alcanzar su objetivo.
              </p>

              <p class="mt-2 text-sm leading-6 text-(--syner-text-muted)">
                Podés seguir el avance de la participación desde el momento en que te sumás.
              </p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- PROVIDER -->
        <!-- ========================================================= -->

        <div v-if="lote.proveedor" class="mt-10">
          <div class="max-w-2xl">
            <p class="text-[11px] font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
              Confianza
            </p>

            <h2 class="mt-3 text-3xl font-bold tracking-[-0.025em] text-(--syner-text) sm:text-4xl">
              Quién está detrás del lote.
            </h2>
          </div>

          <div
            class="mt-8 rounded-(--syner-radius-xl) bg-(--syner-section-green-bg) p-6 shadow-(--syner-shadow-sm) sm:p-8"
          >
            <div class="flex flex-col gap-7 sm:flex-row sm:items-start">
              <div
                class="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-(--syner-forest-soft) text-(--syner-forest)"
              >
                <ShieldCheck class="size-7" />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p
                      class="text-xs font-bold tracking-[0.12em] text-(--syner-section-green-text) uppercase"
                    >
                      Proveedor
                    </p>

                    <h3 class="mt-1 text-xl font-bold text-(--syner-text)">
                      {{ lote.proveedor.nombre }}
                    </h3>
                  </div>

                  <div
                    v-if="lote.proveedor.verificado"
                    class="inline-flex w-fit items-center gap-2 rounded-full bg-(--syner-forest-soft) px-3 py-1.5 text-xs font-bold text-(--syner-forest)"
                  >
                    <Check class="size-3.5" />
                    Verificado por SYNER
                  </div>
                </div>

                <p class="mt-5 max-w-3xl text-sm leading-7 text-(--syner-text-muted)">
                  {{ lote.proveedor.descripcion }}
                </p>

                <div class="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  <span
                    v-if="lote.proveedor.verificado"
                    class="inline-flex items-center gap-2 font-semibold text-(--syner-success)"
                  >
                    <ShieldCheck class="size-4" />
                    Identidad verificada
                  </span>

                  <span class="inline-flex items-center gap-2 text-(--syner-text-muted)">
                    <PackageCheck class="size-4" />
                    Asociado al lote seleccionado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- FUNDING STATUS -->
        <!-- ========================================================= -->

        <div class="mt-10">
          <div class="max-w-2xl">
            <p class="text-[11px] font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
              Seguimiento
            </p>

            <h2 class="mt-3 text-3xl font-bold tracking-[-0.025em] text-(--syner-text) sm:text-4xl">
              Seguí la evolución de tu lote.
            </h2>

            <p class="mt-4 text-base leading-7 text-(--syner-text-muted)">
              Desde el fondeo hasta la entrega, cada lote avanza por etapas claras.
            </p>
          </div>

          <div
            class="mt-10 rounded-(--syner-radius-xl) bg-(--syner-section-green-surface) p-6 shadow-(--syner-shadow-sm) sm:p-8"
          >
            <div class="relative">
              <!-- Connecting line -->
              <div
                class="absolute left-4 right-4 top-4 hidden h-0.5 bg-(--syner-surface-muted) sm:block"
              />

              <div class="grid gap-8 sm:grid-cols-5 sm:gap-4">
                <div
                  v-for="(etapa, index) in etapas"
                  :key="etapa.id"
                  class="relative flex items-start gap-4 sm:flex-col sm:items-center sm:text-center"
                >
                  <div
                    class="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
                    :class="
                      index <= estadoActivoIndex
                        ? 'bg-(--syner-primary) text-white'
                        : 'bg-(--syner-surface-muted) text-(--syner-text-subtle)'
                    "
                  >
                    <Check v-if="index < estadoActivoIndex" class="size-4" />
                    <span v-else>{{ index + 1 }}</span>
                  </div>

                  <div>
                    <p
                      class="text-sm font-bold"
                      :class="
                        index <= estadoActivoIndex
                          ? 'text-(--syner-text)'
                          : 'text-(--syner-text-subtle)'
                      "
                    >
                      {{ etapa.label }}
                    </p>

                    <p class="mt-1 text-xs leading-5 text-(--syner-text-muted)">
                      {{ etapa.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="mt-10 flex flex-col gap-4 rounded-(--syner-radius-lg) bg-(--syner-how-it-works-bg) p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-xs font-bold tracking-[0.12em] text-(--syner-primary) uppercase">
                  Estado actual
                </p>

                <p class="mt-1 text-lg font-bold text-(--syner-text)">
                  {{ estadoLabel }}
                </p>
              </div>

              <div class="flex items-center gap-2 text-sm text-(--syner-text-muted)">
                <Clock3 class="size-4 text-(--syner-primary)" />
                {{ lote.diasRestantes }} días restantes
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- FINAL CTA -->
        <!-- ========================================================= -->

        <div class="mt-10">
          <div
            class="relative overflow-hidden rounded-(--syner-radius-xl) bg-(--syner-brand-forest) px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14"
          >
            <div
              class="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-(--syner-brand-mint)/10 blur-3xl"
            />

            <div class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div class="max-w-2xl">
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-(--syner-brand-mint)"
                >
                  <Sparkles class="size-4" />
                  Una decisión colectiva
                </div>

                <h2 class="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  {{ cuposRestantes }} cupos separan a este lote de su objetivo.
                </h2>

                <p class="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                  Si el lote te convence, podés formar parte con una participación de
                  {{ formatearPrecio(lote.precioCupo) }}.
                </p>
              </div>

              <Button
                type="button"
                size="lg"
                class="h-12 rounded-(--syner-radius-md) bg-white px-6 font-extrabold text-(--syner-brand-forest) shadow-lg hover:bg-(--syner-brand-mint)"
                :disabled="!estaDisponible"
                @click="reservarCupo"
              >
                {{
                  lote.cuposDisponibles === 0
                    ? 'Lote completo'
                    : lote.estado !== 'fondeando'
                      ? 'Lote no disponible'
                      : 'Quiero mi cupo'
                }}

                <ArrowRight class="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
