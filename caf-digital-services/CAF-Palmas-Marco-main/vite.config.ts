import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // Questo permette di usare process.env.API_KEY nel codice, mappandolo alla variabile Vite
    'process.env.API_KEY': 'import.meta.env.VITE_API_KEY'
  }
});