import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vueecommerce/',
  server: {
    proxy: {
      '/api': 'http://localhost:80' // Adjust this to match your PHP server
    }
  }
})
