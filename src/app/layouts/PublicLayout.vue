<script setup lang="ts">
import { RouterView } from 'vue-router'

import PublicNavbar from './components/PublicNavbar.vue'
import PublicFooter from './components/PublicFooter.vue'
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
