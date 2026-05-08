import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Local shim: keeps API compatible for simple <Helmet> usage.
      'react-helmet': '/src/shims/react-helmet.js',
    },
  },
})
