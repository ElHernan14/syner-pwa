<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppNavbar from '../components/AppNavbar.vue'
import AppSidebar from '../components/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-(--syner-background) text-(--syner-text)">
    <AppNavbar />

    <div class="mx-auto flex max-w-7xl">
      <AppSidebar />

      <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
