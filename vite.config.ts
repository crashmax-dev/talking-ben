import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  base: './',
  plugins: [viteSingleFile(), solidPlugin()],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext',
    minify: false,
    modulePreload: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
