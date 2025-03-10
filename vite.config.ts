import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Cổng mặc định
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    }, // Bật HTTPS nếu cần
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Proxy API requests đến BE
        changeOrigin: true,
        secure: false,
      },
    },
  },
});