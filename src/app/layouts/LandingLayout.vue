<script setup lang="ts">
import { RouterView } from 'vue-router'

import LandingNavbar from '@/modules/landing/components/LandingNavbar.vue'
import PublicFooter from './components/PublicFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LandingNavbar />

    <main class="flex-1">
      <RouterView />
    </main>

    <PublicFooter />
  </div>
</template>
