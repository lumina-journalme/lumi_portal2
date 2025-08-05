import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '/lumi_portal2/' : '/';
  
  return {
    base,
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          blog: resolve(__dirname, 'blog/index.html')
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      }
    },
    server: {
      open: true,
      port: 3001,
      strictPort: true
    },
    preview: {
      port: 3001,
      strictPort: true
    },
  };
});
