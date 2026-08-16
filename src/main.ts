import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './app/router'

import { useTheme } from '@/composables/useTheme'

import './assets/main.css'

useTheme()
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
