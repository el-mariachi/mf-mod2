import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log(command, mode, ssrBuild)

  return {
    server: {
      port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT,
    },
    plugins: [react(), tsconfigPaths()],
    build: {
      // lib: {
      //   entry: path.resolve(__dirname, 'ssr.tsx'),
      //   name: 'Client',
      //   formats: ['cjs'],
      // },
      ssr: true,
      rollupOptions: {
        input: 'ssr.tsx',
        output: {
          dir: 'ssr-dist',
        },
      },
      minify: false,
      emptyOutDir: false,
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
      },
    },
  }
})
