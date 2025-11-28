import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Impostare base su './' permette al sito di funzionare in qualsiasi sottocartella
  // Questo è essenziale per GitHub Pages (es. tuosito.github.io/nome-repo/)
  base: './',
});