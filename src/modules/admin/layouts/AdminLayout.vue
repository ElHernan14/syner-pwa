<script setup lang="ts">
import { RouterView } from 'vue-router'

import AdminNavbar from '../components/AdminNavbar.vue'
import AdminSidebar from '../components/AdminSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-(--syner-background) text-(--syner-text)">
    <AdminNavbar />

    <div class="mx-auto flex max-w-7xl">
      <AdminSidebar />

      <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
