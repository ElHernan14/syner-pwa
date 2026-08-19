<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Instagram, Linkedin } from 'lucide-vue-next'
</script>

<template>
  <footer class="border-t border-(--syner-border-soft) bg-(--syner-surface)">
    <div class="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <!-- Main -->
      <div class="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-12">
        <!-- Brand -->
        <div class="max-w-sm">
          <RouterLink
            to="/"
            class="group inline-flex items-center gap-2.5"
            aria-label="Ir al inicio de SYNER"
          >
            <img
              src="/icons/icon-192.png"
              alt=""
              class="size-9 rounded-xl object-cover shadow-sm transition-transform duration-200 group-hover:scale-[1.03]"
            />

            <span class="text-[1.05rem] font-extrabold tracking-[-0.02em] text-(--syner-brand)">
              SYNER
            </span>
          </RouterLink>

          <p class="mt-5 text-sm leading-6 text-(--syner-text-muted)">
            Hacemos posible comprar mejor, juntándonos con otras personas para acceder a
            oportunidades que individualmente serían más difíciles de alcanzar.
          </p>

          <div class="mt-6 flex items-center gap-2">
            <a
              href="#"
              aria-label="Instagram"
              class="flex size-9 items-center justify-center rounded-full text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-primary)"
            >
              <Instagram class="size-4" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              class="flex size-9 items-center justify-center rounded-full text-(--syner-text-muted) transition-colors hover:bg-(--syner-hover-surface) hover:text-(--syner-primary)"
            >
              <Linkedin class="size-4" />
            </a>
          </div>
        </div>

        <!-- Explorar -->
        <div>
          <h3 class="text-sm font-bold text-(--syner-text)">Explorar</h3>

          <nav class="mt-4 flex flex-col gap-3">
            <RouterLink
              to="/"
              class="w-fit text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Inicio
            </RouterLink>

            <RouterLink
              to="/lotes"
              class="w-fit text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Pools
            </RouterLink>

            <RouterLink
              to="/login"
              class="w-fit text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Ingresar
            </RouterLink>

            <RouterLink
              to="/register"
              class="w-fit text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Crear cuenta
            </RouterLink>
          </nav>
        </div>

        <!-- SYNER -->
        <div>
          <h3 class="text-sm font-bold text-(--syner-text)">SYNER</h3>

          <nav class="mt-4 flex flex-col gap-3">
            <a
              href="#"
              class="group flex w-fit items-center gap-1 text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Cómo funciona
              <ArrowUpRight class="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>

            <a
              href="#"
              class="group flex w-fit items-center gap-1 text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Preguntas frecuentes
              <ArrowUpRight class="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>

            <a
              href="#"
              class="group flex w-fit items-center gap-1 text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Publicá
              <ArrowUpRight class="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>

            <a
              href="#"
              class="group flex w-fit items-center gap-1 text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Inversiones
              <ArrowUpRight class="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </nav>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-bold text-(--syner-text)">Información</h3>

          <nav class="mt-4 flex flex-col gap-3">
            <a
              href="#"
              class="text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Términos y condiciones
            </a>

            <a
              href="#"
              class="text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Política de privacidad
            </a>

            <a
              href="#"
              class="text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Seguridad
            </a>

            <a
              href="#"
              class="text-sm text-(--syner-text-muted) transition-colors hover:text-(--syner-primary)"
            >
              Contacto
            </a>
          </nav>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="mt-10 flex flex-col gap-3 border-t border-(--syner-border-soft) pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs text-(--syner-text-subtle)">
          © {{ new Date().getFullYear() }} SYNER. Todos los derechos reservados.
        </p>

        <p class="text-xs text-(--syner-text-subtle)">Comprá mejor. Hacelo posible.</p>
      </div>
    </div>
  </footer>
</template>
