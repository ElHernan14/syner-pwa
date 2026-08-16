<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Input } from '@/components/ui/input'

import LoteCard from '../components/LoteCard.vue'
import { useLotes, type LoteCatalogo } from '../composables/useLotes'
import type { CategoriaLote } from '../models/lote.model'

import { useRouter } from 'vue-router'

const router = useRouter()

const { lotes, loading, error, obtenerLotes } = useLotes()

const busqueda = ref('')
const categoriaSeleccionada = ref<CategoriaLote | 'todas'>('todas')

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

const lotesFiltrados = computed<LoteCatalogo[]>(() => {
  const termino = busqueda.value.trim().toLowerCase()

  return lotes.value.filter((lote) => {
    const coincideBusqueda =
      !termino ||
      lote.nombre.toLowerCase().includes(termino) ||
      lote.descripcion.toLowerCase().includes(termino)

    const coincideCategoria =
      categoriaSeleccionada.value === 'todas' || lote.categoria === categoriaSeleccionada.value

    return coincideBusqueda && coincideCategoria
  })
})

function verDetalle(loteId: string): void {
  void router.push({
    name: 'lote-detalle',
    params: {
      id: loteId,
    },
  })
}

function limpiarFiltros(): void {
  busqueda.value = ''
  categoriaSeleccionada.value = 'todas'
}

onMounted(() => {
  void obtenerLotes()
})
</script>

<template>
  <main class="min-h-screen bg-(--syner-background)">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-(--syner-border)">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(22,143,232,0.12),transparent_62%)]"
      />

      <div class="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-bold tracking-[0.16em] text-(--syner-primary) uppercase">
            Mercado SYNER
          </p>

          <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-(--syner-text) sm:text-5xl">
            Descubrí oportunidades de compra colectiva
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-7 text-(--syner-text-muted) sm:text-lg">
            Sumate a lotes colectivos, alcanzá el objetivo junto a otros usuarios y accedé a
            productos y servicios con mejores condiciones.
          </p>
        </div>
      </div>
    </section>

    <!-- Catalog -->
    <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <!-- Filters -->
      <div class="space-y-4">
        <div class="max-w-xl">
          <label for="buscar-lote" class="mb-2 block text-sm font-semibold text-(--syner-text)">
            Buscar lotes
          </label>

          <Input
            id="buscar-lote"
            v-model="busqueda"
            type="search"
            placeholder="Buscá por nombre o descripción..."
            class="h-11 rounded-(--syner-radius-md) border-(--syner-border) bg-(--syner-surface) shadow-none placeholder:text-(--syner-text-subtle) focus-visible:border-(--syner-primary) focus-visible:ring-(--syner-primary-soft)"
          />
        </div>

        <div class="flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="categoria in categorias"
            :key="categoria.valor"
            type="button"
            class="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition"
            :class="
              categoriaSeleccionada === categoria.valor
                ? 'border-(--syner-primary) bg-(--syner-primary) text-white'
                : 'border-(--syner-border) bg-(--syner-surface) text-(--syner-text-muted) hover:bg-(--syner-surface-muted) hover:text-(--syner-text)'
            "
            @click="categoriaSeleccionada = categoria.valor"
          >
            {{ categoria.etiqueta }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="indice in 6"
          :key="indice"
          class="overflow-hidden rounded-(--syner-radius-lg) border border-(--syner-border) bg-(--syner-surface)"
        >
          <div class="aspect-[4/3] animate-pulse bg-(--syner-surface-muted)" />

          <div class="space-y-4 p-6">
            <div class="h-3 w-20 animate-pulse rounded-full bg-(--syner-surface-muted)" />

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
        class="mt-8 rounded-(--syner-radius-lg) border border-(--syner-danger)/20 bg-(--syner-danger-soft) p-6 text-sm text-(--syner-danger)"
      >
        {{ error }}
      </div>

      <!-- Results -->
      <template v-else>
        <div class="mt-8 flex items-center justify-between gap-4">
          <div>
            <p class="text-sm text-(--syner-text-muted)">
              {{ lotesFiltrados.length }}
              {{ lotesFiltrados.length === 1 ? 'lote disponible' : 'lotes disponibles' }}
            </p>
          </div>

          <button
            v-if="busqueda || categoriaSeleccionada !== 'todas'"
            type="button"
            class="text-sm font-semibold text-(--syner-primary) hover:text-(--syner-primary-hover) hover:underline"
            @click="limpiarFiltros"
          >
            Limpiar filtros
          </button>
        </div>

        <div v-if="lotesFiltrados.length" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <LoteCard
            v-for="lote in lotesFiltrados"
            :key="lote.id"
            :lote="lote"
            @ver-detalle="verDetalle"
          />
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="mt-8 rounded-(--syner-radius-lg) border border-(--syner-border) bg-(--syner-surface) px-6 py-14 text-center shadow-(--syner-shadow-sm)"
        >
          <h2 class="text-xl font-bold text-(--syner-text)">No encontramos lotes</h2>

          <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-(--syner-text-muted)">
            Probá con otra búsqueda o cambiá la categoría seleccionada.
          </p>

          <button
            type="button"
            class="mt-5 font-semibold text-(--syner-primary) hover:text-(--syner-primary-hover) hover:underline"
            @click="limpiarFiltros"
          >
            Mostrar todos los lotes
          </button>
        </div>
      </template>
    </section>
  </main>
</template>
