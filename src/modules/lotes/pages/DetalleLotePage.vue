<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ArrowLeft, Check, Clock3 } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
  <main class="min-h-screen bg-(--syner-background)">
    <!-- Loading -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="mb-6 h-5 w-32 animate-pulse rounded bg-(--syner-surface-muted)" />

      <div class="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div
          class="aspect-[4/3] animate-pulse rounded-(--syner-radius-xl) bg-(--syner-surface-muted)"
        />

        <div class="space-y-4">
          <div class="h-6 w-28 animate-pulse rounded bg-(--syner-surface-muted)" />
          <div class="h-10 w-4/5 animate-pulse rounded bg-(--syner-surface-muted)" />
          <div class="h-28 animate-pulse rounded-(--syner-radius-lg) bg-(--syner-surface-muted)" />
          <div class="h-28 animate-pulse rounded-(--syner-radius-lg) bg-(--syner-surface-muted)" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <section
      v-else-if="error"
      class="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-12 text-center"
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

    <template v-else-if="lote">
      <!-- Back -->
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

      <section class="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <!-- =========================
             HERO BENTO
        ========================== -->

        <div class="grid gap-4 lg:grid-cols-[1.45fr_0.55fr]">
          <!-- Main image -->
          <div
            class="relative min-h-[320px] overflow-hidden rounded-(--syner-radius-xl) border border-(--syner-border) bg-(--syner-surface) shadow-(--syner-shadow-card) sm:min-h-[440px]"
          >
            <img :src="lote.imagen" :alt="lote.nombre" class="size-full object-cover" />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            />

            <div class="absolute left-5 top-5 flex flex-wrap gap-2">
              <Badge
                class="border-0 bg-(--syner-surface)/90 text-(--syner-text) shadow-sm backdrop-blur"
              >
                {{ obtenerTextoEstado(lote.estado) }}
              </Badge>

              <Badge class="border-0 bg-(--syner-primary) text-white shadow-sm">
                Ahorro {{ lote.porcentajeAhorro }}%
              </Badge>
            </div>

            <div class="absolute bottom-5 left-5 right-5">
              <p class="text-sm font-semibold tracking-[0.12em] text-white/80 uppercase">
                {{ lote.categoria }}
              </p>

              <h1
                class="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                {{ lote.nombre }}
              </h1>
            </div>
          </div>

          <!-- Bento stats -->
          <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <Card
              class="rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface) shadow-(--syner-shadow-sm)"
            >
              <CardContent class="flex h-full flex-col justify-between p-5">
                <p class="text-sm text-(--syner-text-muted)">Precio por cupo</p>

                <div class="mt-4">
                  <p class="text-3xl font-extrabold tracking-tight text-(--syner-text)">
                    {{ formatearPrecio(lote.precioCupo) }}
                  </p>

                  <p class="mt-1 text-xs text-(--syner-text-muted)">
                    Mercado:
                    <span class="line-through">
                      {{ formatearPrecio(lote.precioMercado) }}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              class="rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-primary-soft) shadow-none"
            >
              <CardContent class="flex h-full flex-col justify-between p-5">
                <p class="text-sm font-semibold text-(--syner-primary)">Tu ahorro potencial</p>

                <div class="mt-4">
                  <p class="text-4xl font-extrabold tracking-tight text-(--syner-primary)">
                    {{ lote.porcentajeAhorro }}%
                  </p>

                  <p class="mt-1 text-sm text-(--syner-text-muted)">frente al precio de mercado</p>
                </div>
              </CardContent>
            </Card>

            <Card
              class="rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface) shadow-(--syner-shadow-sm)"
            >
              <CardContent class="flex h-full flex-col justify-between p-5">
                <p class="text-sm text-(--syner-text-muted)">Vigencia</p>

                <div class="mt-4 flex items-center gap-3">
                  <div
                    class="flex size-10 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-forest-soft) text-(--syner-forest)"
                  >
                    <Clock3 class="size-5" />
                  </div>

                  <div>
                    <p class="text-xl font-bold text-(--syner-text)">
                      {{ lote.diasRestantes }}
                    </p>

                    <p class="text-xs text-(--syner-text-muted)">días restantes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- =========================
             DESCRIPTION + FUNDING
        ========================== -->

        <div class="mt-4 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
          <!-- Description -->
          <Card class="rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface)">
            <CardContent class="p-6 sm:p-7">
              <p class="text-sm font-bold tracking-[0.12em] text-(--syner-primary) uppercase">
                Sobre este lote
              </p>

              <p class="mt-4 text-base leading-8 text-(--syner-text-muted)">
                {{ lote.descripcion }}
              </p>

              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p class="text-xs text-(--syner-text-subtle)">Comienza</p>

                  <p class="mt-1 text-sm font-semibold text-(--syner-text)">
                    {{ formatearFecha(lote.fechaInicio) }}
                  </p>
                </div>

                <div>
                  <p class="text-xs text-(--syner-text-subtle)">Finaliza</p>

                  <p class="mt-1 text-sm font-semibold text-(--syner-text)">
                    {{ formatearFecha(lote.fechaFin) }}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Collective progress -->
          <Card class="rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface)">
            <CardContent class="p-6 sm:p-7">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-bold tracking-[0.12em] text-(--syner-primary) uppercase">
                    Fondeo colectivo
                  </p>

                  <h2 class="mt-2 text-2xl font-bold tracking-tight text-(--syner-text)">
                    El lote crece con cada cupo
                  </h2>
                </div>

                <span class="text-2xl font-extrabold text-(--syner-primary)">
                  {{ lote.porcentajeFondeo }}%
                </span>
              </div>

              <Progress
                :model-value="lote.porcentajeFondeo"
                class="mt-6 h-3 bg-(--syner-surface-muted)"
              />

              <div class="mt-4 flex items-center justify-between gap-4 text-sm">
                <span class="font-semibold text-(--syner-text)">
                  {{ lote.cuposOcupados }} de {{ lote.cantidadCupos }} cupos ocupados
                </span>

                <span class="text-(--syner-text-muted)"> {{ cuposRestantes }} restantes </span>
              </div>

              <!-- Cupos visualization -->
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="indice in lote.cantidadCupos"
                  :key="indice"
                  class="size-3 rounded-full transition"
                  :class="
                    indice <= lote.cuposOcupados
                      ? 'bg-(--syner-primary)'
                      : 'bg-(--syner-surface-muted) ring-1 ring-(--syner-border)'
                  "
                  :aria-label="
                    indice <= lote.cuposOcupados
                      ? `Cupo ${indice} ocupado`
                      : `Cupo ${indice} disponible`
                  "
                />
              </div>

              <p class="mt-5 text-sm leading-6 text-(--syner-text-muted)">
                Faltan
                <span class="font-bold text-(--syner-text)"> {{ cuposRestantes }} cupos </span>
                para completar este lote.
              </p>
            </CardContent>
          </Card>
        </div>

        <!-- =========================
             PROVIDER + CTA
        ========================== -->

        <div class="mt-4 grid gap-4 lg:grid-cols-[1fr_auto]">
          <Card
            v-if="lote.proveedor"
            class="rounded-(--syner-radius-lg) border-(--syner-border) bg-(--syner-surface)"
          >
            <CardContent class="flex items-start gap-4 p-6">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-(--syner-radius-md) bg-(--syner-forest-soft) text-(--syner-forest)"
              >
                <Check class="size-5" />
              </div>

              <div>
                <p class="text-xs font-semibold tracking-wide text-(--syner-text-subtle) uppercase">
                  Proveedor
                </p>

                <h2 class="mt-1 text-base font-bold text-(--syner-text)">
                  {{ lote.proveedor.nombre }}
                </h2>

                <p class="mt-2 max-w-2xl text-sm leading-6 text-(--syner-text-muted)">
                  {{ lote.proveedor.descripcion }}
                </p>

                <p
                  v-if="lote.proveedor.verificado"
                  class="mt-3 text-sm font-semibold text-(--syner-success)"
                >
                  Proveedor verificado por SYNER
                </p>
              </div>
            </CardContent>
          </Card>

          <div
            class="flex min-w-0 flex-col justify-center rounded-(--syner-radius-lg) bg-(--syner-text) p-5 sm:p-6 lg:min-w-[300px]"
          >
            <p class="text-sm font-medium text-white/70">¿Listo para sumarte?</p>

            <p class="mt-1 text-lg font-bold text-white">Cada cupo acerca el lote a su objetivo.</p>

            <Button
              type="button"
              size="lg"
              class="mt-5 h-12 w-full rounded-(--syner-radius-md) bg-(--syner-primary) font-bold text-white hover:bg-(--syner-primary-hover)"
              :disabled="lote.estado !== 'fondeando' || lote.cuposDisponibles === 0"
              @click="reservarCupo"
            >
              {{
                lote.cuposDisponibles === 0
                  ? 'Lote completo'
                  : lote.estado !== 'fondeando'
                    ? 'Lote no disponible'
                    : 'Quiero colaborar'
              }}
            </Button>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
