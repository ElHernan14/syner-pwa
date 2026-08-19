<script setup lang="ts">
import { Search, SlidersHorizontal } from 'lucide-vue-next'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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

interface RangoPrecio {
  desde: number | null
  hasta: number | null
  etiqueta: string
}

const rangosPrecio: RangoPrecio[] = [
  {
    desde: null,
    hasta: 100000,
    etiqueta: 'Hasta $100 mil',
  },
  {
    desde: 100000,
    hasta: 250000,
    etiqueta: '$100 – $250 mil',
  },
  {
    desde: 250000,
    hasta: 500000,
    etiqueta: '$250 – $500 mil',
  },
  {
    desde: 500000,
    hasta: 750000,
    etiqueta: '$500 – $750 mil',
  },
  {
    desde: 750000,
    hasta: 1000000,
    etiqueta: '$750 mil – $1 M',
  },
  {
    desde: 1000000,
    hasta: 1500000,
    etiqueta: '$1 – $1,5 M',
  },
  {
    desde: 1500000,
    hasta: 2500000,
    etiqueta: '$1,5 – $2,5 M',
  },
  {
    desde: 2500000,
    hasta: 4000000,
    etiqueta: '$2,5 – $4 M',
  },
  {
    desde: 4000000,
    hasta: null,
    etiqueta: '$4 M+',
  },
]

function actualizarCampo(campo: keyof FiltrosLote, valor: string): void {
  emit('actualizar', {
    ...props.filtros,
    [campo]: campo === 'busqueda' || campo === 'categoria' ? valor : valor ? Number(valor) : null,
  } as FiltrosLote)
}

function seleccionarRango(tipo: 'cupo' | 'mercado', rango: RangoPrecio): void {
  emit('actualizar', {
    ...props.filtros,
    ...(tipo === 'cupo'
      ? {
          precioCupoDesde: rango.desde,
          precioCupoHasta: rango.hasta,
        }
      : {
          precioMercadoDesde: rango.desde,
          precioMercadoHasta: rango.hasta,
        }),
  })
}

function buscar(): void {
  emit('actualizar', {
    ...props.filtros,
  })
}

function limpiar(): void {
  emit('limpiar')
}

function rangoSeleccionado(tipo: 'cupo' | 'mercado'): RangoPrecio | undefined {
  const desde = tipo === 'cupo' ? props.filtros.precioCupoDesde : props.filtros.precioMercadoDesde

  const hasta = tipo === 'cupo' ? props.filtros.precioCupoHasta : props.filtros.precioMercadoHasta

  return rangosPrecio.find((rango) => rango.desde === desde && rango.hasta === hasta)
}
</script>

<template>
  <Card class="rounded-(--syner-radius-xl) border-0 bg-transparent shadow-none">
    <CardContent class="px-0 pb-1 pt-1 sm:pt-2">
      <!-- Search + filters -->
      <div
        class="grid gap-5 lg:grid-cols-[minmax(320px,1fr)_minmax(200px,208px)_minmax(200px,208px)] lg:items-end"
      >
        <!-- Search -->
        <div class="min-w-0">
          <div class="mb-2 flex items-center gap-2">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-primary-soft) text-(--syner-primary)"
            >
              <SlidersHorizontal class="size-4" />
            </div>

            <div>
              <p class="text-sm font-bold text-(--syner-text)">Encontrá tu próximo pool</p>

              <p class="mt-0.5 text-xs text-(--syner-text-muted)">
                Explorá según lo que querés conseguir.
              </p>
            </div>
          </div>

          <div class="relative flex gap-2">
            <div class="relative min-w-0 flex-1">
              <Search
                class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-(--syner-text-subtle)"
              />

              <Input
                id="busqueda-lotes"
                :model-value="props.filtros.busqueda"
                type="search"
                placeholder="¿Qué te gustaría conseguir?"
                class="h-11 rounded-(--syner-radius-md) border-(--syner-border) bg-(--syner-surface) pl-10 pr-4 text-sm shadow-none placeholder:text-(--syner-text-subtle) focus-visible:border-(--syner-primary) focus-visible:ring-(--syner-primary-soft)"
                @update:model-value="actualizarCampo('busqueda', String($event))"
                @keyup.enter="buscar"
              />
            </div>

            <!-- Mobile search -->
            <button
              type="button"
              class="flex h-11 shrink-0 items-center justify-center gap-2 rounded-(--syner-radius-md) bg-(--syner-primary) px-4 text-sm font-bold text-white shadow-sm transition hover:bg-(--syner-primary-hover) lg:hidden"
              @click="buscar"
            >
              <Search class="size-4" />
              <span class="hidden xs:inline">Buscar</span>
            </button>
          </div>
        </div>

        <!-- Cup price -->
        <div class="w-full lg:w-52">
          <p class="mb-2 text-xs font-semibold text-(--syner-text-muted)">Precio por cupo</p>

          <select
            :value="
              rangoSeleccionado('cupo')
                ? `${rangoSeleccionado('cupo')?.desde ?? ''}-${rangoSeleccionado('cupo')?.hasta ?? ''}`
                : ''
            "
            aria-label="Rango de precio por cupo"
            class="h-11 w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-3 text-sm font-semibold text-(--syner-text) outline-none transition hover:bg-(--syner-surface) focus:border-(--syner-primary) focus:bg-(--syner-surface) focus:ring-2 focus:ring-(--syner-primary-soft)"
            @change="
              (() => {
                const value = ($event.target as HTMLSelectElement).value
                const rango = rangosPrecio.find(
                  (item) => `${item.desde ?? ''}-${item.hasta ?? ''}` === value,
                )

                if (rango) seleccionarRango('cupo', rango)
                else seleccionarRango('cupo', { desde: null, hasta: null, etiqueta: '' })
              })()
            "
          >
            <option value="">Cualquier precio</option>

            <option
              v-for="rango in rangosPrecio"
              :key="`cupo-${rango.etiqueta}`"
              :value="`${rango.desde ?? ''}-${rango.hasta ?? ''}`"
            >
              {{ rango.etiqueta }}
            </option>
          </select>
        </div>

        <!-- Market price -->
        <div class="w-full lg:w-52">
          <p class="mb-2 text-xs font-semibold text-(--syner-text-muted)">Precio de mercado</p>

          <select
            :value="
              rangoSeleccionado('mercado')
                ? `${rangoSeleccionado('mercado')?.desde ?? ''}-${rangoSeleccionado('mercado')?.hasta ?? ''}`
                : ''
            "
            aria-label="Rango de precio de mercado"
            class="h-11 w-full rounded-(--syner-radius-md) border border-(--syner-border) bg-(--syner-surface) px-3 text-sm font-semibold text-(--syner-text) outline-none transition hover:bg-(--syner-surface) focus:border-(--syner-primary) focus:bg-(--syner-surface) focus:ring-2 focus:ring-(--syner-primary-soft)"
            @change="
              (() => {
                const value = ($event.target as HTMLSelectElement).value
                const rango = rangosPrecio.find(
                  (item) => `${item.desde ?? ''}-${item.hasta ?? ''}` === value,
                )

                if (rango) seleccionarRango('mercado', rango)
                else
                  seleccionarRango('mercado', {
                    desde: null,
                    hasta: null,
                    etiqueta: '',
                  })
              })()
            "
          >
            <option value="">Cualquier precio</option>

            <option
              v-for="rango in rangosPrecio"
              :key="`mercado-${rango.etiqueta}`"
              :value="`${rango.desde ?? ''}-${rango.hasta ?? ''}`"
            >
              {{ rango.etiqueta }}
            </option>
          </select>
        </div>
      </div>

      <!-- Reset -->
      <div
        v-if="
          props.filtros.busqueda.trim() !== '' ||
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
          Restablecer búsqueda y filtros
        </button>
      </div>
    </CardContent>
  </Card>
</template>
