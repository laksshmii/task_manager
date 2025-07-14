import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Explicit output directory
    emptyOutDir: true, // Clear the directory before building
    rollupOptions: {
      output: {
        // Better organization of built files
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  // Base path for deployment
  base: './',
  // Resolve absolute imports if you're using them
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // Development server configuration
  server: {
    port: 3000,
    open: true
  },
  // Preview server configuration
  preview: {
    port: 3000,
    open: true
  }
})