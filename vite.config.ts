import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://192.168.0.59:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/socket.io/, '/ws'),
        secure: false,
        ws: true
      }
    }
  }
})
