import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Lets the app call relative /api/... URLs in dev without CORS, and
      // means uploaded-image <img src="/api/..."> tags work the same way
      // they will once both are served from the same origin in production.
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },
})
