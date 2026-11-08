import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Base para GitHub Pages: https://<usuario>.github.io/aula-clinica-ortega/
export default defineConfig({
  base: '/aula-clinica-ortega/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  build: { outDir: 'dist', chunkSizeWarningLimit: 900 },
});
