import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {

  const isProduction = mode === 'production';
  const isRender = process.env.RENDER === 'true';
  
  return {
    plugins: [react()],
    base: isProduction && isRender ? '/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        }
      }
    },
    server: {
      port: 3000,
      host: true,
      historyApiFallback: true
    },
    preview: {
      port: 4173,
      host: true,
      historyApiFallback: true
    },
    define: {
      __DEPLOYMENT_PLATFORM__: JSON.stringify(
        isRender ? 'render' : 'netlify'
      )
    }
  };
});