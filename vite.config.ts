import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react(), sassDts()],
  server: {
    host: true,
    open: false,
  },
  define: {
    // "global": {},
  },
})
