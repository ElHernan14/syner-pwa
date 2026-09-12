<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronDown, Menu, X } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'

import ThemeToggle from '@/components/theme/ThemeToggle.vue'

const route = useRoute()

const investmentsOpen = ref(false)
const mobileMenuOpen = ref(false)

const MOBILE_BREAKPOINT = 1024

let mediaQuery: MediaQueryList | null = null

const isActive = (path: string): boolean => {
  return route.path === path || route.path.startsWith(`${path}/`)
}

function closeMobileMenu(): void {
  mobileMenuOpen.value = false
}

function toggleMobileMenu(): void {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function handleViewportChange(event: MediaQueryListEvent): void {
  if (event.matches) {
    closeMobileMenu()
    investmentsOpen.value = false
  }
}

function handleNavigation(): void {
  closeMobileMenu()
  investmentsOpen.value = false
}

onMounted(() => {
  mediaQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`)

  mediaQuery.addEventListener('change', handleViewportChange)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', handleViewportChange)
})
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
          @click="handleNavigation"
        >
          <img
            src="/icons/icon-192.png"
            alt=""
            class="size-9 rounded-xl object-cover shadow-sm transition-shadow duration-200 group-hover:shadow-md"
          />

          <span class="text-[1.05rem] font-extrabold tracking-[-0.02em] text-(--syner-brand)">
            SYNER
          </span>
        </RouterLink>

        <!-- Desktop navigation -->
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

              <ChevronDown
                class="size-3.5 transition-transform duration-200"
                :class="{ 'rotate-180': investmentsOpen }"
              />
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

        <!-- Desktop account actions -->
        <div class="hidden items-center gap-1.5 lg:flex">
          <ThemeToggle />

          <RouterLink
            to="/login"
            class="rounded-lg px-3 py-2 text-sm font-semibold tracking-[-0.01em] text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-hover-text)"
          >
            Ingresar
          </RouterLink>

          <RouterLink
            to="/register"
            class="rounded-lg bg-(--syner-primary) px-3.5 py-2 text-sm font-bold tracking-[-0.01em] text-white shadow-sm transition duration-200 hover:bg-(--syner-primary-hover) hover:shadow-md"
          >
            Crear cuenta
          </RouterLink>
        </div>

        <!-- Mobile actions -->
        <div class="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            class="flex size-10 items-center justify-center rounded-xl text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-text)"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-navigation"
            aria-label="Abrir menú de navegación"
            @click="toggleMobileMenu"
          >
            <X v-if="mobileMenuOpen" class="size-5" />
            <Menu v-else class="size-5" />
          </button>
        </div>
      </div>

      <!-- Mobile navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <div v-if="mobileMenuOpen" id="mobile-navigation" class="px-4 pb-4 sm:px-6 lg:hidden">
          <div
            class="mx-auto max-w-(--syner-content-max-width) rounded-2xl bg-(--syner-surface) p-2 shadow-(--syner-shadow-elevated)"
          >
            <!-- Navigation links -->
            <div class="space-y-1">
              <RouterLink
                to="/lotes"
                class="flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors"
                :class="
                  isActive('/lotes')
                    ? 'bg-(--syner-primary-soft) text-(--syner-primary)'
                    : 'text-(--syner-text-muted) hover:bg-(--syner-hover-surface) hover:text-(--syner-text)'
                "
                @click="handleNavigation"
              >
                Pools
              </RouterLink>

              <button
                type="button"
                class="flex w-full items-center rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-text)"
                @click="handleNavigation"
              >
                Publicá
              </button>

              <button
                type="button"
                class="flex w-full items-center rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-text)"
                @click="handleNavigation"
              >
                Compulsas
              </button>

              <!-- Mobile investments -->
              <div class="pt-1">
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-text)"
                  :aria-expanded="investmentsOpen"
                  @click="investmentsOpen = !investmentsOpen"
                >
                  <span>Inversiones</span>

                  <ChevronDown
                    class="size-4 transition-transform duration-200"
                    :class="{ 'rotate-180': investmentsOpen }"
                  />
                </button>

                <Transition
                  enter-active-class="transition duration-150 ease-out"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <div v-if="investmentsOpen" class="space-y-1 px-2 pb-1">
                    <button
                      type="button"
                      class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-primary)"
                      @click="handleNavigation"
                    >
                      Nuestros servicios
                    </button>

                    <button
                      type="button"
                      class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-primary)"
                      @click="handleNavigation"
                    >
                      Simulador de inversión
                    </button>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Account -->
            <div class="mt-2 space-y-2">
              <RouterLink
                to="/login"
                class="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-text)"
                @click="handleNavigation"
              >
                Ingresar
              </RouterLink>

              <RouterLink
                to="/register"
                class="flex w-full items-center justify-center rounded-xl bg-(--syner-primary) px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-(--syner-primary-hover)"
                @click="handleNavigation"
              >
                Crear cuenta
              </RouterLink>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
