import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

if (typeof globalThis.crypto === 'undefined') {
  Object.defineProperty(globalThis, 'crypto', {
    value: require('crypto').webcrypto,
  });
}

export default defineConfig({
  plugins: [react(), VitePWA()],
  server: {
    host: true,
    port: 5173
  }
});
