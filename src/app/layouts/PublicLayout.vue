<script setup lang="ts">
import PublicFooter from './components/PublicFooter.vue'
import PublicNavbar from './components/PublicNavbar.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PublicNavbar />

    <main class="flex-1">
      <RouterView />
    </main>

    <PublicFooter />
  </div>
</template>
