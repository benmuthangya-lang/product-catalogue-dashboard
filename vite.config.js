import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative assets make the build work at both a custom domain and a GitHub Pages subpath.
  base: './',
})
