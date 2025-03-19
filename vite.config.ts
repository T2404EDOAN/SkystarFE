import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Cổng mặc định
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '54.83.174.210-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '54.83.174.210.pem')),
    }, // Bật HTTPS nếu cần
    
  },
});