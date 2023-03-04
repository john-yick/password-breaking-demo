import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/password-breaking-demo/',
  build:{
    outDir: 'docs'
  },
  plugins: [vue()],
})
