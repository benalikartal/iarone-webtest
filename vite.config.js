import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        market: resolve(__dirname, 'market.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        nasil_calisir: resolve(__dirname, 'nasil-calisir.html'),
        investor: resolve(__dirname, 'investor.html'),
        publish: resolve(__dirname, 'publish.html'),
        embed: resolve(__dirname, 'embed.html'),
        demo3d: resolve(__dirname, '3d-demo.html')
      }
    }
  }
});
