import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './app/router'

import { useTheme } from '@/composables/useTheme'
import { setupUIGuard } from '@/app/router/guards/ui.guard.ts'

import './assets/main.css'

useTheme()
const app = createApp(App)
setupUIGuard(router)

app.use(createPinia())
app.use(router)

app.mount('#app')
