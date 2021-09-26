import { defineConfig } from 'vite'
import { __isProd__ } from 'common'
import { app } from 'app-config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/health': `${app.baseUrl}`,
      '/api': {
        target: `${app.baseUrl}/v1/`,
        changeOrigin: true,
        secure: __isProd__,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})