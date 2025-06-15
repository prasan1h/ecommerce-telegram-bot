// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: "/",
//   build: {
//     outDir: 'dist',
//   },
//   server: {
//     // historyApiFallback: true
//   }
//   // },
//   // preview: {
//   //   historyApiFallback: true
//   // }
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // Determine if we're building for production
  const isProduction = mode === 'production';
  
  // Check if we're deploying to Render (you can set RENDER=true in Render's env vars)
  const isRender = process.env.RENDER === 'true';
  
  return {
    plugins: [react()],
    
    // Base path configuration
    base: isProduction && isRender ? './' : '/',
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // Ensure consistent file naming
      rollupOptions: {
        output: {
          manualChunks: undefined,
        }
      }
    },
    
    // Development server config
    server: {
      port: 3000,
      host: true, // Important for Render if you deploy dev server there
      historyApiFallback: true
    },
    
    // Preview server config (for testing production builds)
    preview: {
      port: 4173,
      host: true,
      historyApiFallback: true
    },
    
    // Environment variables
    define: {
      // Make deployment platform available in your React app
      __DEPLOYMENT_PLATFORM__: JSON.stringify(
        isRender ? 'render' : 'netlify'
      )
    }
  };
});
