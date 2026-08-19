<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ThemeToggle from '@/components/theme/ThemeToggle.vue'

const route = useRoute()

const investmentsOpen = ref(false)

const isActive = (path: string): boolean => {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full">
    <nav
      class="w-full bg-(--syner-navbar-surface)/94 shadow-(--syner-shadow-navbar) backdrop-blur-xl"
      aria-label="Navegación principal"
    >
      <div
        class="mx-auto flex min-h-16 w-full max-w-(--syner-content-max-width) items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <!-- Brand -->
        <RouterLink
          to="/"
          class="group flex shrink-0 items-center gap-2.5 rounded-xl px-1.5 py-1.5"
          aria-label="Ir al inicio de SYNER"
        >
          <img
            src="/icons/icon-192.png"
            alt=""
            class="size-9 rounded-xl object-cover shadow-sm transition-shadow duration-200 group-hover:shadow-md"
          />

          <span
            class="hidden text-[1.05rem] font-extrabold tracking-[-0.02em] text-(--syner-brand) sm:block"
          >
            SYNER
          </span>
        </RouterLink>

        <!-- Main navigation -->
        <div class="hidden items-center gap-0.5 lg:flex">
          <!-- Pools -->
          <RouterLink
            to="/lotes"
            class="rounded-xl px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors"
            :class="
              isActive('/lotes')
                ? 'bg-(--syner-primary-soft) text-(--syner-primary)'
                : 'text-(--syner-text-muted) hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)'
            "
          >
            Pools
          </RouterLink>

          <!-- Publicá -->
          <button
            type="button"
            class="rounded-xl px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          >
            Publicá
          </button>

          <!-- Compulsas -->
          <button
            type="button"
            class="rounded-xl px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          >
            Compulsas
          </button>

          <!-- Inversiones -->
          <div
            class="relative"
            @mouseenter="investmentsOpen = true"
            @mouseleave="investmentsOpen = false"
          >
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors"
              :class="
                investmentsOpen
                  ? 'bg-(--syner-primary-soft) text-(--syner-primary)'
                  : 'text-(--syner-text-muted) hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)'
              "
              :aria-expanded="investmentsOpen"
              aria-haspopup="true"
              @focus="investmentsOpen = true"
              @blur="investmentsOpen = false"
            >
              Inversiones

              <svg
                class="size-3.5 transition-transform duration-200"
                :class="{ 'rotate-180': investmentsOpen }"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 011.08 1.04l-4.25 4.5a.75.75 0 011.08-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <div
                v-if="investmentsOpen"
                class="absolute top-full left-1/2 mt-2 w-72 -translate-x-1/2 rounded-2xl bg-(--syner-surface) p-2 shadow-(--syner-shadow-elevated)"
                @mouseenter="investmentsOpen = true"
                @mouseleave="investmentsOpen = false"
              >
                <button
                  type="button"
                  class="group block w-full rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-(--syner-hover-surface)"
                >
                  <span
                    class="block text-sm font-semibold text-(--syner-text) transition-colors group-hover:text-(--syner-primary)"
                  >
                    Nuestros servicios
                  </span>

                  <span class="mt-1 block text-xs leading-5 text-(--syner-text-muted)">
                    Conocé las alternativas de SYNER.
                  </span>
                </button>

                <button
                  type="button"
                  class="group block w-full rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-(--syner-hover-surface)"
                >
                  <span
                    class="block text-sm font-semibold text-(--syner-text) transition-colors group-hover:text-(--syner-primary)"
                  >
                    Simulador de inversión
                  </span>

                  <span class="mt-1 block text-xs leading-5 text-(--syner-text-muted)">
                    Explorá escenarios de referencia.
                  </span>
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Account actions -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          <RouterLink
            to="/login"
            class="hidden rounded-xl px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text) sm:block"
          >
            Ingresar
          </RouterLink>

          <RouterLink
            to="/register"
            class="rounded-xl bg-(--syner-primary) px-4 py-2.5 text-sm font-bold tracking-[-0.01em] text-white shadow-sm transition duration-200 hover:bg-(--syner-primary-hover) hover:shadow-md sm:px-5"
          >
            Crear cuenta
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
