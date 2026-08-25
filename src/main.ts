import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './app/router'
import { setupUIGuard } from '@/app/router/guards/ui.guard'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { useTheme } from '@/composables/useTheme'

import './assets/main.css'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

useTheme()

const authStore = useAuthStore(pinia)

authStore.restoreSession()

setupUIGuard(router)

app.mount('#app')
