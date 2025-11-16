import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 This makes it accessible from other devices
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 👈 Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
