<script setup lang="ts">
import ThemeToggle from '@/components/theme/ThemeToggle.vue'
</script>

<template>
  <main class="min-h-screen">
    <div class="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>

    <RouterView />
  </main>
</template>
