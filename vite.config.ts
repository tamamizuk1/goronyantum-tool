import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/goronyantum-tool/', // リポジトリ名を設定
  build: {
    chunkSizeWarningLimit: 500, // 警告を500KBに設定
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vuetify'], // ライブラリを分割
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // コンソールログを削除
      },
    },
  },
});
