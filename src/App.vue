<script setup lang="ts">
import PwaUpdatePrompt from '@/shared/components/feedback/PwaUpdatePrompt.vue'
import GlobalLoading from '@/components/system/GlobalLoading.vue'
</script>

<template>
  <RouterView />
  <PwaUpdatePrompt />
  <GlobalLoading />
</template>
