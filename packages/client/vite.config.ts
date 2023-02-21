import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    'process.env.CUSTOM_SSR': false,
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve('../../', __dirname, 'src'),
      '@vars': path.resolve('../../', __dirname, 'src/vars'),
      '@bootstrap': path.resolve(
        __dirname + '../../../',
        'node_modules/bootstrap/scss/bootstrap'
      ),
      '@images': path.resolve('../../', __dirname, 'src/assets/images'),
      '@fonts': path.resolve('../../', __dirname, 'src/assets/fonts'),
    },
  },
})
