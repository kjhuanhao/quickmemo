import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import mpaPlugin from 'vite-plugin-mpa-plus'
import type { Rewrite, Pages } from 'vite-plugin-mpa-plus'

const rewrites: Array<Rewrite> = [
  { from: /.*/, to: './index.html' } 
]
const pages: any | Pages = [
  {
    entry: resolve(__dirname, './src/main.ts'),
    filename: resolve(__dirname, './src/index.html'),
    template: resolve(__dirname, './src/index.html'),
    inject: {
      data: {
        title: 'mpa'
      }
    }
  }
]
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mpaPlugin({
      pages,
      historyApiFallback: {
        rewrites
      }
    })
  ],
  appType: 'mpa',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
})
