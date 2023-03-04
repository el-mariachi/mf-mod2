import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      RENDERED_ON_SERVER: true,
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'ssr.tsx'),
        name: 'Client',
        formats: ['cjs'],
      },
      rollupOptions: {
        output: {
          dir: 'dist-ssr',
        },
      },
    },
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
        '@sprites': path.resolve('../../', __dirname, 'src/assets/sprites'),
      },
    },
  }
})
