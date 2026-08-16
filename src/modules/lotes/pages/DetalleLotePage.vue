<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, CalendarDays, Clock3, Users } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import { useLotes } from '../composables/useLotes'

const route = useRoute()
const router = useRouter()

const { lote, loading, error, obtenerLotePorId } = useLotes()

const loteId = computed(() => String(route.params.id))

function volverAlCatalogo(): void {
  void router.push({ name: 'lotes' })
}

function reservarCupo(): void {
  // Esta acción se implementará en el siguiente incremento.
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

onMounted(() => {
  void obtenerLotePorId(loteId.value)
})
</script>

<template>
  <main class="min-h-screen bg-(--syner-background)">
    <!-- Loading -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="mb-6 h-5 w-32 animate-pulse rounded bg-(--syner-surface-muted)" />

      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
        <div
          class="aspect-[4/3] animate-pulse rounded-(--syner-radius-xl) bg-(--syner-surface-muted)"
        />

        <div class="space-y-5">
          <div class="h-5 w-24 animate-pulse rounded bg-(--syner-surface-muted)" />
          <div class="h-10 w-4/5 animate-pulse rounded bg-(--syner-surface-muted)" />
          <div class="h-24 animate-pulse rounded bg-(--syner-surface-muted)" />
          <div class="h-12 animate-pulse rounded-(--syner-radius-md) bg-(--syner-surface-muted)" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <section
      v-else-if="error"
      class="mx-auto flex min-h-screen max-w-xl items-center px-4 py-12 text-center"
    >
      <div
        class="w-full rounded-(--syner-radius-xl) border border-(--syner-border) bg-(--syner-surface) p-8 shadow-(--syner-shadow-card)"
      >
        <h1 class="text-2xl font-bold text-(--syner-text)">No pudimos cargar el lote</h1>

        <p class="mt-3 text-sm leading-6 text-(--syner-text-muted)">
          {{ error }}
        </p>

        <Button
          type="button"
          class="mt-6 rounded-(--syner-radius-md) bg-(--syner-primary) text-white hover:bg-(--syner-primary-hover)"
          @click="volverAlCatalogo"
        >
          Volver al catálogo
        </Button>
      </div>
    </section>

    <!-- Detail -->
    <template v-else-if="lote">
      <!-- Breadcrumb / Back -->
      <div class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="ghost"
          class="gap-2 px-2 text-(--syner-text-muted) hover:bg-transparent hover:text-(--syner-text)"
          @click="volverAlCatalogo"
        >
          <ArrowLeft class="size-4" />
          Volver al catálogo
        </Button>
      </div>

      <section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <!-- Image -->
          <div
            class="relative overflow-hidden rounded-(--syner-radius-xl) border border-(--syner-border) bg-(--syner-surface) shadow-(--syner-shadow-card)"
          >
            <div class="aspect-[4/3] bg-(--syner-surface-muted)">
              <img :src="lote.imagen" :alt="lote.nombre" class="size-full object-cover" />
            </div>

            <div class="absolute left-4 top-4 flex flex-wrap gap-2">
              <Badge
                class="border-0 bg-(--syner-surface)/95 text-(--syner-text) shadow-sm backdrop-blur"
              >
                {{ lote.estado }}
              </Badge>

              <Badge class="border-0 bg-(--syner-primary) text-white shadow-sm">
                Ahorro {{ lote.porcentajeAhorro }}%
              </Badge>
            </div>
          </div>

          <!-- Main information -->
          <div>
            <p class="text-sm font-bold tracking-[0.14em] text-(--syner-primary) uppercase">
              {{ lote.categoria }}
            </p>

            <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-(--syner-text) sm:text-4xl">
              {{ lote.nombre }}
            </h1>

            <p class="mt-5 text-base leading-7 text-(--syner-text-muted)">
              {{ lote.descripcion }}
            </p>

            <!-- Price -->
            <Card
              class="mt-6 rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface)"
            >
              <CardContent class="p-5 sm:p-6">
                <p class="text-sm text-(--syner-text-muted)">Precio por cupo</p>

                <p class="mt-1 text-3xl font-extrabold tracking-tight text-(--syner-text)">
                  {{ formatearPrecio(lote.precioCupo) }}
                </p>

                <p class="mt-2 text-sm text-(--syner-text-muted)">
                  Precio de mercado:
                  <span class="line-through">
                    {{ formatearPrecio(lote.precioMercado) }}
                  </span>
                </p>
              </CardContent>
            </Card>

            <!-- Funding -->
            <Card
              class="mt-4 rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface)"
            >
              <CardContent class="p-5 sm:p-6">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-(--syner-text)">Fondeo del lote</p>

                    <p class="mt-1 text-sm text-(--syner-text-muted)">
                      {{ lote.cuposOcupados }} de {{ lote.cantidadCupos }} cupos ocupados
                    </p>
                  </div>

                  <span class="text-lg font-bold text-(--syner-primary)">
                    {{ lote.porcentajeFondeo }}%
                  </span>
                </div>

                <Progress
                  :model-value="lote.porcentajeFondeo"
                  class="mt-4 h-3 bg-(--syner-surface-muted)"
                />

                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                  <div class="flex items-center gap-2 text-sm text-(--syner-text-muted)">
                    <Users class="size-4 shrink-0" />
                    {{ lote.cuposDisponibles }} cupos disponibles
                  </div>

                  <div class="flex items-center gap-2 text-sm text-(--syner-text-muted)">
                    <Clock3 class="size-4 shrink-0" />
                    {{ lote.diasRestantes }} días restantes
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Dates -->
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div class="flex gap-3">
                <CalendarDays class="mt-0.5 size-4 shrink-0 text-(--syner-primary)" />

                <div>
                  <p class="text-xs text-(--syner-text-subtle)">Inicio</p>

                  <p class="mt-1 text-sm font-semibold text-(--syner-text)">
                    {{ formatearFecha(lote.fechaInicio) }}
                  </p>
                </div>
              </div>

              <div class="flex gap-3">
                <CalendarDays class="mt-0.5 size-4 shrink-0 text-(--syner-primary)" />

                <div>
                  <p class="text-xs text-(--syner-text-subtle)">Finalización</p>

                  <p class="mt-1 text-sm font-semibold text-(--syner-text)">
                    {{ formatearFecha(lote.fechaFin) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <Button
              type="button"
              size="lg"
              class="mt-7 h-12 w-full rounded-(--syner-radius-md) bg-(--syner-primary) font-bold text-white shadow-lg shadow-(--syner-primary)/20 hover:bg-(--syner-primary-hover)"
              :disabled="lote.estado !== 'fondeando' || lote.cuposDisponibles === 0"
              @click="reservarCupo"
            >
              {{
                lote.cuposDisponibles === 0
                  ? 'Lote completo'
                  : lote.estado !== 'fondeando'
                    ? 'Lote no disponible'
                    : 'Reservar mi cupo'
              }}
            </Button>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
