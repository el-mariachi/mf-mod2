import fs from 'fs'
import path from 'path'
// import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'

import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
// import { createClientAndConnect } from './db'

const startServer = async () => {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  // createClientAndConnect()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.get('/default', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const ssrBuildPath = require.resolve('client/ssr-dist/client.cjs')

  app.use('/assets', express.static(path.resolve(distPath, 'assets')))

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // 1. read html
      const template = fs.readFileSync(
        path.resolve(distPath, 'index.html'),
        'utf-8'
      ) // TODO
      // 2. inject hmr client & apply HTML transforms
      // if (process.env.NODE_ENV === 'development') {
      //   // TODO
      //   template = await vite.transformIndexHtml(url, template)
      // }
      // 3. load server entry point
      // const { render } = await vite.ssrLoadModule('') // TODO
      const { render } = await import(ssrBuildPath)
      // 4. render app HTML
      const appHtml = await render(url)
      // 5. inject app
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
      // 6. send
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      // vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
