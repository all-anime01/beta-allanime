import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://all-anime01.github.io/beta-allanime/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
