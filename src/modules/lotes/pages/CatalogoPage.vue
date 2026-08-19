<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ArrowRight, Search, Sparkles } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

import LoteCard from '../components/LoteCard.vue'
import LoteFiltros, { type FiltrosLote } from '../components/LoteFiltros.vue'
import { useLotes, type LoteCatalogo } from '../composables/useLotes'

import type { CategoriaLote } from '../models/lote.model'

const router = useRouter()

const { lotes, loading, error, obtenerLotes } = useLotes()

const filtros = ref<FiltrosLote>({
  busqueda: '',
  categoria: 'todas',
  precioCupoDesde: null,
  precioCupoHasta: null,
  precioMercadoDesde: null,
  precioMercadoHasta: null,
})

const filtrosActivos = computed(() => {
  return (
    filtros.value.busqueda.trim() !== '' ||
    filtros.value.categoria !== 'todas' ||
    filtros.value.precioCupoDesde !== null ||
    filtros.value.precioCupoHasta !== null ||
    filtros.value.precioMercadoDesde !== null ||
    filtros.value.precioMercadoHasta !== null
  )
})

const lotesFiltrados = computed<LoteCatalogo[]>(() => {
  const termino = filtros.value.busqueda.trim().toLowerCase()

  return lotes.value.filter((lote) => {
    const coincideBusqueda =
      !termino ||
      lote.nombre.toLowerCase().includes(termino) ||
      lote.descripcion.toLowerCase().includes(termino)

    const coincideCategoria =
      filtros.value.categoria === 'todas' || lote.categoria === filtros.value.categoria

    const coincidePrecioCupoDesde =
      filtros.value.precioCupoDesde === null || lote.precioCupo >= filtros.value.precioCupoDesde

    const coincidePrecioCupoHasta =
      filtros.value.precioCupoHasta === null || lote.precioCupo <= filtros.value.precioCupoHasta

    const coincidePrecioMercadoDesde =
      filtros.value.precioMercadoDesde === null ||
      lote.precioMercado >= filtros.value.precioMercadoDesde

    const coincidePrecioMercadoHasta =
      filtros.value.precioMercadoHasta === null ||
      lote.precioMercado <= filtros.value.precioMercadoHasta

    return (
      coincideBusqueda &&
      coincideCategoria &&
      coincidePrecioCupoDesde &&
      coincidePrecioCupoHasta &&
      coincidePrecioMercadoDesde &&
      coincidePrecioMercadoHasta
    )
  })
})

function actualizarFiltros(nuevosFiltros: FiltrosLote): void {
  filtros.value = nuevosFiltros
}

function limpiarFiltros(): void {
  filtros.value = {
    busqueda: '',
    categoria: 'todas',
    precioCupoDesde: null,
    precioCupoHasta: null,
    precioMercadoDesde: null,
    precioMercadoHasta: null,
  }
}

function verDetalle(loteId: string): void {
  void router.push({
    name: 'lote-detalle',
    params: {
      id: loteId,
    },
  })
}

const categorias: Array<{
  valor: CategoriaLote | 'todas'
  etiqueta: string
}> = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'tecnologia', etiqueta: 'Tecnología' },
  { valor: 'hogar', etiqueta: 'Hogar' },
  { valor: 'indumentaria', etiqueta: 'Indumentaria' },
  { valor: 'movilidad', etiqueta: 'Movilidad' },
  { valor: 'servicios', etiqueta: 'Servicios' },
  { valor: 'otros', etiqueta: 'Otros' },
]

function seleccionarCategoria(categoria: CategoriaLote | 'todas'): void {
  actualizarFiltros({
    ...filtros.value,
    categoria,
  })
}

onMounted(() => {
  void obtenerLotes()
})
</script>

<template>
  <main class="min-h-screen bg-(--syner-background)">
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(53,169,162,0.14),transparent_62%)]"
      />

      <div
        class="relative mx-auto max-w-[1440px] px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14 lg:pt-20"
      >
        <div class="max-w-4xl">
          <div class="flex items-center gap-2 text-sm font-semibold text-(--syner-primary)">
            <Sparkles class="size-4" />
            Mercado SYNER
          </div>

          <h1
            class="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-(--syner-text) sm:text-5xl lg:text-6xl"
          >
            Encontrá algo que
            <span class="text-(--syner-primary)"> quieras hacer posible </span>
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-8 text-(--syner-text-muted) sm:text-lg">
            Explorá pools, descubrí oportunidades y sumate a compras que están creciendo junto a
            otras personas.
          </p>
        </div>
      </div>
    </section>

    <!-- Catalog exploration -->
    <div class="relative">
      <!-- Search + price filters -->
      <section class="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <LoteFiltros :filtros="filtros" @actualizar="actualizarFiltros" @limpiar="limpiarFiltros" />
      </section>

      <!-- Sticky category navigation -->
      <div
        class="sticky top-16 z-30 mx-auto mt-2 max-w-[1440px] bg-(--syner-background)/95 px-4 py-2 backdrop-blur-xl sm:px-6 lg:px-8"
      >
        <div
          class="rounded-(--syner-radius-xl) bg-(--syner-surface) px-3 py-2.5 shadow-(--syner-shadow-sm)"
        >
          <div class="flex items-center justify-between gap-4">
            <button
              v-if="filtros.categoria !== 'todas'"
              type="button"
              class="shrink-0 text-xs font-semibold text-(--syner-primary) transition hover:text-(--syner-primary-hover)"
              @click="seleccionarCategoria('todas')"
            >
              Todas
            </button>
          </div>

          <div class="mt-2 flex gap-1.5 overflow-x-auto pb-1">
            <button
              v-for="categoria in categorias"
              :key="categoria.valor"
              type="button"
              class="shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition"
              :class="
                filtros.categoria === categoria.valor
                  ? 'bg-(--syner-primary) text-white shadow-sm'
                  : 'text-(--syner-text-muted) hover:bg-(--syner-primary-soft) hover:text-(--syner-primary)'
              "
              @click="seleccionarCategoria(categoria.valor)"
            >
              {{ categoria.etiqueta }}
            </button>
          </div>
        </div>
      </div>

      <!-- Results -->
      <section class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div class="flex items-end justify-between gap-6">
          <div>
            <p class="text-[11px] font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
              Lo que está pasando ahora
            </p>

            <h2 class="mt-1 text-2xl font-bold tracking-tight text-(--syner-text) sm:text-3xl">
              {{ lotesFiltrados.length }}
              {{ lotesFiltrados.length === 1 ? 'oportunidad' : 'oportunidades' }}
            </h2>

            <p class="mt-2 text-sm text-(--syner-text-muted)">
              Encontrá una que te gustaría hacer posible.
            </p>
          </div>

          <button
            v-if="filtrosActivos"
            type="button"
            class="hidden items-center gap-1 text-sm font-semibold text-(--syner-primary) transition hover:text-(--syner-primary-hover) sm:flex"
            @click="limpiarFiltros"
          >
            Limpiar filtros
            <ArrowRight class="size-4 rotate-180" />
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="indice in 8"
            :key="indice"
            class="overflow-hidden rounded-(--syner-radius-lg) border border-(--syner-border) bg-(--syner-surface)"
          >
            <div class="aspect-[4/3] animate-pulse bg-(--syner-surface-muted)" />

            <div class="space-y-4 p-5">
              <div class="h-3 w-24 animate-pulse rounded-full bg-(--syner-surface-muted)" />

              <div class="h-6 w-4/5 animate-pulse rounded bg-(--syner-surface-muted)" />

              <div class="h-4 w-full animate-pulse rounded bg-(--syner-surface-muted)" />

              <div
                class="h-10 w-full animate-pulse rounded-(--syner-radius-md) bg-(--syner-surface-muted)"
              />
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          role="alert"
          class="mt-8 rounded-(--syner-radius-xl) border border-(--syner-danger)/20 bg-(--syner-danger-soft) p-6 text-sm text-(--syner-danger)"
        >
          {{ error }}
        </div>

        <!-- Results -->
        <template v-else>
          <div v-if="lotesFiltrados.length" class="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            <LoteCard
              v-for="lote in lotesFiltrados"
              :key="lote.id"
              :lote="lote"
              @ver-detalle="verDetalle"
            />
          </div>

          <div
            v-else
            class="mt-8 rounded-(--syner-radius-xl) border border-(--syner-border) bg-(--syner-surface) px-6 py-16 text-center"
          >
            <div
              class="mx-auto flex size-14 items-center justify-center rounded-full bg-(--syner-primary-soft) text-(--syner-primary)"
            >
              <Search class="size-6" />
            </div>

            <h3 class="mt-5 text-xl font-bold text-(--syner-text)">No encontramos ese pool</h3>

            <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-(--syner-text-muted)">
              Probá con otra búsqueda o ajustá los filtros para descubrir nuevas oportunidades.
            </p>

            <button
              type="button"
              class="mt-5 font-semibold text-(--syner-primary) hover:text-(--syner-primary-hover) hover:underline"
              @click="limpiarFiltros"
            >
              Mostrar todos los pools
            </button>
          </div>
        </template>
      </section>
    </div>
  </main>
</template>
