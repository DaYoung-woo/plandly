import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    ...(process.env.NODE_ENV === 'development' ? {global: 'window'} : {})
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   proxy: {
  //     '/wsTest': {
  //       target: 'https://plandly-haeju-min.koyeb.app',
  //       changeOrigin: true,
  //       //rewrite: (path) => path.replace(/^\/socket.io/, '/ws'),
  //       secure: false,
  //       ws: true
  //     }
  //   }
  // }
})
