import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

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
        manualChunks: (id) => {
          if (id.includes('/views/user/')) {
            return 'user';
          }
          if (id.includes('/views/admin/')) {
            return 'admin';
          }
          return null;
        },
      },
    },
    target: 'esnext',
  },
})
