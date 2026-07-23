import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@atoms': path.resolve(__dirname, './src/components/atoms'),
      // '@url': path.resolve(__dirname, './src/components/url'),
      // '@reduxToolkit': path.resolve(__dirname, './src/components/reduxToolkit'),
      // '@reusableComponents': path.resolve(__dirname, './src/reusableComponents'),
    },
  },
})
