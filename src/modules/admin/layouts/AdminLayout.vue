<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import AdminNavbar from '../components/AdminNavbar.vue'
import AdminSidebar from '../components/AdminSidebar.vue'

const mobileSidebarOpen = ref(false)

function toggleMobileSidebar(): void {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}

function closeMobileSidebar(): void {
  mobileSidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-(--syner-background) text-(--syner-text)">
    <AdminNavbar :mobile-sidebar-open="mobileSidebarOpen" @toggle-sidebar="toggleMobileSidebar" />

    <div class="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar :mobile-open="mobileSidebarOpen" @close="closeMobileSidebar" />

      <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 xl:p-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>
