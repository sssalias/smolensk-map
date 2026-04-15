import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `map-bundle.js`,
        chunkFileNames: `[name].js`,
        // Настраиваем имена ассетов (CSS, картинки и т.д.)
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'map-bundle.css'; // Ваше фиксированное имя для CSS
          }
          return '[name].[ext]'; // Для остальных файлов (картинки, шрифты)
        },
      },
    },
    minify: 'terser',
  },
});
