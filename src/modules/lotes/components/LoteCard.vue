<script setup lang="ts">
import { ArrowRight, Clock3, TrendingDown, Users } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import type { LoteCatalogo } from '../composables/useLotes'

defineProps<{
  lote: LoteCatalogo
}>()

const emit = defineEmits<{
  verDetalle: [loteId: string]
}>()

function obtenerTextoEstado(estado: LoteCatalogo['estado']): string {
  const estados: Record<LoteCatalogo['estado'], string> = {
    borrador: 'Borrador',
    fondeando: 'Fondeando',
    completado: 'Completado',
    comprado: 'Comprado',
    enviado: 'Enviado',
    entregado: 'Entregado',
    cancelado: 'Cancelado',
  }

  return estados[estado]
}

function obtenerVarianteEstado(
  estado: LoteCatalogo['estado'],
): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (estado) {
    case 'fondeando':
      return 'default'

    case 'completado':
    case 'comprado':
    case 'enviado':
    case 'entregado':
      return 'secondary'

    case 'cancelado':
      return 'destructive'

    default:
      return 'outline'
  }
}

function formatearPrecio(valor: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor)
}
</script>

<template>
  <Card
    class="group relative flex h-full flex-col overflow-hidden rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface) py-0 shadow-(--syner-shadow-sm) transition-all duration-300 hover:-translate-y-1.5 hover:border-(--syner-primary)/30 hover:shadow-(--syner-shadow-card)"
  >
    <!-- Imagen -->
    <div class="relative aspect-[4/3] overflow-hidden bg-(--syner-surface-muted)">
      <img
        :src="lote.imagen"
        :alt="lote.nombre"
        class="size-full object-cover transition duration-500 group-hover:scale-[1.05]"
        loading="lazy"
      />

      <!-- Velo inferior para legibilidad -->
      <div
        aria-hidden="true"
        class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent"
      />

      <div class="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5">
        <Badge
          :variant="obtenerVarianteEstado(lote.estado)"
          class="border-0 bg-(--syner-surface)/90 text-(--syner-text) shadow-sm backdrop-blur-md"
        >
          <span
            v-if="lote.estado === 'fondeando'"
            class="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-(--syner-primary)"
          />
          {{ obtenerTextoEstado(lote.estado) }}
        </Badge>

        <Badge
          class="gap-1 border-0 bg-(--syner-primary) text-white shadow-md shadow-(--syner-primary)/25"
        >
          <TrendingDown class="size-3.5" />
          Ahorro {{ lote.porcentajeAhorro }}%
        </Badge>
      </div>
    </div>

    <CardContent class="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
      <!-- Categoría -->
      <p class="text-[0.7rem] font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
        {{ lote.categoria }}
      </p>

      <!-- Nombre -->
      <h2
        class="mt-2 line-clamp-2 min-h-12 text-lg font-extrabold tracking-tight text-balance text-(--syner-text) sm:text-xl"
      >
        {{ lote.nombre }}
      </h2>

      <!-- Descripción -->
      <p class="mt-2.5 line-clamp-2 text-sm leading-6 text-(--syner-text-muted)">
        {{ lote.descripcion }}
      </p>

      <!-- Precio -->
      <div
        class="mt-5 rounded-(--syner-radius-md) border border-(--syner-border)/70 bg-(--syner-surface-muted)/40 p-4"
      >
        <div class="flex items-end justify-between gap-3">
          <div>
            <p
              class="text-[0.7rem] font-semibold tracking-wide text-(--syner-text-subtle) uppercase"
            >
              Precio por cupo
            </p>

            <p class="mt-1 text-2xl font-extrabold tracking-tight text-(--syner-text)">
              {{ formatearPrecio(lote.precioCupo) }}
            </p>
          </div>

          <div class="pb-1 text-right">
            <p class="text-[0.7rem] text-(--syner-text-subtle)">Mercado</p>

            <p class="text-sm font-semibold text-(--syner-text-muted) line-through">
              {{ formatearPrecio(lote.precioMercado) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Fondeo -->
      <div class="mt-6">
        <div class="mb-2 flex items-center justify-between gap-3">
          <span class="text-sm font-semibold text-(--syner-text)">Fondeo del lote</span>

          <span class="text-sm font-extrabold text-(--syner-primary)">
            {{ lote.porcentajeFondeo }}%
          </span>
        </div>

        <Progress :model-value="lote.porcentajeFondeo" class="h-2.5 bg-(--syner-surface-muted)" />

        <div class="mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="indice in lote.cantidadCupos"
            :key="indice"
            class="h-2 flex-1 rounded-full transition-colors"
            :class="
              indice <= lote.cuposOcupados ? 'bg-(--syner-primary)' : 'bg-(--syner-surface-muted)'
            "
            :aria-label="
              indice <= lote.cuposOcupados ? `Cupo ${indice} ocupado` : `Cupo ${indice} disponible`
            "
          />
        </div>

        <div class="mt-3 flex items-center justify-between gap-3 text-xs text-(--syner-text-muted)">
          <span class="inline-flex items-center gap-1.5 font-medium">
            <Users class="size-3.5" />
            {{ lote.cuposOcupados }}/{{ lote.cantidadCupos }} cupos
          </span>

          <span v-if="lote.cuposDisponibles > 0" class="font-semibold text-(--syner-success)">
            {{ lote.cuposDisponibles }} disponibles
          </span>

          <span v-else class="font-semibold text-(--syner-danger)">Sin cupos</span>
        </div>
      </div>

      <!-- Vigencia -->
      <div
        v-if="lote.estado === 'fondeando'"
        class="mt-4 flex items-center gap-2 text-sm text-(--syner-text-muted)"
      >
        <Clock3 class="size-4 shrink-0 text-(--syner-warning)" />

        <span
          ><span class="font-semibold text-(--syner-text)">{{ lote.diasRestantes }}</span> días
          restantes</span
        >
      </div>

      <div class="flex-1" />

      <!-- Acción -->
      <Button
        type="button"
        class="mt-6 w-full gap-2 rounded-(--syner-radius-md) bg-(--syner-primary) font-bold text-white shadow-sm transition-all hover:bg-(--syner-primary-hover) hover:shadow-md group-hover:gap-3"
        @click="emit('verDetalle', lote.id)"
      >
        Ver lote
        <ArrowRight class="size-4 transition-transform" />
      </Button>
    </CardContent>
  </Card>
</template>
