import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Fast Refresh optimalizáció
    fastRefresh: true,
    // JSX runtime automatikus importálása
    jsxRuntime: 'automatic'
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  },
  // Development szerver beállítások
  server: {
    port: 5173,
    open: true,
    // Automatikusan megnyitja a böngészőt
    host: true // Hálózati hozzáférés engedélyezése
  },
  // Build optimalizálás
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor csomagok szétválasztása (jobb cache)
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'ui-vendor': ['@headlessui/react', 'framer-motion', 'lucide-react']
        }
      }
    },
    // Chunk size warning limit növelése
    chunkSizeWarningLimit: 1000
  },
  // Optimalizálás
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@headlessui/react', 'lucide-react', 'recharts']
  },
  // CSS konfiguráció
  css: {
    devSourcemap: true
  }
});