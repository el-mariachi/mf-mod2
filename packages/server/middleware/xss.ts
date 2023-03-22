import type { RequestHandler } from 'express'

export const xssValidationMiddleware: RequestHandler = (req, res, next) => {
  if (req.body && ['PUT', 'POST'].includes(req.method)) {
    try {
      const body = JSON.stringify(req.body)
      if (body.toLowerCase().includes('<script>')) {
        throw new Error('xssError: not accaptable tag script')
      } else {
        next()
      }
    } catch (err) {
      const e = err as { message: string; status?: number }
      res.status(e.status ?? 405).end(e.message)
    }
  } else {
    next()
  }
}
