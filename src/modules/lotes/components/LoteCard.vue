<script setup lang="ts">
import { ArrowRight, Clock3, Users } from 'lucide-vue-next'

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
    class="group flex h-full overflow-hidden rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface) py-0 shadow-(--syner-shadow-sm) transition duration-200 hover:-translate-y-1 hover:shadow-(--syner-shadow-card)"
  >
    <!-- Imagen -->
    <div class="relative aspect-[4/3] overflow-hidden bg-(--syner-surface-muted)">
      <img
        :src="lote.imagen"
        :alt="lote.nombre"
        class="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />

      <div class="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <Badge
          :variant="obtenerVarianteEstado(lote.estado)"
          class="border-0 bg-(--syner-surface)/95 text-(--syner-text) shadow-sm backdrop-blur"
        >
          {{ obtenerTextoEstado(lote.estado) }}
        </Badge>

        <Badge class="border-0 bg-(--syner-primary) text-white shadow-sm">
          Ahorro {{ lote.porcentajeAhorro }}%
        </Badge>
      </div>
    </div>

    <CardContent class="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
      <!-- Categoría -->
      <p class="text-xs font-bold tracking-[0.12em] text-(--syner-primary) uppercase">
        {{ lote.categoria }}
      </p>

      <!-- Nombre -->
      <h2
        class="mt-2 line-clamp-2 min-h-12 text-lg font-bold tracking-tight text-(--syner-text) sm:text-xl"
      >
        {{ lote.nombre }}
      </h2>

      <!-- Descripción -->
      <p class="mt-3 line-clamp-2 text-sm leading-6 text-(--syner-text-muted)">
        {{ lote.descripcion }}
      </p>

      <!-- Precio -->
      <div class="mt-5">
        <p class="text-xs text-(--syner-text-subtle)">Precio por cupo</p>

        <p class="mt-1 text-2xl font-extrabold tracking-tight text-(--syner-text)">
          {{ formatearPrecio(lote.precioCupo) }}
        </p>

        <p class="mt-1 text-xs text-(--syner-text-muted)">
          Precio de mercado:
          <span class="line-through">
            {{ formatearPrecio(lote.precioMercado) }}
          </span>
        </p>
      </div>

      <!-- Fondeo -->
      <div class="mt-6">
        <div class="mb-2 flex items-center justify-between gap-3">
          <span class="text-sm font-semibold text-(--syner-text)"> Fondeo del lote </span>

          <span class="text-sm font-bold text-(--syner-primary)">
            {{ lote.porcentajeFondeo }}%
          </span>
        </div>

        <Progress :model-value="lote.porcentajeFondeo" class="h-2.5 bg-(--syner-surface-muted)" />

        <div class="mt-2 flex items-center justify-between gap-3 text-xs text-(--syner-text-muted)">
          <span class="inline-flex items-center gap-1.5">
            <Users class="size-3.5" />
            {{ lote.cuposOcupados }}/{{ lote.cantidadCupos }} cupos
          </span>

          <span v-if="lote.cuposDisponibles > 0"> {{ lote.cuposDisponibles }} disponibles </span>

          <span v-else class="font-semibold text-(--syner-danger)"> Sin cupos </span>
        </div>
      </div>

      <!-- Vigencia -->
      <div
        v-if="lote.estado === 'fondeando'"
        class="mt-5 flex items-center gap-2 text-sm text-(--syner-text-muted)"
      >
        <Clock3 class="size-4 shrink-0" />

        <span> {{ lote.diasRestantes }} días restantes </span>
      </div>

      <div class="flex-1" />

      <!-- Acción -->
      <Button
        type="button"
        class="mt-6 w-full rounded-(--syner-radius-md) bg-(--syner-primary) font-bold text-white shadow-sm hover:bg-(--syner-primary-hover)"
        @click="emit('verDetalle', lote.id)"
      >
        Ver lote

        <ArrowRight class="size-4" />
      </Button>
    </CardContent>
  </Card>
</template>
