<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'

const { tema, cambiarTema } = useTheme()
</script>

<template>
  <Button
    type="button"
    variant="ghost"
    size="icon"
    class="size-9 rounded-(--syner-radius-md) text-(--syner-text-muted) hover:bg-(--syner-surface-muted) hover:text-(--syner-text)"
    :aria-label="tema === 'light' ? 'Activar tema oscuro' : 'Activar tema claro'"
    @click="cambiarTema"
  >
    <Sun v-if="tema === 'dark'" class="size-4" />

    <Moon v-else class="size-4" />
  </Button>
</template>
