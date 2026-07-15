import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),

    VitePWA({
      registerType: 'prompt',

      injectRegister: 'auto',

      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],

      manifest: {
        id: '/',
        name: 'SYNER - Inversiones Colaborativas',
        short_name: 'SYNER',
        description: 'Plataforma para conocer y gestionar propuestas colaborativas de SYNER.',
        lang: 'es-AR',

        start_url: '/',
        scope: '/',

        display: 'standalone',
        orientation: 'portrait-primary',

        background_color: '#f7f9fc',
        theme_color: '#168fe8',

        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },

      workbox: {
        navigateFallback: '/index.html',

        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],

        cleanupOutdatedCaches: true,

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',

            handler: 'CacheFirst',

            options: {
              cacheName: 'syner-images',

              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: false,
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
