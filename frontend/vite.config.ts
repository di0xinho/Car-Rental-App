import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      // splitting javascript bundle into chunks:
      // https://router.vuejs.org/guide/advanced/lazy-loading.html
      output: {
        manualChunks: {
          'user-group': [
            './src/views/user/UserMainView',
            './src/views/user/UserOrdersView',
            './src/views/user/UserAnaliticsView',
            './src/views/user/UserRentView',
            './src/views/user/UserSettingsView',
          ],
        },
      },
    },
  },
})
