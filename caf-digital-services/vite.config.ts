import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // Mappa process.env.API_KEY alla variabile d'ambiente di Vite
    'process.env.API_KEY': 'import.meta.env.VITE_API_KEY'
  }
});