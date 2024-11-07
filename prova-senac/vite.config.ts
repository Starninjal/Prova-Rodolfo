import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://scholarspace-254954748843.southamerica-east1.run.app/User',
        changeOrigin: true
      },
    },
  },
});