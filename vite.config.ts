import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {
        exportType: 'default', // Гарантируем export default
      },
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/map-bundle-v4.1.4.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        
        // Настройка для CSS и других ассетов
        assetFileNames: (assetInfo) => {
          // Проверяем, заканчивается ли имя файла на .css
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/map-bundle-v4.1.4.css'; // Фиксированное имя
            // Или 'assets/[name].[ext]' чтобы сохранить исходное имя без хеша
          }
          
          // Для остальных файлов (картинки, шрифты) оставляем стандартный шаблон
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})