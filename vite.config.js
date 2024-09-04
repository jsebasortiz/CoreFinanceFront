import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis'
  },
  server: {
    port: 3000,
    proxy: 'https://pixinvent.com/',
    cors: {
      origin: ['https://pixinvent.com/', 'http://localhost:3000'],
      methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules', './src/assets']
      }
    },
    postcss: {
      plugins: [require('postcss-rtl')()]
    }
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
      '@assets': path.resolve(__dirname, 'src/@core/assets'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@components': path.resolve(__dirname, 'src/@core/components')
    }
  },
  esbuild: {
    jsx: 'automatic'
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()]
    }
  }
})
