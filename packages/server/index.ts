import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let distPath: string
  const srcPath = path.dirname(require.resolve('client'))
  let ssrClientPath: string

  let vite: ViteDevServer
  let viteSSR: ViteDevServer
  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
      define: {
        RENDERED_ON_SERVER: false,
      },
    })
    viteSSR = await createViteServer({
      server: { middlewareMode: true, hmr: { port: 24680 } },
      root: srcPath,
      appType: 'custom',
      define: {
        RENDERED_ON_SERVER: true,
      },
    })
    app.use(vite.middlewares)
    app.use(viteSSR.middlewares)
  } else {
    distPath = path.dirname(require.resolve('client/dist/index.html'))
    ssrClientPath = require.resolve('client/dist-ssr/client.cjs')
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    app.use('/assets', express.static(path.resolve(distPath!, 'assets')))
  }

  app.use('/sw.js', (_, res, next) => {
    try {
      res.status(200).sendFile(path.resolve(srcPath, 'sw.js'))
    } catch (e) {
      if (isDev()) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: (url: string) => Promise<string>

      if (isDev()) {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await viteSSR.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
        render = (await import(ssrClientPath)).render
      }

      const appHtml = await render(url)

      const html = template.replace(
        `<div id="root"><!--ssr-outlet--></div>`,
        appHtml
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
