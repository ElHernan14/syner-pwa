<script setup lang="ts">
import { SlidersHorizontal } from 'lucide-vue-next'

import { Card, CardContent } from '@/components/ui/card'

import type { CategoriaLote } from '../models/lote.model'

export interface FiltrosLote {
  busqueda: string
  categoria: CategoriaLote | 'todas'
  precioCupoDesde: number | null
  precioCupoHasta: number | null
  precioMercadoDesde: number | null
  precioMercadoHasta: number | null
}

const props = defineProps<{
  filtros: FiltrosLote
}>()

const emit = defineEmits<{
  actualizar: [filtros: FiltrosLote]
  limpiar: []
}>()

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

const opcionesPrecio = [
  { valor: 250000, etiqueta: '$250 mil' },
  { valor: 500000, etiqueta: '$500 mil' },
  { valor: 750000, etiqueta: '$750 mil' },
  { valor: 1000000, etiqueta: '$1 millón' },
  { valor: 1500000, etiqueta: '$1,5 M' },
  { valor: 2500000, etiqueta: '$2,5 M' },
  { valor: 4000000, etiqueta: '$4 M' },
]

function seleccionarCategoria(categoria: CategoriaLote | 'todas'): void {
  emit('actualizar', {
    ...props.filtros,
    categoria,
  })
}

function actualizarPrecio(
  campo: 'precioCupoDesde' | 'precioCupoHasta' | 'precioMercadoDesde' | 'precioMercadoHasta',
  valor: string,
): void {
  emit('actualizar', {
    ...props.filtros,
    [campo]: valor ? Number(valor) : null,
  })
}

function limpiar(): void {
  emit('limpiar')
}
</script>

<template>
  <Card
    class="rounded-(--syner-radius-xl) border-(--syner-border) bg-(--syner-surface)/95 shadow-(--syner-shadow-sm) backdrop-blur"
  >
    <CardContent class="p-4 sm:p-5">
      <!-- Heading -->
      <div class="flex items-start gap-3">
        <div
          class="flex size-9 shrink-0 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary-soft) text-(--syner-primary)"
        >
          <SlidersHorizontal class="size-4" />
        </div>

        <div>
          <p class="text-sm font-bold text-(--syner-text)">Explorá los lotes</p>

          <p class="mt-0.5 text-xs text-(--syner-text-muted)">
            Ajustá la búsqueda a lo que estás buscando.
          </p>
        </div>
      </div>

      <!-- Categories -->
      <div class="mt-5">
        <p
          class="mb-2 text-[11px] font-bold tracking-[0.12em] text-(--syner-text-subtle) uppercase"
        >
          Categoría
        </p>

        <div class="flex gap-1.5 overflow-x-auto pb-1">
          <button
            v-for="categoria in categorias"
            :key="categoria.valor"
            type="button"
            class="shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition"
            :class="
              props.filtros.categoria === categoria.valor
                ? 'bg-(--syner-primary) text-white shadow-sm'
                : 'text-(--syner-text-muted) hover:bg-(--syner-primary-soft) hover:text-(--syner-primary)'
            "
            @click="seleccionarCategoria(categoria.valor)"
          >
            {{ categoria.etiqueta }}
          </button>
        </div>
      </div>

      <!-- Price ranges -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <!-- Cup price -->
        <div>
          <div class="mb-2">
            <p class="text-sm font-semibold text-(--syner-text)">Precio por cupo</p>

            <p class="mt-0.5 text-xs text-(--syner-text-muted)">El valor de tu participación.</p>
          </div>

          <div
            class="grid grid-cols-[1fr_auto_1fr] overflow-hidden rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface)"
          >
            <select
              :value="props.filtros.precioCupoDesde ?? ''"
              class="min-w-0 bg-transparent px-3 py-3 text-sm font-semibold text-(--syner-text) outline-none transition hover:bg-(--syner-surface-muted) focus:bg-(--syner-primary-soft) focus:text-(--syner-primary)"
              @change="
                actualizarPrecio(
                  'precioCupoDesde',
                  ($event.target as HTMLSelectElement | null)?.value ?? '',
                )
              "
            >
              <option value="">Desde</option>

              <option
                v-for="opcion in opcionesPrecio.filter(
                  (opcion) =>
                    props.filtros.precioCupoHasta === null ||
                    opcion.valor <= props.filtros.precioCupoHasta,
                )"
                :key="`cupo-desde-${opcion.valor}`"
                :value="opcion.valor"
              >
                {{ opcion.etiqueta }}
              </option>
            </select>

            <div
              class="flex items-center border-x border-(--syner-border) px-2 text-xs font-semibold text-(--syner-text-subtle)"
            >
              —
            </div>

            <select
              :value="props.filtros.precioCupoHasta ?? ''"
              class="min-w-0 bg-transparent px-3 py-3 text-sm font-semibold text-(--syner-text) outline-none transition hover:bg-(--syner-surface-muted) focus:bg-(--syner-primary-soft) focus:text-(--syner-primary)"
              @change="
                actualizarPrecio(
                  'precioCupoHasta',
                  ($event.target as HTMLSelectElement | null)?.value ?? '',
                )
              "
            >
              <option value="">Hasta</option>

              <option
                v-for="opcion in opcionesPrecio.filter(
                  (opcion) =>
                    props.filtros.precioCupoDesde === null ||
                    opcion.valor >= props.filtros.precioCupoDesde,
                )"
                :key="`cupo-hasta-${opcion.valor}`"
                :value="opcion.valor"
              >
                {{ opcion.etiqueta }}
              </option>
            </select>
          </div>
        </div>

        <!-- Market price -->
        <div>
          <div class="mb-2">
            <p class="text-sm font-semibold text-(--syner-text)">Precio de mercado</p>

            <p class="mt-0.5 text-xs text-(--syner-text-muted)">
              Comparalo con el precio habitual.
            </p>
          </div>

          <div
            class="grid grid-cols-[1fr_auto_1fr] overflow-hidden rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface)"
          >
            <select
              :value="props.filtros.precioMercadoDesde ?? ''"
              class="min-w-0 bg-transparent px-3 py-3 text-sm font-semibold text-(--syner-text) outline-none transition hover:bg-(--syner-surface-muted) focus:bg-(--syner-primary-soft) focus:text-(--syner-primary)"
              @change="
                actualizarPrecio(
                  'precioMercadoDesde',
                  ($event.target as HTMLSelectElement | null)?.value ?? '',
                )
              "
            >
              <option value="">Desde</option>

              <option
                v-for="opcion in opcionesPrecio.filter(
                  (opcion) =>
                    props.filtros.precioMercadoHasta === null ||
                    opcion.valor <= props.filtros.precioMercadoHasta,
                )"
                :key="`mercado-desde-${opcion.valor}`"
                :value="opcion.valor"
              >
                {{ opcion.etiqueta }}
              </option>
            </select>

            <div
              class="flex items-center border-x border-(--syner-border) px-2 text-xs font-semibold text-(--syner-text-subtle)"
            >
              —
            </div>

            <select
              :value="props.filtros.precioMercadoHasta ?? ''"
              class="min-w-0 bg-transparent px-3 py-3 text-sm font-semibold text-(--syner-text) outline-none transition hover:bg-(--syner-surface-muted) focus:bg-(--syner-primary-soft) focus:text-(--syner-primary)"
              @change="
                actualizarPrecio(
                  'precioMercadoHasta',
                  ($event.target as HTMLSelectElement | null)?.value ?? '',
                )
              "
            >
              <option value="">Hasta</option>

              <option
                v-for="opcion in opcionesPrecio.filter(
                  (opcion) =>
                    props.filtros.precioMercadoDesde === null ||
                    opcion.valor >= props.filtros.precioMercadoDesde,
                )"
                :key="`mercado-hasta-${opcion.valor}`"
                :value="opcion.valor"
              >
                {{ opcion.etiqueta }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Clear -->
      <div
        v-if="
          props.filtros.categoria !== 'todas' ||
          props.filtros.precioCupoDesde !== null ||
          props.filtros.precioCupoHasta !== null ||
          props.filtros.precioMercadoDesde !== null ||
          props.filtros.precioMercadoHasta !== null
        "
        class="mt-5 flex justify-end"
      >
        <button
          type="button"
          class="text-xs font-semibold text-(--syner-text-muted) transition hover:text-(--syner-primary)"
          @click="limpiar"
        >
          Restablecer filtros
        </button>
      </div>
    </CardContent>
  </Card>
</template>
