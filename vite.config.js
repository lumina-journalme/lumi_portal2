import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/lumi_portal2/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html')
      }
    }
  },
  server: {
    open: true
  }
});
