import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        includePaths: ['node_modules']
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Descomenta e ajusta o proxy se precisares de comunicar com o backend via /api
    // proxy: {
    //   '/api': 'http://backend:PORT'
    // }
  }
})